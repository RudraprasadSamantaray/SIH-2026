import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Transportation() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      {/* Header */}
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Transportation Analysis
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Analyze the environmental impact of material transportation routes.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-gutter mb-xl">
        {/* Route Visualization (Full Width) */}
        <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-lg p-lg shadow-sm">
          <h3 className="font-headline-sm text-headline-sm font-semibold mb-lg pb-sm border-b border-outline-variant">
            Lifecycle Route Visualization
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
                Mine<br />
                <span className="text-on-surface-variant font-normal">Origin</span>
              </span>
            </div>

            {/* Segment 1 Info */}
            <div className="relative z-10 flex flex-col items-center -mt-xl">
              <div className="bg-surface-container-lowest border border-outline-variant rounded px-sm py-xs mb-xs shadow-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                <span className="font-mono-data text-[12px] font-semibold">Truck</span>
              </div>
              <span className="font-mono-data text-[11px] text-on-surface-variant whitespace-nowrap">
                120km | 500t | 42kg CO2e
              </span>
            </div>

            {/* Node 2: Processing */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center mb-sm group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">factory</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center font-semibold">
                Processing<br />
                <span className="text-on-surface-variant font-normal">Plant</span>
              </span>
            </div>

            {/* Segment 2 Info */}
            <div className="relative z-10 flex flex-col items-center -mt-xl">
              <div className="bg-surface-container-lowest border border-outline-variant rounded px-sm py-xs mb-xs shadow-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">train</span>
                <span className="font-mono-data text-[12px] font-semibold">Rail</span>
              </div>
              <span className="font-mono-data text-[11px] text-on-surface-variant whitespace-nowrap">
                850km | 480t | 18kg CO2e
              </span>
            </div>

            {/* Node 3: Manufacturing */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center mb-sm group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">precision_manufacturing</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center font-semibold">
                Manufacturing<br />
                <span className="text-on-surface-variant font-normal">Facility</span>
              </span>
            </div>

            {/* Segment 3 Info */}
            <div className="relative z-10 flex flex-col items-center -mt-xl">
              <div className="bg-surface-container-lowest border border-outline-variant rounded px-sm py-xs mb-xs shadow-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                <span className="font-mono-data text-[12px] font-semibold">Truck</span>
              </div>
              <span className="font-mono-data text-[11px] text-on-surface-variant whitespace-nowrap">
                50km | 450t | 15kg CO2e
              </span>
            </div>

            {/* Node 4: Destination */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer min-w-28">
              <div className="w-12 h-12 rounded-full bg-surface border border-outline-variant flex items-center justify-center mb-sm group-hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-primary text-2xl">inventory</span>
              </div>
              <span className="font-label-md text-label-md text-on-surface text-center font-semibold">
                Destination<br />
                <span className="text-on-surface-variant font-normal">Warehouse</span>
              </span>
            </div>
          </div>
        </div>

        {/* Route Comparison Section */}
        <div className="col-span-12">
          <h3 className="font-headline-sm text-headline-sm font-semibold mb-md text-on-surface">
            Route Comparison
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
                    <span className="font-headline-sm font-semibold text-on-surface">Standard Trucking</span>
                  </div>
                </div>
                <span className="px-sm py-xs bg-surface-variant text-on-surface-variant font-label-md text-[10px] rounded font-bold">
                  Baseline
                </span>
              </div>
              <div className="grid grid-cols-2 gap-md flex-1">
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Distance</span>
                  <span className="font-mono-data text-body-lg font-bold">320 km</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Material Load</span>
                  <span className="font-mono-data text-body-lg font-bold">500 tons</span>
                </div>
                <div className="col-span-2 mt-sm pt-sm border-t border-outline-variant border-dashed">
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Estimated Impact (CO2e)</span>
                  <span className="font-mono-data text-headline-sm text-error font-bold">125 kg</span>
                </div>
              </div>
            </div>

            {/* Route B (Highlighted) */}
            <div className="bg-surface-container-lowest border-2 border-primary rounded-lg p-lg shadow-md relative flex flex-col">
              {/* Recommended Badge */}
              <div className="absolute -top-3 right-lg bg-primary-container text-on-primary-container px-sm py-xs rounded font-label-md text-[10px] font-bold flex items-center gap-xs">
                <span className="material-symbols-outlined text-[14px]" data-weight="fill">check_circle</span>
                Lower Impact Option
              </div>
              <div className="flex justify-between items-start mb-md pb-sm border-b border-outline-variant">
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs">
                    Route B
                  </h4>
                  <div className="flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary text-2xl">train</span>
                    <span className="font-headline-sm font-semibold text-primary">Intermodal Rail Focus</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-md flex-1">
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Distance</span>
                  <span className="font-mono-data text-body-lg font-bold">680 km</span>
                  <span className="text-[10px] text-on-surface-variant block">+360km longer</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Material Load</span>
                  <span className="font-mono-data text-body-lg font-bold">500 tons</span>
                </div>
                <div className="col-span-2 mt-sm pt-sm border-t border-outline-variant border-dashed flex justify-between items-end">
                  <div>
                    <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Estimated Impact (CO2e)</span>
                    <span className="font-mono-data text-headline-sm text-primary font-bold">48 kg</span>
                  </div>
                  <div className="text-primary font-label-md text-[12px] bg-primary-fixed-dim/20 px-sm py-xs rounded font-bold">
                    -61.6% Emissions
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
