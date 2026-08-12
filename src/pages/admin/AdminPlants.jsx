import React, { useState } from 'react';

const plantsData = [
  {
    id: 1,
    plant: 'Plant A-12',
    location: 'Odisha, India',
    material: 'Aluminium',
    analysisStatus: 'Completed',
    auditStatus: 'Pending Audit',
    reportStatus: 'Ready',
    details: 'Primary smelter facility. 50,000 tonnes annual capacity. Grid power with partial renewable offset.',
  },
  {
    id: 2,
    plant: 'Plant B-07',
    location: 'Jharkhand, India',
    material: 'Copper',
    analysisStatus: 'In Progress',
    auditStatus: 'Under Review',
    reportStatus: 'Pending',
    details: 'Copper refinery. 28,000 tonnes annual capacity. Hydroelectric power source.',
  },
  {
    id: 3,
    plant: 'Plant C-03',
    location: 'Rajasthan, India',
    material: 'Steel',
    analysisStatus: 'Pending',
    auditStatus: 'Not Started',
    reportStatus: 'Pending',
    details: 'Integrated steel plant. 120,000 tonnes annual capacity. Coal + solar hybrid energy.',
  },
];

const statusColor = (status) => {
  if (status === 'Completed' || status === 'Ready' || status === 'Approved') return 'bg-primary-container/20 text-primary';
  if (status === 'In Progress' || status === 'Under Review' || status === 'Pending Audit') return 'bg-amber-100 text-amber-800';
  return 'bg-surface-container text-on-surface-variant';
};

export default function AdminPlants() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">Plants</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          All registered facilities in the EcoMetrix AI system. Click a plant to view its overview.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {plantsData.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelected(selected?.id === p.id ? null : p)}
            className={`bg-surface-container-lowest border rounded-xl p-lg shadow-sm cursor-pointer transition-all ${
              selected?.id === p.id ? 'border-secondary ring-2 ring-secondary/30' : 'border-outline-variant hover:border-secondary'
            }`}
          >
            <div className="flex justify-between items-start mb-sm">
              <div>
                <h3 className="font-bold text-base text-on-surface">{p.plant}</h3>
                <p className="text-xs text-on-surface-variant">{p.location}</p>
              </div>
              <span className="text-xs font-bold text-secondary bg-secondary-container/20 px-2 py-0.5 rounded">{p.material}</span>
            </div>

            <div className="space-y-1 text-xs mt-md">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Analysis</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${statusColor(p.analysisStatus)}`}>{p.analysisStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Audit</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${statusColor(p.auditStatus)}`}>{p.auditStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Report</span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${statusColor(p.reportStatus)}`}>{p.reportStatus}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Plant Detail Panel */}
      {selected && (
        <div className="bg-surface-container-lowest border border-secondary rounded-xl p-xl shadow-sm">
          <div className="flex justify-between items-center mb-md">
            <h3 className="font-bold text-lg text-on-surface">{selected.plant} — Overview</h3>
            <button onClick={() => setSelected(null)} className="text-on-surface-variant hover:text-error cursor-pointer">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md text-xs">
            <div>
              <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-1">Location</span>
              <p className="text-on-surface">{selected.location}</p>
            </div>
            <div>
              <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-1">Material</span>
              <p className="text-on-surface font-bold">{selected.material}</p>
            </div>
            <div className="md:col-span-2">
              <span className="font-bold uppercase text-on-surface-variant text-[10px] block mb-1">Facility Details</span>
              <p className="text-on-surface-variant leading-relaxed">{selected.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
