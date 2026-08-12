import React, { useState } from 'react';

export default function Reports() {
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setReportGenerated(true);
    }, 1500);
  };

  const sections = [
    'Data Summary',
    'LCA (Life Cycle Assessment)',
    'Circularity',
    'Transportation',
    'Simulation',
    'Scoring',
    'Recommendations',
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-gutter">
      {/* Header */}
      <header className="mb-xl">
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Report</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
          Generate a report from the completed analysis.
        </p>
      </header>

      {/* Analysis Sections Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm space-y-lg">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface border-b border-outline-variant pb-md">
          Analysis Sections Included
        </h3>

        <ul className="space-y-md">
          {sections.map((section, idx) => (
            <li key={idx} className="flex items-center gap-md text-body-md text-on-surface font-medium">
              <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
              <span>{section}</span>
            </li>
          ))}
        </ul>

        {/* Status Bar */}
        <div className="bg-surface-bright p-md border border-outline-variant rounded-lg flex justify-between items-center text-sm font-semibold">
          <span className="text-on-surface-variant">Status:</span>
          <span className="inline-flex items-center gap-2 text-primary font-bold bg-primary-container/20 px-3 py-1 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {reportGenerated ? 'Report Downloaded' : 'Report Ready'}
          </span>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end pt-md">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="bg-primary-container text-on-primary font-label-md text-label-md px-xl py-sm rounded-md flex items-center gap-sm hover:bg-primary transition-all font-bold cursor-pointer shadow-sm disabled:opacity-50"
          >
            {generating ? (
              <>
                <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                Generating Full Executive Report...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">article</span>
                {reportGenerated ? 'Download Report PDF' : 'Generate Report'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
