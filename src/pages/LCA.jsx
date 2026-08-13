import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

function AluminiumRecoverySection({ rows }) {
  const aluminium = useMemo(() => rows.filter((row) => row.material?.toLowerCase() === 'aluminium'), [rows]);
  const processedTons = aluminium.reduce((total, row) => total + (row.production_kg || 0), 0) / 1000;
  const estimatedSludgeTons = aluminium.reduce((total, row) => total + (row.waste_loss_kg || 0), 0) / 1000;
  const recoveryPct = 70;
  const valuePerTon = 6000;
  const [sludgeTons, setSludgeTons] = useState(estimatedSludgeTons);
  const [selectedPathway, setSelectedPathway] = useState('cement');
  useEffect(() => setSludgeTons(estimatedSludgeTons), [estimatedSludgeTons]);
  const recoverableTons = sludgeTons * (recoveryPct / 100);
  const potentialValue = recoverableTons * valuePerTon;
  const pathways = [
    { id: 'cement', name: 'Cement / Construction', icon: 'apartment', share: 0.4, benefit: 'Displaces virgin mineral inputs' },
    { id: 'road', name: 'Road Construction', icon: 'add_road', share: 0.25, benefit: 'Supports aggregate substitution' },
    { id: 'geopolymer', name: 'Geopolymer / Bricks', icon: 'foundation', share: 0.2, benefit: 'Enables lower-clinker products' },
    { id: 'recovery', name: 'Industrial Material Recovery', icon: 'recycling', share: 0.15, benefit: 'Recovers usable material fractions' },
  ];
  const selected = pathways.find((pathway) => pathway.id === selectedPathway) || pathways[0];
  const selectedQuantity = recoverableTons * selected.share;
  if (!aluminium.length) return <section className="xl:col-span-12 premium-card rounded-xl p-lg"><h3 className="font-headline-sm text-lg font-bold text-on-surface">Aluminium Sludge &amp; By-Product Recovery</h3><p className="mt-2 text-sm text-on-surface-variant">No aluminium records are available in the active uploaded dataset.</p></section>;
  return <section className="xl:col-span-12 premium-card rounded-xl p-lg">
    <div className="flex flex-col gap-3 border-b border-outline-variant/60 pb-md md:flex-row md:items-start md:justify-between"><div><h3 className="font-headline-sm text-lg font-bold text-on-surface">Aluminium Sludge &amp; By-Product Recovery</h3><p className="mt-1 text-xs text-on-surface-variant">Estimated from aluminium production waste-loss records in the uploaded dataset; not a measured sludge field.</p></div><div className="rounded-lg border border-primary/20 bg-primary-container/15 px-3 py-2"><p className="text-[10px] font-bold uppercase tracking-wider text-primary">Estimated Potential Value</p><p className="font-mono-data text-xl font-bold text-primary">₹{Math.round(potentialValue).toLocaleString()}</p><p className="text-[10px] text-on-surface-variant">₹{valuePerTon.toLocaleString()} / recoverable ton assumption</p></div></div>
    <div className="mt-lg grid grid-cols-1 gap-md lg:grid-cols-3"><div className="rounded-xl border border-outline-variant bg-surface p-md"><p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Estimated material balance</p><div className="mt-4 space-y-3"><div className="rounded-lg bg-surface-container-low px-3 py-2"><p className="text-[11px] text-on-surface-variant">Total Aluminium Processed</p><p className="font-mono-data text-lg font-bold text-on-surface">{processedTons.toFixed(1)} tons</p></div><div className="flex justify-center text-primary"><span className="material-symbols-outlined">south</span></div><div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2"><p className="text-[11px] text-amber-800">Estimated Sludge / By-product Generated</p><p className="font-mono-data text-lg font-bold text-amber-800">{sludgeTons.toFixed(1)} tons</p></div><div className="flex justify-center text-primary"><span className="material-symbols-outlined">south</span></div><div className="rounded-lg border border-primary/20 bg-primary-container/15 px-3 py-2"><p className="text-[11px] text-primary">Recoverable / Reusable</p><p className="font-mono-data text-lg font-bold text-primary">{recoverableTons.toFixed(1)} tons <span className="text-xs">({recoveryPct}%)</span></p></div></div></div>
      <div className="lg:col-span-2 rounded-xl border border-outline-variant bg-[#f8fbf9] p-md"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">3D material flow</p><p className="mt-1 text-xs text-on-surface-variant">Select a potential reuse pathway to follow the recoverable stream.</p></div><span className="rounded-full bg-primary-container/20 px-2 py-1 text-[10px] font-bold text-primary">POTENTIAL REUSE</span></div><div className="mt-5 grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_42px_1fr_42px_1.4fr]"><div className="rounded-xl border border-primary/25 bg-white p-3 text-center shadow-[4px_5px_0_#dceee8]"><span className="material-symbols-outlined text-2xl text-primary">precision_manufacturing</span><p className="mt-1 text-xs font-bold text-on-surface">Aluminium Production</p></div><span className="material-symbols-outlined mx-auto rotate-90 text-primary md:rotate-0">arrow_forward</span><div className="rounded-xl border border-amber-200 bg-white p-3 text-center shadow-[4px_5px_0_#f8dfba]"><span className="material-symbols-outlined text-2xl text-amber-700">layers</span><p className="mt-1 text-xs font-bold text-on-surface">Estimated Sludge</p><p className="font-mono-data text-[10px] font-bold text-amber-800">{sludgeTons.toFixed(1)} t</p></div><span className="material-symbols-outlined mx-auto rotate-90 text-primary md:rotate-0">arrow_forward</span><div className="grid grid-cols-2 gap-2">{pathways.map((pathway) => <button key={pathway.id} onClick={() => setSelectedPathway(pathway.id)} className={`rounded-lg border p-2 text-left transition-all ${selected.id === pathway.id ? 'border-primary bg-primary-container/20 shadow-sm' : 'border-outline-variant bg-white hover:border-primary/50'}`}><span className={`material-symbols-outlined text-base ${selected.id === pathway.id ? 'text-primary' : 'text-on-surface-variant'}`}>{pathway.icon}</span><p className="mt-1 text-[10px] font-bold leading-tight text-on-surface">{pathway.name}</p></button>)}</div></div><div className="mt-5 rounded-lg border border-primary/20 bg-white p-3"><div className="flex flex-wrap items-center justify-between gap-2"><div><p className="text-[10px] font-bold uppercase tracking-wider text-primary">Selected potential use</p><p className="text-sm font-bold text-on-surface">{selected.name}</p></div><div className="flex gap-5"><div><p className="text-[10px] text-on-surface-variant">Potential quantity</p><p className="font-mono-data text-sm font-bold text-primary">{selectedQuantity.toFixed(1)} t</p></div><div><p className="text-[10px] text-on-surface-variant">Estimated value</p><p className="font-mono-data text-sm font-bold text-primary">₹{Math.round(selectedQuantity * valuePerTon).toLocaleString()}</p></div></div></div><p className="mt-2 text-[11px] text-on-surface-variant">Environmental benefit: {selected.benefit}.</p></div></div></div>
    <div className="mt-lg grid grid-cols-1 gap-md lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"><div className="rounded-xl border border-outline-variant bg-surface p-md"><div className="flex justify-between gap-4"><div><p className="text-sm font-bold text-on-surface">Dynamic sludge scenario</p><p className="mt-1 text-xs text-on-surface-variant">Adjust estimated by-product generation to demonstrate recovery potential.</p></div><p className="font-mono-data text-lg font-bold text-amber-800">{sludgeTons.toFixed(1)} t</p></div><input aria-label="Sludge Generated" type="range" min="0" max={Math.max(estimatedSludgeTons * 2, 1)} step="0.1" value={sludgeTons} onChange={(event) => setSludgeTons(Number(event.target.value))} className="mt-5 w-full accent-[var(--color-primary)]" /><div className="mt-3 grid grid-cols-3 gap-2 text-center"><div><p className="text-[10px] text-on-surface-variant">Recoverable</p><p className="font-mono-data text-sm font-bold text-primary">{recoverableTons.toFixed(1)} t</p></div><div><p className="text-[10px] text-on-surface-variant">Recovery potential</p><p className="font-mono-data text-sm font-bold text-primary">{recoveryPct}%</p></div><div><p className="text-[10px] text-on-surface-variant">Potential value</p><p className="font-mono-data text-sm font-bold text-primary">₹{Math.round(potentialValue).toLocaleString()}</p></div></div></div><div className="grid grid-cols-2 gap-md"><div className="rounded-xl border border-primary/20 bg-primary-container/10 p-md"><p className="text-[10px] font-bold uppercase tracking-wider text-primary">Environmental impact</p><p className="mt-3 text-xs leading-relaxed text-on-surface">↓ Waste sent to disposal<br />↑ Material recovery<br />↑ Circularity</p></div><div className="rounded-xl border border-outline-variant bg-surface p-md"><p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Business impact</p><p className="mt-3 text-xs leading-relaxed text-on-surface">↑ Potential material value<br />↓ Disposal burden<br />↑ Resource utilization</p></div></div></div>
  </section>;
}

