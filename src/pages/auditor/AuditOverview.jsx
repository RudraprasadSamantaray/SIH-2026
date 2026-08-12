import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuditOverview() {
  const navigate = useNavigate();

  const reviewItems = [
    { title: 'Data Verification', path: '/auditor/data-verification', status: 'Requires Review', isWarning: true, detail: '1 field needs verification' },
    { title: 'LCA Review', path: '/auditor/lca', status: 'Requires Review', isWarning: true, detail: 'Metal Production hotspot pending audit signoff' },
    { title: 'Circularity Review', path: '/auditor/circularity', status: 'Reviewed', isWarning: false, detail: '34% scrap ratio verified' },
    { title: 'Transportation Review', path: '/auditor/transportation', status: 'Requires Review', isWarning: true, detail: 'Route Bux-09 modal shift pending' },
    { title: 'Scenario Review', path: '/auditor/scenarios', status: 'Requires Review', isWarning: true, detail: 'Simulation variance needs audit approval' },
    { title: 'Recommendations Review', path: '/auditor/recommendations', status: 'Requires Review', isWarning: true, detail: '3 mitigation steps pending review' },
    { title: 'Report Status', path: '/auditor/reports', status: 'Pending Review', isWarning: true, detail: 'Awaiting section approvals' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      {/* Header */}
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Audit Overview
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Independent environmental verification &amp; compliance assurance for Plant A-12.
        </p>
      </header>

      {/* Plant Context Summary Banner */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-tertiary-container/40 text-tertiary text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Audit Target
            </span>
            <span className="text-xs text-on-surface-variant font-mono-data">Q3 2026 Submission</span>
          </div>
          <h3 className="font-headline-sm text-lg font-bold text-on-surface">Plant A-12 (Aluminium Smelter Facility)</h3>
          <p className="text-xs text-on-surface-variant">
            Submitted by: <span className="font-semibold text-on-surface">Alex Rivera (Engineer)</span>
          </p>
        </div>

        <div className="flex items-center gap-3 bg-surface-bright border border-outline-variant px-4 py-3 rounded-lg">
          <div>
            <span className="text-[10px] text-on-surface-variant uppercase font-semibold block">Overall Audit Status</span>
            <span className="text-sm font-bold text-amber-700 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              Pending Validation
            </span>
          </div>
        </div>
      </div>

      {/* Review Status Checklist Cards */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <h3 className="font-headline-sm text-headline-sm font-semibold mb-md border-b border-outline-variant pb-sm">
          Verification &amp; Audit Progress Checklist
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {reviewItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="p-md bg-surface-bright border border-outline-variant rounded-lg hover:border-tertiary transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-sm text-on-surface">{item.title}</h4>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.isWarning ? 'bg-amber-100 text-amber-800' : 'bg-primary-container/20 text-primary'
                    }`}
                  >
                    {item.isWarning ? '⚠ ' + item.status : '✓ ' + item.status}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-3">{item.detail}</p>
              </div>

              <div className="pt-2 border-t border-outline-variant flex justify-between items-center text-xs text-tertiary font-semibold">
                <span>Perform Audit</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
