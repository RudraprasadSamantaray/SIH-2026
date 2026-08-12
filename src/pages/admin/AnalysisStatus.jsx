import React from 'react';

const stages = [
  'Data Upload',
  'LCA',
  'Circularity',
  'Transportation',
  'Simulation',
  'Scoring',
  'Recommendations',
  'Report',
];

const plantsProgress = [
  {
    plant: 'Plant A-12 (Aluminium)',
    stages: ['Completed', 'Completed', 'Completed', 'Completed', 'Completed', 'Completed', 'Completed', 'Completed'],
  },
  {
    plant: 'Plant B-07 (Copper)',
    stages: ['Completed', 'Completed', 'In Progress', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending'],
  },
  {
    plant: 'Plant C-03 (Steel)',
    stages: ['Pending', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending', 'Pending'],
  },
];

const stageColor = (s) => {
  if (s === 'Completed') return 'bg-primary text-on-primary';
  if (s === 'In Progress') return 'bg-amber-400 text-white';
  if (s === 'Requires Review') return 'bg-error text-on-error';
  return 'bg-surface-container text-on-surface-variant';
};

export default function AnalysisStatus() {
  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Analysis Pipeline Status
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Monitor progress of the full EcoMetrix AI analysis pipeline across all registered plants.
        </p>
      </header>

      {/* Stage Header Legend */}
      <div className="grid grid-cols-8 gap-1 text-[10px] font-bold text-on-surface-variant uppercase mb-2 hidden md:grid px-md">
        {stages.map((s, i) => (
          <div key={i} className="text-center">{s}</div>
        ))}
      </div>

      {/* Pipeline Progress per Plant */}
      <div className="space-y-md">
        {plantsProgress.map((p, pi) => (
          <div key={pi} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
            <h3 className="font-bold text-sm text-on-surface mb-md">{p.plant}</h3>

            {/* Desktop Pipeline */}
            <div className="hidden md:flex items-center gap-1">
              {p.stages.map((stage, si) => (
                <React.Fragment key={si}>
                  <div className={`flex-1 text-center py-1.5 rounded text-[10px] font-bold ${stageColor(stage)}`}>
                    {stage === 'Completed' ? '✓' : stage === 'In Progress' ? '▶' : '○'} {stages[si]}
                  </div>
                  {si < p.stages.length - 1 && (
                    <span className={`text-sm ${stage === 'Completed' ? 'text-primary' : 'text-outline-variant'}`}>›</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Mobile Stages List */}
            <div className="md:hidden space-y-1">
              {stages.map((stage, si) => (
                <div key={si} className="flex justify-between items-center text-xs">
                  <span className="text-on-surface-variant">{stage}</span>
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${stageColor(p.stages[si])}`}>
                    {p.stages[si]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-gutter text-xs mt-md">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-primary inline-block"></span> Completed</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-amber-400 inline-block"></span> In Progress</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-error inline-block"></span> Requires Review</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-surface-container inline-block border border-outline-variant"></span> Pending</span>
      </div>
    </div>
  );
}
