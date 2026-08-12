import React from 'react';
import { useDataset } from '../context/DataContext';
import LifecycleImpactLandscape from '../components/LifecycleImpactLandscape';
import AnimatedNumber from '../components/AnimatedNumber';

function MetricCard({ icon, tone, title, value, unit, detail, detailVal, detailUnit }) {
  return (
    <div className="premium-card rounded-xl p-md flex items-center gap-md">
      <div className={`w-10 h-10 rounded-lg ${tone} flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h4 className="font-label-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">{title}</h4>
        <div className="font-mono-data text-xl font-bold text-on-background">
          <AnimatedNumber value={value} decimals={value % 1 === 0 ? 0 : 1} /> <span className="text-xs text-gray-500 font-normal">{unit}</span>
        </div>
        <span className="text-[11px] text-on-surface-variant font-semibold">
          {detailVal !== undefined ? (
            <>
              <AnimatedNumber value={detailVal} decimals={2} /> {detailUnit}
            </>
          ) : (
            detail
          )}
        </span>
      </div>
    </div>
  );
}

export default function LCA() {
  const { metrics, selectedMetal, setSelectedMetal } = useDataset();
  if (!metrics) return null;

  const waterIntensity = (metrics.totalWaterL / metrics.totalQuantityKg).toFixed(1);

  return (
    <main className="space-y-gutter">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-outline-variant/45">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-background">Lifecycle Assessment (LCA)</h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            ISO 14040/44 environmental impact analysis calculated live from the active dataset ({metrics.totalCount} batches).
          </p>
        </div>
        <div className="flex items-center gap-1 bg-surface-bright border border-outline-variant p-1 rounded-lg text-xs font-semibold">
          {['All', 'Aluminium', 'Steel', 'Copper'].map((metal) => (
            <button
              key={metal}
              onClick={() => setSelectedMetal(metal)}
              className={`px-3 py-1 rounded transition-all duration-200 cursor-pointer ${
                selectedMetal === metal ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {metal}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        <LifecycleImpactLandscape stages={metrics.lifecycleStages} />
        <div className="xl:col-span-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-gutter animate-fade-in-up">
          <MetricCard 
            icon="co2" 
            tone="bg-emerald-100/70 text-emerald-800" 
            title="Total Carbon Emissions" 
            value={metrics.totalCO2Tons} 
            unit="tCO2e" 
            detailVal={metrics.carbonIntensityPerKg} 
            detailUnit="kg CO2e / kg metal" 
          />
          <MetricCard 
            icon="bolt" 
            tone="bg-blue-100/70 text-blue-800" 
            title="Total Energy Consumption" 
            value={metrics.totalEnergyMwh} 
            unit="MWh" 
            detailVal={metrics.energyIntensityPerKg} 
            detailUnit="kWh / kg metal" 
          />
          <MetricCard 
            icon="water_drop" 
            tone="bg-teal-100/70 text-teal-800" 
            title="Water Impact" 
            value={metrics.totalWaterM3} 
            unit="m³" 
            detailVal={waterIntensity} 
            detailUnit="L / kg metal" 
          />
          <MetricCard 
            icon="recycling" 
            tone="bg-green-100/70 text-green-800" 
            title="Recovery & Recycled" 
            value={metrics.avgRecycledPct} 
            unit="% recycled" 
            detail={`${metrics.avgRecoveryPct}% recovery rate`} 
          />
        </div>
      </div>
    </main>
  );
}
