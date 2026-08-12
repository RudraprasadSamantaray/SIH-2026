import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataset } from '../context/DataContext';
import AnimatedNumber from '../components/AnimatedNumber';

export default function Transportation() {
  const { metrics, selectedMetal, setSelectedMetal } = useDataset();
  const navigate = useNavigate();

  if (!metrics) return null;

  const baselineTruckEmissions = Math.round(metrics.totalTransportKm * 0.18);
  const railEmissions = Math.round(metrics.totalTransportKm * 0.06);
  const savingsPct = (((baselineTruckEmissions - railEmissions) / baselineTruckEmissions) * 100).toFixed(1);

  return (
    <div className="space-y-lg">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-outline-variant/45 mb-md">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
            Transportation &amp; Freight Analysis
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Freight distance &amp; modal carbon intensity calculated live from active dataset ({metrics.totalCount} batches).
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

      <div className="grid grid-cols-12 gap-gutter animate-fade-in-up">
        {/* Route Visualization (Full Width) */}
        <div className="col-span-12 premium-card rounded-xl p-lg">
          <h3 className="font-headline-sm text-base font-bold mb-lg pb-sm border-b border-outline-variant/60 flex justify-between items-center">
            <span>Lifecycle Route Visualization</span>
            <span className="text-xs font-mono-data text-primary font-bold bg-primary-container/10 px-2.5 py-1 rounded-md">
              Total Freight Distance: <AnimatedNumber value={metrics.totalTransportKm} decimals={0} /> km
            </span>
          </h3>
          <div className="relative flex items-center justify-between pt-xl pb-lg overflow-x-auto">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant/50 -translate-y-1/2 z-0"></div>
            
            {/* Node 1: Mine */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-xl bg-surface border border-outline-variant/80 flex items-center justify-center mb-sm group-hover:border-primary transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-primary text-2xl">landscape</span>
              </div>
              <span className="font-label-md text-xs text-on-surface text-center font-semibold leading-tight">
                Mine / Extraction<br />
                <span className="text-on-surface-variant text-[11px] font-normal">Origin</span>
              </span>
            </div>

            {/* Segment 1 Info */}
            <div className="relative z-10 flex flex-col items-center -mt-xl">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-1 mb-xs shadow-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                <span className="font-mono-data text-[11px] font-semibold text-on-surface">Trucking</span>
              </div>
              <span className="font-mono-data text-[10px] text-on-surface-variant whitespace-nowrap">
                Short Haul (&lt;300km) | <AnimatedNumber value={metrics.totalQuantityTons} decimals={1} />t Total
              </span>
            </div>

            {/* Node 2: Processing */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-xl bg-surface border border-outline-variant/80 flex items-center justify-center mb-sm group-hover:border-primary transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-primary text-2xl">factory</span>
              </div>
              <span className="font-label-md text-xs text-on-surface text-center font-semibold leading-tight">
                Processing Plant<br />
                <span className="text-on-surface-variant text-[11px] font-normal">Beneficiation</span>
              </span>
            </div>

            {/* Segment 2 Info */}
            <div className="relative z-10 flex flex-col items-center -mt-xl">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-1 mb-xs shadow-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">train</span>
                <span className="font-mono-data text-[11px] font-semibold text-on-surface">Rail Freight</span>
              </div>
              <span className="font-mono-data text-[10px] text-on-surface-variant whitespace-nowrap">
                Long Haul (&gt;300km) | <AnimatedNumber value={metrics.avgTransportKm} decimals={0} /> km avg
              </span>
            </div>

            {/* Node 3: Manufacturing */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-xl bg-surface border border-outline-variant/80 flex items-center justify-center mb-sm group-hover:border-primary transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-primary text-2xl">precision_manufacturing</span>
              </div>
              <span className="font-label-md text-xs text-on-surface text-center font-semibold leading-tight">
                Manufacturing<br />
                <span className="text-on-surface-variant text-[11px] font-normal">Smelter Facility</span>
              </span>
            </div>

            {/* Segment 3 Info */}
            <div className="relative z-10 flex flex-col items-center -mt-xl">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-1 mb-xs shadow-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                <span className="font-mono-data text-[11px] font-semibold text-on-surface">Final Logistics</span>
              </div>
              <span className="font-mono-data text-[10px] text-on-surface-variant whitespace-nowrap">
                Distribution to Customer
              </span>
            </div>

            {/* Node 4: Destination */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-xl bg-surface border border-outline-variant/80 flex items-center justify-center mb-sm group-hover:border-primary transition-all duration-300 shadow-sm">
                <span className="material-symbols-outlined text-primary text-2xl">inventory</span>
              </div>
              <span className="font-label-md text-xs text-on-surface text-center font-semibold leading-tight">
                Warehouse<br />
                <span className="text-on-surface-variant text-[11px] font-normal">Customer Site</span>
              </span>
            </div>
          </div>
        </div>

        {/* Route Comparison Section */}
        <div className="col-span-12 space-y-md">
          <h3 className="font-headline-sm text-base font-bold text-on-surface">
            Modal Route Optimization &amp; Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Route A */}
            <div className="premium-card rounded-xl p-lg flex flex-col">
              <div className="flex justify-between items-start mb-md pb-sm border-b border-outline-variant/60">
                <div>
                  <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider mb-xs font-semibold">
                    Route A
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface text-2xl">local_shipping</span>
                    <span className="font-headline-sm text-base font-bold text-on-surface">100% Highway Trucking</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-surface-variant text-on-surface-variant font-label-md text-[10px] rounded font-bold uppercase">
                  Baseline
                </span>
              </div>
              <div className="grid grid-cols-2 gap-md flex-1">
                <div>
                  <span className="text-xs text-on-surface-variant block mb-1">Total Fleet Distance</span>
                  <span className="font-mono-data text-base font-bold"><AnimatedNumber value={metrics.totalTransportKm} decimals={0} /> km</span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant block mb-1">Material Volume</span>
                  <span className="font-mono-data text-base font-bold"><AnimatedNumber value={metrics.totalQuantityTons} decimals={1} /> tons</span>
                </div>
                <div className="col-span-2 mt-sm pt-sm border-t border-outline-variant border-dashed">
                  <span className="text-xs text-on-surface-variant block mb-1">Estimated Transport Impact (CO2e)</span>
                  <span className="font-mono-data text-xl text-error font-bold"><AnimatedNumber value={baselineTruckEmissions} decimals={0} /> kg CO2e</span>
                </div>
              </div>
            </div>

            {/* Route B (Highlighted) */}
            <div className="bg-surface-container-lowest border-2 border-primary rounded-xl p-lg shadow-sm relative flex flex-col transition-all hover:shadow-md">
              {/* Recommended Badge */}
              <div className="absolute -top-3 right-lg bg-primary text-on-primary px-3 py-1 rounded-full font-label-md text-[10px] font-bold flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[14px]" data-weight="fill">check_circle</span>
                Optimal Intermodal Option
              </div>
              <div className="flex justify-between items-start mb-md pb-sm border-b border-outline-variant/60">
                <div>
                  <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider mb-xs font-semibold">
                    Route B
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-2xl">train</span>
                    <span className="font-headline-sm text-base font-bold text-primary">Electrified Rail Shift</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-md flex-1">
                <div>
                  <span className="text-xs text-on-surface-variant block mb-1">Rail Haul Coverage</span>
                  <span className="font-mono-data text-base font-bold">85% Intermodal</span>
                  <span className="text-[10px] text-primary font-bold block mt-0.5">Long haul &gt; 300km</span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant block mb-1">Material Volume</span>
                  <span className="font-mono-data text-base font-bold"><AnimatedNumber value={metrics.totalQuantityTons} decimals={1} /> tons</span>
                </div>
                <div className="col-span-2 mt-sm pt-sm border-t border-outline-variant border-dashed flex justify-between items-end">
                  <div>
                    <span className="text-xs text-on-surface-variant block mb-1">Estimated Transport Impact (CO2e)</span>
                    <span className="font-mono-data text-xl text-primary font-bold"><AnimatedNumber value={railEmissions} decimals={0} /> kg CO2e</span>
                  </div>
                  <div className="text-primary font-label-md text-[12px] bg-primary-container/25 border border-primary/20 px-2 py-1 rounded-lg font-bold">
                    -<AnimatedNumber value={savingsPct} decimals={1} />% Emissions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="col-span-12 flex justify-end mt-4 pt-4 border-t border-outline-variant/50">
          <button
            onClick={() => navigate('/simulator')}
            className="bg-primary text-on-primary font-label-md text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary-fixed-variant transition-all font-bold cursor-pointer shadow active:scale-97"
          >
            Continue to Simulator
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
