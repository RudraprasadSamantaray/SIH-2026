import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataset } from '../context/DataContext';

export default function Transportation() {
  const { metrics, selectedMetal, setSelectedMetal } = useDataset();
  const navigate = useNavigate();

  if (!metrics) return null;

  const baselineTruckEmissions = Math.round(metrics.totalTransportKm * 0.18);
  const railEmissions = Math.round(metrics.totalTransportKm * 0.06);
  const savingsPct = (((baselineTruckEmissions - railEmissions) / baselineTruckEmissions) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-xl">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
            Transportation &amp; Freight Analysis
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Freight distance &amp; modal carbon intensity calculated live from PS 25069 Dataset ({metrics.totalCount} batches).
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
      </header>

      <div className="grid grid-cols-12 gap-gutter mb-xl">
        {/* Route Visualization (Full Width) */}
        <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-lg p-lg shadow-sm">
          <h3 className="font-headline-sm text-headline-sm font-semibold mb-lg pb-sm border-b border-outline-variant flex justify-between items-center">
            <span>Lifecycle Route Visualization</span>
            <span className="text-xs font-mono-data text-primary font-bold">Total Freight Distance: {metrics.totalTransportKm} km</span>
          </h3>
          <div className="relative flex items-center justify-between pt-xl pb-lg overflow-x-auto">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-outline-variant -translate-y-1/2 z-0"></div>
            
            {/* Node 1: Mine */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center mb-sm group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">landscape</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center font-semibold">
                Mine / Extraction<br />
                <span className="text-on-surface-variant font-normal">Origin</span>
              </span>
            </div>

            {/* Segment 1 Info */}
            <div className="relative z-10 flex flex-col items-center -mt-xl">
              <div className="bg-surface-container-lowest border border-outline-variant rounded px-sm py-xs mb-xs shadow-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                <span className="font-mono-data text-[12px] font-semibold">Trucking</span>
              </div>
              <span className="font-mono-data text-[11px] text-on-surface-variant whitespace-nowrap">
                Short Haul (&lt;300km) | {metrics.totalQuantityTons}t Total
              </span>
            </div>

            {/* Node 2: Processing */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center mb-sm group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">factory</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center font-semibold">
                Processing Plant<br />
                <span className="text-on-surface-variant font-normal">Beneficiation</span>
              </span>
            </div>

            {/* Segment 2 Info */}
            <div className="relative z-10 flex flex-col items-center -mt-xl">
              <div className="bg-surface-container-lowest border border-outline-variant rounded px-sm py-xs mb-xs shadow-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">train</span>
                <span className="font-mono-data text-[12px] font-semibold">Rail Freight</span>
              </div>
              <span className="font-mono-data text-[11px] text-on-surface-variant whitespace-nowrap">
                Long Haul (&gt;300km) | {metrics.avgTransportKm} km avg
              </span>
            </div>

            {/* Node 3: Manufacturing */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center mb-sm group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">precision_manufacturing</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center font-semibold">
                Manufacturing<br />
                <span className="text-on-surface-variant font-normal">Smelter Facility</span>
              </span>
            </div>

            {/* Segment 3 Info */}
            <div className="relative z-10 flex flex-col items-center -mt-xl">
              <div className="bg-surface-container-lowest border border-outline-variant rounded px-sm py-xs mb-xs shadow-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                <span className="font-mono-data text-[12px] font-semibold">Final Logistics</span>
              </div>
              <span className="font-mono-data text-[11px] text-on-surface-variant whitespace-nowrap">
                Distribution to Customer
              </span>
            </div>

            {/* Node 4: Destination */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center mb-sm group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">inventory</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center font-semibold">
                Warehouse<br />
                <span className="text-on-surface-variant font-normal">Customer Site</span>
              </span>
            </div>
          </div>
        </div>

        {/* Route Comparison Section */}
        <div className="col-span-12">
          <h3 className="font-headline-sm text-headline-sm font-semibold mb-md text-on-surface">
            Modal Route Optimization &amp; Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Route A */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg hover:border-primary transition-colors flex flex-col shadow-sm">
              <div className="flex justify-between items-start mb-md pb-sm border-b border-outline-variant">
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs">
                    Route A
                  </h4>
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-on-surface text-2xl">local_shipping</span>
                    <span className="font-headline-sm font-semibold text-on-surface">100% Highway Trucking</span>
                  </div>
                </div>
                <span className="px-sm py-xs bg-surface-variant text-on-surface-variant font-label-md text-[10px] rounded font-bold">
                  Baseline
                </span>
              </div>
              <div className="grid grid-cols-2 gap-md flex-1">
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Total Fleet Distance</span>
                  <span className="font-mono-data text-body-lg font-bold">{metrics.totalTransportKm} km</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Material Volume</span>
                  <span className="font-mono-data text-body-lg font-bold">{metrics.totalQuantityTons} tons</span>
                </div>
                <div className="col-span-2 mt-sm pt-sm border-t border-outline-variant border-dashed">
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Estimated Transport Impact (CO2e)</span>
                  <span className="font-mono-data text-headline-sm text-error font-bold">{baselineTruckEmissions} kg CO2e</span>
                </div>
              </div>
            </div>

            {/* Route B (Highlighted) */}
            <div className="bg-surface-container-lowest border-2 border-primary rounded-lg p-lg shadow-md relative flex flex-col">
              {/* Recommended Badge */}
              <div className="absolute -top-3 right-lg bg-primary-container text-on-primary-container px-sm py-xs rounded font-label-md text-[10px] font-bold flex items-center gap-xs">
                <span className="material-symbols-outlined text-[14px]" data-weight="fill">check_circle</span>
                Optimal Intermodal Option
              </div>
              <div className="flex justify-between items-start mb-md pb-sm border-b border-outline-variant">
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs">
                    Route B
                  </h4>
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary text-2xl">train</span>
                    <span className="font-headline-sm font-semibold text-primary">Electrified Rail Shift</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-md flex-1">
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Rail Haul Coverage</span>
                  <span className="font-mono-data text-body-lg font-bold">85% Intermodal</span>
                  <span className="text-[10px] text-primary font-bold block">Long haul &gt; 300km</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Material Volume</span>
                  <span className="font-mono-data text-body-lg font-bold">{metrics.totalQuantityTons} tons</span>
                </div>
                <div className="col-span-2 mt-sm pt-sm border-t border-outline-variant border-dashed flex justify-between items-end">
                  <div>
                    <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Estimated Transport Impact (CO2e)</span>
                    <span className="font-mono-data text-headline-sm text-primary font-bold">{railEmissions} kg CO2e</span>
                  </div>
                  <div className="text-primary font-label-md text-[12px] bg-primary-fixed-dim/20 px-sm py-xs rounded font-bold">
                    -{savingsPct}% Emissions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="col-span-12 flex justify-end mt-lg pt-lg border-t border-outline-variant">
          <button
            onClick={() => navigate('/simulator')}
            className="bg-primary text-on-primary font-label-md text-label-md px-xl py-sm rounded-md flex items-center gap-sm hover:bg-primary-fixed-variant transition-all font-bold cursor-pointer"
          >
            Continue to Simulator
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
