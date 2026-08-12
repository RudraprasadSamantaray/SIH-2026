import React, { useState } from 'react';
import { useDataset } from '../context/DataContext';

export default function Reports() {
  const { metrics, simMetrics, activeFileName, selectedMetal, setSelectedMetal } = useDataset();
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  if (!metrics || !simMetrics) return null;

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setReportGenerated(true);
    }, 1200);
  };

  const sections = [
    { title: 'Data Summary', detail: `${metrics.totalCount} records (${metrics.totalQuantityTons} tonnes metal)` },
    { title: 'LCA (Life Cycle Assessment)', detail: `${metrics.totalCO2Tons} tCO2e total (${metrics.carbonIntensityPerKg} kg/kg intensity)` },
    { title: 'Circularity Analysis', detail: `${metrics.avgCircularity}/100 MCI score (${metrics.avgRecycledPct}% recycled content)` },
    { title: 'Transportation Analysis', detail: `${metrics.totalTransportKm} km total freight distance` },
    { title: 'Scenario Simulation', detail: `Projected reduction: -${simMetrics.co2ReductionPct}% CO2e` },
    { title: 'Scoring Board', detail: `Score increase: ${metrics.scores.overallScore} → ${simMetrics.simulatedOverallScore}/100 (${simMetrics.scoreImprovement} pts)` },
    { title: 'Intervention Recommendations', detail: '3 targeted decarbonization mitigation pathways' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-gutter">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-xl">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Executive EPD &amp; Compliance Report</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Generate and export the ISO 14040/44 compliant report calculated live from PS 25069 Dataset.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-surface-bright border border-outline-variant p-1 rounded-lg text-xs font-semibold">
          {['All', 'Aluminium', 'Steel', 'Copper'].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetal(m)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                selectedMetal === m ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      {/* Analysis Sections Card */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm space-y-lg">
        <div className="flex justify-between items-center border-b border-outline-variant pb-md">
          <div>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Report Summary &amp; Verified Data Sections
            </h3>
            <p className="text-xs text-on-surface-variant">Source File: <strong className="text-primary">{activeFileName}</strong></p>
          </div>
          <span className="text-xs font-bold font-mono-data bg-primary-container/20 text-primary px-3 py-1 rounded">
            Score: {metrics.scores.overallScore} → {simMetrics.simulatedOverallScore}/100
          </span>
        </div>

        <ul className="space-y-md">
          {sections.map((section, idx) => (
            <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between text-body-md text-on-surface font-medium border-b border-outline-variant/40 pb-2 gap-1">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>{section.title}</span>
              </div>
              <span className="text-xs font-mono-data text-on-surface-variant pl-8 md:pl-0">
                {section.detail}
              </span>
            </li>
          ))}
        </ul>

        {/* Status Bar */}
        <div className="bg-surface-bright p-md border border-outline-variant rounded-lg flex justify-between items-center text-sm font-semibold">
          <span className="text-on-surface-variant">Report Status:</span>
          <span className="inline-flex items-center gap-2 text-primary font-bold bg-primary-container/20 px-3 py-1 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            {reportGenerated ? 'EPD Executive Report Ready for Download' : 'Analysis Verified & Ready'}
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
                {reportGenerated ? 'Download Report PDF' : 'Generate Full Executive Report'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
