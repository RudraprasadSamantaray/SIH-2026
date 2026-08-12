import React, { useState } from 'react';

export default function TransportationReview() {
  const [status, setStatus] = useState('Verified');

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Transportation Review
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Independent audit of logistics freight routes and transport emission calculations.
        </p>
      </header>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase text-tertiary">Logistics Emission Verification</span>
          <h3 className="font-headline-sm text-lg font-bold text-on-surface mt-0.5">
            Transport Audit Status: <span className={status === 'Verified' ? 'text-primary font-bold' : 'text-error font-bold'}>{status}</span>
          </h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Standard Trucking: <span className="font-mono-data font-bold text-error">125 kg CO2e</span> | Intermodal Rail: <span className="font-mono-data font-bold text-primary">48 kg CO2e</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setStatus('Verified')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
              status === 'Verified' ? 'bg-primary text-on-primary' : 'bg-surface-bright border border-outline-variant text-on-surface'
            }`}
          >
            ✓ Verify Route
          </button>
          <button
            onClick={() => setStatus('Requires Review')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
              status === 'Requires Review' ? 'bg-error text-on-error' : 'bg-surface-bright border border-outline-variant text-error'
            }`}
          >
            ⚠ Requires Review
          </button>
        </div>
      </div>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <h3 className="font-headline-sm text-headline-sm font-semibold mb-md border-b border-outline-variant pb-sm">
          Submitted Route Segments Inspection
        </h3>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-surface-bright border border-outline-variant rounded-lg flex justify-between items-center">
            <div>
              <span className="font-bold text-on-surface">Segment 1: Mine → Processing Plant</span>
              <p className="text-on-surface-variant">Mode: Trucking (120 km) • Load: 500t • Emissions: 42 kg CO2e</p>
            </div>
            <span className="bg-primary-container/20 text-primary font-bold px-2 py-0.5 rounded text-[10px]">✓ Verified</span>
          </div>

          <div className="p-3 bg-surface-bright border border-outline-variant rounded-lg flex justify-between items-center">
            <div>
              <span className="font-bold text-on-surface">Segment 2: Processing → Manufacturing Facility</span>
              <p className="text-on-surface-variant">Mode: Electrified Rail (850 km) • Load: 480t • Emissions: 18 kg CO2e</p>
            </div>
            <span className="bg-primary-container/20 text-primary font-bold px-2 py-0.5 rounded text-[10px]">✓ Verified</span>
          </div>

          <div className="p-3 bg-surface-bright border border-outline-variant rounded-lg flex justify-between items-center">
            <div>
              <span className="font-bold text-on-surface">Segment 3: Manufacturing → Warehouse</span>
              <p className="text-on-surface-variant">Mode: Trucking (50 km) • Load: 450t • Emissions: 15 kg CO2e</p>
            </div>
            <span className="bg-primary-container/20 text-primary font-bold px-2 py-0.5 rounded text-[10px]">✓ Verified</span>
          </div>
        </div>
      </section>
    </div>
  );
}
