import React, { useState } from 'react';

export default function AuditorReports() {
  const [reportStatus, setReportStatus] = useState('Pending'); // 'Approved' | 'Returned' | 'Pending'

  const sections = [
    { title: 'Data Summary', status: '✓ Verified' },
    { title: 'LCA (Life Cycle Assessment)', status: '✓ Reviewed' },
    { title: 'Circularity', status: '✓ Verified' },
    { title: 'Transportation', status: '✓ Verified' },
    { title: 'Simulation', status: '✓ Accepted' },
    { title: 'Scoring', status: '✓ Verified (+14 PTS)' },
    { title: 'Recommendations', status: '✓ Accepted' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Audit Reports &amp; Final Approval
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Review complete report verification checklist before final audit sign-off.
        </p>
      </header>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm space-y-lg">
        <div className="flex justify-between items-center border-b border-outline-variant pb-md">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            Section Audit Verification Status
          </h3>
          <span
            className={`px-3 py-1 rounded text-xs font-bold ${
              reportStatus === 'Approved'
                ? 'bg-primary-container/20 text-primary'
                : reportStatus === 'Returned'
                ? 'bg-error-container text-error'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            Audit Status: {reportStatus}
          </span>
        </div>

        <ul className="space-y-md">
          {sections.map((sec, idx) => (
            <li key={idx} className="flex justify-between items-center text-body-md text-on-surface font-medium border-b border-outline-variant/40 pb-2">
              <span className="flex items-center gap-md">
                <span className="material-symbols-outlined text-tertiary text-xl">verified</span>
                {sec.title}
              </span>
              <span className="text-xs font-bold text-primary font-mono-data bg-primary-container/10 px-2.5 py-1 rounded">
                {sec.status}
              </span>
            </li>
          ))}
        </ul>

        {/* Audit Decision Action Buttons */}
        <div className="flex flex-col md:flex-row justify-end items-center gap-md pt-lg border-t border-outline-variant">
          <button
            onClick={() => setReportStatus('Returned')}
            className="w-full md:w-auto bg-surface-bright border border-outline-variant text-error hover:bg-error-container font-bold text-xs py-2.5 px-5 rounded transition-colors cursor-pointer"
          >
            Return for Review
          </button>
          <button
            onClick={() => setReportStatus('Approved')}
            className="w-full md:w-auto bg-tertiary text-on-tertiary font-bold text-xs py-2.5 px-6 rounded hover:bg-tertiary/90 transition-colors shadow-sm cursor-pointer"
          >
            ✓ Approve Report &amp; Issue EPD Verification
          </button>
        </div>
      </div>
    </div>
  );
}
