import React, { useState } from 'react';

export default function Circularity() {
  const [scrapRatio, setScrapRatio] = useState(34);

  // Recalculate MCI dynamically based on scrap ratio slider
  const mciScore = (0.50 + (scrapRatio / 100) * 0.70).toFixed(2);
  const carbonSavings = ((scrapRatio - 15) * 0.12).toFixed(1);

  return (
    <div className="space-y-lg">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Circularity Analysis</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
          Material Circularity Indicator (MCI) &amp; closed-loop scrap recovery metrics for Plant A-12.
        </p>
      </div>

      {/* Top Circularity Score Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase text-on-surface-variant">MCI Score</span>
            <div className="font-mono-data text-4xl font-bold text-primary mt-1">{mciScore}</div>
            <span className="text-xs text-primary font-medium">Target: 0.85 (High Circularity)</span>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-primary border-t-primary-container flex items-center justify-center text-primary font-bold font-mono-data text-sm">
            {Math.round(mciScore * 100)}%
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase text-on-surface-variant">Secondary Scrap Ratio</span>
            <div className="font-mono-data text-4xl font-bold text-secondary mt-1">{scrapRatio}%</div>
            <span className="text-xs text-on-surface-variant">Industry Average: 28%</span>
          </div>
          <div className="w-12 h-12 bg-secondary-container/40 text-secondary rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">recycling</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs font-semibold uppercase text-on-surface-variant">Waste Diversion Rate</span>
            <div className="font-mono-data text-4xl font-bold text-tertiary mt-1">92%</div>
            <span className="text-xs text-tertiary font-medium">Zero Waste to Landfill</span>
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
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Secondary Aluminium Scrap Simulator</h3>
            <p className="text-xs text-on-surface-variant">Adjust secondary scrap input to observe MCI score &amp; carbon offset</p>
          </div>
          <span className="text-xs bg-primary-container text-on-primary font-bold px-3 py-1 rounded">
            Simulated Carbon Offset: -{carbonSavings} tCO2e/t
          </span>
        </div>

        <div className="py-4 space-y-4">
          <div className="flex justify-between text-xs font-semibold">
            <span>Primary Bauxite Ingot Intake: {100 - scrapRatio}%</span>
            <span className="text-primary">Secondary Recycled Scrap Intake: {scrapRatio}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            value={scrapRatio}
            onChange={(e) => setScrapRatio(Number(e.target.value))}
            className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[11px] text-on-surface-variant">
            <span>10% Minimum</span>
            <span>34% Current Baseline</span>
            <span>80% Closed Loop Maximum</span>
          </div>
        </div>
      </section>

      {/* Circular Material Flow Diagram */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-md border-b border-outline-variant pb-sm">
          Closed-Loop Material Flow
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-md text-center py-4">
          <div className="bg-surface-bright p-md border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">delete_sweep</span>
            <h4 className="font-bold text-sm text-on-surface">Industrial Scrap Collection</h4>
            <p className="text-xs text-on-surface-variant mt-1">12,400 tonnes processed / quarter</p>
          </div>

          <div className="bg-surface-bright p-md border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-secondary text-3xl mb-2">filter_alt</span>
            <h4 className="font-bold text-sm text-on-surface">Sorting &amp; De-coating</h4>
            <p className="text-xs text-on-surface-variant mt-1">Spectrometry purity check (99.4%)</p>
          </div>

          <div className="bg-surface-bright p-md border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-tertiary text-3xl mb-2">hvac</span>
            <h4 className="font-bold text-sm text-on-surface">Re-melting Smelter</h4>
            <p className="text-xs text-on-surface-variant mt-1">Requires 95% less energy than primary</p>
          </div>

          <div className="bg-surface-bright p-md border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">inventory_2</span>
            <h4 className="font-bold text-sm text-on-surface">Secondary Ingot Output</h4>
            <p className="text-xs text-on-surface-variant mt-1">Ready for manufacturing fabrication</p>
          </div>
        </div>
      </section>
    </div>
  );
}
