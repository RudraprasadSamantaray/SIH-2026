import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useDataset } from '../context/DataContext';
import AnimatedNumber from '../components/AnimatedNumber';

const routePositions = [[-6.8, 0, 0.65], [-4.05, 0, -0.62], [-1.35, 0, 0.52], [1.45, 0, -0.58], [4.15, 0, 0.54], [6.85, 0, -0.22]];
const MODEL_COLORS = { terrain: '#eef7f3', base: '#dceee8', teal: '#167d72', tealLight: '#49aa9a', mint: '#bfe4d9', slate: '#56746d', amber: '#d9823d', white: '#f8fcfa' };

function RouteCamera({ resetRef, onInteractionChange }) {
  const controls = useRef();
  const { camera } = useThree();
  useEffect(() => {
    resetRef.current = () => {
      camera.position.set(10.8, 9.2, 17.8);
      controls.current?.target.set(0, 0.65, 0);
      controls.current?.update();
    };
    resetRef.current();
  }, [camera, resetRef]);
  return <OrbitControls ref={controls} enablePan={false} minDistance={11} maxDistance={23} minPolarAngle={0.76} maxPolarAngle={1.22} onStart={() => onInteractionChange(true)} onEnd={() => onInteractionChange(false)} />;
}

function IndustrialSite({ site, position, active, isInteracting, onHover, onSelect }) {
  const { type } = site;
  const accent = type === 'mine' ? MODEL_COLORS.slate : type === 'warehouse' ? MODEL_COLORS.mint : MODEL_COLORS.teal;
  return <group position={position} scale={active ? 1.2 : 1.12} onPointerOver={(e) => { e.stopPropagation(); onHover(site); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { onHover(null); document.body.style.cursor = 'default'; }} onClick={(e) => { e.stopPropagation(); onSelect(site); }}>
    <mesh receiveShadow position={[0, 0.04, 0]}><cylinderGeometry args={[0.78, 0.86, 0.1, 32]} /><meshStandardMaterial color={MODEL_COLORS.base} roughness={0.72} /></mesh>
    <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}><torusGeometry args={[0.64, 0.023, 8, 32]} /><meshBasicMaterial color={MODEL_COLORS.tealLight} transparent opacity={0.72} /></mesh>
    {type === 'mine' && <><mesh position={[0, 0.5, 0]} castShadow><coneGeometry args={[0.72, 0.9, 5]} /><meshStandardMaterial color={accent} roughness={0.92} /></mesh><mesh position={[0.38, 0.22, 0.13]}><dodecahedronGeometry args={[0.25, 0]} /><meshStandardMaterial color={MODEL_COLORS.mint} /></mesh></>}
    {type === 'plant' && <><mesh position={[0, 0.48, 0]} castShadow><boxGeometry args={[1.12, 0.78, 0.72]} /><meshStandardMaterial color={accent} roughness={0.52} /></mesh><mesh position={[-0.3, 1.15, 0]} castShadow><cylinderGeometry args={[0.12, 0.15, 0.64, 16]} /><meshStandardMaterial color={MODEL_COLORS.white} /></mesh><mesh position={[0.31, 1.08, 0]} castShadow><cylinderGeometry args={[0.1, 0.13, 0.5, 16]} /><meshStandardMaterial color={MODEL_COLORS.mint} /></mesh></>}
    {type === 'rail' && <><mesh position={[0, 0.23, 0]} castShadow><boxGeometry args={[1.22, 0.28, 0.52]} /><meshStandardMaterial color={MODEL_COLORS.tealLight} /></mesh><mesh position={[-0.27, 0.5, 0]}><boxGeometry args={[0.4, 0.31, 0.47]} /><meshStandardMaterial color={MODEL_COLORS.white} /></mesh><mesh position={[0.29, 0.5, 0]}><boxGeometry args={[0.36, 0.31, 0.47]} /><meshStandardMaterial color={MODEL_COLORS.mint} /></mesh></>}
    {type === 'factory' && <><mesh position={[0, 0.55, 0]} castShadow><boxGeometry args={[1.2, 0.98, 0.82]} /><meshStandardMaterial color={accent} /></mesh><mesh position={[-0.35, 1.45, 0]} castShadow><cylinderGeometry args={[0.12, 0.16, 0.72, 16]} /><meshStandardMaterial color={MODEL_COLORS.white} /></mesh><mesh position={[0, 0.56, 0.43]}><planeGeometry args={[0.4, 0.28]} /><meshBasicMaterial color={MODEL_COLORS.mint} /></mesh></>}
    {type === 'logistics' && <><mesh position={[0.1, 0.31, 0]} castShadow><boxGeometry args={[1.05, 0.42, 0.54]} /><meshStandardMaterial color={MODEL_COLORS.tealLight} /></mesh><mesh position={[-0.5, 0.24, 0]}><boxGeometry args={[0.34, 0.28, 0.5]} /><meshStandardMaterial color={MODEL_COLORS.white} /></mesh></>}
    {type === 'warehouse' && <><mesh position={[0, 0.43, 0]} castShadow><boxGeometry args={[1.22, 0.72, 0.86]} /><meshStandardMaterial color={accent} roughness={0.6} /></mesh><mesh position={[0, 0.84, 0]} rotation={[0, Math.PI / 4, 0]}><coneGeometry args={[0.62, 0.5, 4]} /><meshStandardMaterial color={MODEL_COLORS.tealLight} /></mesh></>}
    {active && !isInteracting && <Html position={[0, 2.15, 0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}><div className="min-w-[125px] rounded-md border border-primary/30 bg-white/95 px-2 py-1.5 text-center shadow-md"><p className="text-[10px] font-bold text-slate-700">{site.name}</p><p className="mt-0.5 font-mono-data text-[9px] font-bold text-primary">{site.mode} · {site.distanceLabel}</p></div></Html>}
  </group>;
}

function MovingFreight({ start, end, color, offset, rail }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.16 + offset) % 1;
    ref.current.position.set(THREE.MathUtils.lerp(start[0], end[0], t), 0.47 + Math.sin(t * Math.PI) * 0.12, THREE.MathUtils.lerp(start[2], end[2], t));
  });
  return <group ref={ref}><mesh position={[0, 0.04, 0]}><boxGeometry args={rail ? [0.26, 0.11, 0.17] : [0.22, 0.12, 0.16]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.22} /></mesh>{rail && <mesh position={[-0.16, 0.04, 0]}><boxGeometry args={[0.08, 0.09, 0.15]} /><meshStandardMaterial color="#d9f1ea" /></mesh>}</group>;
}

