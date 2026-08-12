import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDataset } from '../context/DataContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { metrics, activeFileName, selectedMetal, setSelectedMetal } = useDataset();
  const navigate = useNavigate();

  if (!metrics) return null;

  const scope1 = (parseFloat(metrics.totalCO2Tons) * 0.35).toFixed(1);
  const scope2 = (parseFloat(metrics.totalCO2Tons) * 0.49).toFixed(1);
  const scope3 = (parseFloat(metrics.totalCO2Tons) * 0.16).toFixed(1);

  return (
    <div className="space-y-lg">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-surface-container-lowest border border-outline-variant rounded-xl p-lg gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Live Operational Intelligence Active — {activeFileName}
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Welcome back, {user?.name || 'Alex Rivera'}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {user?.plant || 'Plant A-12'} | Active Dataset: <span className="font-semibold text-primary">{metrics.totalCount} Records ({metrics.totalQuantityTons} tonnes metal)</span>
          </p>
        </div>

        {/* Metal Filter & Actions */}
        <div className="flex flex-wrap items-center gap-md">
          <div className="flex items-center gap-1 bg-surface-bright border border-outline-variant p-1 rounded-lg text-xs font-semibold">
            {['All', 'Aluminium', 'Steel', 'Copper'].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMetal(m)}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  selectedMetal === m ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

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

      {/* Scope 1, 2, 3 KPI Cards - Live Data Driven */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">Total CO2 Emissions</span>
            <span className="material-symbols-outlined text-primary text-xl">speed</span>
          </div>
          <div className="font-mono-data text-2xl font-bold text-on-background">
            {metrics.totalCO2Tons} <span className="text-xs font-normal text-on-surface-variant">tCO2e</span>
          </div>
          <div className="text-[11px] text-primary font-semibold mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">analytics</span>
            Intensity: {metrics.carbonIntensityPerKg} kg CO2/kg metal
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">Scope 1 Direct</span>
            <span className="material-symbols-outlined text-secondary text-xl">factory</span>
          </div>
          <div className="font-mono-data text-2xl font-bold text-on-background">
            {scope1} <span className="text-xs font-normal text-on-surface-variant">tCO2e</span>
          </div>
          <div className="text-[11px] text-on-surface-variant mt-2">Smelter fuel &amp; process thermal (35%)</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">Scope 2 Electricity</span>
            <span className="material-symbols-outlined text-tertiary text-xl">bolt</span>
          </div>
          <div className="font-mono-data text-2xl font-bold text-on-background">
            {scope2} <span className="text-xs font-normal text-on-surface-variant">tCO2e</span>
          </div>
          <div className="text-[11px] text-on-surface-variant mt-2">Grid power ({metrics.totalEnergyMwh} MWh total)</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-on-surface-variant uppercase">Scope 3 Freight &amp; Supply</span>
            <span className="material-symbols-outlined text-on-surface-variant text-xl">local_shipping</span>
          </div>
          <div className="font-mono-data text-2xl font-bold text-on-background">
            {scope3} <span className="text-xs font-normal text-on-surface-variant">tCO2e</span>
          </div>
          <div className="text-[11px] text-on-surface-variant mt-2">{metrics.totalTransportKm} km total freight distance</div>
        </div>
      </div>

      {/* Main Grid: Hotspot Breakdown & Metal Intensity Breakdown */}
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
                Smelting &amp; Refining ({metrics.hotspots.topEmittingMetal} Priority)
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Accounts for <span className="font-bold text-error">42% ({metrics.hotspots.smeltingCO2Tons} tCO2e)</span> of total dataset emissions. Grid power intensity and virgin material fraction are primary drivers.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Smelting Electrolysis</span>
                <span className="font-mono-data font-bold text-error">42% ({metrics.hotspots.smeltingCO2Tons} t)</span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div className="bg-error h-full w-[42%]"></div>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Raw Material Extraction</span>
                <span className="font-mono-data font-bold text-primary">27% ({metrics.hotspots.miningCO2Tons} t)</span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[27%]"></div>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Freight Transport</span>
                <span className="font-mono-data font-bold text-tertiary">14% ({metrics.hotspots.transportCO2Tons} t)</span>
              </div>
              <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full w-[14%]"></div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={() => navigate('/recommendations')}
              className="w-full bg-surface-bright border border-outline-variant hover:bg-surface-container-low text-xs font-semibold py-2 rounded text-primary flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              View Mitigation Recommendations <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Metal Category Breakdown Cards (Spans 7 columns) */}
        <section className="xl:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <div className="flex justify-between items-center mb-md border-b border-outline-variant pb-sm">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Material Category Emissions</h3>
              <p className="text-xs text-on-surface-variant">Real-time aggregation from PS 25069 Dataset</p>
            </div>
            <span className="text-xs font-mono-data text-primary font-bold">Avg Circularity: {metrics.avgCircularity}/100</span>
          </div>

          {/* Metal Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md mb-md">
            {metrics.metalStats.map((ms) => (
              <div key={ms.metal} className="p-md bg-surface-bright border border-outline-variant rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-on-surface">{ms.metal}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-primary-container/20 text-primary rounded">{ms.count} Batches</span>
                </div>
                <div className="font-mono-data text-xl font-bold text-on-surface">{ms.co2_tons} <span className="text-xs text-on-surface-variant">tCO2e</span></div>
                <div className="text-xs text-on-surface-variant space-y-0.5 pt-1 border-t border-outline-variant/60">
                  <div className="flex justify-between"><span>Volume:</span><span className="font-bold">{ms.quantity_tons} t</span></div>
                  <div className="flex justify-between"><span>Recycled %:</span><span className="font-bold text-primary">{ms.avgRecycledPct}%</span></div>
                  <div className="flex justify-between"><span>Circularity:</span><span className="font-bold text-tertiary">{ms.avgCircularity}/100</span></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-on-surface-variant">
            <span>Overall Dataset Circularity Index: <strong className="text-primary">{metrics.avgCircularity}/100</strong> ({metrics.avgRecycledPct}% Recycled Material Input)</span>
            <button
              onClick={() => navigate('/lca')}
              className="text-primary hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              Explore Full LCA <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
