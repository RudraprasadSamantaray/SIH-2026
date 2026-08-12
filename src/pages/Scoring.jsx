import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Scoring() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      {/* Header */}
      <header className="mb-xl border-b border-outline-variant pb-md">
        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Scoring Board</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
          Compare the current and simulated scenarios.
        </p>
      </header>

      {/* Main Scoring Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Score Card (Spans 5 columns) */}
        <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-lg p-xl flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-primary-container"></div>
          
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs font-semibold">
            CURRENT SCORE
          </span>
          <div className="font-mono-data text-5xl font-bold text-on-surface mb-md">
            67<span className="text-2xl text-on-surface-variant font-normal">/100</span>
          </div>

          <span className="material-symbols-outlined text-on-surface-variant text-2xl my-2">arrow_downward</span>

          <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider mb-xs">
            SIMULATED SCORE
          </span>
          <div className="font-mono-data text-6xl font-bold text-primary mb-lg">
            81<span className="text-2xl text-primary/70 font-normal">/100</span>
          </div>

          <div className="bg-primary-container text-on-primary font-label-md text-xs font-bold py-2 px-6 rounded-full flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            +14 POINT IMPROVEMENT
          </div>
        </div>

        {/* Right Details Section (Spans 7 columns) */}
        <div className="lg:col-span-7 space-y-gutter">
          {/* Notice Box */}
          <div className="p-md bg-surface-bright border-l-4 border-primary border border-outline-variant rounded-lg flex items-start gap-md shadow-sm">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
            <p className="text-body-md text-sm text-on-surface leading-relaxed">
              Simulated scenario performs better across the selected environmental and circularity indicators.
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
                      <span className="material-symbols-outlined text-xs text-primary">co2</span> Carbon Emission
                    </td>
                    <td className="py-sm px-md">1,250 kg</td>
                    <td className="py-sm px-md text-primary font-bold">980 kg</td>
                    <td className="py-sm px-md text-right text-primary font-bold">-21.6%</td>
                  </tr>

                  <tr className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                    <td className="py-sm px-md font-body-sm text-body-sm font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-tertiary">bolt</span> Energy Usage
                    </td>
                    <td className="py-sm px-md">4.5 MWh</td>
                    <td className="py-sm px-md text-primary font-bold">3.9 MWh</td>
                    <td className="py-sm px-md text-right text-primary font-bold">-13.3%</td>
                  </tr>

                  <tr className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                    <td className="py-sm px-md font-body-sm text-body-sm font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-secondary">sync</span> Circularity
                    </td>
                    <td className="py-sm px-md">45%</td>
                    <td className="py-sm px-md text-primary font-bold">62%</td>
                    <td className="py-sm px-md text-right text-primary font-bold">+17%</td>
                  </tr>

                  <tr className="hover:bg-surface/50 transition-colors">
                    <td className="py-sm px-md font-body-sm text-body-sm font-semibold flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-primary">water_drop</span> Recovery
                    </td>
                    <td className="py-sm px-md">78%</td>
                    <td className="py-sm px-md text-primary font-bold">85%</td>
                    <td className="py-sm px-md text-right text-primary font-bold">+7%</td>
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
