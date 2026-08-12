import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const positions = [[-5, 0, 0], [-3, 0, 0.25], [-1, 0, -0.15], [1, 0, 0.35], [3, 0, -0.1], [5, 0, 0.2]];

function CameraFocus({ active, onReady }) {
  const { camera } = useThree();
  const controls = useRef();
  useEffect(() => { onReady?.(() => { camera.position.set(8, 7, 11); controls.current?.target.set(0, 1.2, 0); }); }, [camera, onReady]);
  useFrame(() => {
    if (!Number.isInteger(active)) return;
    const index = Math.max(0, active);
    const target = new THREE.Vector3(positions[index][0], 1.3, positions[index][2]);
    const destination = new THREE.Vector3(target.x + 6.5, 6.1, target.z + 8.5);
    camera.position.lerp(destination, 0.045);
    controls.current?.target.lerp(target, 0.06);
    controls.current?.update();
  });
  return <OrbitControls ref={controls} enablePan={false} minDistance={8} maxDistance={18} minPolarAngle={0.7} maxPolarAngle={1.25} />;
}

function FlowLine({ start, end }) {
  return <Line points={[[start[0] + 0.55, 0.17, start[2]], [end[0] - 0.55, 0.17, end[2]]]} color="#64a69b" lineWidth={1.5} transparent opacity={0.72} />;
}

function FlowPulse({ start, end, offset = 0 }) {
  const pulse = useRef();
  useFrame(({ clock }) => {
    const progress = (clock.getElapsedTime() * 0.18 + offset) % 1;
    pulse.current.position.set(THREE.MathUtils.lerp(start[0] + 0.55, end[0] - 0.55, progress), 0.2, THREE.MathUtils.lerp(start[2], end[2], progress));
  });
  return <mesh ref={pulse}><sphereGeometry args={[0.075, 12, 12]} /><meshBasicMaterial color="#63b7a3" /></mesh>;
}

