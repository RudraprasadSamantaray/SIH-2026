import React, { useState } from 'react';

export default function ScenarioReview() {
  const [status, setStatus] = useState('Accepted'); // 'Accepted' | 'Flagged'

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Scenario Review
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Audit review of decarbonization simulation projections produced by the Engineer.
        </p>
      </header>

      {/* Review Actions Banner */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase text-tertiary">Simulation Variance Audit</span>
          <h3 className="font-headline-sm text-lg font-bold text-on-surface mt-0.5">
            Scenario Result Audit Status: <span className={status === 'Accepted' ? 'text-primary font-bold' : 'text-error font-bold'}>{status}</span>
          </h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Simulated Score Improvement: <span className="font-mono-data font-bold text-primary">67/100 → 81/100 (+14 Points)</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setStatus('Accepted')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
              status === 'Accepted' ? 'bg-primary text-on-primary' : 'bg-surface-bright border border-outline-variant text-on-surface'
            }`}
          >
            ✓ Accept Result
          </button>
          <button
            onClick={() => setStatus('Flagged')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
              status === 'Flagged' ? 'bg-error text-on-error' : 'bg-surface-bright border border-outline-variant text-error'
            }`}
          >
            ⚠ Flag Result
          </button>
        </div>
      </div>

      {/* Simulation Variances Table */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-md bg-surface-bright border-b border-outline-variant">
          <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Verified Simulation Metrics</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface font-label-md uppercase text-on-surface-variant border-b border-outline-variant">
                <th className="py-sm px-md font-semibold">Metric</th>
                <th className="py-sm px-md font-semibold">Current</th>
                <th className="py-sm px-md font-semibold text-primary">Simulated</th>
                <th className="py-sm px-md font-semibold text-right">Variance</th>
                <th className="py-sm px-md font-semibold text-center">Audit Check</th>
              </tr>
            </thead>
            <tbody className="font-mono-data text-on-surface">
              <tr className="border-b border-outline-variant">
                <td className="py-sm px-md font-body-sm font-semibold">Carbon Impact (kg CO2e)</td>
                <td className="py-sm px-md">4,250</td>
                <td className="py-sm px-md text-primary font-bold">3,120</td>
                <td className="py-sm px-md text-right text-primary font-bold">-26.5%</td>
                <td className="py-sm px-md text-center">
                  <span className="bg-primary-container/20 text-primary font-bold px-2 py-0.5 rounded text-[10px]">✓ Validated</span>
                </td>
              </tr>

              <tr className="border-b border-outline-variant">
                <td className="py-sm px-md font-body-sm font-semibold">Energy Consumption (MWh)</td>
                <td className="py-sm px-md">1,120</td>
                <td className="py-sm px-md text-primary font-bold">980</td>
                <td className="py-sm px-md text-right text-primary font-bold">-12.5%</td>
                <td className="py-sm px-md text-center">
                  <span className="bg-primary-container/20 text-primary font-bold px-2 py-0.5 rounded text-[10px]">✓ Validated</span>
                </td>
              </tr>

              <tr className="border-b border-outline-variant">
                <td className="py-sm px-md font-body-sm font-semibold">Circularity Index</td>
                <td className="py-sm px-md">42.5</td>
                <td className="py-sm px-md text-primary font-bold">58.2</td>
                <td className="py-sm px-md text-right text-primary font-bold">+36.9%</td>
                <td className="py-sm px-md text-center">
                  <span className="bg-primary-container/20 text-primary font-bold px-2 py-0.5 rounded text-[10px]">✓ Validated</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
