import React, { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Alex Rivera', email: 'alex.r@ecometrix.ai', role: 'Engineer', plant: 'Plant A-12', status: 'Active' },
  { id: 2, name: 'Dr. Elena Vance', email: 'elena.v@ecometrix.ai', role: 'Auditor', plant: 'Plant A-12', status: 'Active' },
  { id: 3, name: 'Marcus Vance', email: 'marcus.v@ecometrix.ai', role: 'Admin', plant: 'EcoMetrix Global', status: 'Active' },
  { id: 4, name: 'Priya Singh', email: 'priya.s@ecometrix.ai', role: 'Engineer', plant: 'Plant B-07', status: 'Active' },
  { id: 5, name: 'Samuel Ndlovu', email: 'samuel.n@ecometrix.ai', role: 'Auditor', plant: 'Plant B-07', status: 'Inactive' },
  { id: 6, name: 'Arjun Mehta', email: 'arjun.m@ecometrix.ai', role: 'Engineer', plant: 'Plant C-03', status: 'Active' },
];

const roleBadge = (role) => {
  if (role === 'Admin') return 'bg-secondary-container/30 text-secondary';
  if (role === 'Auditor') return 'bg-tertiary-container/30 text-tertiary';
  return 'bg-primary-container/20 text-primary';
};

export default function UserRoles() {
  const [users, setUsers] = useState(initialUsers);

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      <header className="mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mb-sm">
          User Roles &amp; Access Management
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          View and manage role assignments across all EcoMetrix AI system users.
        </p>
      </header>

      {/* Role Legend */}
      <div className="flex flex-wrap gap-sm text-xs mb-md">
        <span className="flex items-center gap-1.5 bg-primary-container/20 text-primary px-3 py-1 rounded-full font-bold">
          <span className="material-symbols-outlined text-sm">engineering</span> Engineer — Operate &amp; Analyze
        </span>
        <span className="flex items-center gap-1.5 bg-tertiary-container/30 text-tertiary px-3 py-1 rounded-full font-bold">
          <span className="material-symbols-outlined text-sm">verified_user</span> Auditor — Verify &amp; Validate
        </span>
        <span className="flex items-center gap-1.5 bg-secondary-container/30 text-secondary px-3 py-1 rounded-full font-bold">
          <span className="material-symbols-outlined text-sm">admin_panel_settings</span> Admin — Oversee &amp; Manage
        </span>
      </div>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="p-md bg-surface-bright border-b border-outline-variant">
          <h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">User Registry</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-surface font-label-md uppercase text-on-surface-variant border-b border-outline-variant">
                <th className="py-sm px-md font-semibold">User</th>
                <th className="py-sm px-md font-semibold">Email</th>
                <th className="py-sm px-md font-semibold">Role</th>
                <th className="py-sm px-md font-semibold">Plant</th>
                <th className="py-sm px-md font-semibold text-center">Status</th>
                <th className="py-sm px-md font-semibold text-right">Access</th>
              </tr>
            </thead>
            <tbody className="text-on-surface">
              {users.map((u) => (
                <tr key={u.id} className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                  <td className="py-sm px-md font-semibold">{u.name}</td>
                  <td className="py-sm px-md text-on-surface-variant font-mono-data">{u.email}</td>
                  <td className="py-sm px-md">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${roleBadge(u.role)}`}>{u.role}</span>
                  </td>
                  <td className="py-sm px-md">{u.plant}</td>
                  <td className="py-sm px-md text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${u.status === 'Active' ? 'bg-primary-container/20 text-primary' : 'bg-surface-container text-on-surface-variant'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-sm px-md text-right">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                        u.status === 'Active'
                          ? 'border-outline-variant text-error hover:bg-error-container'
                          : 'border-primary text-primary hover:bg-primary-container/20'
                      }`}
                    >
                      {u.status === 'Active' ? 'Disable' : 'Enable'}
                    </button>
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
