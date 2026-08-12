import React, { useState } from 'react';

export default function DataVerification() {
  const [rows, setRows] = useState([
    { field: 'Production_kg',          value: '26,750 kg (30 batches)',              status: 'Verified',      note: 'Matches production log across all plants' },
    { field: 'Electricity_kWh',        value: '97,419 kWh total',                   status: 'Review Needed', note: 'Requires auxiliary meter reconciliation' },
    { field: 'Water_L',                value: '197,530 L total',                    status: 'Verified',      note: 'Municipal billing cross-checked' },
    { field: 'Virgin_Material_kg',     value: '14,825 kg (avg 49% of total input)', status: 'Verified',      note: 'Supplier certificates verified' },
    { field: 'Recycled_Material_kg',   value: '14,800 kg (avg 51% of total input)', status: 'Verified',      note: 'Scrap vendor delivery notes attached' },
    { field: 'Fuel_L',                 value: '2,105 L diesel total',               status: 'Verified',      note: 'Fuel receipt log matched' },
    { field: 'Transport_km',           value: '13,747 km total freight',            status: 'Review Needed', note: 'Rail vs road split to be confirmed' },
    { field: 'Waste_Loss_kg',          value: '2,866 kg manufacturing loss',        status: 'Verified',      note: 'Scrap weighbridge records checked' },
    { field: 'Recovered_Material_kg',  value: '18,463 kg recovered/recycled',       status: 'Verified',      note: 'EoL recovery manifests verified' },
  ]);


  const [activeNoteIdx, setActiveNoteIdx] = useState(null);
  const [tempNote, setTempNote] = useState('');

  const toggleStatus = (idx) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i === idx) {
          const nextStatus = row.status === 'Verified' ? 'Review Needed' : 'Verified';
          return { ...row, status: nextStatus };
        }
        return row;
      })
    );
  };

  const handleSaveNote = (idx) => {
    setRows((prev) =>
      prev.map((row, i) => (i === idx ? { ...row, note: tempNote } : row))
    );
    setActiveNoteIdx(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          Data Verification
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Independent verification of operational raw dataset values submitted by the Engineer.
        </p>
      </header>

      {/* Dataset Context Banner */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm text-xs">
        <div>
          <span className="font-bold text-tertiary uppercase text-[10px]">Submitted Dataset</span>
          <p className="font-semibold text-on-surface text-sm mt-0.5">Q3_Plant_A12_Emissions.xlsx (2.4 MB)</p>
          <span className="text-on-surface-variant">Data Period: Jul-Sep 2026 • 14,205 rows • 42 columns</span>
        </div>
        <div className="bg-surface-bright px-3 py-2 rounded border border-outline-variant font-mono-data">
          <span className="text-on-surface-variant">Audit Verification Score: </span>
          <span className="font-bold text-tertiary">4 / 5 Fields Verified</span>
        </div>
      </div>

      {/* Verification Table */}
      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-md bg-surface-bright border-b border-outline-variant">
          <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Submitted Fields Verification Table</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface font-label-md uppercase text-on-surface-variant border-b border-outline-variant">
                <th className="py-sm px-md font-semibold">Field</th>
                <th className="py-sm px-md font-semibold">Submitted Value</th>
                <th className="py-sm px-md font-semibold">Audit Status</th>
                <th className="py-sm px-md font-semibold">Audit Note</th>
                <th className="py-sm px-md font-semibold text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="font-mono-data text-on-surface">
              {rows.map((row, i) => (
                <tr key={i} className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                  <td className="py-sm px-md font-body-sm font-semibold">{row.field}</td>
                  <td className="py-sm px-md font-bold">{row.value}</td>
                  <td className="py-sm px-md">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        row.status === 'Verified' ? 'bg-primary-container/20 text-primary' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {row.status === 'Verified' ? '✓ Verified' : '⚠ Review Needed'}
                    </span>
                  </td>
                  <td className="py-sm px-md text-on-surface-variant font-normal">
                    {activeNoteIdx === i ? (
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          className="bg-surface border border-outline-variant px-2 py-1 rounded text-xs text-on-surface"
                        />
                        <button
                          onClick={() => handleSaveNote(i)}
                          className="bg-tertiary text-on-tertiary px-2 py-1 rounded text-[10px] font-bold"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <span>{row.note}</span>
                    )}
                  </td>
                  <td className="py-sm px-md text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(i)}
                        className="bg-surface-bright border border-outline-variant hover:bg-surface-container-low px-2.5 py-1 rounded text-[11px] font-semibold text-tertiary transition-colors cursor-pointer"
                      >
                        Toggle Status
                      </button>
                      <button
                        onClick={() => {
                          setActiveNoteIdx(i);
                          setTempNote(row.note);
                        }}
                        className="text-on-surface-variant hover:text-tertiary p-1"
                        title="Edit Note"
                      >
                        <span className="material-symbols-outlined text-sm">edit_note</span>
                      </button>
                    </div>
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
