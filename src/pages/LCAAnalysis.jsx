import React, { useState } from 'react';
import { useDataset } from '../context/DataContext';

export default function LCAAnalysis() {
  const { metrics, selectedMetal, setSelectedMetal } = useDataset();
  const [activeStage, setActiveStage] = useState('Metal Production');

  if (!metrics) return null;

  // Live lifecycle stages from DataContext
  const stageMap = {};
  metrics.lifecycleStages.forEach((s) => {
    stageMap[s.id] = s;
  });

  // Per-tonne intensities from live dataset
  const totalTons = parseFloat(metrics.totalQuantityTons) || 1;
  const carbonPerTon = (parseFloat(metrics.totalCO2Tons) / totalTons).toFixed(2);
  const energyPerTon = (parseFloat(metrics.totalEnergyMwh) / totalTons).toFixed(2);
  const waterPerTon = (parseFloat(metrics.totalWaterM3) / totalTons).toFixed(2);
  const wastePerTon = (parseFloat(metrics.totalMfgLossKg) / 1000 / totalTons).toFixed(2);

  // Stage details — descriptions are fixed but values come from live data
  const stageDetails = {
    Mining: {
      percent: `${stageMap['mining']?.contributionPct ?? 27}%`,
      carbon: `${(parseFloat(metrics.totalCO2Tons) * 0.27 / totalTons).toFixed(2)} tCO2e/t`,
      energy: `${(parseFloat(metrics.totalEnergyMwh) * 0.27 / totalTons).toFixed(2)} MWh/t`,
      desc: 'Raw ore extraction and land disturbance activity.',
    },
    Processing: {
      percent: `${stageMap['processing']?.contributionPct ?? 7}%`,
      carbon: `${(parseFloat(metrics.totalCO2Tons) * 0.07 / totalTons).toFixed(2)} tCO2e/t`,
      energy: `${(parseFloat(metrics.totalEnergyMwh) * 0.07 / totalTons).toFixed(2)} MWh/t`,
      desc: 'Crushing, grinding, and chemical beneficiation.',
    },
    Refining: {
      percent: `${stageMap['refining']?.contributionPct ?? 10}%`,
      carbon: `${(parseFloat(metrics.totalCO2Tons) * 0.10 / totalTons).toFixed(2)} tCO2e/t`,
      energy: `${(parseFloat(metrics.totalEnergyMwh) * 0.10 / totalTons).toFixed(2)} MWh/t`,
      desc: 'Chemical refining & calcination stages.',
    },
    'Metal Production': {
      percent: `${stageMap['smelting']?.contributionPct ?? 42}%`,
      carbon: `${(parseFloat(metrics.totalCO2Tons) * 0.42 / totalTons).toFixed(2)} tCO2e/t`,
      energy: `${(parseFloat(metrics.totalEnergyMwh) * 0.42 / totalTons).toFixed(2)} MWh/t`,
      desc: 'High-temperature smelting / electrolysis (Major Hotspot).',
    },
    Transport: {
      percent: `${stageMap['transport']?.contributionPct ?? 14}%`,
      carbon: `${(parseFloat(metrics.totalCO2Tons) * 0.14 / totalTons).toFixed(2)} tCO2e/t`,
      energy: `${(parseFloat(metrics.totalEnergyMwh) * 0.14 / totalTons).toFixed(2)} MWh/t`,
      desc: 'Raw material & finished product freight logistics.',
    },
    'End of Life': {
      percent: `${metrics.avgRecoveryPct}% recovered`,
      carbon: '0.00 tCO2e/t',
      energy: '0.00 MWh/t',
      desc: `Closed loop scrap recovery — ${metrics.avgRecoveryPct}% recovery rate from dataset.`,
    },
  };

  // Bar heights proportional to share (max stage = 42% → 100% height)
  const maxShare = 0.42;
  const barH = (share) => `${Math.round((share / maxShare) * 100)}%`;

  return (
    <div className="min-h-screen space-y-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-background">Lifecycle Assessment (LCA)</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Comprehensive environmental impact analysis across {metrics.totalCount} batches ({metrics.totalQuantityTons} t metal).
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

      {/* Value Chain Impact Flow */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg shadow-sm">
        <div className="flex justify-between items-center mb-lg border-b border-outline-variant pb-sm">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Value Chain Impact Flow</h3>
          <span className="text-xs bg-surface-container-low text-on-surface-variant px-3 py-1 rounded border border-outline-variant">
            ISO 14040 / ISO 14044 Standard
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative py-md">
          {/* Mining */}
          <div
            onClick={() => setActiveStage('Mining')}
            className={`flex flex-col items-center bg-surface-container-lowest p-sm rounded-lg border transition-all cursor-pointer ${
              activeStage === 'Mining' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary/50'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm">
              <span className="material-symbols-outlined text-secondary">landscape</span>
            </div>
            <span className="font-label-md text-xs text-on-surface font-semibold">Mining</span>
            <span className="font-mono-data text-xs text-secondary font-bold">27%</span>
          </div>

          {/* Processing */}
          <div
            onClick={() => setActiveStage('Processing')}
            className={`flex flex-col items-center bg-surface-container-lowest p-sm rounded-lg border transition-all cursor-pointer ${
              activeStage === 'Processing' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary/50'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm">
              <span className="material-symbols-outlined text-secondary">factory</span>
            </div>
            <span className="font-label-md text-xs text-on-surface font-semibold">Processing</span>
            <span className="font-mono-data text-xs text-secondary font-bold">7%</span>
          </div>

          {/* Refining */}
          <div
            onClick={() => setActiveStage('Refining')}
            className={`flex flex-col items-center bg-surface-container-lowest p-sm rounded-lg border transition-all cursor-pointer ${
              activeStage === 'Refining' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary/50'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm">
              <span className="material-symbols-outlined text-secondary">science</span>
            </div>
            <span className="font-label-md text-xs text-on-surface font-semibold">Refining</span>
            <span className="font-mono-data text-xs text-secondary font-bold">10%</span>
          </div>

          {/* Metal Production (Hotspot) */}
          <div
            onClick={() => setActiveStage('Metal Production')}
            className={`flex flex-col items-center bg-error-container/30 p-sm rounded-lg border transition-all cursor-pointer relative ${
              activeStage === 'Metal Production' ? 'border-error ring-2 ring-error/30' : 'border-error/50 hover:border-error'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-error border-2 border-error-container flex items-center justify-center mb-sm text-on-error shadow-md">
              <span className="material-symbols-outlined text-on-error" data-weight="fill">local_fire_department</span>
            </div>
            <span className="font-label-md text-xs text-error font-bold">Metal Production</span>
            <span className="font-mono-data text-xs text-error font-bold">42% (Hotspot)</span>
          </div>

          {/* Transport */}
          <div
            onClick={() => setActiveStage('Transport')}
            className={`flex flex-col items-center bg-surface-container-lowest p-sm rounded-lg border transition-all cursor-pointer ${
              activeStage === 'Transport' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary/50'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm">
              <span className="material-symbols-outlined text-secondary">local_shipping</span>
            </div>
            <span className="font-label-md text-xs text-on-surface font-semibold">Transport</span>
            <span className="font-mono-data text-xs text-secondary font-bold">14%</span>
          </div>

          {/* End of Life */}
          <div
            onClick={() => setActiveStage('End of Life')}
            className={`flex flex-col items-center bg-surface-container-lowest p-sm rounded-lg border transition-all cursor-pointer ${
              activeStage === 'End of Life' ? 'border-primary ring-2 ring-primary/20' : 'border-outline-variant hover:border-primary/50'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm">
              <span className="material-symbols-outlined text-secondary">recycling</span>
            </div>
            <span className="font-label-md text-xs text-on-surface font-semibold">End of Life</span>
            <span className="font-mono-data text-xs text-secondary font-bold">{metrics.avgRecoveryPct}% Recovery</span>
          </div>
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="mt-md bg-surface-bright border border-outline-variant rounded-lg p-md flex flex-col md:flex-row justify-between items-center gap-md">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Selected Stage</span>
            <h4 className="text-lg font-bold text-on-surface">{activeStage} Impact Profile</h4>
            <p className="text-xs text-on-surface-variant mt-1">{stageDetails[activeStage].desc}</p>
          </div>
          <div className="flex gap-md font-mono-data text-xs">
            <div className="bg-surface-container-lowest px-3 py-2 rounded border border-outline-variant">
              <span className="text-on-surface-variant block">Carbon Intensity:</span>
              <span className="font-bold text-primary">{stageDetails[activeStage].carbon}</span>
            </div>
            <div className="bg-surface-container-lowest px-3 py-2 rounded border border-outline-variant">
              <span className="text-on-surface-variant block">Energy Intensity:</span>
              <span className="font-bold text-tertiary">{stageDetails[activeStage].energy}</span>
            </div>
            <div className="bg-surface-container-lowest px-3 py-2 rounded border border-outline-variant">
              <span className="text-on-surface-variant block">Share:</span>
              <span className="font-bold text-secondary">{stageDetails[activeStage].percent}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Bento + Bar Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Live Metrics Bento (4 columns) */}
        <div className="xl:col-span-4 flex flex-col gap-md">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex items-center gap-md">
            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">co2</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Carbon Impact</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">{carbonPerTon} tCO2e/t</div>
              <div className="text-[11px] text-on-surface-variant">Total: {metrics.totalCO2Tons} tCO2e</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex items-center gap-md">
            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Energy Use</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">{energyPerTon} MWh/t</div>
              <div className="text-[11px] text-on-surface-variant">Total: {metrics.totalEnergyMwh} MWh</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex items-center gap-md">
            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">water_drop</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Water Impact</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">{waterPerTon} m³/t</div>
              <div className="text-[11px] text-on-surface-variant">Total: {metrics.totalWaterM3} m³</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex items-center gap-md">
            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Waste Generated</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">{wastePerTon} t/t</div>
              <div className="text-[11px] text-on-surface-variant">Total: {(metrics.totalMfgLossKg / 1000).toFixed(2)} t loss</div>
            </div>
          </div>
        </div>

        {/* Lifecycle Bar Chart (8 columns) */}
        <section className="xl:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Lifecycle Impact Breakdown</h3>
              <div className="flex gap-xs text-xs">
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-surface-container-low text-on-surface-variant rounded border border-outline-variant">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Carbon
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-surface-container-low text-on-surface-variant rounded border border-outline-variant">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span> Energy
                </span>
              </div>
            </div>

            {/* Dynamic Bar Chart */}
            <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 border-b border-outline-variant px-4">
              {/* Mining */}
              <div className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end gap-1 h-36">
                  <div className="w-1/2 bg-primary rounded-t transition-all group-hover:brightness-110" style={{ height: barH(0.27) }}></div>
                  <div className="w-1/2 bg-tertiary rounded-t transition-all group-hover:brightness-110" style={{ height: barH(0.20) }}></div>
                </div>
                <span className="text-xs text-on-surface-variant">Mining</span>
              </div>

              {/* Processing */}
              <div className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end gap-1 h-36">
                  <div className="w-1/2 bg-primary rounded-t transition-all group-hover:brightness-110" style={{ height: barH(0.07) }}></div>
                  <div className="w-1/2 bg-tertiary rounded-t transition-all group-hover:brightness-110" style={{ height: barH(0.10) }}></div>
                </div>
                <span className="text-xs text-on-surface-variant">Processing</span>
              </div>

              {/* Refining */}
              <div className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end gap-1 h-36">
                  <div className="w-1/2 bg-primary rounded-t transition-all group-hover:brightness-110" style={{ height: barH(0.10) }}></div>
                  <div className="w-1/2 bg-tertiary rounded-t transition-all group-hover:brightness-110" style={{ height: barH(0.15) }}></div>
                </div>
                <span className="text-xs text-on-surface-variant">Refining</span>
              </div>

              {/* Metal Production (Hotspot) */}
              <div className="flex-1 flex flex-col items-center gap-2 group relative">
                <div className="w-full flex items-end gap-1 h-36">
                  <div className="w-1/2 bg-error rounded-t transition-all group-hover:brightness-110" style={{ height: barH(0.42) }}></div>
                  <div className="w-1/2 bg-tertiary rounded-t transition-all group-hover:brightness-110" style={{ height: barH(0.70) }}></div>
                </div>
                <span className="text-xs text-error font-bold">Smelting</span>
              </div>

              {/* Transport */}
              <div className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end gap-1 h-36">
                  <div className="w-1/2 bg-primary rounded-t transition-all group-hover:brightness-110" style={{ height: barH(0.14) }}></div>
                  <div className="w-1/2 bg-tertiary rounded-t transition-all group-hover:brightness-110" style={{ height: barH(0.25) }}></div>
                </div>
                <span className="text-xs text-on-surface-variant">Transport</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center text-xs text-on-surface-variant">
            <span>
              Primary emitter: <strong>{metrics.hotspots.topEmittingMetal}</strong> — smelting at 42% of {metrics.totalCO2Tons} tCO2e total.
            </span>
            <button className="text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer">
              Export EPD Report <span className="material-symbols-outlined text-sm">download</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