function LifecycleNode({ stage, position, mode, maxValue, selected, isHotspot, onSelect, onHover }) {
  const isRecovery = stage.id === 'recovery';
  const value = mode === 'carbon' ? stage.carbonTons : stage.energyMwh;
  const impactScale = isRecovery ? 0.85 + (stage.recycledPct / 100) * 0.4 : 0.72 + (value / maxValue) * 0.62;
  const hotspot = !isRecovery && isHotspot;
  const accent = hotspot ? '#dc5c3b' : isRecovery ? '#249b70' : '#2c8d82';
  const scale = impactScale * (selected ? 1.1 : 1);
  const labelY = isRecovery ? 1.55 : 2.25 * impactScale;
  return <group position={position} scale={scale} onPointerOver={(e) => { e.stopPropagation(); onHover(stage); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { onHover(null); document.body.style.cursor = 'default'; }} onClick={(e) => { e.stopPropagation(); onSelect(stage); }}>
    <mesh position={[0, 0.05, 0]} receiveShadow><cylinderGeometry args={[0.85, 0.92, 0.1, 48]} /><meshStandardMaterial color="#e5eeea" roughness={0.55} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]}><torusGeometry args={[0.72, 0.025, 8, 32]} /><meshBasicMaterial color={accent} transparent opacity={0.6} /></mesh>
    {stage.id === 'mining' && <>
      <mesh position={[0, 0.55, 0]} castShadow><coneGeometry args={[0.85, 1.15, 5]} /><meshStandardMaterial color="#6c9080" roughness={0.9} /></mesh>
      <mesh position={[0.38, 0.28, 0.18]} castShadow><dodecahedronGeometry args={[0.35, 0]} /><meshStandardMaterial color="#a6b8ad" roughness={0.9} /></mesh>
      <mesh position={[-0.42, 0.21, -0.12]} castShadow><dodecahedronGeometry args={[0.25, 0]} /><meshStandardMaterial color="#91a99b" roughness={0.9} /></mesh>
    </>}
    {stage.id === 'processing' && <>
      <mesh position={[0, 0.48, 0]} castShadow><boxGeometry args={[1.25, 0.85, 0.85]} /><meshStandardMaterial color="#5d9e92" roughness={0.55} /></mesh>
      <mesh position={[-0.35, 1.18, 0]} castShadow><cylinderGeometry args={[0.16, 0.18, 0.65, 18]} /><meshStandardMaterial color="#dceee9" /></mesh>
      <mesh position={[0.32, 1.03, 0]} castShadow><cylinderGeometry args={[0.14, 0.16, 0.45, 18]} /><meshStandardMaterial color="#b7d8d0" /></mesh>
    </>}
    {stage.id === 'refining' && <>
      <mesh position={[-0.32, 0.48, 0]} castShadow><cylinderGeometry args={[0.34, 0.34, 0.86, 24]} /><meshStandardMaterial color="#78b6aa" roughness={0.4} /></mesh>
      <mesh position={[0.34, 0.48, 0]} castShadow><cylinderGeometry args={[0.34, 0.34, 0.86, 24]} /><meshStandardMaterial color="#5a9b91" roughness={0.4} /></mesh>
      <mesh position={[0, 0.94, 0]}><boxGeometry args={[1.12, 0.12, 0.32]} /><meshStandardMaterial color="#d5ebe5" /></mesh>
    </>}
    {stage.id === 'smelting' && <>
      <mesh position={[0, 0.58, 0]} castShadow><boxGeometry args={[1.35, 1.05, 0.95]} /><meshStandardMaterial color="#a94c35" roughness={0.42} emissive="#6a1b0b" emissiveIntensity={0.32} /></mesh>
      <mesh position={[-0.37, 1.45, 0]} castShadow><cylinderGeometry args={[0.16, 0.2, 0.82, 20]} /><meshStandardMaterial color="#d4ddd9" /></mesh>
      <mesh position={[0.37, 1.38, 0]} castShadow><cylinderGeometry args={[0.13, 0.17, 0.68, 20]} /><meshStandardMaterial color="#d4ddd9" /></mesh>
      <mesh position={[0, 0.61, 0.5]}><planeGeometry args={[0.48, 0.35]} /><meshBasicMaterial color="#ffb071" /></mesh>
      {hotspot && <pointLight position={[0, 2.2, 0.5]} color="#ff9f72" intensity={1.6} distance={4} />}
    </>}
    {stage.id === 'transport' && <>
      <mesh position={[0.2, 0.48, 0]} castShadow><boxGeometry args={[1.15, 0.58, 0.72]} /><meshStandardMaterial color="#4f9c92" roughness={0.45} /></mesh>
      <mesh position={[-0.52, 0.38, 0]} castShadow><boxGeometry args={[0.45, 0.42, 0.7]} /><meshStandardMaterial color="#7fc2b5" roughness={0.45} /></mesh>
      {[-0.45, 0.55].map((x) => <React.Fragment key={x}><mesh position={[x, 0.22, 0.38]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.18, 0.18, 0.12, 16]} /><meshStandardMaterial color="#43534e" /></mesh><mesh position={[x, 0.22, -0.38]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.18, 0.18, 0.12, 16]} /><meshStandardMaterial color="#43534e" /></mesh></React.Fragment>)}
    </>}
    {isRecovery && <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.32, 0]}><torusGeometry args={[0.72, 0.18, 16, 32]} /><meshStandardMaterial color={accent} roughness={0.35} metalness={0.15} /></mesh>
      <mesh position={[0, 0.33, 0]}><cylinderGeometry args={[0.38, 0.38, 0.28, 24]} /><meshStandardMaterial color="#c8eee0" roughness={0.45} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.05, 0.52, 0]}><torusGeometry args={[0.43, 0.045, 10, 32]} /><meshBasicMaterial color="#e6fff5" /></mesh>
    </>}
    <Html position={[0, labelY, 0]} center distanceFactor={11} style={{ pointerEvents: 'none' }}>
      <div className="min-w-[98px] rounded-md border border-slate-200 bg-white/95 px-2 py-1.5 text-center shadow-sm">
        <p className={`text-[10px] font-bold leading-tight ${hotspot ? 'text-red-700' : 'text-slate-700'}`}>{stage.name}</p>
        <p className="mt-0.5 font-mono-data text-[10px] font-bold text-slate-500">{isRecovery ? `${stage.recycledPct}% recycled` : `${value.toFixed(2)} ${mode === 'carbon' ? 'tCO2e' : 'MWh'}`}</p>
      </div>
    </Html>
  </group>;
}

