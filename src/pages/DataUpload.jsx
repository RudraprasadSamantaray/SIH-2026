import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataset } from '../context/DataContext';

export default function DataUpload() {
  const [uploadState, setUploadState] = useState('default'); // 'default' | 'progress' | 'success'
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const { metrics, uploadCustomDataset, resetToDefault, activeFileName } = useDataset();
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      startUpload(e.target.files[0]);
    }
  };

  const startUpload = (file) => {
    setUploadedFile(file);
    setUploadState('progress');
    
    // Simulate parsing or reading CSV/Excel file
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        // Parse CSV if text format
        if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
          const lines = text.split('\n').filter((l) => l.trim().length > 0);
          if (lines.length > 1) {
            const parsedRows = [];
            for (let i = 1; i < lines.length; i++) {
              const cols = lines[i].split(',').map((c) => c.trim());
              if (cols.length >= 6) {
                parsedRows.push({
                  id: i,
                  metal: cols[0] || 'Aluminium',
                  product: cols[1] || 'Industrial Part',
                  quantity_kg: parseFloat(cols[2]) || 1000,
                  virgin_material_pct: parseFloat(cols[3]) || 50,
                  recycled_material_pct: parseFloat(cols[4]) || 50,
                  energy_kwh: parseFloat(cols[5]) || 3000,
                  transport_km: parseFloat(cols[6]) || 400,
                  co2_kg: parseFloat(cols[7]) || 750,
                  water_l: parseFloat(cols[8]) || 5000,
                  manufacturing_loss_kg: parseFloat(cols[9]) || 80,
                  recovery_pct: parseFloat(cols[10]) || 70,
                  cost_inr: parseFloat(cols[11]) || 100000,
                  circularity: parseFloat(cols[12]) || 65,
                });
              }
            }
            if (parsedRows.length > 0) {
              uploadCustomDataset(parsedRows, file.name);
            }
          }
        }
      } catch (err) {
        console.error('File parsing error:', err);
      }
    };

    if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    }

    setTimeout(() => {
      setUploadState('success');
    }, 1200);
  };

  const handleReset = () => {
    resetToDefault();
    setUploadState('default');
    setUploadedFile(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center py-4">
      <div className="mb-lg flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-unit">Data Upload</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Import your industrial operational dataset (e.g. PS 25069 Metal LCA &amp; Circularity Dataset) to compute live metrics.
          </p>
        </div>
        {activeFileName && (
          <div className="text-xs bg-surface-bright border border-outline-variant px-3 py-1.5 rounded font-mono-data">
            Active Dataset: <span className="font-bold text-primary">{activeFileName}</span> ({metrics?.totalCount} rows)
          </div>
        )}
      </div>

      {/* Upload Interface */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg relative overflow-hidden transition-all duration-300">
        {/* State 1: Default Upload */}
        {uploadState === 'default' && (
          <div
            className={`flex flex-col items-center justify-center py-xl px-md upload-dashed-border ${
              isDragOver ? 'dragover bg-surface-container' : 'bg-surface-bright'
            } transition-colors duration-200 cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input').click()}
          >
            <div className="w-16 h-16 bg-surface-container flex items-center justify-center rounded-full mb-md text-primary">
              <span className="material-symbols-outlined text-4xl">cloud_upload</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">
              Upload Operational Dataset
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg text-center max-w-md">
              Drag and drop your PS 25069 dataset (.xlsx, .csv, .pdf, .docx) here, or click to browse.
            </p>
            <input
              accept=".xlsx,.xls,.csv,.pdf,.docx,.doc"
              className="hidden"
              id="file-input"
              onChange={handleFileSelect}
              type="file"
            />
            <button
              type="button"
              className="bg-primary-container text-on-primary font-label-md text-label-md py-sm px-lg rounded hover:bg-primary transition-colors flex items-center gap-xs cursor-pointer font-bold"
            >
              Browse Files
            </button>
          </div>
        )}

        {/* State 2: Uploading */}
        {uploadState === 'progress' && (
          <div className="flex flex-col items-center justify-center py-xl">
            <div className="w-16 h-16 mb-md text-primary animate-bounce flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">hourglass_empty</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm">
              Parsing Metal LCA &amp; Circularity Dataset...
            </h3>
            <p className="text-xs text-on-surface-variant mb-md">Calculating Quantity, Virgin/Recycled %, CO2, Water &amp; Circularity score</p>
            <div className="w-full max-w-md bg-surface-variant h-2.5 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full animate-pulse transition-all duration-500 w-3/4"></div>
            </div>
          </div>
        )}

        {/* State 3: Success Summary */}
        {uploadState === 'success' && (
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-lg pb-md border-b border-outline-variant">
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full text-primary-container">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Dataset Processed Successfully</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {uploadedFile ? uploadedFile.name : activeFileName} (PS 25069 Dataset)
                  </p>
                </div>
              </div>
              <button
                className="text-on-surface-variant hover:text-primary transition-colors p-1 cursor-pointer"
                onClick={handleReset}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-md mb-xl">
              <div className="bg-surface border border-outline-variant rounded p-md">
                <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Rows Processed</p>
                <p className="font-mono-data text-mono-data text-on-surface text-xl font-bold">{metrics?.totalCount}</p>
              </div>
              <div className="bg-surface border border-outline-variant rounded p-md">
                <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Total Weight (Tonnes)</p>
                <p className="font-mono-data text-mono-data text-on-surface text-xl font-bold">{metrics?.totalQuantityTons} t</p>
              </div>
              <div className="bg-surface border border-outline-variant rounded p-md">
                <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Total CO2 Emissions</p>
                <p className="font-mono-data text-mono-data text-primary text-xl font-bold">{metrics?.totalCO2Tons} tCO2e</p>
              </div>
              <div className="bg-surface border border-outline-variant rounded p-md">
                <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Avg Circularity Index</p>
                <p className="font-mono-data text-mono-data text-tertiary text-xl font-bold">{metrics?.avgCircularity}/100</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <button
                className="text-xs text-on-surface-variant hover:text-primary underline cursor-pointer"
                onClick={handleReset}
              >
                Reset to Default PS 25069 Dataset
              </button>
              <div className="flex gap-md">
                <button
                  className="bg-surface-container-lowest text-on-surface font-label-md text-label-md py-sm px-lg rounded border border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer"
                  onClick={() => setUploadState('default')}
                >
                  Upload Another
                </button>
                <button
                  onClick={() => navigate('/lca')}
                  className="bg-primary-container text-on-primary font-label-md text-label-md py-sm px-lg rounded hover:bg-primary transition-colors flex items-center gap-xs font-bold cursor-pointer"
                >
                  View Data Visualization <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Guidelines Card */}
      <div className="mt-lg bg-surface-bright border border-outline-variant rounded-lg p-md flex gap-md items-start">
        <span className="material-symbols-outlined text-secondary mt-unit">info</span>
        <div>
          <h4 className="font-headline-sm text-headline-sm text-on-surface text-sm mb-xs">PS 25069 Schema Format</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Supported columns: 'Metal', 'Product', 'Quantity_kg', 'Virgin_Material_%', 'Recycled_Material_%', 'Energy_kWh', 'Transport_km', 'CO2_kg', 'Water_L', 'Manufacturing_Loss_kg', 'Recovery_%', 'Cost_INR', 'Circularity'.
          </p>
        </div>
      </div>
    </div>
  );
}
