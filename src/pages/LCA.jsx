import React from 'react';
import { useDataset } from '../context/DataContext';

export default function LCA() {
  const { metrics, selectedMetal, setSelectedMetal } = useDataset();

  if (!metrics) return null;

  return (
    <main className="p-lg xl:p-xl max-w-7xl mx-auto space-y-gutter">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-background">Lifecycle Assessment (LCA)</h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            ISO 14040/44 environmental impact analysis calculated live from PS 25069 Dataset ({metrics.totalCount} batches).
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
              <span className="font-label-md text-xs font-semibold text-on-surface">Raw Extraction</span>
              <span className="font-mono-data text-xs font-bold text-secondary">27% ({metrics.hotspots.miningCO2Tons}t)</span>
            </div>

            {/* Processing Node */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-28 md:w-32">
              <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm shadow-sm hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">factory</span>
              </div>
              <span className="font-label-md text-xs font-semibold text-on-surface">Beneficiation</span>
              <span className="font-mono-data text-xs font-bold text-secondary">7% ({metrics.hotspots.processingCO2Tons}t)</span>
            </div>

            {/* Refining Node */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-28 md:w-32">
              <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm shadow-sm hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">science</span>
              </div>
              <span className="font-label-md text-xs font-semibold text-on-surface">Refining</span>
              <span className="font-mono-data text-xs font-bold text-secondary">10% ({metrics.hotspots.refiningCO2Tons}t)</span>
            </div>

            {/* Metal Production Node (Hotspot) */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-36 md:w-40 relative">
              <div className="absolute -inset-2 bg-red-100/80 rounded-xl opacity-70 animate-pulse z-0"></div>
              <div className="w-14 h-14 rounded-full bg-red-600 border-2 border-red-200 flex items-center justify-center mb-sm z-10 shadow-[0_0_15px_rgba(186,26,26,0.35)]">
                <span className="material-symbols-outlined text-white" data-weight="fill">local_fire_department</span>
              </div>
              <span className="font-label-md text-xs font-bold text-red-700 z-10">Metal Smelting</span>
              <span className="font-mono-data text-xs text-red-600 font-bold z-10 bg-red-50 px-2 py-0.5 rounded border border-red-200 mt-0.5">42% ({metrics.hotspots.smeltingCO2Tons}t Hotspot)</span>
            </div>

            {/* Transportation Node */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-28 md:w-32">
              <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm shadow-sm hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">local_shipping</span>
              </div>
              <span className="font-label-md text-xs font-semibold text-on-surface">Logistics</span>
              <span className="font-mono-data text-xs font-bold text-secondary">14% ({metrics.hotspots.transportCO2Tons}t)</span>
            </div>

            {/* End of Life Node */}
            <div className="flex flex-col items-center bg-surface-container-lowest p-sm z-10 w-28 md:w-32">
              <div className="w-12 h-12 rounded-full bg-surface-bright border border-outline-variant flex items-center justify-center mb-sm shadow-sm hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-secondary">recycling</span>
              </div>
              <span className="font-label-md text-xs font-semibold text-on-surface">Recovery / Recycled</span>
              <span className="font-mono-data text-xs text-primary font-bold">{metrics.avgRecycledPct}% Recycled</span>
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
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Carbon Emissions</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">{metrics.totalCO2Tons} <span className="text-xs text-gray-500 font-normal">tCO2e</span></div>
              <span className="text-[11px] text-primary font-semibold">{metrics.carbonIntensityPerKg} kg CO2e / kg metal</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-tertiary">bolt</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Total Energy Consumption</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">{metrics.totalEnergyMwh} <span className="text-xs text-gray-500 font-normal">MWh</span></div>
              <span className="text-[11px] text-tertiary font-semibold">{metrics.energyIntensityPerKg} kWh / kg metal</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-secondary">water_drop</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Water Impact</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">{metrics.totalWaterM3} <span className="text-xs text-gray-500 font-normal">m³</span></div>
              <span className="text-[11px] text-secondary font-semibold">{(metrics.totalWaterL / metrics.totalQuantityKg).toFixed(1)} L / kg metal</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-on-surface-variant">delete</span>
            </div>
            <div>
              <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Manufacturing Waste / Loss</h4>
              <div className="font-mono-data text-xl font-bold text-on-background">{(metrics.totalMfgLossKg / 1000).toFixed(2)} <span className="text-xs text-gray-500 font-normal">tonnes</span></div>
              <span className="text-[11px] text-on-surface-variant font-semibold">Recovery Rate: {metrics.avgRecoveryPct}%</span>
            </div>
          </div>
        </div>

        {/* Lifecycle Impact Distribution Chart Area (8 columns) */}
        <section className="xl:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
            <h3 className="font-headline-sm text-lg font-semibold text-on-surface">Lifecycle Stage Emissions Breakdown</h3>
            <div className="flex gap-sm">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low text-on-surface-variant text-xs rounded border border-outline-variant font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span> Carbon (tCO2e)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-low text-on-surface-variant text-xs rounded border border-outline-variant font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Energy (MWh)
              </span>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="relative bg-surface-bright rounded-lg border border-outline-variant min-h-[300px] p-4 flex flex-col justify-between overflow-hidden">
            <div className="w-full h-56 flex items-end justify-around z-10 pt-4">
              <div className="w-16 flex flex-col justify-end gap-1 group cursor-pointer text-center">
                <span className="text-[10px] font-bold text-primary">{metrics.hotspots.miningCO2Tons}t</span>
                <div title={`Carbon: ${metrics.hotspots.miningCO2Tons} t`} className="w-full bg-primary opacity-85 h-[27%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[11px] font-semibold text-gray-600 mt-2">Mining</span>
              </div>

              <div className="w-16 flex flex-col justify-end gap-1 group cursor-pointer text-center">
                <span className="text-[10px] font-bold text-primary">{metrics.hotspots.processingCO2Tons}t</span>
                <div title={`Carbon: ${metrics.hotspots.processingCO2Tons} t`} className="w-full bg-primary opacity-85 h-[7%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[11px] font-semibold text-gray-600 mt-2">Processing</span>
              </div>

              <div className="w-16 flex flex-col justify-end gap-1 group cursor-pointer text-center">
                <span className="text-[10px] font-bold text-primary">{metrics.hotspots.refiningCO2Tons}t</span>
                <div title={`Carbon: ${metrics.hotspots.refiningCO2Tons} t`} className="w-full bg-primary opacity-85 h-[10%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[11px] font-semibold text-gray-600 mt-2">Refining</span>
              </div>

              <div className="w-16 flex flex-col justify-end gap-1 group cursor-pointer text-center relative">
                <span className="text-[10px] font-bold text-red-600">{metrics.hotspots.smeltingCO2Tons}t</span>
                <div className="absolute -inset-x-2 -top-3 bottom-6 bg-red-100/40 border border-red-300 rounded-t-lg pointer-events-none"></div>
                <div title={`Carbon: ${metrics.hotspots.smeltingCO2Tons} t (Hotspot)`} className="w-full bg-red-600 opacity-85 h-[42%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[11px] font-bold text-red-600 mt-2">Smelting</span>
              </div>

              <div className="w-16 flex flex-col justify-end gap-1 group cursor-pointer text-center">
                <span className="text-[10px] font-bold text-primary">{metrics.hotspots.transportCO2Tons}t</span>
                <div title={`Carbon: ${metrics.hotspots.transportCO2Tons} t`} className="w-full bg-primary opacity-85 h-[14%] rounded-t group-hover:opacity-100 transition-opacity"></div>
                <span className="text-[11px] font-semibold text-gray-600 mt-2">Transport</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