function Scene({ stages, mode, selectedStage, setSelectedStage, setHoveredStage, onResetReady }) {
  const processStages = stages.filter((stage) => stage.id !== 'recovery');
  const maxValue = Math.max(...processStages.map((stage) => mode === 'carbon' ? stage.carbonTons : stage.energyMwh), 1);
  const activeIndex = selectedStage ? stages.findIndex((stage) => stage.id === selectedStage.id) : null;
  const hotspotId = processStages.reduce((highest, stage) => stage.carbonTons > highest.carbonTons ? stage : highest, processStages[0]).id;
  return <Canvas shadows camera={{ position: [8, 7, 11], fov: 42 }} dpr={[1, 1.5]}>
    <color attach="background" args={['#f7faf8']} />
    <ambientLight intensity={1.45} />
    <directionalLight position={[4, 9, 6]} intensity={1.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
    <pointLight position={[1, 4.8, 1]} color="#f4a27d" intensity={selectedStage?.id === 'smelting' ? 1.2 : 0.32} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[17, 10]} /><shadowMaterial transparent opacity={0.1} /></mesh>
    {stages.slice(0, -1).map((_, index) => <React.Fragment key={index}><FlowLine start={positions[index]} end={positions[index + 1]} /><FlowPulse start={positions[index]} end={positions[index + 1]} offset={index / 5} /></React.Fragment>)}
    <Line points={[[5.45, 0.17, 0.2], [5.9, 0.17, 1.15], [4.55, 0.17, 1.3], [4.1, 0.17, 0.3]]} color="#46a07b" lineWidth={1.5} transparent opacity={0.7} />
    {stages.map((stage, index) => <LifecycleNode key={stage.id} stage={stage} position={positions[index]} mode={mode} maxValue={maxValue} selected={selectedStage?.id === stage.id} isHotspot={stage.id === hotspotId} onSelect={setSelectedStage} onHover={setHoveredStage} />)}
    <CameraFocus active={activeIndex} onReady={onResetReady} />
  </Canvas>;
}

