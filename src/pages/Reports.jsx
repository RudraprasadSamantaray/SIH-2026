import React, { useState } from 'react';
import { useDataset } from '../context/DataContext';
import { downloadExecutiveReport } from '../utils/reportPdf';

export default function Reports() {
  const { metrics, simMetrics, simControls, activeFileName, selectedMetal, setSelectedMetal } = useDataset();
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  if (!metrics || !simMetrics) return null;

  const handleGenerate = () => {
    if (reportGenerated) {
      downloadExecutiveReport({ metrics, simMetrics, simControls, activeFileName, selectedMetal });
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setReportGenerated(true);
    }, 500);
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
              onClick={() => { setSelectedMetal(m); setReportGenerated(false); }}
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

      {reportGenerated && (
        <article className="bg-surface-container-lowest border-2 border-primary/30 rounded-xl p-xl shadow-sm space-y-xl">
          <div className="border-b border-outline-variant pb-md">
            <p className="text-xs uppercase tracking-wider font-bold text-primary mb-1">Generated report</p>
            <h2 className="font-headline-md text-headline-md font-bold text-on-surface">Executive EPD &amp; Compliance Report</h2>
            <p className="text-sm text-on-surface-variant mt-1">Active source: {activeFileName} · Material filter: {selectedMetal}</p>
          </div>
          <section><h3 className="font-bold text-on-surface mb-sm">1. Report scope</h3><p className="text-sm text-on-surface-variant leading-relaxed">This report covers {metrics.totalCount} active records representing {metrics.totalQuantityTons} tonnes of metal output. Values below are recalculated from the currently selected material data and scenario settings.</p></section>
          <section><h3 className="font-bold text-on-surface mb-sm">2. Baseline performance</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-sm">{[['Carbon footprint', `${metrics.totalCO2Tons} tCO2e`], ['Energy consumed', `${metrics.totalEnergyMwh} MWh`], ['Water consumed', `${metrics.totalWaterM3} m³`], ['Manufacturing loss', `${metrics.totalMfgLossKg.toLocaleString()} kg`]].map(([label, value]) => <div key={label} className="bg-surface p-md border border-outline-variant rounded-lg"><p className="text-xs text-on-surface-variant">{label}</p><p className="font-bold text-on-surface mt-1">{value}</p></div>)}</div><p className="text-sm text-on-surface-variant mt-md">Carbon intensity: {metrics.carbonIntensityPerKg} kg CO2e/kg · Energy intensity: {metrics.energyIntensityPerKg} kWh/kg · Freight: {metrics.totalTransportKm.toLocaleString()} km.</p></section>
          <section className="grid md:grid-cols-2 gap-lg"><div><h3 className="font-bold text-on-surface mb-sm">3. Circularity &amp; scoring</h3><p className="text-sm text-on-surface-variant leading-relaxed">Circularity index: <strong>{metrics.avgCircularity}/100</strong>. Recycled input: <strong>{metrics.avgRecycledPct}%</strong>. Recovery rate: <strong>{metrics.avgRecoveryPct}%</strong>. Baseline score: <strong>{metrics.scores.overallScore}/100</strong>.</p></div><div><h3 className="font-bold text-on-surface mb-sm">4. Hotspot assessment</h3><p className="text-sm text-on-surface-variant leading-relaxed"><strong>{metrics.hotspots.topEmittingMetal}</strong> is the highest-emitting material group. Smelting is estimated at {metrics.hotspots.smeltingCO2Tons} tCO2e and transport at {metrics.hotspots.transportCO2Tons} tCO2e.</p></div></section>
          <section><h3 className="font-bold text-on-surface mb-sm">5. Active improvement scenario</h3><p className="text-sm text-on-surface-variant leading-relaxed">With a {simControls.recycledPctTarget}% recycled-content target, {simControls.railShiftPct}% rail shift, and {simControls.renewableEnergyPct}% renewable energy, the projected footprint is <strong>{simMetrics.simulatedCO2Tons} tCO2e</strong> ({simMetrics.co2ReductionPct}% reduction). The projected circularity score is <strong>{simMetrics.simulatedCircularity}/100</strong> and the overall score is <strong>{simMetrics.simulatedOverallScore}/100</strong>.</p></section>
          <section><h3 className="font-bold text-on-surface mb-sm">6. Material breakdown</h3><div className="overflow-x-auto border border-outline-variant rounded-lg"><table className="w-full text-sm text-left"><thead className="bg-surface text-on-surface-variant"><tr><th className="p-sm">Material</th><th className="p-sm">Records</th><th className="p-sm">Output</th><th className="p-sm">CO2e</th><th className="p-sm">Circularity</th></tr></thead><tbody>{metrics.metalStats.map((metal) => <tr key={metal.metal} className="border-t border-outline-variant"><td className="p-sm font-semibold">{metal.metal}</td><td className="p-sm">{metal.count}</td><td className="p-sm">{metal.quantity_tons} t</td><td className="p-sm">{metal.co2_tons} t</td><td className="p-sm">{metal.avgCircularity}/100</td></tr>)}</tbody></table></div></section>
          <section><h3 className="font-bold text-on-surface mb-sm">7. Recommended actions</h3><ol className="list-decimal pl-5 space-y-1 text-sm text-on-surface-variant"><li>Increase recycled material input toward the current scenario target.</li><li>Move eligible long-haul freight to rail.</li><li>Increase renewable electricity and reduce manufacturing scrap through closed-loop recovery.</li></ol></section>
        </article>
      )}
    </div>
  );
}
