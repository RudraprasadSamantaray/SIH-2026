import React from 'react';

const auditData = [
  {
    plant: 'Plant A-12 (Aluminium)',
    data: '✓ Verified',
    lca: '✓ Reviewed',
    circularity: '✓ Verified',
    transport: '⚠ Pending',
    report: '⌛ Not Started',
    overall: 'Pending',
  },
  {
    plant: 'Plant B-07 (Copper)',
    data: '✓ Verified',
    lca: '⚠ Under Review',
    circularity: '⌛ Not Started',
    transport: '⌛ Not Started',
    report: '⌛ Not Started',
    overall: 'In Progress',
  },
  {
    plant: 'Plant C-03 (Steel)',
    data: '⌛ Not Submitted',
    lca: '⌛ Not Started',
    circularity: '⌛ Not Started',
    transport: '⌛ Not Started',
    report: '⌛ Not Started',
    overall: 'Not Started',
  },
];

const cellColor = (val) => {
  if (val.startsWith('✓')) return 'text-primary font-bold';
  if (val.startsWith('⚠')) return 'text-amber-700 font-bold';
  return 'text-on-surface-variant';
};

const overallBadge = (status) => {
  if (status === 'Pending') return 'bg-amber-100 text-amber-800';
  if (status === 'In Progress') return 'bg-secondary-container/30 text-secondary';
  return 'bg-surface-container text-on-surface-variant';
};

export default function AuditStatus() {
  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Audit Status Monitor
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          System-wide view of auditor verification progress and areas requiring attention.
        </p>
      </header>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-md bg-surface-bright border-b border-outline-variant">
          <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">
            Audit Verification Progress — All Plants
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface font-label-md uppercase text-on-surface-variant border-b border-outline-variant">
                <th className="py-sm px-md font-semibold">Plant</th>
                <th className="py-sm px-md font-semibold">Data</th>
                <th className="py-sm px-md font-semibold">LCA</th>
                <th className="py-sm px-md font-semibold">Circularity</th>
                <th className="py-sm px-md font-semibold">Transportation</th>
                <th className="py-sm px-md font-semibold">Report</th>
                <th className="py-sm px-md font-semibold text-center">Overall</th>
              </tr>
            </thead>
            <tbody className="text-on-surface">
              {auditData.map((row, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                  <td className="py-sm px-md font-semibold">{row.plant}</td>
                  <td className={`py-sm px-md ${cellColor(row.data)}`}>{row.data}</td>
                  <td className={`py-sm px-md ${cellColor(row.lca)}`}>{row.lca}</td>
                  <td className={`py-sm px-md ${cellColor(row.circularity)}`}>{row.circularity}</td>
                  <td className={`py-sm px-md ${cellColor(row.transport)}`}>{row.transport}</td>
                  <td className={`py-sm px-md ${cellColor(row.report)}`}>{row.report}</td>
                  <td className="py-sm px-md text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${overallBadge(row.overall)}`}>
                      {row.overall}
                    </span>
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
