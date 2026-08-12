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

  // Dynamic benchmarks (World association values in kg CO2e / kg metal)
  const benchmarks = {
    'Steel': 1.8,
    'Aluminium': 8.0,
    'Copper': 2.5,
    'All': 4.1
  };
  const activeBenchmark = benchmarks[selectedMetal] || 4.1;
  const currentIntensity = parseFloat(metrics.carbonIntensityPerKg) || 0;

  // SVG Gauge Donut chart values
  const fuelMix = [
    { label: 'Coal', percentage: 60, color: '#4b5563' },
    { label: 'Hydro', percentage: 25, color: '#3b82f6' },
    { label: 'Solar/Wind', percentage: 15, color: '#10b981' }
  ];

  // Circle path parameters
  const radius = 35;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

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
        
        {/* KPI Cards Row */}
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

        {/* Global Benchmark & Grid Power Mix Row */}
        <div className="xl:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Column 1: Benchmark Overlay Comparison (Spans 6 columns) */}
          <div className="lg:col-span-6 premium-card rounded-xl p-[24px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40">
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Global Carbon Benchmark</h3>
                <span className="text-[10px] font-mono-data bg-primary-container/10 border border-primary/20 text-primary font-bold px-2 py-0.5 rounded-lg">
                  {selectedMetal} Sourcing
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Comparison of the active plant's carbon intensity vs. standard global benchmarks published by the World Steel &amp; Metals Associations.
              </p>

              {/* Benchmark Bar with Dotted Line */}
              <div className="pt-2 space-y-4">
                <div className="relative">
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-on-surface-variant">Active Sourcing Footprint</span>
                    <span className="text-primary font-mono-data"><AnimatedNumber value={currentIntensity} decimals={2} /> kg CO2/kg</span>
                  </div>
                  <div className="w-full bg-surface-container-low h-[10px] rounded-full overflow-hidden">
                    <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${Math.min(100, (currentIntensity / Math.max(12, activeBenchmark * 1.5)) * 100)}%` }}></div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex justify-between text-xs mb-1 font-semibold">
                    <span className="text-on-surface-variant">Global Benchmark Target</span>
                    <span className="text-on-surface-variant font-mono-data">{activeBenchmark} kg CO2/kg</span>
                  </div>
                  <div className="w-full bg-surface-container-low h-[10px] rounded-full overflow-hidden relative">
                    <div className="bg-outline h-full transition-all duration-1000" style={{ width: `${Math.min(100, (activeBenchmark / Math.max(12, activeBenchmark * 1.5)) * 100)}%` }}></div>
                    {/* Dashed Overlay Indicator */}
                    <div className="absolute top-0 bottom-0 border-l border-dashed border-on-surface-variant" style={{ left: `${Math.min(100, (activeBenchmark / Math.max(12, activeBenchmark * 1.5)) * 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/40 mt-4 text-xs text-on-surface-variant">
              Status: {currentIntensity <= activeBenchmark ? (
                <span className="text-primary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Compliance Verified (Within global emissions limit of {activeBenchmark} kg)
                </span>
              ) : (
                <span className="text-error font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  Exceeds Benchmark (Optimize furnace fuel/mix to offset remaining {(currentIntensity - activeBenchmark).toFixed(2)} kg)
                </span>
              )}
            </div>
          </div>

          {/* Column 2: Grid Power Mix Analysis (Spans 6 columns) */}
          <div className="lg:col-span-6 premium-card rounded-xl p-[24px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40">
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Grid Power Fuel Mix</h3>
                <span className="text-[10px] font-mono-data bg-tertiary-container/10 border border-tertiary/20 text-tertiary font-bold px-2 py-0.5 rounded-lg">
                  Scope 2 Impact
                </span>
              </div>

              <div className="flex items-center gap-6 pt-1">
                {/* Donut Gauge Chart SVG */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--color-outline-variant)" strokeOpacity="0.15" strokeWidth={strokeWidth} />
                    {fuelMix.map((f, i) => {
                      const strokeDasharray = `${(f.percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -currentOffset;
                      currentOffset += (f.percentage / 100) * circumference;
                      return (
                        <circle
                          key={i}
                          cx="50"
                          cy="50"
                          r={radius}
                          fill="none"
                          stroke={f.color}
                          strokeWidth={strokeWidth}
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-500 ease-out"
                        />
                      );
                    })}
                  </svg>
                  {/* Inside Circle Label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-bold text-on-surface">Grid</span>
                    <span className="text-[9px] text-on-surface-variant font-mono-data font-bold">CEA Mix</span>
                  </div>
                </div>

                {/* Legend list */}
                <div className="flex-1 space-y-2">
                  {fuelMix.map((f) => (
                    <div key={f.label} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1.5 font-medium text-on-surface-variant">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: f.color }}></span>
                        <span>{f.label}</span>
                      </div>
                      <span className="font-mono-data font-bold text-on-surface">{f.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/40 mt-4 text-xs text-on-surface-variant leading-relaxed">
              Purchased grid power emits <strong className="text-on-surface">0.82 kg CO2 per kWh</strong>. Shifting to renewable on-site generation or sourcing Hydro/Solar PPA credits offsets Scope 2 emissions.
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
