import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataset } from '../context/DataContext';
import AnimatedNumber from '../components/AnimatedNumber';

export default function Recommendations() {
  const { metrics, simMetrics, selectedMetal, setSelectedMetal } = useDataset();
  const navigate = useNavigate();

  if (!metrics || !simMetrics) return null;

  return (
    <div className="space-y-lg animate-fade-in-up">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-outline-variant/45 mb-md">
        <div>
          <h1 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Recommendations &amp; Interventions</h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-1 max-w-3xl">
            Targeted decarbonization interventions calculated live from active dataset ({metrics.totalCount} batches).
          </p>
        </div>

        <div className="flex items-center gap-1 bg-surface-bright border border-outline-variant p-1 rounded-lg text-xs font-semibold">
          {['All', 'Aluminium', 'Steel', 'Copper'].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetal(m)}
              className={`px-3 py-1 rounded transition-all duration-200 cursor-pointer ${
                selectedMetal === m ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
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
        <div className="premium-card rounded-xl p-lg flex flex-col justify-between">
          <div className="space-y-md">
            <div className="flex items-start gap-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-xl">recycling</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface leading-snug">
                  Increase Recycled Material Input
                </h3>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  SIMULATION INSIGHT
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-md border-t border-outline-variant/60 text-xs">
              <div>
                <div className="flex items-center gap-1 font-semibold text-error mb-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Current Limitation
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Dataset secondary recycled content is <span className="font-bold text-error"><AnimatedNumber value={metrics.avgRecycledPct} decimals={0} />%</span> across <AnimatedNumber value={metrics.totalQuantityTons} decimals={1} /> tonnes metal output.
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

              <div className="p-3 bg-surface-bright border border-outline-variant/65 rounded-lg shadow-sm">
                <div className="flex items-center gap-1 font-semibold text-primary mb-0.5">
                  <span className="material-symbols-outlined text-sm">trending_down</span> Projected Carbon Offset
                </div>
                <p className="text-on-surface-variant text-[11px]">
                  Lower overall carbon emissions by <span className="font-bold text-primary">-<AnimatedNumber value={simMetrics.co2ReductionPct} decimals={1} />% (<AnimatedNumber value={simMetrics.simulatedCO2Tons} decimals={1} /> tCO2e)</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-lg">
            <button
              onClick={() => navigate('/simulator')}
              className="w-full bg-surface-bright border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2.5 rounded-lg text-on-surface flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              Test in Simulator <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="premium-card rounded-xl p-lg flex flex-col justify-between">
          <div className="space-y-md">
            <div className="flex items-start gap-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-xl">train</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface leading-snug">
                  Electrified Rail Modal Shift
                </h3>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  LOGISTICS INSIGHT
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-md border-t border-outline-variant/60 text-xs">
              <div>
                <div className="flex items-center gap-1 font-semibold text-error mb-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Current Limitation
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Dataset total freight distance is <span className="font-bold text-error"><AnimatedNumber value={metrics.totalTransportKm} decimals={0} /> km</span>, generating <AnimatedNumber value={metrics.hotspots.transportCO2Tons} decimals={1} /> tCO2e Scope 3 emissions.
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

              <div className="p-3 bg-surface-bright border border-outline-variant/65 rounded-lg shadow-sm">
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
              className="w-full bg-surface-bright border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2.5 rounded-lg text-on-surface flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              View Route Comparison <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="premium-card rounded-xl p-lg flex flex-col justify-between">
          <div className="space-y-md">
            <div className="flex items-start gap-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-xl">all_inclusive</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface leading-snug">
                  Reduce Manufacturing Scrap Loss
                </h3>
                <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  CIRCULARITY INSIGHT
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-md border-t border-outline-variant/60 text-xs">
              <div>
                <div className="flex items-center gap-1 font-semibold text-error mb-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Current Limitation
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Total manufacturing loss is <span className="font-bold text-error"><AnimatedNumber value={metrics.totalMfgLossKg} decimals={0} /> kg</span> ({(metrics.totalMfgLossKg / 1000).toFixed(2)} tonnes) across dataset batches.
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

              <div className="p-3 bg-surface-bright border border-outline-variant/65 rounded-lg shadow-sm">
                <div className="flex items-center gap-1 font-semibold text-primary mb-0.5">
                  <span className="material-symbols-outlined text-sm">trending_up</span> Projected Improvement
                </div>
                <p className="text-on-surface-variant text-[11px]">
                  Boost circularity score to <span className="font-bold text-primary"><AnimatedNumber value={simMetrics.simulatedCircularity} decimals={0} />/100</span> (+<AnimatedNumber value={simMetrics.simulatedCircularity - metrics.avgCircularity} decimals={0} /> points).
                </p>
              </div>
            </div>
          </div>

          <div className="pt-lg">
            <button
              onClick={() => navigate('/circularity')}
              className="w-full bg-surface-bright border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2.5 rounded-lg text-on-surface flex items-center justify-center gap-1 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              View Circularity Flow <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex justify-end pt-4 border-t border-outline-variant/50">
        <button
          onClick={() => navigate('/reports')}
          className="bg-primary text-on-primary font-label-md text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary-fixed-variant transition-all font-bold cursor-pointer shadow active:scale-97"
        >
          Generate Executive Report
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
