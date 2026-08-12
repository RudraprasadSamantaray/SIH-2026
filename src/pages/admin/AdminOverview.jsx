import React from 'react';
import { useNavigate } from 'react-router-dom';

const plants = [
  { id: 1, plant: 'Plant A-12', material: 'Aluminium', lca: 'Completed', circularity: '81/100', audit: 'Pending Audit', report: 'Ready' },
  { id: 2, plant: 'Plant B-07', material: 'Copper', lca: 'In Progress', circularity: '74/100', audit: 'Under Review', report: 'Pending' },
  { id: 3, plant: 'Plant C-03', material: 'Steel', lca: 'Pending', circularity: '62/100', audit: 'Not Started', report: 'Pending' },
];

const statusColor = (status) => {
  if (status === 'Completed' || status === 'Ready' || status === 'Approved') return 'bg-primary-container/20 text-primary';
  if (status === 'In Progress' || status === 'Under Review' || status === 'Pending Audit') return 'bg-amber-100 text-amber-800';
  return 'bg-surface-container text-on-surface-variant';
};

export default function AdminOverview() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      {/* Header */}
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Admin Overview
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          High-level system monitoring across all EcoMetrix AI facilities and analysis pipelines.
        </p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
        {[
          { label: 'Total Plants', value: '3', icon: 'domain', color: 'text-secondary' },
          { label: 'Under Analysis', value: '2', icon: 'analytics', color: 'text-primary' },
          { label: 'Audits Pending', value: '2', icon: 'pending_actions', color: 'text-amber-600' },
          { label: 'Reports Ready', value: '1', icon: 'description', color: 'text-tertiary' },
        ].map((kpi, i) => (
          <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-on-surface-variant uppercase">{kpi.label}</span>
              <span className={`material-symbols-outlined text-2xl ${kpi.color}`} data-weight="fill">{kpi.icon}</span>
            </div>
            <span className={`font-mono-data text-3xl font-bold ${kpi.color}`}>{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Plant Overview Table */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-md bg-surface-bright border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Plant Summary</h3>
          <button
            onClick={() => navigate('/admin/plants')}
            className="text-xs text-secondary font-semibold hover:underline cursor-pointer"
          >
            View All Plants →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface font-label-md uppercase text-on-surface-variant border-b border-outline-variant">
                <th className="py-sm px-md font-semibold">Plant</th>
                <th className="py-sm px-md font-semibold">Material</th>
                <th className="py-sm px-md font-semibold">LCA Status</th>
                <th className="py-sm px-md font-semibold">Circularity</th>
                <th className="py-sm px-md font-semibold">Audit Status</th>
                <th className="py-sm px-md font-semibold">Report</th>
              </tr>
            </thead>
            <tbody className="text-on-surface">
              {plants.map((p) => (
                <tr key={p.id} className="border-b border-outline-variant hover:bg-surface/50 transition-colors cursor-pointer" onClick={() => navigate('/admin/plants')}>
                  <td className="py-sm px-md font-semibold">{p.plant}</td>
                  <td className="py-sm px-md">{p.material}</td>
                  <td className="py-sm px-md">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${statusColor(p.lca)}`}>{p.lca}</span>
                  </td>
                  <td className="py-sm px-md font-mono-data font-bold text-on-surface">{p.circularity}</td>
                  <td className="py-sm px-md">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${statusColor(p.audit)}`}>{p.audit}</span>
                  </td>
                  <td className="py-sm px-md">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${statusColor(p.report)}`}>{p.report}</span>
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
