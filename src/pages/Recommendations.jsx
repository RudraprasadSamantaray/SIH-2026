import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Recommendations() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      {/* Header */}
      <header className="mb-xl">
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Recommendations</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs max-w-3xl">
          Recommended actions based on LCA, circularity, transportation and simulation results. Implementing these can significantly lower environmental impact.
        </p>
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
                  Increase Recycled Material Usage
                </h3>
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  SIMULATION INSIGHT
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-md border-t border-outline-variant text-xs">
              <div>
                <div className="flex items-center gap-1 font-semibold text-error mb-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Problem
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Current secondary aluminum input is <span className="font-bold text-error">15%</span> lower than simulated optimal threshold for Plant A-12.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 font-semibold text-primary mb-1">
                  <span className="material-symbols-outlined text-sm">build</span> Action
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Increase post-consumer scrap input to <span className="font-bold text-on-surface">45%</span> of total melt mix.
                </p>
              </div>

              <div className="p-sm bg-surface-bright border border-outline-variant rounded">
                <div className="flex items-center gap-1 font-semibold text-primary mb-0.5">
                  <span className="material-symbols-outlined text-sm">trending_down</span> Projected Improvement
                </div>
                <p className="text-on-surface-variant text-[11px]">
                  Lower overall carbon impact by <span className="font-bold text-primary">~12%</span> per ton.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-lg">
            <button className="w-full bg-surface border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2 rounded text-on-surface flex items-center justify-center gap-1 transition-colors cursor-pointer">
              View Basis <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
                  Consider Lower-Impact Transportation
                </h3>
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  LOGISTICS INSIGHT
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-md border-t border-outline-variant text-xs">
              <div>
                <div className="flex items-center gap-1 font-semibold text-error mb-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Problem
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Route Bux-09 via heavy-duty trucking contributes disproportionately high Scope 3 emissions.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 font-semibold text-primary mb-1">
                  <span className="material-symbols-outlined text-sm">alt_route</span> Action
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Shift <span className="font-bold text-on-surface">60%</span> of bauxite transport volume to existing rail network infrastructure.
                </p>
              </div>

              <div className="p-sm bg-surface-bright border border-outline-variant rounded">
                <div className="flex items-center gap-1 font-semibold text-primary mb-0.5">
                  <span className="material-symbols-outlined text-sm">trending_down</span> Projected Improvement
                </div>
                <p className="text-on-surface-variant text-[11px]">
                  Reduced transport impact by <span className="font-bold text-primary">2.4 kt CO2e/yr</span>.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-lg">
            <button className="w-full bg-surface border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2 rounded text-on-surface flex items-center justify-center gap-1 transition-colors cursor-pointer">
              View Basis <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
                  Improve Material Recovery
                </h3>
                <span className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
                  CIRCULARITY INSIGHT
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-md border-t border-outline-variant text-xs">
              <div>
                <div className="flex items-center gap-1 font-semibold text-error mb-1">
                  <span className="material-symbols-outlined text-sm">warning</span> Problem
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Significant material loss detected in dross processing phase at Facility C.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-1 font-semibold text-primary mb-1">
                  <span className="material-symbols-outlined text-sm">handyman</span> Action
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Implement closed-loop dross pressing technology to improve metal yield.
                </p>
              </div>

              <div className="p-sm bg-surface-bright border border-outline-variant rounded">
                <div className="flex items-center gap-1 font-semibold text-primary mb-0.5">
                  <span className="material-symbols-outlined text-sm">trending_up</span> Projected Improvement
                </div>
                <p className="text-on-surface-variant text-[11px]">
                  Higher circularity score (<span className="font-bold text-primary">+8 points</span>) and reduced primary resource draw.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-lg">
            <button className="w-full bg-surface border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2 rounded text-on-surface flex items-center justify-center gap-1 transition-colors cursor-pointer">
              View Basis <span className="material-symbols-outlined text-sm">arrow_forward</span>
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
          Generate Report
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