function Segment({ segment, start, end, active, isInteracting, onHover, onSelect }) {
  const curve = useMemo(() => new THREE.QuadraticBezierCurve3(new THREE.Vector3(start[0] + 0.63, 0.28, start[2]), new THREE.Vector3((start[0] + end[0]) / 2, 0.78, (start[2] + end[2]) / 2), new THREE.Vector3(end[0] - 0.63, 0.28, end[2])), [start, end]);
  const points = curve.getPoints(20);
  const color = segment.high ? MODEL_COLORS.amber : MODEL_COLORS.tealLight;
  return <group onPointerOver={(e) => { e.stopPropagation(); onHover(segment); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { onHover(null); document.body.style.cursor = 'default'; }} onClick={(e) => { e.stopPropagation(); onSelect(segment); }}>
    <mesh><tubeGeometry args={[curve, 32, active ? 0.09 : 0.065, 8, false]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 0.72 : segment.high ? 0.36 : 0.2} roughness={0.35} /></mesh>
    <Line points={points} color="#ffffff" lineWidth={active ? 1.6 : 0.8} transparent opacity={active ? 0.62 : 0.28} />
    {active && <Line points={points} color={color} lineWidth={9} transparent opacity={0.16} />}
    <MovingFreight start={start} end={end} color={color} offset={segment.offset} rail={segment.icon === 'train'} />
    {active && !isInteracting && <Html position={[(start[0] + end[0]) / 2, 1.3, (start[2] + end[2]) / 2]} center distanceFactor={16} style={{ pointerEvents: 'none' }}><div className={`min-w-[106px] rounded-md border bg-white/95 px-2 py-1.5 text-center shadow-md ${segment.high ? 'border-orange-200' : 'border-emerald-200'}`}><p className="text-[10px] font-bold leading-tight text-slate-700">{segment.mode}</p><p className={`font-mono-data text-[9px] font-bold ${segment.high ? 'text-[#c8673b]' : 'text-emerald-700'}`}>{Math.round(segment.distance).toLocaleString()} km · {Math.round(segment.co2).toLocaleString()} kg CO₂e</p></div></Html>}
  </group>;
}

function RouteScene({ segments, sites, activeItem, isInteracting, setHovered, setSelected, resetRef, onInteractionChange }) {
  return <Canvas shadows camera={{ fov: 40 }} dpr={[1, 1.5]}>
    <color attach="background" args={[MODEL_COLORS.white]} /><ambientLight intensity={1.35} /><hemisphereLight args={['#ffffff', '#b9d9cf', 1.1]} /><directionalLight position={[5, 9, 7]} intensity={1.75} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[18, 9]} /><shadowMaterial transparent opacity={0.1} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}><planeGeometry args={[17, 8]} /><meshStandardMaterial color={MODEL_COLORS.terrain} roughness={1} /></mesh>
    {sites.map((site, index) => <IndustrialSite key={site.id} site={site} position={routePositions[index]} active={activeItem?.id === site.id} isInteracting={isInteracting} onHover={setHovered} onSelect={setSelected} />)}
    {segments.map((segment) => <Segment key={segment.id} segment={segment} start={routePositions[segment.start]} end={routePositions[segment.end]} active={activeItem?.id === segment.id} isInteracting={isInteracting} onHover={setHovered} onSelect={setSelected} />)}
    <RouteCamera resetRef={resetRef} onInteractionChange={onInteractionChange} />
  </Canvas>;
}

