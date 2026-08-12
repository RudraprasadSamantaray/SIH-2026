import React, { useState } from 'react';

export default function CircularityReview() {
  const [status, setStatus] = useState('Verified');

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Circularity Review
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Independent audit of Material Circularity Indicator (MCI) score &amp; scrap recycling ratios.
        </p>
      </header>

      {/* Review Actions Banner */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase text-tertiary">MCI Audit Verification</span>
          <h3 className="font-headline-sm text-lg font-bold text-on-surface mt-0.5">
            Material Circularity Score: <span className="text-primary font-mono-data">0.78 (78%)</span>
          </h3>
          <p className="text-xs text-on-surface-variant mt-1">
            Status: <span className={status === 'Verified' ? 'text-primary font-bold' : 'text-error font-bold'}>{status}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setStatus('Verified')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
              status === 'Verified' ? 'bg-primary text-on-primary' : 'bg-surface-bright border border-outline-variant text-on-surface'
            }`}
          >
            ✓ Verify Circularity
          </button>
          <button
            onClick={() => setStatus('Flagged')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all cursor-pointer ${
              status === 'Flagged' ? 'bg-error text-on-error' : 'bg-surface-bright border border-outline-variant text-error'
            }`}
          >
            ⚠ Flag Issue
          </button>
        </div>
      </div>

      {/* Metric Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <span className="text-xs font-semibold text-on-surface-variant uppercase">MCI Baseline Score</span>
          <div className="font-mono-data text-2xl font-bold text-primary mt-1">0.78</div>
          <span className="text-xs text-primary font-semibold">✓ Verified against Ellen MacArthur Foundation method</span>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <span className="text-xs font-semibold text-on-surface-variant uppercase">Secondary Scrap Content</span>
          <div className="font-mono-data text-2xl font-bold text-secondary mt-1">34%</div>
          <span className="text-xs text-secondary font-semibold">✓ Verified via supplier delivery manifests</span>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <span className="text-xs font-semibold text-on-surface-variant uppercase">Waste Diversion Rate</span>
          <div className="font-mono-data text-2xl font-bold text-tertiary mt-1">92%</div>
          <span className="text-xs text-tertiary font-semibold">✓ Zero Waste to Landfill audit confirmed</span>
        </div>
      </div>
    </div>
  );
}