function PathwayOptimization({ metrics, setSimControls, navigate }) {
  const [selectedId, setSelectedId] = useState(null);
  const [run, setRun] = useState(0);
  const scenario = useMemo(() => ({ recycledPctTarget: Math.max(metrics.avgRecycledPct, 65), renewableEnergyPct: 60, railShiftPct: 85 }), [metrics.avgRecycledPct]);
  const currentStages = metrics.lifecycleStages;
  const processStages = currentStages.filter((stage) => stage.id !== 'recovery');
  const hotspot = processStages.reduce((highest, stage) => stage.carbonTons > highest.carbonTons ? stage : highest, processStages[0]);
  const improvements = { mining: Math.max(0, (scenario.recycledPctTarget - metrics.avgRecycledPct) * 0.008), processing: Math.max(0, (scenario.recycledPctTarget - metrics.avgRecycledPct) * 0.008), refining: Math.max(0, (scenario.recycledPctTarget - metrics.avgRecycledPct) * 0.008), smelting: scenario.renewableEnergyPct * 0.004, transport: scenario.railShiftPct * 0.003, recovery: Math.max(0, (scenario.recycledPctTarget - metrics.avgRecycledPct) / 100) };
  const optimizedStages = currentStages.map((stage) => stage.id === 'recovery' ? { ...stage, recoveryPct: Math.min(100, stage.recoveryPct + 5), recycledPct: Math.min(100, scenario.recycledPctTarget) } : { ...stage, carbonTons: stage.carbonTons * (1 - improvements[stage.id]), energyMwh: stage.energyMwh * (1 - (stage.id === 'smelting' ? scenario.renewableEnergyPct * 0.0025 : improvements[stage.id] * 0.35)) });
  const selectedCurrent = currentStages.find((stage) => stage.id === (selectedId || hotspot.id)) || hotspot;
  const selectedOptimized = optimizedStages.find((stage) => stage.id === selectedCurrent.id) || selectedCurrent;
  const totals = processStages.reduce((sum, stage) => { const optimized = optimizedStages.find((item) => item.id === stage.id); return { carbon: sum.carbon + stage.carbonTons, energy: sum.energy + stage.energyMwh, optimizedCarbon: sum.optimizedCarbon + optimized.carbonTons, optimizedEnergy: sum.optimizedEnergy + optimized.energyMwh }; }, { carbon: 0, energy: 0, optimizedCarbon: 0, optimizedEnergy: 0 });
  const co2Reduction = ((1 - totals.optimizedCarbon / totals.carbon) * 100) || 0;
  const energyReduction = ((1 - totals.optimizedEnergy / totals.energy) * 100) || 0;
  const recoveryGain = selectedOptimized.id === 'recovery' ? selectedOptimized.recoveryPct - selectedCurrent.recoveryPct : 5;
  const changed = (stage) => improvements[stage.id] > 0;
  const runComparison = () => { setRun((value) => value + 1); setSelectedId(hotspot.id); };
  const useInSimulator = () => { setSimControls(scenario); navigate('/simulator', { state: { optimizedPathway: scenario, source: 'lca-pathway-optimization' } }); };
  const stageLabel = (stage, optimized) => optimized && changed(stage) ? `${stage.name} · optimized` : stage.name;
  const metric = (value, suffix) => `${Number(value || 0).toFixed(2)} ${suffix}`;
  return <section className="xl:col-span-12 premium-card rounded-xl p-lg">
    <div className="flex flex-col gap-4 border-b border-outline-variant/60 pb-md lg:flex-row lg:items-start lg:justify-between"><div><h3 className="font-headline-sm text-lg font-bold text-on-surface">AI Production Pathway Optimization</h3><p className="mt-1 text-xs text-on-surface-variant">Compare the current production pathway with an environmentally improved pathway.</p></div><div className="flex flex-wrap gap-2"><button onClick={runComparison} className="rounded-lg border border-primary bg-primary px-3 py-2 text-xs font-bold text-on-primary shadow-sm">Compare Pathways</button><button onClick={useInSimulator} className="rounded-lg border border-primary/35 bg-primary-container/15 px-3 py-2 text-xs font-bold text-primary">Use in Simulator <span className="material-symbols-outlined align-middle text-sm">arrow_forward</span></button></div></div>
    <div className="mt-md rounded-lg border border-primary/20 bg-primary-container/10 px-3 py-2 text-[11px] text-on-surface-variant"><span className="font-bold text-primary">Scenario assumption:</span> uses existing simulator controls—recycled input target {scenario.recycledPctTarget}%, renewable energy {scenario.renewableEnergyPct}%, and rail shift {scenario.railShiftPct}%.</div>
    <div className="mt-lg grid grid-cols-1 gap-md xl:grid-cols-2"><div className="rounded-xl border border-outline-variant bg-surface p-md"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Current pathway</p><p className="mt-1 text-xs text-on-surface-variant">Measured lifecycle allocation</p></div><span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-800">CURRENT</span></div><div className="mt-4 flex flex-wrap items-center gap-1.5"><span className="rounded-md border border-outline-variant bg-white px-2 py-1 text-[10px] font-bold text-on-surface">Raw Material</span><span className="text-primary">→</span>{currentStages.map((stage) => <React.Fragment key={stage.id}><button onClick={() => setSelectedId(stage.id)} className={`rounded-md border px-2 py-1 text-[10px] font-bold transition-all ${selectedCurrent.id === stage.id ? 'border-primary bg-primary-container/20 text-primary shadow-sm' : stage.id === hotspot.id ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-outline-variant bg-white text-on-surface'}`}>{stage.name}</button>{stage.id !== 'recovery' && <span className="text-primary">→</span>}</React.Fragment>)}</div><div className="mt-5 grid grid-cols-3 gap-3">{processStages.map((stage) => <button key={stage.id} onClick={() => setSelectedId(stage.id)} className={`relative rounded-lg border p-2 text-left shadow-[3px_4px_0_#e5eeea] ${stage.id === hotspot.id ? 'border-amber-300 bg-amber-50' : 'border-outline-variant bg-white'}`}><span className="material-symbols-outlined text-primary">{stage.icon}</span><p className="mt-1 text-[10px] font-bold leading-tight text-on-surface">{stage.name}</p><p className="font-mono-data text-[10px] font-bold text-on-surface-variant">{stage.carbonTons.toFixed(2)} tCO₂e</p>{stage.id === hotspot.id && <span className="mt-1 inline-block text-[8px] font-bold text-amber-800">HIGH-IMPACT · {stage.contributionPct}%</span>}</button>)}</div></div>
      <div className="rounded-xl border-2 border-primary/45 bg-[#f8fbf9] p-md"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-wider text-primary">AI-optimized pathway</p><p className="mt-1 text-xs text-on-surface-variant">Best available combination from current controls</p></div><span className="rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-on-primary">OPTIMIZED</span></div><div className="mt-4 flex flex-wrap items-center gap-1.5"><span className="rounded-md border border-primary/25 bg-white px-2 py-1 text-[10px] font-bold text-on-surface">Raw Material</span><span className="text-primary">→</span>{optimizedStages.map((stage) => <React.Fragment key={stage.id}><button onClick={() => setSelectedId(stage.id)} className={`rounded-md border px-2 py-1 text-[10px] font-bold transition-all ${selectedCurrent.id === stage.id ? 'border-primary bg-primary-container/25 text-primary shadow-sm' : changed(stage) ? 'border-primary/40 bg-primary-container/15 text-primary' : 'border-outline-variant bg-white text-on-surface'}`}>{stageLabel(stage, true)}</button>{stage.id !== 'recovery' && <span className="text-primary">→</span>}</React.Fragment>)}</div><div className="mt-5 grid grid-cols-3 gap-3">{optimizedStages.filter((stage) => stage.id !== 'recovery').map((stage) => <button key={stage.id} onClick={() => setSelectedId(stage.id)} className={`rounded-lg border p-2 text-left shadow-[3px_4px_0_#dceee8] ${changed(stage) ? 'border-primary/40 bg-white' : 'border-outline-variant bg-white'}`}><span className="material-symbols-outlined text-primary">{stage.icon}</span><p className="mt-1 text-[10px] font-bold leading-tight text-on-surface">{stageLabel(stage, true)}</p><p className="font-mono-data text-[10px] font-bold text-primary">{stage.carbonTons.toFixed(2)} tCO₂e</p>{changed(stage) && <span className="mt-1 inline-block text-[8px] font-bold text-primary">OPTIMIZED</span>}</button>)}</div></div></div>
    <div className="mt-md grid grid-cols-1 gap-md lg:grid-cols-[minmax(0,1fr)_260px]"><div className="rounded-xl border border-outline-variant bg-surface p-md"><p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Stage comparison · {selectedCurrent.name}</p><div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3"><div><p className="text-[10px] font-bold text-amber-800">CURRENT</p><p className="mt-1 text-xs text-on-surface">CO₂: <strong className="font-mono-data">{metric(selectedCurrent.carbonTons, 't')}</strong></p><p className="text-xs text-on-surface">Energy: <strong className="font-mono-data">{metric(selectedCurrent.energyMwh, 'MWh')}</strong></p><p className="text-xs text-on-surface">Recovery: <strong className="font-mono-data">{selectedCurrent.recoveryPct ?? metrics.avgRecoveryPct}%</strong></p></div><div><p className="text-[10px] font-bold text-primary">OPTIMIZED</p><p className="mt-1 text-xs text-on-surface">CO₂: <strong className="font-mono-data">{metric(selectedOptimized.carbonTons, 't')}</strong></p><p className="text-xs text-on-surface">Energy: <strong className="font-mono-data">{metric(selectedOptimized.energyMwh, 'MWh')}</strong></p><p className="text-xs text-on-surface">Recovery: <strong className="font-mono-data">{selectedOptimized.recoveryPct ?? metrics.avgRecoveryPct}%</strong></p></div><div className="rounded-lg bg-primary-container/15 p-2"><p className="text-[10px] font-bold text-primary">IMPROVEMENT</p><p className="mt-1 text-xs text-on-surface">CO₂ ↓ <strong className="font-mono-data text-primary">{selectedCurrent.carbonTons ? (((1 - selectedOptimized.carbonTons / selectedCurrent.carbonTons) * 100).toFixed(1)) : '0.0'}%</strong></p><p className="text-xs text-on-surface">Energy ↓ <strong className="font-mono-data text-primary">{selectedCurrent.energyMwh ? (((1 - selectedOptimized.energyMwh / selectedCurrent.energyMwh) * 100).toFixed(1)) : '0.0'}%</strong></p><p className="text-xs text-on-surface">Recovery ↑ <strong className="font-mono-data text-primary">+{selectedCurrent.id === 'recovery' ? recoveryGain : 5}%</strong></p></div></div></div><details className="rounded-xl border border-outline-variant bg-surface p-md"><summary className="cursor-pointer text-sm font-bold text-on-surface">Why was this pathway selected?</summary><p className="mt-3 text-xs leading-relaxed text-on-surface-variant">{hotspot.name} is the primary intervention because it contributes {hotspot.contributionPct}% of the calculated lifecycle carbon impact. The selected scenario applies only the available recycled-input, renewable-energy, and rail-shift controls to reduce CO₂ and energy while increasing recovery.</p></details></div>
    <div className="mt-md rounded-xl border border-primary/30 bg-primary-container/10 p-md"><p className="text-[10px] font-bold uppercase tracking-wider text-primary">Recommended production pathway</p><div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-on-surface"><span>Raw Material</span>{optimizedStages.map((stage) => <React.Fragment key={stage.id}><span className="text-primary">→</span><span className={changed(stage) ? 'rounded bg-primary-container/25 px-2 py-1 text-primary' : ''}>{stageLabel(stage, true)}</span></React.Fragment>)}</div><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4"><div><p className="text-[10px] text-on-surface-variant">CO₂ Reduction</p><p className="font-mono-data text-base font-bold text-primary">{co2Reduction.toFixed(1)}%</p></div><div><p className="text-[10px] text-on-surface-variant">Energy Reduction</p><p className="font-mono-data text-base font-bold text-primary">{energyReduction.toFixed(1)}%</p></div><div><p className="text-[10px] text-on-surface-variant">Material Recovery</p><p className="font-mono-data text-base font-bold text-primary">+5%</p></div><div><p className="text-[10px] text-on-surface-variant">Circularity</p><p className="font-mono-data text-base font-bold text-primary">+{Math.max(0, Math.round((scenario.recycledPctTarget - metrics.avgRecycledPct) * 0.6))}%</p></div></div></div>
  </section>;
}

export default function LCA() {
  const { metrics, selectedMetal, setSelectedMetal, filteredRows, setSimControls } = useDataset();
  const navigate = useNavigate();
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
        <PathwayOptimization metrics={metrics} setSimControls={setSimControls} navigate={navigate} />
        
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

        <AluminiumRecoverySection rows={filteredRows} />
      </div>
    </main>
  );
}