function LogisticsRouteVisualization({ metrics, activeRouteIntent }) {
  const resetRef = useRef(null); const [hovered, setHovered] = useState(null); const [selected, setSelected] = useState(null); const [isInteracting, setIsInteracting] = useState(false);
  const segments = useMemo(() => {
    const truckKm = metrics.totalTransportKm * 0.15; const railKm = metrics.totalTransportKm * 0.85;
    return [
      { id: 'truck-collection', start: 0, end: 1, mode: 'Truck collection', icon: 'local_shipping', distance: truckKm, co2: truckKm * 0.18, high: true, offset: 0.05, note: 'Aggregate road share from the existing 15% non-rail allocation; the dataset does not split it by leg.' },
      { id: 'rail-entry', start: 1, end: 2, mode: 'Rail freight', icon: 'train', distance: railKm, co2: railKm * 0.06, high: false, offset: 0.26, note: 'Aggregate rail share from the existing Route B 85% intermodal allocation; the dataset does not split it by leg.' },
      { id: 'rail-haul', start: 2, end: 3, mode: 'Rail freight', icon: 'train', distance: railKm, co2: railKm * 0.06, high: false, offset: 0.47, note: 'Aggregate rail share from the existing Route B 85% intermodal allocation; the dataset does not split it by leg.' },
      { id: 'truck-transfer', start: 3, end: 4, mode: 'Final logistics', icon: 'local_shipping', distance: truckKm, co2: truckKm * 0.18, high: true, offset: 0.68, note: 'Aggregate road share from the existing 15% non-rail allocation; the dataset does not split it by leg.' },
      { id: 'truck-delivery', start: 4, end: 5, mode: 'Customer delivery', icon: 'local_shipping', distance: truckKm, co2: truckKm * 0.18, high: true, offset: 0.84, note: 'Aggregate road share from the existing 15% non-rail allocation; the dataset does not split it by leg.' },
    ];
  }, [metrics.totalTransportKm]);
  const sites = useMemo(() => {
    const truckKm = metrics.totalTransportKm * 0.15; const railKm = metrics.totalTransportKm * 0.85;
    return [
      { id: 'site-mine', type: 'mine', name: 'Mine / Extraction', mode: 'Origin', distanceLabel: 'Source material' },
      { id: 'site-processing', type: 'plant', name: 'Processing Plant', mode: 'Truck intake', distanceLabel: `${Math.round(truckKm).toLocaleString()} km · ${Math.round(truckKm * 0.18).toLocaleString()} kg CO₂e`, distance: truckKm, co2: truckKm * 0.18, high: true, icon: 'local_shipping', note: 'Incoming road allocation from the existing 15% non-rail model.' },
      { id: 'site-rail', type: 'rail', name: 'Rail Freight', mode: 'Electrified rail', distanceLabel: `${Math.round(railKm).toLocaleString()} km · ${Math.round(railKm * 0.06).toLocaleString()} kg CO₂e`, distance: railKm, co2: railKm * 0.06, high: false, icon: 'train', note: 'Rail allocation from the existing Route B 85% intermodal model.' },
      { id: 'site-manufacturing', type: 'factory', name: 'Manufacturing', mode: 'Rail arrival', distanceLabel: `${Math.round(railKm).toLocaleString()} km · ${Math.round(railKm * 0.06).toLocaleString()} kg CO₂e`, distance: railKm, co2: railKm * 0.06, high: false, icon: 'train', note: 'Rail allocation from the existing Route B 85% intermodal model.' },
      { id: 'site-logistics', type: 'logistics', name: 'Final Logistics', mode: 'Truck transfer', distanceLabel: `${Math.round(truckKm).toLocaleString()} km · ${Math.round(truckKm * 0.18).toLocaleString()} kg CO₂e`, distance: truckKm, co2: truckKm * 0.18, high: true, icon: 'local_shipping', note: 'Road allocation from the existing 15% non-rail model.' },
      { id: 'site-warehouse', type: 'warehouse', name: 'Warehouse / Customer', mode: 'Destination', distanceLabel: 'Customer delivery' },
    ];
  }, [metrics.totalTransportKm]);
  useEffect(() => { setHovered(null); setSelected(null); }, [segments, sites]);
  useEffect(() => {
    if (!activeRouteIntent) return;
    setSelected(segments.find((segment) => activeRouteIntent === 'current' ? segment.high : !segment.high) || null);
  }, [activeRouteIntent, segments]);
  const focus = hovered || selected || segments.reduce((highest, segment) => segment.co2 > highest.co2 ? segment : highest, segments[0]);
  return <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_205px] gap-md">
    <div className="relative h-[350px] overflow-hidden rounded-xl border border-outline-variant bg-[#f8fbf9]"><Suspense fallback={<div className="p-lg text-sm text-on-surface-variant">Loading logistics visualization…</div>}><RouteScene segments={segments} sites={sites} activeItem={focus} isInteracting={isInteracting} setHovered={setHovered} setSelected={setSelected} resetRef={resetRef} onInteractionChange={setIsInteracting} /></Suspense><div className="absolute left-3 top-3 flex gap-2"><span className="rounded-md border border-primary/25 bg-white/95 px-2.5 py-1 text-[10px] font-bold text-primary">3D View</span><button onClick={() => { setSelected(null); resetRef.current?.(); }} className="rounded-md border border-outline-variant bg-white/95 px-2.5 py-1 text-[10px] font-bold text-on-surface hover:bg-surface-container-low">Reset View</button></div>{!isInteracting && <><div className="absolute right-3 top-3 hidden max-w-[190px] grid-cols-2 gap-1 md:grid">{[['landscape', 'Mine / Extraction'], ['factory', 'Processing Plant'], ['train', 'Rail Freight'], ['precision_manufacturing', 'Manufacturing'], ['local_shipping', 'Final Logistics'], ['inventory', 'Warehouse / Customer']].map(([icon, label]) => <span key={label} className="flex items-center gap-1 rounded border border-slate-200 bg-white/92 px-1.5 py-1 text-[9px] font-semibold leading-tight text-slate-700 shadow-sm"><span className="material-symbols-outlined text-[12px] text-primary">{icon}</span>{label}</span>)}</div><div className="absolute bottom-3 left-3 rounded-md border border-emerald-100 bg-white/92 px-2 py-1 text-[10px] font-semibold text-emerald-800">Hover a site or route · Drag to rotate · Scroll to zoom</div></>}</div>
    <aside className="rounded-xl border border-outline-variant bg-surface p-md"><p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{focus.type ? 'Route location' : 'Route segment'}</p><div className="mt-2 flex items-center gap-2"><span className={`material-symbols-outlined ${focus.high ? 'text-[#c8673b]' : 'text-primary'}`}>{focus.icon || (focus.type === 'mine' ? 'landscape' : 'inventory')}</span><h4 className="text-sm font-bold text-on-surface">{focus.name || focus.mode}</h4></div><p className="mt-1 text-xs font-semibold text-on-surface-variant">{focus.type ? focus.mode : focus.mode}</p>{focus.distance != null ? <><dl className="mt-4 space-y-3"><div><dt className="text-[11px] text-on-surface-variant">Distance</dt><dd className="font-mono-data text-sm font-bold text-on-surface">{Math.round(focus.distance).toLocaleString()} km</dd></div><div><dt className="text-[11px] text-on-surface-variant">CO₂e impact</dt><dd className={`font-mono-data text-sm font-bold ${focus.high ? 'text-[#c8673b]' : 'text-primary'}`}>{Math.round(focus.co2).toLocaleString()} kg CO₂e</dd></div><div><dt className="text-[11px] text-on-surface-variant">Carbon intensity</dt><dd className="font-mono-data text-xs font-bold text-on-surface">{focus.high ? '0.18' : '0.06'} kg CO₂e / km</dd></div></dl><p className="mt-4 border-t border-outline-variant pt-3 text-[10px] leading-relaxed text-on-surface-variant">{focus.note}</p></> : <p className="mt-4 border-t border-outline-variant pt-3 text-[10px] leading-relaxed text-on-surface-variant">This is the {focus.mode.toLowerCase()} point in the lifecycle route. Hover the connected route to inspect its transport allocation.</p>}</aside>
  </div>;
}

