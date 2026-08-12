import React, { useState } from 'react';

export default function LCAAnalysis() {
  const [activeStage, setActiveStage] = useState('Metal Production');

  const stageDetails = {
    Mining: { percent: '27%', carbon: '3.8 tCO2e/t', energy: '14.1 MWh/t', desc: 'Bauxite extraction and land disturbance activity.' },
    Processing: { percent: '7%', carbon: '1.0 tCO2e/t', energy: '3.6 MWh/t', desc: 'Crushing, grinding, and chemical beneficiation.' },
    Refining: { percent: '10%', carbon: '1.4 tCO2e/t', energy: '5.2 MWh/t', desc: 'Bayer process alumina refining & calcination.' },
    'Metal Production': { percent: '42%', carbon: '6.0 tCO2e/t', energy: '22.0 MWh/t', desc: 'Hall-Héroult electrolysis smelting (Major Hotspot).' },
    Transport: { percent: '14%', carbon: '2.0 tCO2e/t', energy: '7.5 MWh/t', desc: 'Raw material & finished ingot freight logistics.' },
    'End of Life': { percent: 'N/A', carbon: '0.0 tCO2e/t', energy: '0.0 MWh/t', desc: 'Closed loop scrap recovery & recycling potential.' },
  };

  return (
    <div className="min-h-screen space-y-lg">
      {/* Header Section */}
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-background">Lifecycle Assessment (LCA)</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
          Comprehensive environmental impact analysis across the aluminium value chain.
        </p>
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
          {/* Mining Node */}
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

          {/* Processing Node */}
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

          {/* Refining Node */}
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

          {/* Metal Production Node (Hotspot) */}
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

          {/* Transportation Node */}
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

          {/* End of Life Node */}
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
            <span className="font-mono-data text-xs text-secondary font-bold">N/A</span>
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
              <span className="text-on-surface-variant block">Carbon Share:</span>
              <span className="font-bold text-primary">{stageDetails[activeStage].carbon}</span>
            </div>
            <div className="bg-surface-container-lowest px-3 py-2 rounded border border-outline-variant">
              <span className="text-on-surface-variant block">Energy Share:</span>
              <span className="font-bold text-tertiary">{stageDetails[activeStage].energy}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid with Metrics Bento + Distribution Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Metrics Bento Grid (Spans 4 columns) */}
        <div className="xl:col-span-4 flex flex-col gap-md">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex items-center gap-md">
            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">co2</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Carbon Impact</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">14.2 tCO2e/t</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex items-center gap-md">
            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">bolt</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Energy Use</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">52.4 MWh/t</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex items-center gap-md">
            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">water_drop</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Water Impact</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">3.8 m³/t</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-md flex items-center gap-md">
            <div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider">Waste Generated</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">1.2 t/t</div>
            </div>
          </div>
        </div>

        {/* Lifecycle Impact Distribution Chart Area (Spans 8 columns) */}
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

            {/* Custom Bar Visualization */}
            <div className="h-48 flex items-end justify-between gap-4 pt-6 pb-2 border-b border-outline-variant px-4">
              {/* Mining */}
              <div className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end gap-1 h-36">
                  <div className="w-1/2 bg-primary h-[27%] rounded-t transition-all group-hover:brightness-110"></div>
                  <div className="w-1/2 bg-tertiary h-[20%] rounded-t transition-all group-hover:brightness-110"></div>
                </div>
                <span className="text-xs text-on-surface-variant">Mining</span>
              </div>

              {/* Processing */}
              <div className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end gap-1 h-36">
                  <div className="w-1/2 bg-primary h-[7%] rounded-t transition-all group-hover:brightness-110"></div>
                  <div className="w-1/2 bg-tertiary h-[10%] rounded-t transition-all group-hover:brightness-110"></div>
                </div>
                <span className="text-xs text-on-surface-variant">Processing</span>
              </div>

              {/* Refining */}
              <div className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end gap-1 h-36">
                  <div className="w-1/2 bg-primary h-[10%] rounded-t transition-all group-hover:brightness-110"></div>
                  <div className="w-1/2 bg-tertiary h-[15%] rounded-t transition-all group-hover:brightness-110"></div>
                </div>
                <span className="text-xs text-on-surface-variant">Refining</span>
              </div>

              {/* Metal Production (Hotspot) */}
              <div className="flex-1 flex flex-col items-center gap-2 group relative">
                <div className="w-full flex items-end gap-1 h-36">
                  <div className="w-1/2 bg-error h-[42%] rounded-t transition-all group-hover:brightness-110"></div>
                  <div className="w-1/2 bg-tertiary h-[70%] rounded-t transition-all group-hover:brightness-110"></div>
                </div>
                <span className="text-xs text-error font-bold">Smelting</span>
              </div>

              {/* Transport */}
              <div className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full flex items-end gap-1 h-36">
                  <div className="w-1/2 bg-primary h-[14%] rounded-t transition-all group-hover:brightness-110"></div>
                  <div className="w-1/2 bg-tertiary h-[25%] rounded-t transition-all group-hover:brightness-110"></div>
                </div>
                <span className="text-xs text-on-surface-variant">Transport</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center text-xs text-on-surface-variant">
            <span>Primary driver: Grid electricity intensity during electrolysis phase.</span>
            <button className="text-primary hover:underline font-semibold flex items-center gap-1">
              Export EPD Report <span className="material-symbols-outlined text-sm">download</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
