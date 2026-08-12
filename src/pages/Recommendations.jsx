import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataset } from '../context/DataContext';

export default function Recommendations() {
  const { metrics, simMetrics, selectedMetal, setSelectedMetal } = useDataset();
  const navigate = useNavigate();

  if (!metrics || !simMetrics) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-xl">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Recommendations &amp; Interventions</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs max-w-3xl">
            Targeted decarbonization interventions calculated live from PS 25069 Dataset ({metrics.totalCount} batches).
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

      {/* 3 Column Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col justify-between shadow-sm hover:border-primary/50 transition-colors">
          <div className="space-y-md">
            <div className="flex items-start gap-md">
              <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">recycling</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-snug">
                  Increase Recycled Material Input
                </h3>
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  SIMULATION INSIGHT
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-md border-t border-outline-variant text-xs">
              <div>
                <div className="flex items-center gap-1 font-semibold text-error mb-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Current Limitation
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Dataset secondary recycled content is <span className="font-bold text-error">{metrics.avgRecycledPct}%</span> across {metrics.totalQuantityTons} tonnes metal output.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 font-semibold text-primary mb-1">
                  <span className="material-symbols-outlined text-sm">build</span> Recommended Action
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Increase scrap recycling ratio to <span className="font-bold text-on-surface">65%</span> of total furnace melt input.
                </p>
              </div>

              <div className="p-sm bg-surface-bright border border-outline-variant rounded">
                <div className="flex items-center gap-1 font-semibold text-primary mb-0.5">
                  <span className="material-symbols-outlined text-sm">trending_down</span> Projected Carbon Offset
                </div>
                <p className="text-on-surface-variant text-[11px]">
                  Lower overall carbon emissions by <span className="font-bold text-primary">-{simMetrics.co2ReductionPct}% ({simMetrics.simulatedCO2Tons} tCO2e)</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-lg">
            <button
              onClick={() => navigate('/simulator')}
              className="w-full bg-surface border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2 rounded text-on-surface flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              Test in Simulator <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col justify-between shadow-sm hover:border-primary/50 transition-colors">
          <div className="space-y-md">
            <div className="flex items-start gap-md">
              <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">train</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-snug">
                  Electrified Rail Modal Shift
                </h3>
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  LOGISTICS INSIGHT
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-md border-t border-outline-variant text-xs">
              <div>
                <div className="flex items-center gap-1 font-semibold text-error mb-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Current Limitation
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Dataset total freight distance is <span className="font-bold text-error">{metrics.totalTransportKm} km</span>, generating {metrics.hotspots.transportCO2Tons} tCO2e Scope 3 emissions.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 font-semibold text-primary mb-1">
                  <span className="material-symbols-outlined text-sm">alt_route</span> Recommended Action
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Shift long-distance freight (&gt;300km) to electrified rail network corridor.
                </p>
              </div>

              <div className="p-sm bg-surface-bright border border-outline-variant rounded">
                <div className="flex items-center gap-1 font-semibold text-primary mb-0.5">
                  <span className="material-symbols-outlined text-sm">trending_down</span> Projected Improvement
                </div>
                <p className="text-on-surface-variant text-[11px]">
                  Reduce freight carbon intensity by <span className="font-bold text-primary">60%</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-lg">
            <button
              onClick={() => navigate('/transportation')}
              className="w-full bg-surface border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2 rounded text-on-surface flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              View Route Comparison <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col justify-between shadow-sm hover:border-primary/50 transition-colors">
          <div className="space-y-md">
            <div className="flex items-start gap-md">
              <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">all_inclusive</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-snug">
                  Reduce Manufacturing Scrap Loss
                </h3>
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  CIRCULARITY INSIGHT
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-md border-t border-outline-variant text-xs">
              <div>
                <div className="flex items-center gap-1 font-semibold text-error mb-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Current Limitation
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Total manufacturing loss is <span className="font-bold text-error">{metrics.totalMfgLossKg} kg ({(metrics.totalMfgLossKg / 1000).toFixed(2)} tonnes)</span> across dataset batches.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 font-semibold text-primary mb-1">
                  <span className="material-symbols-outlined text-sm">handyman</span> Recommended Action
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Implement closed-loop dross pressing and internal scrap recycling.
                </p>
              </div>

              <div className="p-sm bg-surface-bright border border-outline-variant rounded">
                <div className="flex items-center gap-1 font-semibold text-primary mb-0.5">
                  <span className="material-symbols-outlined text-sm">trending_up</span> Projected Improvement
                </div>
                <p className="text-on-surface-variant text-[11px]">
                  Boost circularity score to <span className="font-bold text-primary">{simMetrics.simulatedCircularity}/100</span> (+{simMetrics.simulatedCircularity - metrics.avgCircularity} points).
                </p>
              </div>
            </div>
          </div>

          <div className="pt-lg">
            <button
              onClick={() => navigate('/circularity')}
              className="w-full bg-surface border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2 rounded text-on-surface flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              View Circularity Flow <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex justify-end pt-lg">
        <button
          onClick={() => navigate('/reports')}
          className="bg-primary-container text-on-primary font-label-md text-label-md px-xl py-sm rounded-md flex items-center gap-sm hover:bg-primary transition-all font-bold cursor-pointer shadow-sm"
        >
          Generate Executive Report
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