export default function Transportation() {
  const { metrics, selectedMetal, setSelectedMetal } = useDataset();
  const navigate = useNavigate();
  const [comparisonRoute, setComparisonRoute] = useState(null);

  if (!metrics) return null;

  const baselineTruckEmissions = Math.round(metrics.totalTransportKm * 0.18);
  const railEmissions = Math.round(metrics.totalTransportKm * 0.06);
  const savingsPct = (((baselineTruckEmissions - railEmissions) / baselineTruckEmissions) * 100).toFixed(1);
  const railBlockHeight = Math.max(30, (railEmissions / Math.max(baselineTruckEmissions, 1)) * 118);

  return (
    <div className="space-y-lg">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-outline-variant/45 mb-md">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
            Transportation &amp; Freight Analysis
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Freight distance &amp; modal carbon intensity calculated live from active dataset ({metrics.totalCount} batches).
          </p>
        </div>

        <div className="flex items-center gap-1 bg-surface-bright border border-outline-variant p-1 rounded-lg text-xs font-semibold">
          {['All', 'Aluminium', 'Steel', 'Copper'].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMetal(m)}
              className={`px-3 py-1 rounded transition-all duration-200 cursor-pointer ${
                selectedMetal === m ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-gutter animate-fade-in-up">
        {/* Route Visualization (Full Width) */}
        <div className="col-span-12 premium-card rounded-xl p-lg">
          <h3 className="font-headline-sm text-base font-bold mb-lg pb-sm border-b border-outline-variant/60 flex justify-between items-center">
            <span>Lifecycle Route Visualization</span>
            <span className="text-xs font-mono-data text-primary font-bold bg-primary-container/10 px-2.5 py-1 rounded-md">
              Total Freight Distance: <AnimatedNumber value={metrics.totalTransportKm} decimals={0} /> km
            </span>
          </h3>
          <LogisticsRouteVisualization metrics={metrics} activeRouteIntent={comparisonRoute} />
        </div>

        {/* Route Comparison Section */}
        <div className="col-span-12 premium-card rounded-xl p-lg">
          <div className="mb-lg flex flex-col gap-3 border-b border-outline-variant/60 pb-md md:flex-row md:items-center md:justify-between">
            <div><h3 className="font-headline-sm text-base font-bold text-on-surface">Modal Route Optimization &amp; Comparison</h3><p className="mt-1 text-xs text-on-surface-variant">Current route vs lower-impact route using the active freight dataset.</p></div>
            <div className="flex items-center gap-2 self-start rounded-lg border border-primary/20 bg-primary-container/15 px-3 py-2 text-primary"><span className="material-symbols-outlined text-[17px]">verified</span><span><span className="block text-[10px] font-bold uppercase tracking-wider">Lower carbon route</span><span className="font-mono-data text-xs font-bold"><AnimatedNumber value={savingsPct} decimals={1} />% lower emissions</span></span></div>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-md xl:grid-cols-[minmax(0,1fr)_210px_minmax(0,1fr)]">
            <button onClick={() => setComparisonRoute('current')} className={`rounded-xl border p-lg text-left transition-all duration-300 ${comparisonRoute === 'current' ? 'border-[#cb754b] bg-[#fffaf6] shadow-md -translate-y-1' : 'border-outline-variant bg-surface hover:-translate-y-1 hover:border-[#d99a76] hover:shadow-md'}`}>
              <div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-wider text-[#ae673f]">Current baseline</p><div className="mt-2 flex items-center gap-2"><span className="material-symbols-outlined text-2xl text-[#c87045]">local_shipping</span><h4 className="font-headline-sm text-lg font-bold text-on-surface">Highway Trucking</h4></div><p className="mt-1 text-xs font-semibold text-on-surface-variant">100% Highway Trucking</p></div><span className="rounded-full bg-[#fff0e8] px-2 py-1 text-[10px] font-bold text-[#ae673f]">ROUTE A</span></div>
              <div className="mt-lg grid grid-cols-2 gap-md border-y border-dashed border-outline-variant py-md"><div><p className="text-[11px] text-on-surface-variant">Total Fleet Distance</p><p className="mt-1 font-mono-data text-lg font-bold text-on-surface"><AnimatedNumber value={metrics.totalTransportKm} decimals={0} /> km</p></div><div><p className="text-[11px] text-on-surface-variant">Material Volume</p><p className="mt-1 font-mono-data text-lg font-bold text-on-surface"><AnimatedNumber value={metrics.totalQuantityTons} decimals={1} /> tons</p></div></div>
              <div className="mt-md flex items-end justify-between"><div><p className="text-[11px] text-on-surface-variant">Estimated Transport Impact</p><p className="mt-1 font-mono-data text-2xl font-bold text-[#c87045]"><AnimatedNumber value={baselineTruckEmissions} decimals={0} /> <span className="text-sm">kg CO₂e</span></p></div><span className="material-symbols-outlined rounded-lg bg-[#fff0e8] p-2 text-[#c87045]">trending_up</span></div>
            </button>
            <div className="relative flex min-h-[255px] flex-col items-center justify-center overflow-hidden rounded-xl border border-outline-variant bg-[#f8fbf9] px-md text-center">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#d9823d] via-[#d9e9e3] to-primary"></div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface-variant">Carbon impact transition</p><p className="mt-3 font-mono-data text-lg font-bold text-[#c87045]"><AnimatedNumber value={baselineTruckEmissions} decimals={0} /> kg CO₂e</p><span className="material-symbols-outlined my-1 text-2xl text-on-surface-variant">south</span><div className="rounded-full border border-primary/25 bg-primary-container/20 px-3 py-1.5"><p className="font-mono-data text-xl font-bold text-primary">↓ <AnimatedNumber value={savingsPct} decimals={1} />%</p><p className="text-[9px] font-bold uppercase tracking-wider text-primary">Emissions reduction</p></div><span className="material-symbols-outlined my-1 text-2xl text-primary">south</span><p className="font-mono-data text-lg font-bold text-primary"><AnimatedNumber value={railEmissions} decimals={0} /> kg CO₂e</p><div className="mt-4 flex h-[118px] items-end gap-4"><div className="flex flex-col items-center justify-end"><div className="w-10 rounded-t-md border border-[#bd6a40] bg-[#d9823d] shadow-[5px_-4px_0_#f4d1bd]" style={{ height: 118 }}></div><span className="mt-1 text-[9px] font-bold text-[#ae673f]">CURRENT</span></div><div className="flex flex-col items-center justify-end"><div className="w-10 rounded-t-md border border-primary bg-primary shadow-[5px_-4px_0_#bfe4d9]" style={{ height: railBlockHeight }}></div><span className="mt-1 text-[9px] font-bold text-primary">RECOMMENDED</span></div></div></div>
            <button onClick={() => setComparisonRoute('recommended')} className={`relative rounded-xl border-2 p-lg text-left transition-all duration-300 ${comparisonRoute === 'recommended' ? 'border-primary bg-primary-container/10 shadow-md -translate-y-1' : 'border-primary/55 bg-surface hover:-translate-y-1 hover:border-primary hover:shadow-md'}`}>
              <span className="absolute -top-3 right-lg rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-on-primary shadow-sm">RECOMMENDED</span><div className="flex items-start justify-between"><div><p className="text-[10px] font-bold uppercase tracking-wider text-primary">Lower impact</p><div className="mt-2 flex items-center gap-2"><span className="material-symbols-outlined text-2xl text-primary">train</span><h4 className="font-headline-sm text-lg font-bold text-primary">Electrified Rail Shift</h4></div><p className="mt-1 text-xs font-semibold text-on-surface-variant">85% Intermodal</p></div><span className="rounded-full bg-primary-container/25 px-2 py-1 text-[10px] font-bold text-primary">ROUTE B</span></div>
              <div className="mt-lg grid grid-cols-2 gap-md border-y border-dashed border-outline-variant py-md"><div><p className="text-[11px] text-on-surface-variant">Rail Haul Coverage</p><p className="mt-1 font-mono-data text-lg font-bold text-primary">85% Intermodal</p><p className="text-[10px] font-semibold text-primary">Long haul &gt; 300km</p></div><div><p className="text-[11px] text-on-surface-variant">Material Volume</p><p className="mt-1 font-mono-data text-lg font-bold text-on-surface"><AnimatedNumber value={metrics.totalQuantityTons} decimals={1} /> tons</p></div></div>
              <div className="mt-md flex items-end justify-between"><div><p className="text-[11px] text-on-surface-variant">Estimated Transport Impact</p><p className="mt-1 font-mono-data text-2xl font-bold text-primary"><AnimatedNumber value={railEmissions} decimals={0} /> <span className="text-sm">kg CO₂e</span></p></div><span className="material-symbols-outlined rounded-lg bg-primary-container/30 p-2 text-primary">eco</span></div>
            </button>
          </div>
        </div>

        {/* Action Area */}
        <div className="col-span-12 flex justify-end mt-4 pt-4 border-t border-outline-variant/50">
          <button
            onClick={() => navigate('/simulator')}
            className="bg-primary text-on-primary font-label-md text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary-fixed-variant transition-all font-bold cursor-pointer shadow active:scale-97"
          >
            Continue to Simulator
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