export default function LifecycleImpactLandscape({ stages }) {
  const [mode, setMode] = useState('carbon');
  const [selectedStage, setSelectedStage] = useState(null);
  const [hoveredStage, setHoveredStage] = useState(null);
  const resetCamera = useRef(null);
  useEffect(() => { setSelectedStage(null); }, [stages]);
  const standardStages = useMemo(() => stages.filter((stage) => stage.id !== 'recovery'), [stages]);
  const hotspot = standardStages.reduce((highest, stage) => stage.carbonTons > highest.carbonTons ? stage : highest, standardStages[0]);
  const displayStage = hoveredStage || selectedStage || hotspot;
  const unit = mode === 'carbon' ? 'tCO2e' : 'MWh';
  const maxValue = Math.max(...standardStages.map((stage) => mode === 'carbon' ? stage.carbonTons : stage.energyMwh), 1);
  const displayValue = displayStage?.id === 'recovery' ? `${displayStage.recycledPct}% recycled` : `${(mode === 'carbon' ? displayStage?.carbonTons : displayStage?.energyMwh)?.toFixed(2)} ${unit}`;

  return <section className="xl:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 border-b border-outline-variant pb-sm mb-md">
      <div><h3 className="font-headline-sm text-lg font-semibold text-on-surface">3D Lifecycle Impact Landscape</h3><p className="text-xs text-on-surface-variant mt-1">Live lifecycle allocation from the active uploaded dataset. Industrial stage prominence represents {mode === 'carbon' ? 'carbon impact' : 'energy consumption'}.</p></div>
      <div className="flex items-center gap-2"><div className="flex rounded-lg border border-outline-variant bg-surface p-1 text-xs font-bold"><button onClick={() => setMode('carbon')} className={`rounded px-3 py-1.5 ${mode === 'carbon' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Carbon</button><button onClick={() => setMode('energy')} className={`rounded px-3 py-1.5 ${mode === 'energy' ? 'bg-tertiary text-on-primary' : 'text-on-surface-variant'}`}>Energy</button></div><button onClick={() => { setSelectedStage(null); resetCamera.current?.(); }} className="rounded-lg border border-outline-variant bg-surface px-3 py-1.5 text-xs font-bold text-on-surface hover:bg-surface-container-low">Reset View</button></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_215px] gap-md">
      <div className="relative h-[360px] overflow-hidden rounded-xl border border-outline-variant bg-[#f7faf8]"><Suspense fallback={<div className="p-lg text-sm text-on-surface-variant">Loading lifecycle model…</div>}><Scene stages={stages} mode={mode} selectedStage={selectedStage} setSelectedStage={setSelectedStage} setHoveredStage={setHoveredStage} onResetReady={(reset) => { resetCamera.current = reset; }} /></Suspense><div className="absolute bottom-3 left-3 rounded-md border border-emerald-100 bg-white/90 px-2 py-1 text-[10px] font-semibold text-emerald-800">Drag for 360° view · Scroll to zoom</div></div>
      <aside className="rounded-xl border border-outline-variant bg-surface p-md"><p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Selected lifecycle stage</p><h4 className={`mt-2 text-base font-bold ${displayStage?.id === 'smelting' ? 'text-red-700' : 'text-on-surface'}`}>{displayStage?.name}</h4>{displayStage?.id === 'smelting' && <span className="mt-1 inline-block rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-700">ENVIRONMENTAL HOTSPOT</span>}<dl className="mt-4 space-y-3 text-sm"><div><dt className="text-xs text-on-surface-variant">{displayStage?.id === 'recovery' ? 'Recycled content' : mode === 'carbon' ? 'CO2 impact' : 'Energy use'}</dt><dd className="font-mono-data font-bold text-on-surface">{displayValue}</dd></div><div><dt className="text-xs text-on-surface-variant">Contribution</dt><dd className="font-mono-data font-bold text-on-surface">{displayStage?.contributionPct}%</dd></div>{displayStage?.id === 'recovery' ? <div><dt className="text-xs text-on-surface-variant">Recovery rate</dt><dd className="font-mono-data font-bold text-primary">{displayStage.recoveryPct}%</dd></div> : <div><dt className="text-xs text-on-surface-variant">Energy allocation</dt><dd className="font-mono-data font-bold text-on-surface">{displayStage.energyMwh.toFixed(2)} MWh</dd></div>}</dl></aside>
    </div>
    <div className="mt-lg border-t border-outline-variant pt-md"><div className="flex items-center justify-between"><h4 className="font-semibold text-on-surface">Impact Contribution</h4><span className="text-xs text-on-surface-variant">Exact {mode === 'carbon' ? 'carbon' : 'energy'} comparison</span></div><div className="mt-3 grid gap-2">{standardStages.map((stage) => { const value = mode === 'carbon' ? stage.carbonTons : stage.energyMwh; const hot = stage.id === 'smelting'; return <button key={stage.id} onClick={() => setSelectedStage(stage)} className="grid grid-cols-[110px_minmax(0,1fr)_76px] items-center gap-2 text-left"><span className={`text-xs font-semibold ${hot ? 'text-red-700' : 'text-on-surface'}`}>{stage.name}</span><span className="h-2.5 overflow-hidden rounded-full bg-surface-container"><span className={`block h-full rounded-full ${hot ? 'bg-red-500' : mode === 'carbon' ? 'bg-primary' : 'bg-tertiary'}`} style={{ width: `${(value / maxValue) * 100}%` }} /></span><span className="text-right font-mono-data text-xs font-bold text-on-surface">{value.toFixed(2)} {unit}</span></button>; })}</div><p className="mt-3 text-[11px] text-on-surface-variant">Recovery loop: {stages.find((stage) => stage.id === 'recovery')?.recycledPct}% recycled content and {stages.find((stage) => stage.id === 'recovery')?.recoveryPct}% recovery rate, calculated from the active dataset.</p></div>
  </section>;
}
