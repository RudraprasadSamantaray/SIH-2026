import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DataUpload() {
  const [uploadState, setUploadState] = useState('default'); // 'default' | 'progress' | 'success'
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
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
    setTimeout(() => {
      setUploadState('success');
    }, 1600);
  };

  const resetUpload = () => {
    setUploadState('default');
    setUploadedFile(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col justify-center py-4">
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-unit">Data Upload</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Import your industrial operational data to begin life cycle analysis.
        </p>
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
              Upload Industrial Excel Sheet
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-lg text-center max-w-md">
              Drag and drop your .xlsx, .xls, or .csv files here, or click to browse. Ensure data follows the standard EcoMetrix template.
            </p>
            <input
              accept=".xlsx,.xls,.csv"
              className="hidden"
              id="file-input"
              onChange={handleFileSelect}
              type="file"
            />
            <button
              type="button"
              className="bg-primary-container text-on-primary font-label-md text-label-md py-sm px-lg rounded hover:bg-primary transition-colors flex items-center gap-xs cursor-pointer"
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
              Processing Operational Data...
            </h3>
            <p className="text-xs text-on-surface-variant mb-md">Parsing Scope 1, 2 &amp; 3 energy &amp; emission headers</p>
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
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">File uploaded successfully</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {uploadedFile ? uploadedFile.name : 'Q3_Plant_A12_Emissions.xlsx'} (2.4 MB)
                  </p>
                </div>
              </div>
              <button
                className="text-on-surface-variant hover:text-primary transition-colors p-1"
                onClick={resetUpload}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-xl">
              <div className="bg-surface border border-outline-variant rounded p-md">
                <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Rows Processed</p>
                <p className="font-mono-data text-mono-data text-on-surface text-xl font-bold">14,205</p>
              </div>
              <div className="bg-surface border border-outline-variant rounded p-md">
                <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Columns Identified</p>
                <p className="font-mono-data text-mono-data text-on-surface text-xl font-bold">42</p>
              </div>
              <div className="bg-surface border border-outline-variant rounded p-md">
                <p className="font-label-md text-label-md text-on-surface-variant mb-xs">Data Period</p>
                <p className="font-mono-data text-mono-data text-on-surface text-xl font-bold">Jul-Sep 2023</p>
              </div>
            </div>

            <div className="flex justify-end gap-md">
              <button
                className="bg-surface-container-lowest text-on-surface font-label-md text-label-md py-sm px-lg rounded border border-outline-variant hover:bg-surface-container-low transition-colors"
                onClick={resetUpload}
              >
                Upload Another
              </button>
              <button
                onClick={() => navigate('/lca')}
                className="bg-primary-container text-on-primary font-label-md text-label-md py-sm px-lg rounded hover:bg-primary transition-colors flex items-center gap-xs"
              >
                View Data Visualization <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Guidelines Card */}
      <div className="mt-lg bg-surface-bright border border-outline-variant rounded-lg p-md flex gap-md items-start">
        <span className="material-symbols-outlined text-secondary mt-unit">info</span>
        <div>
          <h4 className="font-headline-sm text-headline-sm text-on-surface text-sm mb-xs">Data Requirements</h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Ensure your dataset includes mandatory columns: 'Timestamp', 'Process_ID', and 'Energy_kWh'. Files missing these headers will be flagged for review during processing.
          </p>
        </div>
      </div>
    </div>
  );
}
