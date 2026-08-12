import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataset } from '../context/DataContext';

export default function Scoring() {
  const { metrics, simMetrics, selectedMetal, setSelectedMetal } = useDataset();
  const navigate = useNavigate();

  if (!metrics || !simMetrics) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-xl border-b border-outline-variant pb-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Scoring Board</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Overall environmental &amp; circularity score evaluation derived from PS 25069 Dataset.
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

      {/* Main Scoring Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Score Card (Spans 5 columns) */}
        <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-lg p-xl flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-primary-container"></div>
          
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs font-semibold">
            CURRENT DATASET SCORE
          </span>
          <div className="font-mono-data text-5xl font-bold text-on-surface mb-md">
            {metrics.scores.overallScore}<span className="text-2xl text-on-surface-variant font-normal">/100</span>
          </div>

          <span className="material-symbols-outlined text-on-surface-variant text-2xl my-2">arrow_downward</span>

          <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider mb-xs">
            SIMULATED PROJECTION SCORE
          </span>
          <div className="font-mono-data text-6xl font-bold text-primary mb-lg">
            {simMetrics.simulatedOverallScore}<span className="text-2xl text-primary/70 font-normal">/100</span>
          </div>

          <div className="bg-primary-container text-on-primary font-label-md text-xs font-bold py-2 px-6 rounded-full flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            {simMetrics.scoreImprovement} POINT IMPROVEMENT
          </div>
        </div>

        {/* Right Details Section (Spans 7 columns) */}
        <div className="lg:col-span-7 space-y-gutter">
          {/* Notice Box */}
          <div className="p-md bg-surface-bright border-l-4 border-primary border border-outline-variant rounded-lg flex items-start gap-md shadow-sm">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
            <p className="text-body-md text-sm text-on-surface leading-relaxed">
              Simulated scenario achieves <span className="font-bold text-primary">{simMetrics.co2ReductionPct}% lower carbon emissions</span> and improves circularity index to <span className="font-bold text-tertiary">{simMetrics.simulatedCircularity}/100</span>.
            </p>
          </div>

          {/* Metric Breakdown Table */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-sm">
            <div className="p-md bg-surface-bright border-b border-outline-variant">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Metric Breakdown</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface font-label-md text-xs text-on-surface-variant uppercase border-b border-outline-variant">
                    <th className="py-sm px-md font-semibold">INDICATOR</th>
                    <th className="py-sm px-md font-semibold">CURRENT</th>
                    <th className="py-sm px-md font-semibold">SIMULATED</th>
                    <th className="py-sm px-md font-semibold text-right">DELTA</th>
                  </tr>
                </thead>
                <tbody className="font-mono-data text-mono-data text-on-surface text-sm">
                  <tr className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                    <td className="py-sm px-md font-body-sm text-body-sm font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-primary">co2</span> Carbon Emissions
                    </td>
                    <td className="py-sm px-md">{metrics.totalCO2Tons} tCO2e</td>
                    <td className="py-sm px-md text-primary font-bold">{simMetrics.simulatedCO2Tons} tCO2e</td>
                    <td className="py-sm px-md text-right text-primary font-bold">-{simMetrics.co2ReductionPct}%</td>
                  </tr>

                  <tr className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                    <td className="py-sm px-md font-body-sm text-body-sm font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-tertiary">bolt</span> Energy Usage
                    </td>
                    <td className="py-sm px-md">{metrics.totalEnergyMwh} MWh</td>
                    <td className="py-sm px-md text-primary font-bold">{simMetrics.simulatedEnergyMwh} MWh</td>
                    <td className="py-sm px-md text-right text-primary font-bold">
                      -{(((parseFloat(metrics.totalEnergyMwh) - parseFloat(simMetrics.simulatedEnergyMwh)) / parseFloat(metrics.totalEnergyMwh)) * 100).toFixed(1)}%
                    </td>
                  </tr>

                  <tr className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                    <td className="py-sm px-md font-body-sm text-body-sm font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-secondary">sync</span> Circularity Index
                    </td>
                    <td className="py-sm px-md">{metrics.avgCircularity}/100</td>
                    <td className="py-sm px-md text-primary font-bold">{simMetrics.simulatedCircularity}/100</td>
                    <td className="py-sm px-md text-right text-tertiary font-bold">
                      +{simMetrics.simulatedCircularity - metrics.avgCircularity} PTS
                    </td>
                  </tr>

                  <tr className="hover:bg-surface/50 transition-colors">
                    <td className="py-sm px-md font-body-sm text-body-sm font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-primary">water_drop</span> Material Recovery
                    </td>
                    <td className="py-sm px-md">{metrics.avgRecoveryPct}%</td>
                    <td className="py-sm px-md text-primary font-bold">{Math.min(98, metrics.avgRecoveryPct + 12)}%</td>
                    <td className="py-sm px-md text-right text-tertiary font-bold">+12%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-md">
            <button
              onClick={() => navigate('/recommendations')}
              className="bg-primary-container text-on-primary font-label-md text-label-md px-lg py-sm rounded-md flex items-center gap-sm hover:bg-primary transition-all font-bold cursor-pointer"
            >
              View Recommendations
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
