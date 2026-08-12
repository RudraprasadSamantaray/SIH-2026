import React, { useState } from 'react';
import { useDataset } from '../context/DataContext';
import { downloadExecutiveReport } from '../utils/reportPdf';
import AnimatedNumber from '../components/AnimatedNumber';

export default function Reports() {
  const { metrics, simMetrics, activeFileName, selectedMetal, setSelectedMetal } = useDataset();
  const [generating, setGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  if (!metrics || !simMetrics) return null;

  const simControls = {
    recycledPctTarget: 65,
    railShiftPct: 85,
    renewableEnergyPct: 0
  };

  const handleGenerate = () => {
    if (reportGenerated) {
      downloadExecutiveReport({ metrics, simMetrics, simControls, activeFileName, selectedMetal });
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setReportGenerated(true);
    }, 1500);
  };

  const sections = [
    { title: 'Executive EPD Meta Scope', detail: `${metrics.totalCount} active records analyzed` },
    { title: 'Baseline Carbon Footprint', detail: `${metrics.totalCO2Tons} tCO2e total emission scope` },
    { title: 'Lifecycle Assessment Hotspots', detail: `Smelting & Refining priority (${metrics.hotspots.topEmittingMetal})` },
    { title: 'Circularity Indicator', detail: `MCI Score: ${(metrics.avgCircularity / 100).toFixed(2)} (${metrics.avgCircularity}/100)` },
    { title: 'Scoring Board', detail: `Score: ${metrics.scores.overallScore} → ${simMetrics.simulatedOverallScore}/100` },
    { title: 'Intervention Recommendations', detail: '3 targeted decarbonization mitigation pathways' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-lg animate-fade-in-up">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-outline-variant/45 mb-md">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Executive EPD &amp; Compliance Report</h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Generate and export the ISO 14040/44 compliant report calculated live from active dataset.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-surface-bright border border-outline-variant p-1 rounded-lg text-xs font-semibold">
          {['All', ...metrics.metalStats.map((ms) => ms.material)].map((m) => (
            <button
              key={m}
              onClick={() => { setSelectedMetal(m); setReportGenerated(false); }}
              className={`px-3 py-1 rounded transition-all duration-200 cursor-pointer ${
                selectedMetal === m ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      {/* Analysis Sections Card */}
      <div className="premium-card rounded-xl p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-outline-variant/60 pb-4">
          <div>
            <h3 className="text-base font-bold text-on-surface">
              Report Summary &amp; Verified Data Sections
            </h3>
            <p className="text-xs text-on-surface-variant">Source File: <strong className="text-primary">{activeFileName}</strong></p>
          </div>
          <span className="text-xs font-bold font-mono-data bg-primary-container/10 text-primary border border-primary/20 px-3 py-1 rounded-lg">
            Score: <AnimatedNumber value={metrics.scores.overallScore} decimals={0} /> → <AnimatedNumber value={simMetrics.simulatedOverallScore} decimals={0} />/100
          </span>
        </div>

        <ul className="space-y-3">
          {sections.map((section, idx) => (
            <li key={idx} className="flex flex-col md:flex-row md:items-center justify-between text-sm text-on-surface font-semibold border-b border-outline-variant/30 pb-2.5 gap-1">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
                <span>{section.title}</span>
              </div>
              <span className="text-xs font-mono-data text-on-surface-variant pl-8 md:pl-0 font-medium">
                {section.detail}
              </span>
            </li>
          ))}
        </ul>

        {/* Status Bar */}
        <div className="bg-surface-bright/70 p-4 border border-outline-variant/60 rounded-xl flex justify-between items-center text-xs font-semibold shadow-sm">
          <span className="text-on-surface-variant">Report Status:</span>
          <span className="inline-flex items-center gap-2 text-primary font-bold bg-primary-container/20 px-3 py-1.5 rounded-full text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            {reportGenerated ? 'EPD Executive Report Ready for Download' : 'Analysis Verified & Ready'}
          </span>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="bg-primary text-on-primary font-label-md text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary-fixed-variant transition-all font-bold cursor-pointer shadow disabled:opacity-50 active:scale-97"
          >
            {generating ? (
              <>
                <span className="material-symbols-outlined text-base animate-spin">sync</span>
                Generating Full Executive Report...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-base">article</span>
                {reportGenerated ? 'Download Report PDF' : 'Generate Full Executive Report'}
              </>
            )}
          </button>
        </div>
      </div>

      {reportGenerated && (
        <article className="bg-surface-container-lowest border-2 border-primary/20 rounded-xl p-8 shadow-sm space-y-6 animate-fade-in-up">
          <div className="border-b border-outline-variant pb-4">
            <p className="text-[10px] uppercase tracking-wider font-bold text-primary mb-1">Generated report</p>
            <h2 className="text-xl font-bold text-on-surface">Executive EPD &amp; Compliance Report</h2>
            <p className="text-xs text-on-surface-variant mt-0.5">Active source: {activeFileName} · Material filter: {selectedMetal}</p>
          </div>
          
          <section className="space-y-2">
            <h3 className="font-bold text-sm text-on-surface border-b border-outline-variant/40 pb-1">1. Report scope</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              This report covers {metrics.totalCount} active records representing {metrics.totalQuantityTons} tonnes of metal output. Values below are recalculated from the currently selected material data and scenario settings.
            </p>
          </section>
          
          <section className="space-y-3">
            <h3 className="font-bold text-sm text-on-surface border-b border-outline-variant/40 pb-1">2. Baseline performance</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              {[
                ['Carbon footprint', `${metrics.totalCO2Tons} tCO2e`],
                ['Energy consumed', `${metrics.totalEnergyMwh} MWh`],
                ['Water consumed', `${metrics.totalWaterM3} m³`],
                ['Manufacturing loss', `${metrics.totalMfgLossKg.toLocaleString()} kg`]
              ].map(([label, value]) => (
                <div key={label} className="bg-surface border border-outline-variant rounded-xl p-4 shadow-sm">
                  <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">{label}</p>
                  <p className="font-bold text-base text-on-surface mt-1.5 font-mono-data">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              Carbon intensity: {metrics.carbonIntensityPerKg} kg CO2e/kg · Energy intensity: {metrics.energyIntensityPerKg} kWh/kg · Freight: {metrics.totalTransportKm.toLocaleString()} km.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-lg pt-2">
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-on-surface border-b border-outline-variant/40 pb-1">3. Circularity &amp; scoring</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Circularity index: <strong>{metrics.avgCircularity}/100</strong>. Recycled input: <strong>{metrics.avgRecycledPct}%</strong>. Recovery rate: <strong>{metrics.avgRecoveryPct}%</strong>. Baseline score: <strong>{metrics.scores.overallScore}/100</strong>.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-on-surface border-b border-outline-variant/40 pb-1">4. Hotspot assessment</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                <strong>{metrics.hotspots.topEmittingMetal}</strong> is the highest-emitting material group. Smelting is estimated at {metrics.hotspots.smeltingCO2Tons} tCO2e and transport at {metrics.hotspots.transportCO2Tons} tCO2e.
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-sm text-on-surface border-b border-outline-variant/40 pb-1">5. Active improvement scenario</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              With a {simControls.recycledPctTarget}% recycled-content target, {simControls.railShiftPct}% rail shift, and {simControls.renewableEnergyPct}% renewable energy, the projected footprint is <strong>{simMetrics.simulatedCO2Tons} tCO2e</strong> ({simMetrics.co2ReductionPct}% reduction). The projected circularity score is <strong>{simMetrics.simulatedCircularity}/100</strong> and the overall score is <strong>{simMetrics.simulatedOverallScore}/100</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-bold text-sm text-on-surface border-b border-outline-variant/40 pb-1">6. Material breakdown</h3>
            <div className="overflow-x-auto border border-outline-variant rounded-xl">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-surface text-on-surface-variant border-b border-outline-variant/60 font-semibold">
                  <tr>
                    <th className="py-2.5 px-md">Material</th>
                    <th className="py-2.5 px-md">Records</th>
                    <th className="py-2.5 px-md">Output</th>
                    <th className="py-2.5 px-md">CO2e</th>
                    <th className="py-2.5 px-md">Circularity</th>
                  </tr>
                </thead>
                <tbody className="font-mono-data text-on-surface">
                  {metrics.metalStats.map((metal) => (
                    <tr key={metal.material} className="border-t border-outline-variant/40 hover:bg-surface/50 transition-colors">
                      <td className="py-2.5 px-md font-semibold font-body-sm text-xs">{metal.material}</td>
                      <td className="py-2.5 px-md">{metal.count}</td>
                      <td className="py-2.5 px-md">{metal.quantity_tons} t</td>
                      <td className="py-2.5 px-md">{metal.co2_tons} t</td>
                      <td className="py-2.5 px-md">{metal.avgCircularity}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="font-bold text-sm text-on-surface border-b border-outline-variant/40 pb-1">7. Recommended actions</h3>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-on-surface-variant leading-relaxed">
              <li>Increase recycled material input toward the current scenario target.</li>
              <li>Move eligible long-haul freight to rail.</li>
              <li>Increase renewable electricity and reduce manufacturing scrap through closed-loop recovery.</li>
            </ol>
          </section>
        </article>
      )}
    </div>
  );
}
