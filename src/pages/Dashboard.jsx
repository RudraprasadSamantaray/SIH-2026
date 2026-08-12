import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDataset } from '../context/DataContext';
import AnimatedNumber from '../components/AnimatedNumber';

function SparklineTrendChart({ filteredRows }) {
  // Aggregate emissions by month
  const monthlyData = {};
  filteredRows.forEach((r) => {
    if (r.date) {
      const monthKey = r.date.substring(0, 7); // e.g. "2024-01"
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { co2Kg: 0, count: 0 };
      }
      monthlyData[monthKey].co2Kg += r.co2_kg || 0;
      monthlyData[monthKey].count += 1;
    }
  });

  const sortedMonths = Object.keys(monthlyData).sort();
  if (sortedMonths.length < 2) return null;

  const dataPoints = sortedMonths.map((m) => ({
    month: m,
    co2Tons: (monthlyData[m].co2Kg / 1000).toFixed(1)
  }));

  const values = dataPoints.map((d) => parseFloat(d.co2Tons));
  const maxVal = Math.max(...values) * 1.1; // 10% ceiling padding
  const minVal = Math.max(0, Math.min(...values) * 0.9); // 10% floor padding
  const valRange = maxVal - minVal || 1;

  // SVG parameters
  const width = 600;
  const height = 140;
  const paddingX = 40;
  const paddingY = 25;

  const points = dataPoints.map((d, index) => {
    const x = paddingX + (index / (dataPoints.length - 1)) * (width - 2 * paddingX);
    const y = height - paddingY - ((parseFloat(d.co2Tons) - minVal) / valRange) * (height - 2 * paddingY);
    return { x, y, month: d.month, val: d.co2Tons };
  });

  // Path generator
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const isDecreasing = values[values.length - 1] < values[0];

  return (
    <div className="premium-card rounded-xl p-[24px]">
      <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40 mb-4">
        <div>
          <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">Historical Emissions Trend</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">Month-over-month carbon intensity lifecycle assessment (tCO2e)</p>
        </div>
        <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 border ${
          isDecreasing 
            ? 'bg-primary/10 text-primary border-primary/20' 
            : 'bg-error/10 text-error border-error/20'
        }`}>
          <span className="material-symbols-outlined text-xs">
            {isDecreasing ? 'trending_down' : 'trending_up'}
          </span>
          {isDecreasing ? 'Emissions Decreasing' : 'Emissions Increasing'}
        </span>
      </div>

      <div className="relative pt-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid Guideline lines */}
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="var(--color-outline-variant)" strokeOpacity="0.4" strokeWidth="1" />
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="var(--color-outline-variant)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3" />

          {/* Gradient area fill */}
          <path d={areaPath} fill="url(#sparklineGrad)" />

          {/* Connection line */}
          <path d={linePath} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Active Data Nodes */}
          {points.map((p, idx) => {
            const dateObj = new Date(p.month + '-02'); // add day to bypass TZ anomalies
            const monthLabel = dateObj.toLocaleDateString('en-US', { month: 'short' });
            return (
              <g key={idx} className="group cursor-pointer">
                {/* Visual Circle dot */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="4.5"
                  fill="#ffffff"
                  stroke="var(--color-primary)"
                  strokeWidth="2.5"
                  className="transition-all duration-200 group-hover:r-6"
                />

                {/* Floating tooltip labels on hover */}
                <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <rect
                    x={p.x - 30}
                    y={p.y - 28}
                    width="60"
                    height="20"
                    rx="6"
                    fill="var(--color-on-background)"
                    className="shadow-sm"
                  />
                  <text
                    x={p.x}
                    y={p.y - 15}
                    textAnchor="middle"
                    fill="#ffffff"
                    className="text-[9px] font-bold font-mono-data"
                  >
                    {p.val}t
                  </text>
                </g>

                {/* X Axis Month Label */}
                <text
                  x={p.x}
                  y={height - 5}
                  textAnchor="middle"
                  className="text-[10px] font-medium fill-on-surface-variant font-sans"
                >
                  {monthLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { metrics, activeFileName, selectedMetal, setSelectedMetal, filteredRows } = useDataset();
  const navigate = useNavigate();

  if (!metrics) return null;

  const scope1 = (parseFloat(metrics.totalCO2Tons) * 0.35).toFixed(1);
  const scope2 = (parseFloat(metrics.totalCO2Tons) * 0.49).toFixed(1);
  const scope3 = (parseFloat(metrics.totalCO2Tons) * 0.16).toFixed(1);

  // Derive available metals dynamically from dataset
  const availableMetals = ['All', ...metrics.metalStats.map((ms) => ms.metal || ms.material)];

  // Hotspot bar widths (computed from actual lifecycle allocations)
  const smeltingPct = 42;
  const miningPct = 27;
  const transportPct = 14;

  return (
    <div className="space-y-[32px] animate-fade-in-up">
      {/* Top Header / Redesigned Banner without unnecessary borders/boxes */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-outline-variant/40">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            LIVE OPERATIONAL INTELLIGENCE ACTIVE
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-on-surface">
            Welcome back, {user?.name || 'Alex Rivera'}
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant mt-1.5">
            {user?.plant || 'Plant A-12'} · {user?.material || 'Aluminium'} · {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Operations Engineer'}
            <span className="mx-2 text-outline-variant/60">|</span>
            Dataset: <span className="font-semibold text-on-surface">{activeFileName}</span> ({metrics.totalCount} Records, <AnimatedNumber value={metrics.totalQuantityTons} decimals={1} />t metal)
          </p>
        </div>

        {/* Metal Filter & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-surface-container-low border border-outline-variant/50 p-1 rounded-lg text-xs font-semibold">
            {availableMetals.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMetal(m)}
                className={`px-3 py-1 rounded transition-all duration-150 cursor-pointer ${
                  selectedMetal === m ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('/upload')}
            className="bg-primary hover:bg-primary/95 text-on-primary text-xs font-semibold py-2 px-4 rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-97 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">upload_file</span>
            Upload Data
          </button>
          <button
            onClick={() => navigate('/simulator')}
            className="bg-surface-container-lowest text-on-surface border border-outline-variant/70 text-xs font-semibold py-2 px-4 rounded-lg hover:bg-surface-container-low transition-all flex items-center gap-1.5 shadow-sm active:scale-97 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">precision_manufacturing</span>
            Run Simulator
          </button>
        </div>
      </div>

      {/* Scope 1, 2, 3 KPI Cards - Visually lighter, minimal borders, low shadow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-[20px]">
        {/* KPI 1 */}
        <div className="premium-card rounded-xl p-[22px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total CO2 Emissions</span>
            <span className="material-symbols-outlined text-primary text-xl">speed</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-on-surface font-mono-data">
            <AnimatedNumber value={metrics.totalCO2Tons} decimals={2} /> <span className="text-sm font-normal text-on-surface-variant">tCO2e</span>
          </div>
          <div className="text-xs text-primary font-medium mt-3 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">analytics</span>
            Intensity: <AnimatedNumber value={metrics.carbonIntensityPerKg} decimals={2} /> kg CO2/kg metal
          </div>
        </div>

        {/* KPI 2 */}
        <div className="premium-card rounded-xl p-[22px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Scope 1 Direct</span>
            <span className="material-symbols-outlined text-on-surface-variant/80 text-xl">factory</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-on-surface font-mono-data">
            <AnimatedNumber value={scope1} decimals={1} /> <span className="text-sm font-normal text-on-surface-variant">tCO2e</span>
          </div>
          <div className="text-xs text-on-surface-variant mt-3">Smelter fuel &amp; process thermal (35%)</div>
        </div>

        {/* KPI 3 */}
        <div className="premium-card rounded-xl p-[22px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Scope 2 Electricity</span>
            <span className="material-symbols-outlined text-on-surface-variant/80 text-xl">bolt</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-on-surface font-mono-data">
            <AnimatedNumber value={scope2} decimals={1} /> <span className="text-sm font-normal text-on-surface-variant">tCO2e</span>
          </div>
          <div className="text-xs text-on-surface-variant mt-3">Grid power (<AnimatedNumber value={metrics.totalEnergyMwh} decimals={1} /> MWh total)</div>
        </div>

        {/* KPI 4 */}
        <div className="premium-card rounded-xl p-[22px]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Scope 3 Freight</span>
            <span className="material-symbols-outlined text-on-surface-variant/80 text-xl">local_shipping</span>
          </div>
          <div className="text-3xl font-bold tracking-tight text-on-surface font-mono-data">
            <AnimatedNumber value={scope3} decimals={1} /> <span className="text-sm font-normal text-on-surface-variant">tCO2e</span>
          </div>
          <div className="text-xs text-on-surface-variant mt-3"><AnimatedNumber value={metrics.totalTransportKm} decimals={0} /> km total freight distance</div>
        </div>
      </div>

      {/* Main Grid: Hotspot Breakdown & Metal Intensity Breakdown in 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px]">
        
        {/* Left Column: Hotspot Alert (Spans 6 columns) */}
        <section className="lg:col-span-6 premium-card rounded-xl p-[24px] flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40">
              <h3 className="text-lg font-bold text-on-surface">Hotspot Alert</h3>
              <span className="bg-error/10 text-error text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-error/25">Action Required</span>
            </div>

            {/* Alert Container */}
            <div className="p-4 bg-error/5 border border-error/15 rounded-xl flex gap-3">
              <span className="material-symbols-outlined text-error text-xl flex-shrink-0 mt-0.5">warning</span>
              <div className="space-y-1">
                <div className="font-semibold text-error text-xs uppercase tracking-wider">
                  Smelting &amp; Refining ({metrics.hotspots.topEmittingMetal} Priority)
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Accounts for <span className="font-bold text-error">42% (<AnimatedNumber value={metrics.hotspots.smeltingCO2Tons} decimals={1} /> tCO2e)</span> of total dataset emissions. Grid power intensity and virgin material fraction are primary drivers.
                </p>
              </div>
            </div>

            {/* Clean Progress Bars (No outer card boxes!) */}
            <div className="space-y-4 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-on-surface-variant font-medium">Smelting Electrolysis</span>
                  <span className="font-mono-data font-bold text-error">42% (<AnimatedNumber value={metrics.hotspots.smeltingCO2Tons} decimals={1} /> t)</span>
                </div>
                <div className="w-full bg-surface-container-low h-[7px] rounded-full overflow-hidden">
                  <div className="bg-error h-full transition-all duration-1000 ease-out" style={{ width: `${smeltingPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-on-surface-variant font-medium">Raw Material Extraction</span>
                  <span className="font-mono-data font-bold text-primary">27% (<AnimatedNumber value={metrics.hotspots.miningCO2Tons} decimals={1} /> t)</span>
                </div>
                <div className="w-full bg-surface-container-low h-[7px] rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all duration-1000 ease-out" style={{ width: `${miningPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-on-surface-variant font-medium">Freight Transport</span>
                  <span className="font-mono-data font-bold text-tertiary">14% (<AnimatedNumber value={metrics.hotspots.transportCO2Tons} decimals={1} /> t)</span>
                </div>
                <div className="w-full bg-surface-container-low h-[7px] rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full transition-all duration-1000 ease-out" style={{ width: `${transportPct}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-outline-variant/40 mt-6">
            <button
              onClick={() => navigate('/recommendations')}
              className="w-full bg-surface-container-lowest border border-outline-variant/60 hover:bg-surface-container-low text-xs font-semibold py-2.5 rounded-lg text-primary flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
            >
              View Mitigation Recommendations <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Right Column: Material Category Emissions (Spans 6 columns) */}
        <section className="lg:col-span-6 premium-card rounded-xl p-[24px] flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/40">
              <div>
                <h3 className="text-lg font-bold text-on-surface">Material Category Emissions</h3>
                <p className="text-xs text-on-surface-variant">Real-time aggregation from {activeFileName}</p>
              </div>
              <span className="text-xs font-mono-data bg-primary/10 text-primary border border-primary/15 font-bold px-2.5 py-1 rounded-lg">
                Avg Circularity: <AnimatedNumber value={metrics.avgCircularity} decimals={0} />/100
              </span>
            </div>

            {/* Comparison List Layout (Dividers instead of heavy floating cards) */}
            <div className="divide-y divide-outline-variant/40">
              {metrics.metalStats.map((ms) => {
                const metalName = ms.metal || ms.material;
                return (
                  <div key={metalName} className="py-3.5 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-on-surface">{metalName}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-surface-container-low text-on-surface-variant rounded-md">
                          {ms.count} Batches
                        </span>
                      </div>
                      <div className="text-[11px] text-on-surface-variant flex flex-wrap gap-x-2.5 gap-y-1 mt-0.5">
                        <span>Volume: <strong className="text-on-surface font-semibold"><AnimatedNumber value={ms.quantity_tons} decimals={1} />t</strong></span>
                        <span className="text-outline-variant/50">|</span>
                        <span>Recycled: <strong className="text-primary font-semibold"><AnimatedNumber value={ms.avgRecycledPct} decimals={0} />%</strong></span>
                        <span className="text-outline-variant/50">|</span>
                        <span>Circularity: <strong className="text-tertiary font-semibold"><AnimatedNumber value={ms.avgCircularity} decimals={0} />/100</strong></span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-on-surface font-mono-data">
                        <AnimatedNumber value={ms.co2_tons} decimals={2} /> <span className="text-xs text-on-surface-variant font-normal">tCO2e</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-5 border-t border-outline-variant/40 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-on-surface-variant">
            <span>Overall Circularity Index: <strong className="text-primary font-semibold"><AnimatedNumber value={metrics.avgCircularity} decimals={0} />/100</strong></span>
            <button
              onClick={() => navigate('/lca')}
              className="text-primary hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
            >
              Explore Full LCA <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
        </section>

      </div>

      {/* Sparkline Trend Chart Card */}
      <SparklineTrendChart filteredRows={filteredRows} />
    </div>
  );
}
