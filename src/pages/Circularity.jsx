import React, { useState, useEffect } from 'react';
import { useDataset } from '../context/DataContext';

export default function Circularity() {
  const { metrics, selectedMetal, setSelectedMetal } = useDataset();
  const [scrapRatio, setScrapRatio] = useState(46);

  useEffect(() => {
    if (metrics) {
      setScrapRatio(metrics.avgRecycledPct);
    }
  }, [metrics]);

  if (!metrics) return null;

  // Recalculate MCI dynamically based on scrap ratio slider
  const mciScore = (0.35 + (scrapRatio / 100) * 0.60).toFixed(2);
  const carbonSavings = (((scrapRatio - metrics.avgRecycledPct) * 0.08) * parseFloat(metrics.totalCO2Tons) / 100).toFixed(2);

  return (
    <div className="space-y-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Circularity Analysis</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Material Circularity Indicator (MCI) &amp; closed-loop scrap recovery metrics calculated live from PS 25069 Dataset.
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
      </div>

      {/* Top Circularity Score Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase text-on-surface-variant">MCI Score</span>
            <div className="font-mono-data text-4xl font-bold text-primary mt-1">{mciScore}</div>
            <span className="text-xs text-primary font-medium">Dataset Baseline: {(metrics.avgCircularity / 100).toFixed(2)} ({metrics.avgCircularity}/100)</span>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-primary border-t-primary-container flex items-center justify-center text-primary font-bold font-mono-data text-sm">
            {Math.round(mciScore * 100)}%
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase text-on-surface-variant">Recycled Material Input</span>
            <div className="font-mono-data text-4xl font-bold text-secondary mt-1">{scrapRatio}%</div>
            <span className="text-xs text-on-surface-variant">Virgin Input: {100 - scrapRatio}%</span>
          </div>
          <div className="w-12 h-12 bg-secondary-container/40 text-secondary rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">recycling</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase text-on-surface-variant">Recovery / Waste Diversion</span>
            <div className="font-mono-data text-4xl font-bold text-tertiary mt-1">{metrics.avgRecoveryPct}%</div>
            <span className="text-xs text-tertiary font-medium">Total Loss: {(metrics.totalMfgLossKg / 1000).toFixed(2)}t</span>
          </div>
          <div className="w-12 h-12 bg-tertiary-container/40 text-tertiary rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">autorenew</span>
          </div>
        </div>
      </div>

      {/* Interactive Scrap Intake Adjuster */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Recycled Scrap Input Simulator</h3>
            <p className="text-xs text-on-surface-variant">Adjust secondary recycled material % to project MCI score &amp; carbon offset</p>
          </div>
          <span className="text-xs bg-primary-container text-on-primary font-bold px-3 py-1 rounded">
            Projected CO2 Offset: {parseFloat(carbonSavings) >= 0 ? `-${carbonSavings}` : `+${Math.abs(carbonSavings)}`} tCO2e
          </span>
        </div>

        <div className="py-4 space-y-4">
          <div className="flex justify-between text-xs font-semibold">
            <span>Virgin Primary Material: {100 - scrapRatio}%</span>
            <span className="text-primary">Secondary Recycled Input: {scrapRatio}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            value={scrapRatio}
            onChange={(e) => setScrapRatio(Number(e.target.value))}
            className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[11px] text-on-surface-variant">
            <span>10% Minimum</span>
            <span>{metrics.avgRecycledPct}% Dataset Baseline</span>
            <span>90% Maximum Closed Loop</span>
          </div>
        </div>
      </section>

      {/* Circular Material Flow Diagram */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-md border-b border-outline-variant pb-sm">
          Closed-Loop Material Flow ({metrics.totalQuantityTons} tonnes metal)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-md text-center py-4">
          <div className="bg-surface-bright p-md border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">delete_sweep</span>
            <h4 className="font-bold text-sm text-on-surface">Industrial Scrap Input</h4>
            <p className="text-xs text-on-surface-variant mt-1">{((metrics.totalQuantityKg * metrics.avgRecycledPct / 100) / 1000).toFixed(2)} tonnes recycled input</p>
          </div>

          <div className="bg-surface-bright p-md border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-secondary text-3xl mb-2">filter_alt</span>
            <h4 className="font-bold text-sm text-on-surface">Material Recovery</h4>
            <p className="text-xs text-on-surface-variant mt-1">{metrics.avgRecoveryPct}% recovery rate verified</p>
          </div>

          <div className="bg-surface-bright p-md border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-tertiary text-3xl mb-2">hvac</span>
            <h4 className="font-bold text-sm text-on-surface">Re-melting / Smelting</h4>
            <p className="text-xs text-on-surface-variant mt-1">{metrics.totalEnergyMwh} MWh total energy</p>
          </div>

          <div className="bg-surface-bright p-md border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">inventory_2</span>
            <h4 className="font-bold text-sm text-on-surface">Finished Product Output</h4>
            <p className="text-xs text-on-surface-variant mt-1">{metrics.totalQuantityTons} tonnes finished metal</p>
          </div>
        </div>
      </section>
    </div>
  );
}
