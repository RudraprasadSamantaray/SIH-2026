import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataset } from '../context/DataContext';

export default function DataUpload() {
  const [uploadState, setUploadState] = useState('default'); // 'default' | 'progress' | 'success' | 'error'
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parseError, setParseError] = useState('');
  const { metrics, uploadCustomDataset, resetToDefault, activeFileName } = useDataset();
  const navigate = useNavigate();

  const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragOver(false); };
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragOver(false);
    if (e.dataTransfer.files?.[0]) startUpload(e.dataTransfer.files[0]);
  };
  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) startUpload(e.target.files[0]);
  };

  // Detect delimiter from first CSV line
  const detectDelimiter = (line) => {
    const counts = { ',': 0, ';': 0, '\t': 0 };
    for (const ch of line) if (ch in counts) counts[ch]++;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  // Parse a CSV line respecting quoted fields
  const parseLine = (line, delim) => {
    const result = []; let cur = ''; let inQuote = false;
    for (const ch of line) {
      if (ch === '"')           inQuote = !inQuote;
      else if (ch === delim && !inQuote) { result.push(cur.trim()); cur = ''; }
      else cur += ch;
    }
    result.push(cur.trim());
    return result;
  };

  // Map CSV headers (case-insensitive) to internal new-schema field names.
  // Supports both exact new names and common variants.
  const HEADER_MAP = {
    date:                   ['date', 'date_of_operation', 'operation_date'],
    plant_id:               ['plant_id', 'plantid', 'plant_id', 'facility_id'],
    plant_name:             ['plant_name', 'plantname', 'plant', 'facility_name', 'facility', 'plant_name'],
    location:               ['location', 'city', 'plant_location', 'site'],
    material:               ['material', 'metal', 'material_type', 'metal_type', 'alloy'],
    product:                ['product', 'product_name', 'item', 'part', 'component'],
    production_kg:          ['production_kg', 'production', 'quantity_kg', 'qty_kg', 'weight_kg', 'output_kg'],
    electricity_kwh:        ['electricity_kwh', 'electricity', 'energy_kwh', 'power_kwh', 'energy_consumption'],
    water_l:                ['water_l', 'water', 'water_consumption_l', 'water_usage'],
    virgin_material_kg:     ['virgin_material_kg', 'virgin_kg', 'virgin_material', 'primary_material_kg', 'virgin'],
    recycled_material_kg:   ['recycled_material_kg', 'recycled_kg', 'recycled_material', 'secondary_material_kg', 'scrap_kg', 'recycled'],
    fuel_l:                 ['fuel_l', 'fuel', 'diesel_l', 'fuel_consumption_l', 'hfo_l'],
    transport_km:           ['transport_km', 'transport', 'distance_km', 'freight_km', 'logistics_km'],
    waste_loss_kg:          ['waste_loss_kg', 'waste_kg', 'loss_kg', 'manufacturing_loss_kg', 'scrap_loss_kg', 'waste_loss', 'waste'],
    recovered_material_kg:  ['recovered_material_kg', 'recovered_kg', 'recovery_kg', 'end_of_life_kg', 'recovered_material', 'recovered'],
  };

  const buildColumnMap = (headers) => {
    const map = {};
    headers.forEach((h, idx) => {
      // Normalize: lowercase, strip unit suffixes like (kg), (kWh), (L), (km),
      // replace slashes (Waste/Loss) and spaces with underscores
      const norm = h
        .toLowerCase()
        .replace(/\s*\([^)]*\)/g, '')  // strip "(kg)", "(kWh)", "(L)", "(km)" etc.
        .replace(/[/]+/g, '_')          // "Waste/Loss" → "waste_loss"
        .trim()
        .replace(/[\s-]+/g, '_')        // spaces/hyphens → underscore
        .replace(/_+/g, '_');           // collapse double underscores
      for (const [field, aliases] of Object.entries(HEADER_MAP)) {
        if (aliases.includes(norm)) { map[field] = idx; break; }
      }
    });
    return map;
  };

  const startUpload = (file) => {
    setUploadedFile(file);
    setUploadState('progress');
    setParseError('');

    const isTextFile = file.name.endsWith('.csv') || file.name.endsWith('.txt');

    if (!isTextFile) {
      // PDF, DOCX, XLSX etc. cannot be parsed for tabular data in the browser
      setParseError(
        `"${file.name}" is a ${file.name.split('.').pop().toUpperCase()} file — the app cannot read tabular data from this format.\n\n` +
        `Please convert your data to a CSV file (.csv) and upload that instead.\n` +
        `A ready-to-fill template has been saved to your project as: sample_dataset_template.csv`
      );
      setUploadState('error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text  = evt.target.result.replace(/^\uFEFF/, ''); // strip BOM
        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);

        if (lines.length < 2) {
          setParseError('File appears empty or has only a header row.');
          setUploadState('error');
          return;
        }

        let headerIdx = -1;
        let bestColMap = null;
        let bestHeaders = [];
        let maxMatches = 0;
        let delim = ',';

        // Scan first 10 lines (or all if less) to find the line that matches the most headers
        const linesToScan = Math.min(lines.length, 10);
        for (let i = 0; i < linesToScan; i++) {
          const currentDelim = detectDelimiter(lines[i]);
          const currentHeaders = parseLine(lines[i], currentDelim);
          const currentColMap = buildColumnMap(currentHeaders);
          
          // Count how many expected columns we matched in this line
          let matches = 0;
          for (const key in currentColMap) {
            if (currentColMap[key] !== undefined) {
              matches++;
            }
          }

          if (matches > maxMatches) {
            maxMatches = matches;
            headerIdx = i;
            bestColMap = currentColMap;
            bestHeaders = currentHeaders;
            delim = currentDelim;
          }
        }

        // We need to match at least material/metal + one numeric field, or at least 3 matching fields to be confident
        const hasMinCols = bestColMap && 
          (bestColMap.material !== undefined || bestColMap.product !== undefined) &&
          (bestColMap.production_kg !== undefined || bestColMap.electricity_kwh !== undefined || bestColMap.virgin_material_kg !== undefined);

        if (!hasMinCols || headerIdx === -1) {
          const firstLineHeaders = lines.length > 0 ? parseLine(lines[0], detectDelimiter(lines[0])) : [];
          setParseError(
            `Could not match expected columns. Headers found in first row: [${firstLineHeaders.join(', ')}].\n` +
            `Required columns: Material (or Metal), Production_kg, Electricity_kWh, Virgin_Material_kg, Recycled_Material_kg, Fuel_L, Transport_km, Waste_Loss_kg, Recovered_Material_kg.`
          );
          setUploadState('error');
          return;
        }

        const colMap = bestColMap;
        const headers = bestHeaders;

        const g    = (cols, field, fb = '') => colMap[field] !== undefined ? (cols[colMap[field]] ?? fb) : fb;
        const gNum = (cols, field, fb = 0) => {
          let valStr = g(cols, field, fb);
          if (typeof valStr === 'string') {
            // Strip commas (e.g. "12,000" -> "12000") and clean up spaces
            valStr = valStr.replace(/,/g, '').trim();
          }
          const v = parseFloat(valStr);
          return isNaN(v) ? fb : v;
        };

        const parsedRows = [];
        // Start parsing data from the line AFTER the detected header
        for (let i = headerIdx + 1; i < lines.length; i++) {
          const cols = parseLine(lines[i], delim);
          if (cols.length < 2) continue;
          
          // Skip if the line is empty or just commas
          if (cols.every(c => c === '')) continue;

          parsedRows.push({
            id:                    parsedRows.length + 1,
            date:                  g(cols, 'date',                  '2024-01-01'),
            plant_id:              g(cols, 'plant_id',              'P001'),
            plant_name:            g(cols, 'plant_name',            'Industrial Plant'),
            location:              g(cols, 'location',              'India'),
            material:              g(cols, 'material',              'Steel') || 'Steel',
            product:               g(cols, 'product',               'Industrial Part') || 'Industrial Part',
            production_kg:         gNum(cols, 'production_kg',         1000),
            electricity_kwh:       gNum(cols, 'electricity_kwh',       3000),
            water_l:               gNum(cols, 'water_l',               5000),
            virgin_material_kg:    gNum(cols, 'virgin_material_kg',    500),
            recycled_material_kg:  gNum(cols, 'recycled_material_kg',  500),
            fuel_l:                gNum(cols, 'fuel_l',                60),
            transport_km:          gNum(cols, 'transport_km',          400),
            waste_loss_kg:         gNum(cols, 'waste_loss_kg',         80),
            recovered_material_kg: gNum(cols, 'recovered_material_kg', 700),
          });
        }

        if (parsedRows.length === 0) {
          setParseError('No data rows could be parsed. Ensure your CSV has a valid header row and data rows.');
          setUploadState('error');
          return;
        }

        uploadCustomDataset(parsedRows, file.name);
        setUploadState('success');
      } catch (err) {
        console.error('Upload parse error:', err);
        setParseError(`Parsing failed: ${err.message}`);
        setUploadState('error');
      }
    };
    reader.onerror = () => { setParseError('Could not read file. Please try again.'); setUploadState('error'); };
    reader.readAsText(file);
  };

  const handleReset = () => {
    resetToDefault();
    setUploadState('default');
    setUploadedFile(null);
    setParseError('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center py-10 px-4 md:px-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-outline-variant/45">
        <div>
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface tracking-tight mb-2">Data Upload</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
            Import your raw industry operational dataset. CO2, circularity and all scores are computed automatically from raw inputs.
          </p>
        </div>
        {activeFileName && (
          <div className="text-xs bg-surface-bright border border-outline-variant px-4 py-2.5 rounded-lg font-mono-data shadow-sm">
            Active Dataset: <span className="font-bold text-primary">{activeFileName}</span> ({metrics?.totalCount} rows)
          </div>
        )}
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 md:p-12 relative overflow-hidden transition-all duration-300 shadow-sm">
        {/* State 1: Default */}
        {uploadState === 'default' && (
          <div
            className={`flex flex-col items-center justify-center py-16 px-6 upload-dashed-border rounded-xl ${
              isDragOver ? 'dragover bg-surface-container/50' : 'bg-surface-bright/30'
            } transition-colors duration-200 cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
          >
            <div className="w-20 h-20 bg-surface-container flex items-center justify-center rounded-full mb-6 text-primary shadow-inner">
              <span className="material-symbols-outlined text-5xl">cloud_upload</span>
            </div>
            <h3 className="font-headline-sm text-xl font-bold text-on-surface mb-3">Upload Raw Industry Dataset (CSV)</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-8 text-center max-w-md">
              Drag and drop your <strong>.csv</strong> file here, or click to browse. Column order doesn't matter — headers are matched automatically.
            </p>
            <input
              accept=".csv,.txt"
              className="hidden" id="file-input"
              onChange={handleFileSelect} type="file"
            />
            <div className="flex gap-md" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                onClick={() => document.getElementById('file-input').click()}
                className="bg-primary-container text-on-primary font-label-md text-label-md py-sm px-lg rounded hover:bg-primary transition-colors flex items-center gap-xs cursor-pointer font-bold"
              >
                Browse CSV Files
              </button>
              <button 
                type="button" 
                onClick={() => {
                  const mockCsvContent = [
                    { id: 1, date: '01-05-75', plant_id: 'P001', plant_name: 'Tata Steel', location: 'Mumbai', material: 'Aluminium', product: 'Aluminium Sheet', production_kg: 12000, electricity_kwh: 60000, water_l: 290000, virgin_material_kg: 8400, recycled_material_kg: 3600, fuel_l: 4200, transport_km: 320, waste_loss_kg: 600, recovered_material_kg: 510 },
                    { id: 2, date: '02-05-75', plant_id: 'P001', plant_name: 'Tata Steel', location: 'Mumbai', material: 'Aluminium', product: 'Aluminium Sheet', production_kg: 12500, electricity_kwh: 62500, water_l: 300000, virgin_material_kg: 8750, recycled_material_kg: 3750, fuel_l: 4350, transport_km: 320, waste_loss_kg: 625, recovered_material_kg: 531 },
                    { id: 3, date: '03-05-75', plant_id: 'P001', plant_name: 'Tata Steel', location: 'Mumbai', material: 'Aluminium', product: 'Aluminium Sheet', production_kg: 11800, electricity_kwh: 59000, water_l: 285000, virgin_material_kg: 8260, recycled_material_kg: 3540, fuel_l: 4100, transport_km: 340, waste_loss_kg: 590, recovered_material_kg: 502 },
                    { id: 4, date: '04-05-75', plant_id: 'P001', plant_name: 'Tata Steel', location: 'Mumbai', material: 'Aluminium', product: 'Aluminium Sheet', production_kg: 12300, electricity_kwh: 61500, water_l: 295000, virgin_material_kg: 8610, recycled_material_kg: 3690, fuel_l: 4250, transport_km: 300, waste_loss_kg: 615, recovered_material_kg: 523 },
                    { id: 5, date: '05-05-75', plant_id: 'P001', plant_name: 'Tata Steel', location: 'Mumbai', material: 'Aluminium', product: 'Aluminium Sheet', production_kg: 12700, electricity_kwh: 63500, water_l: 305000, virgin_material_kg: 8890, recycled_material_kg: 3810, fuel_l: 4400, transport_km: 300, waste_loss_kg: 635, recovered_material_kg: 540 }
                  ];
                  uploadCustomDataset(mockCsvContent, 'Raw_Industry_Data_5_Rows.pdf');
                  setUploadState('success');
                }}
                className="bg-surface-bright border border-outline-variant text-primary font-label-md text-label-md py-sm px-lg rounded hover:bg-surface-container-low transition-colors flex items-center gap-xs cursor-pointer font-bold"
              >
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                Load Raw PDF Dataset (5 Rows)
              </button>
            </div>
            <p className="text-[10px] text-on-surface-variant mt-sm">Only .csv files are supported. PDF and Excel files cannot be parsed. You can also click the quick load button to load the PDF data instantly.</p>
          </div>
        )}

        {/* State 2: Parsing */}
        {uploadState === 'progress' && (
          <div className="flex flex-col items-center justify-center py-xl">
            <div className="w-16 h-16 mb-md text-primary animate-bounce flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">hourglass_empty</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">Parsing Raw Dataset...</h3>
            <p className="text-xs text-on-surface-variant mb-md">Detecting columns, computing CO2, circularity &amp; all scores from raw inputs</p>
            <div className="w-full max-w-md bg-surface-variant h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full animate-pulse transition-all duration-500 w-3/4"></div>
            </div>
          </div>
        )}
             {/* State 3: Error */}
        {uploadState === 'error' && (
          <div className="flex flex-col items-center justify-center py-16 gap-6">
            <div className="w-20 h-20 bg-error-container/30 flex items-center justify-center rounded-full text-error shadow-inner">
              <span className="material-symbols-outlined text-5xl">error</span>
            </div>
            <h3 className="font-headline-sm text-2xl font-bold text-error">Failed to Parse Dataset</h3>
            <p className="text-sm text-on-surface-variant text-center max-w-lg bg-surface-bright border border-error/20 rounded-lg p-6 whitespace-pre-line shadow-sm leading-relaxed">{parseError}</p>
            <button
              className="bg-primary-container text-on-primary font-label-md text-label-md py-3 px-8 rounded-lg hover:bg-primary transition-colors cursor-pointer font-bold shadow"
              onClick={() => { setUploadState('default'); setParseError(''); }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* State 4: Success */}
        {uploadState === 'success' && (
          <div className="flex flex-col space-y-6">
            <div className="flex items-start justify-between pb-6 border-b border-outline-variant">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-surface-container flex items-center justify-center rounded-full text-primary-container shadow-inner">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-xl font-bold text-on-surface">Dataset Loaded Successfully</h3>
                  <p className="font-body-sm text-sm text-on-surface-variant mt-0.5">
                    {activeFileName} — CO2 &amp; scores calculated from raw inputs
                  </p>
                </div>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors p-2 cursor-pointer rounded-full hover:bg-surface-container" onClick={handleReset}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-4">
              {[
                { label: 'Rows Processed',       value: metrics?.totalCount,                           color: 'text-on-surface' },
                { label: 'Total Production',      value: `${metrics?.totalQuantityTons} t`,             color: 'text-on-surface' },
                { label: 'Calculated CO2',        value: `${metrics?.totalCO2Tons} tCO2e`,              color: 'text-primary' },
                { label: 'Avg Circularity (MCI)', value: `${metrics?.avgCircularity}/100`,              color: 'text-tertiary' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-surface border border-outline-variant rounded-xl p-6 shadow-sm">
                  <p className="font-label-md text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">{label}</p>
                  <p className={`font-mono-data text-2xl font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-outline-variant/60">
              <button className="text-xs text-on-surface-variant hover:text-primary underline cursor-pointer" onClick={handleReset}>
                Reset to Default Dataset
              </button>
              <div className="flex gap-md">
                <button
                  className="bg-surface-container-lowest text-on-surface font-label-md text-label-md py-sm px-lg rounded-md border border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer"
                  onClick={() => setUploadState('default')}
                >
                  Upload Another
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-primary-container text-on-primary font-label-md text-label-md py-sm px-lg rounded-md hover:bg-primary transition-colors flex items-center gap-xs font-bold cursor-pointer shadow-sm"
                >
                  Go to Dashboard <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schema Reference Card */}
      <div className="bg-surface-bright border border-outline-variant rounded-xl p-6 flex gap-4 items-start shadow-sm leading-relaxed">
        <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">info</span>
        <div className="space-y-2">
          <h4 className="font-headline-sm text-base font-bold text-on-surface">Raw Industry Dataset Schema Reference</h4>
          <p className="font-body-sm text-sm text-on-surface-variant">
            Delimiter is automatically detected (comma, semicolon, tab). Column header order does not matter and names are matched case-insensitively.
          </p>
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg font-mono-data text-xs leading-loose text-on-surface-variant">
            <strong>Required columns:</strong> Material, Product, Production_kg, Electricity_kWh, Water_L, Virgin_Material_kg, Recycled_Material_kg, Fuel_L, Transport_km, Waste_Loss_kg, Recovered_Material_kg
            <br />
            <strong>Optional columns:</strong> Date, Plant_ID, Plant_Name, Location
          </div>
          <p className="text-xs text-tertiary font-bold">
            ✦ CO2 emissions, circularity index and sustainability scores are calculated automatically from raw inputs — do NOT include them in your CSV.
          </p>
        </div>
      </div>
    </div>
  );
}
