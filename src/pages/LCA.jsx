import React from 'react';

export default function LCA() {
  return (
    <main className="p-lg xl:p-xl max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-lg">
        <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-background">Lifecycle Assessment (LCA)</h2>
        <p className="font-body-md text-sm text-on-surface-variant mt-1">Comprehensive environmental impact analysis across the aluminium value chain.</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Value Chain Visualization (12 columns) */}
        <section className="xl:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <h3 className="font-headline-sm text-lg font-semibold text-on-surface mb-lg border-b border-outline-variant pb-sm">Value Chain Impact Flow</h3>
          
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center relative py-md gap-y-6">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-8 right-8 h-[2px] bg-surface-container-highest -z-0 -translate-y-1/2"></div>

            {/* Mining Node */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-28 md:w-32">
              <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm shadow-sm hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">landscape</span>
              </div>
              <span className="font-label-md text-xs font-semibold text-on-surface">Mining</span>
              <span className="font-mono-data text-xs font-bold text-secondary">27%</span>
            </div>

            {/* Processing Node */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-28 md:w-32">
              <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm shadow-sm hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">factory</span>
              </div>
              <span className="font-label-md text-xs font-semibold text-on-surface">Processing</span>
              <span className="font-mono-data text-xs font-bold text-secondary">7%</span>
            </div>

            {/* Refining Node */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-28 md:w-32">
              <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm shadow-sm hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">science</span>
              </div>
              <span className="font-label-md text-xs font-semibold text-on-surface">Refining</span>
              <span className="font-mono-data text-xs font-bold text-secondary">10%</span>
            </div>

            {/* Metal Production Node (Hotspot) */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-36 md:w-40 relative">
              <div className="absolute -inset-2 bg-red-100/80 rounded-xl opacity-70 animate-pulse z-0"></div>
              <div className="w-14 h-14 rounded-full bg-red-600 border-2 border-red-200 flex items-center justify-center mb-sm z-10 shadow-[0_0_15px_rgba(186,26,26,0.35)]">
                <span className="material-symbols-outlined text-white" data-weight="fill">local_fire_department</span>
              </div>
              <span className="font-label-md text-xs font-bold text-red-700 z-10">Metal Production</span>
              <span className="font-mono-data text-xs text-red-600 font-bold z-10 bg-red-50 px-2 py-0.5 rounded border border-red-200 mt-0.5">42% (Hotspot)</span>
            </div>

            {/* Transportation Node */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-28 md:w-32">
              <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm shadow-sm hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">local_shipping</span>
              </div>
              <span className="font-label-md text-xs font-semibold text-on-surface">Transport</span>
              <span className="font-mono-data text-xs font-bold text-secondary">14%</span>
            </div>

            {/* End of Life Node */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-28 md:w-32">
              <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm shadow-sm hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">recycling</span>
              </div>
              <span className="font-label-md text-xs font-semibold text-on-surface">End of Life</span>
              <span className="font-mono-data text-xs text-gray-500 font-medium">N/A</span>
            </div>
          </div>
        </section>

        {/* Metrics Bento Grid (4 columns) */}
        <div className="xl:col-span-4 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary">co2</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Carbon Impact</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">14.2 <span className="text-xs text-gray-500 font-normal">tCO2e/t</span></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-tertiary">bolt</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Energy Use</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">52.4 <span className="text-xs text-gray-500 font-normal">MWh/t</span></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-secondary">water_drop</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Water Impact</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">3.8 <span className="text-xs text-gray-500 font-normal">m³/t</span></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant">delete</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Waste Generated</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">1.2 <span className="text-xs text-gray-500 font-normal">t/t</span></div>
            </div>
          </div>
        </div>

        {/* Lifecycle Impact Chart Area (8 columns) */}
        <section className="xl:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
            <h3 className="font-headline-sm text-lg font-semibold text-on-surface">Lifecycle Impact Distribution</h3>
            <div className="flex gap-sm">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low text-on-surface-variant text-xs rounded border border-outline-variant font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Carbon
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low text-on-surface-variant text-xs rounded border border-outline-variant font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Energy
              </span>
            </div>
          </div>

          {/* Stacked Bar Visual Chart matching screenshot */}
          <div className="relative bg-surface-bright rounded-lg border border-outline-variant min-h-[300px] p-4 flex flex-col justify-between overflow-hidden">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-20 pointer-events-none">
              <div className="w-full h-px bg-outline"></div>
              <div className="w-full h-px bg-outline"></div>
              <div className="w-full h-px bg-outline"></div>
              <div className="w-full h-px bg-outline"></div>
            </div>

            {/* Bar columns */}
            <div className="w-full h-56 flex items-end justify-around z-10 pt-4">
              {/* Mining */}
              <div className="w-16 flex flex-col justify-end gap-1 group cursor-pointer text-center">
                <div title="Energy: 35%" className="w-full bg-tertiary opacity-85 h-[35%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <div title="Carbon: 27%" className="w-full bg-primary opacity-85 h-[27%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[11px] font-semibold text-gray-600 mt-2">Mining</span>
              </div>

              {/* Processing */}
              <div className="w-16 flex flex-col justify-end gap-1 group cursor-pointer text-center">
                <div title="Energy: 15%" className="w-full bg-tertiary opacity-85 h-[15%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <div title="Carbon: 7%" className="w-full bg-primary opacity-85 h-[7%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[11px] font-semibold text-gray-600 mt-2">Processing</span>
              </div>

              {/* Refining */}
              <div className="w-16 flex flex-col justify-end gap-1 group cursor-pointer text-center">
                <div title="Energy: 20%" className="w-full bg-tertiary opacity-85 h-[20%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <div title="Carbon: 10%" className="w-full bg-primary opacity-85 h-[10%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[11px] font-semibold text-gray-600 mt-2">Refining</span>
              </div>

              {/* Metal Production (Hotspot) */}
              <div className="w-16 flex flex-col justify-end gap-1 group cursor-pointer text-center relative">
                <div className="absolute -inset-x-2 -top-3 bottom-6 bg-red-100/40 border border-red-300 rounded-t-lg pointer-events-none"></div>
                <div title="Energy: 70%" className="w-full bg-tertiary opacity-85 h-[70%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <div title="Carbon: 42%" className="w-full bg-primary opacity-85 h-[42%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[11px] font-bold text-red-600 mt-2">Metal Prod.</span>
              </div>

              {/* Transport */}
              <div className="w-16 flex flex-col justify-end gap-1 group cursor-pointer text-center">
                <div title="Energy: 25%" className="w-full bg-tertiary opacity-85 h-[25%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <div title="Carbon: 14%" className="w-full bg-primary opacity-85 h-[14%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[11px] font-semibold text-gray-600 mt-2">Transport</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
