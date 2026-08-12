import React from 'react';

const reports = [
  {
    plant: 'Plant A-12',
    material: 'Aluminium',
    period: 'August 2026',
    reportStatus: 'Generated',
    auditStatus: 'Approved',
  },
  {
    plant: 'Plant B-07',
    material: 'Copper',
    period: 'August 2026',
    reportStatus: 'Draft',
    auditStatus: 'Under Review',
  },
  {
    plant: 'Plant C-03',
    material: 'Steel',
    period: 'August 2026',
    reportStatus: 'Pending',
    auditStatus: 'Not Started',
  },
];

const statusColor = (status) => {
  if (status === 'Generated' || status === 'Approved') return 'bg-primary-container/20 text-primary';
  if (status === 'Draft' || status === 'Under Review') return 'bg-amber-100 text-amber-800';
  return 'bg-surface-container text-on-surface-variant';
};

export default function AdminReports() {
  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Reports Overview
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          High-level status of all generated environmental performance reports across registered plants.
        </p>
      </header>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-md bg-surface-bright border-b border-outline-variant">
          <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Report Registry</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface font-label-md uppercase text-on-surface-variant border-b border-outline-variant">
                <th className="py-sm px-md font-semibold">Plant</th>
                <th className="py-sm px-md font-semibold">Material</th>
                <th className="py-sm px-md font-semibold">Reporting Period</th>
                <th className="py-sm px-md font-semibold">Report Status</th>
                <th className="py-sm px-md font-semibold">Audit Status</th>
                <th className="py-sm px-md font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-on-surface">
              {reports.map((r, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                  <td className="py-sm px-md font-semibold">{r.plant}</td>
                  <td className="py-sm px-md">{r.material}</td>
                  <td className="py-sm px-md font-mono-data">{r.period}</td>
                  <td className="py-sm px-md">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${statusColor(r.reportStatus)}`}>
                      {r.reportStatus}
                    </span>
                  </td>
                  <td className="py-sm px-md">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${statusColor(r.auditStatus)}`}>
                      {r.auditStatus}
                    </span>
                  </td>
                  <td className="py-sm px-md text-right">
                    {r.reportStatus === 'Generated' ? (
                      <button className="text-secondary font-bold hover:underline text-[11px] cursor-pointer">
                        Preview Report
                      </button>
                    ) : (
                      <span className="text-on-surface-variant text-[10px]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
