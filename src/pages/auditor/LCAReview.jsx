import React, { useState } from 'react';

export default function LCAReview() {
  const [auditStatus, setAuditStatus] = useState('Reviewed'); // 'Reviewed' | 'Flagged'

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Life Cycle Assessment (LCA) Review
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Independent audit of lifecycle calculation methodology and value chain impact metrics.
        </p>
      </header>

      {/* Review Actions Banner */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase text-tertiary">ISO 14040/44 Compliance Review</span>
          <h3 className="font-headline-sm text-lg font-bold text-on-surface mt-0.5">
            LCA Calculation Audit Status: <span className={auditStatus === 'Reviewed' ? 'text-primary' : 'text-error'}>{auditStatus}</span>
          </h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Total Carbon Intensity: <span className="font-bold text-on-surface">14.2 tCO2e/t</span> | Energy: <span className="font-bold text-on-surface">52.4 MWh/t</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setAuditStatus('Reviewed')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
              auditStatus === 'Reviewed' ? 'bg-primary text-on-primary' : 'bg-surface-bright border border-outline-variant text-on-surface'
            }`}
          >
            ✓ Mark LCA Reviewed
          </button>
          <button
            onClick={() => setAuditStatus('Flagged')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
              auditStatus === 'Flagged' ? 'bg-error text-on-error' : 'bg-surface-bright border border-outline-variant text-error'
            }`}
          >
            ⚠ Flag for Review
          </button>
        </div>
      </div>

      {/* Value Chain Impact Flow Inspection */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <h3 className="font-headline-sm text-headline-sm font-semibold mb-lg pb-sm border-b border-outline-variant">
          Value Chain Impact Flow Verification
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative py-md text-center">
          <div className="bg-surface-bright p-3 rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-secondary text-2xl">landscape</span>
            <p className="text-xs font-bold text-on-surface mt-1">Mining</p>
            <p className="font-mono-data text-xs text-secondary font-bold">27%</p>
          </div>

          <div className="bg-surface-bright p-3 rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-secondary text-2xl">factory</span>
            <p className="text-xs font-bold text-on-surface mt-1">Processing</p>
            <p className="font-mono-data text-xs text-secondary font-bold">7%</p>
          </div>

          <div className="bg-surface-bright p-3 rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-secondary text-2xl">science</span>
            <p className="text-xs font-bold text-on-surface mt-1">Refining</p>
            <p className="font-mono-data text-xs text-secondary font-bold">10%</p>
          </div>

          <div className="bg-error-container/30 p-3 rounded-lg border border-error/50">
            <span className="material-symbols-outlined text-error text-2xl" data-weight="fill">local_fire_department</span>
            <p className="text-xs font-bold text-error mt-1">Smelting</p>
            <p className="font-mono-data text-xs text-error font-bold">42% (Hotspot)</p>
          </div>

          <div className="bg-surface-bright p-3 rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-secondary text-2xl">local_shipping</span>
            <p className="text-xs font-bold text-on-surface mt-1">Transport</p>
            <p className="font-mono-data text-xs text-secondary font-bold">14%</p>
          </div>

          <div className="bg-surface-bright p-3 rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-secondary text-2xl">recycling</span>
            <p className="text-xs font-bold text-on-surface mt-1">End of Life</p>
            <p className="font-mono-data text-xs text-secondary font-bold">N/A</p>
          </div>
        </div>

        {/* Auditor Findings Note Box */}
        <div className="mt-md bg-surface p-md rounded-lg border border-outline-variant text-xs">
          <span className="font-bold text-tertiary uppercase text-[10px] block mb-1">Auditor Verification Note</span>
          <p className="text-on-surface-variant leading-relaxed">
            Methodology verified against ISO 14044 guidelines. Smelting emission factor (42%) matches the high electricity grid carbon factor of Plant A-12's regional grid.
          </p>
        </div>
      </section>
    </div>
  );
}
