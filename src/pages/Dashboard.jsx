import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-lg">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-surface-container-lowest border border-outline-variant rounded-xl p-lg gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Operational Intelligence Active
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Welcome back, {user?.name || 'Engineer'}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {user?.plant || 'Plant A-12'} | Primary Material: <span className="font-semibold text-primary">{user?.material || 'Aluminium'}</span>
          </p>
        </div>

        <div className="flex gap-md">
          <button
            onClick={() => navigate('/upload')}
            className="bg-primary-container text-on-primary font-label-md text-xs py-2 px-4 rounded hover:bg-primary transition-colors flex items-center gap-2 font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">upload_file</span>
            Upload Data
          </button>
          <button
            onClick={() => navigate('/simulator')}
            className="bg-surface-bright text-on-surface border border-outline-variant font-label-md text-xs py-2 px-4 rounded hover:bg-surface-container-low transition-colors flex items-center gap-2 font-semibold cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">precision_manufacturing</span>
            Run Simulator
          </button>
        </div>
      </div>

      {/* Scope 1, 2, 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">Total Intensity</span>
            <span className="material-symbols-outlined text-primary text-xl">speed</span>
          </div>
          <div className="font-mono-data text-2xl font-bold text-on-background">14.2 <span className="text-xs font-normal text-on-surface-variant">tCO2e/t</span></div>
          <div className="text-[11px] text-primary font-semibold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">trending_down</span> -4.2% from last quarter
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">Scope 1 Direct</span>
            <span className="material-symbols-outlined text-secondary text-xl">factory</span>
          </div>
          <div className="font-mono-data text-2xl font-bold text-on-background">4.8 <span className="text-xs font-normal text-on-surface-variant">tCO2e/t</span></div>
          <div className="text-[11px] text-on-surface-variant mt-2">Smelter fuel &amp; process emissions</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">Scope 2 Electricity</span>
            <span className="material-symbols-outlined text-tertiary text-xl">bolt</span>
          </div>
          <div className="font-mono-data text-2xl font-bold text-on-background">6.9 <span className="text-xs font-normal text-on-surface-variant">tCO2e/t</span></div>
          <div className="text-[11px] text-on-surface-variant mt-2">Grid power consumption</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">Scope 3 Value Chain</span>
            <span className="material-symbols-outlined text-on-surface-variant text-xl">local_shipping</span>
          </div>
          <div className="font-mono-data text-2xl font-bold text-on-background">2.5 <span className="text-xs font-normal text-on-surface-variant">tCO2e/t</span></div>
          <div className="text-[11px] text-on-surface-variant mt-2">Upstream freight &amp; raw materials</div>
        </div>
      </div>

      {/* Main Grid: Hotspot Breakdown & Quarterly Timeline */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Hotspot Card (Spans 5 columns) */}
        <section className="xl:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Hotspot Alert</h3>
              <span className="bg-error-container text-error text-[10px] font-bold px-2 py-0.5 rounded">Action Required</span>
            </div>

            <div className="p-4 bg-error-container/20 border border-error/30 rounded-lg mb-md">
              <div className="flex items-center gap-2 text-error font-bold text-sm mb-1">
                <span className="material-symbols-outlined text-base">warning</span>
                Metal Production (Smelting)
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Accounts for <span className="font-bold text-error">42%</span> of total lifecycle emissions. Anode degradation and electricity grid intensity are primary contributors.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Smelting Electrolysis</span>
                <span className="font-mono-data font-bold text-error">42%</span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div className="bg-error h-full w-[42%]"></div>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Bauxite Mining</span>
                <span className="font-mono-data font-bold text-primary">27%</span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[27%]"></div>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Freight Transportation</span>
                <span className="font-mono-data font-bold text-tertiary">14%</span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full w-[14%]"></div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => navigate('/recommendations')}
              className="w-full bg-surface-bright border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2 rounded text-primary flex items-center justify-center gap-1 transition-colors"
            >
              View Mitigation Recommendations <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Emission Timeline Chart (Spans 7 columns) */}
        <section className="xl:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Emission Intensity Timeline</h3>
              <p className="text-xs text-on-surface-variant">Monthly tCO2e per tonne of aluminium produced</p>
            </div>
            <span className="text-xs font-mono-data text-primary font-bold">2026 Target: 12.0 tCO2e/t</span>
          </div>

          {/* Bar Chart Representation */}
          <div className="h-52 flex items-end justify-between gap-4 pt-6 pb-2 px-2 border-b border-outline-variant">
            {[
              { month: 'Jan', val: 15.4, pct: '80%' },
              { month: 'Feb', val: 15.1, pct: '78%' },
              { month: 'Mar', val: 14.8, pct: '75%' },
              { month: 'Apr', val: 14.6, pct: '73%' },
              { month: 'May', val: 14.5, pct: '72%' },
              { month: 'Jun', val: 14.2, pct: '70%' },
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono-data text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.val}
                </span>
                <div className="w-full bg-surface-container-low rounded-t flex items-end h-36">
                  <div
                    className="w-full bg-primary rounded-t transition-all duration-300 group-hover:bg-primary-fixed-variant"
                    style={{ height: d.pct }}
                  ></div>
                </div>
                <span className="text-xs text-on-surface-variant font-medium">{d.month}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-between items-center text-xs text-on-surface-variant">
            <span>Overall trajectory: On track for Q4 decarbonization targets.</span>
            <button
              onClick={() => navigate('/lca')}
              className="text-primary hover:underline font-semibold flex items-center gap-1"
            >
              Explore Full LCA <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
