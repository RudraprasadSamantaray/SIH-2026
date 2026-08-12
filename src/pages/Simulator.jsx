import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataset } from '../context/DataContext';
import AnimatedNumber from '../components/AnimatedNumber';

export default function Simulator() {
  const { metrics, selectedMetal } = useDataset();
  const navigate = useNavigate();

  // Slider State (Targets)
  const [recycledInput, setRecycledInput] = useState(65);
  const [transportMode, setTransportMode] = useState('rail'); // 'truck' | 'rail'

  if (!metrics) return null;

  // Baseline calculations
  const carbonBaseline = metrics.totalCO2Kg;
  const energyBaseline = metrics.totalEnergyKwh;
  const circularityBaseline = metrics.avgCircularity;
  const recoveryBaseline = metrics.avgRecoveryPct;

  // Simulator projection calculations (formula based on user controls)
  const recycledGain = recycledInput - metrics.avgRecycledPct;
  const carbonReductionFactor = 1 - (recycledGain * 0.008 + (transportMode === 'rail' ? 0.14 : 0));
  const carbonSimulated = Math.round(carbonBaseline * Math.max(0.55, Math.min(1.0, carbonReductionFactor)));
  
  const energySimulated = Math.round(energyBaseline * (1 - (recycledGain * 0.002)));
  const circularitySimulated = Math.min(95, Math.round(metrics.avgCircularity + recycledGain * 0.6));
  const recoverySimulated = Math.min(100, Math.round(metrics.avgRecoveryPct + (transportMode === 'rail' ? 5 : 0)));

  // Variances
  const carbonVariance = (((carbonSimulated - carbonBaseline) / carbonBaseline) * 100).toFixed(1);
  const energyVariance = (((energySimulated - energyBaseline) / energyBaseline) * 100).toFixed(1);
  const circularityVariance = (circularitySimulated - circularityBaseline).toFixed(0);
  const recoveryVariance = (recoverySimulated - recoveryBaseline).toFixed(0);

  return (
    <div className="space-y-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-outline-variant/45">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
            Decarbonization Scenario Simulator
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Simulate the environmental impact reduction of alternative sourcing and logistics options for {selectedMetal} metal.
          </p>
        </div>

        <div className="flex items-center gap-md">
          <button
            onClick={() => navigate('/scoring')}
            className="bg-primary-container text-on-primary font-label-md text-xs py-2.5 px-6 rounded-lg hover:bg-primary transition-all font-bold cursor-pointer shadow active:scale-97"
          >
            Run Simulation
          </button>
          <button
            onClick={() => navigate('/scoring')}
            className="bg-surface-bright text-on-surface border border-outline-variant font-label-md text-xs py-2.5 px-6 rounded-lg hover:bg-surface-container-low transition-colors flex items-center gap-1 font-semibold cursor-pointer active:scale-97 shadow-sm"
          >
            Compare Results <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter animate-fade-in-up">
        {/* Current Scenario Card */}
        <div className="col-span-12 lg:col-span-5 premium-card rounded-xl p-lg flex flex-col justify-between">
          <h2 className="font-headline-sm text-base font-bold text-on-surface border-b border-outline-variant/60 pb-sm mb-md flex items-center gap-2">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">history</span> CURRENT DATASET BASELINE
          </h2>
          <div className="flex-1 space-y-md">
            <div className="bg-surface-bright/70 p-md rounded-xl border border-outline-variant/60 shadow-sm space-y-3">
              <span className="font-label-md text-xs text-on-surface-variant block uppercase tracking-wider font-semibold">Dataset Material Input</span>
              
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-body-sm text-on-surface font-medium">Virgin Primary Input</span>
                  <span className="font-mono-data text-on-surface font-bold"><AnimatedNumber value={metrics.avgVirginPct} decimals={0} suffix="%" /></span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                  <div className="bg-outline h-full rounded-full transition-all duration-500" style={{ width: `${metrics.avgVirginPct}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-body-sm text-on-surface font-medium">Secondary Recycled Input</span>
                  <span className="font-mono-data text-on-surface font-bold"><AnimatedNumber value={metrics.avgRecycledPct} decimals={0} suffix="%" /></span>
                </div>
                <div className="w-full bg-surface-variant rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full transition-all duration-500" style={{ width: `${metrics.avgRecycledPct}%` }}></div>
                </div>
              </div>
            </div>

            <div className="bg-surface-bright/70 p-md rounded-xl border border-outline-variant/60 flex items-center justify-between shadow-sm">
              <div>
                <span className="font-label-md text-xs text-on-surface-variant block mb-1 uppercase tracking-wider font-semibold">Transport Baseline</span>
                <span className="font-body-md text-sm text-on-surface flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-base">local_shipping</span> 
                  <AnimatedNumber value={metrics.totalTransportKm} decimals={0} /> km Total Distance
                </span>
              </div>
              <span className="font-mono-data text-on-surface-variant text-[10px] font-bold uppercase">Dataset Baseline</span>
            </div>
          </div>
        </div>

        {/* Divider / Connection (Desktop only) */}
        <div className="hidden lg:flex col-span-2 items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-outline-variant/70 animate-pulse">sync_alt</span>
        </div>

        {/* Simulated Scenario Card (Controls) */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest border-2 border-primary rounded-xl p-lg flex flex-col relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
          <h2 className="font-headline-sm text-base font-bold text-primary border-b border-primary/20 pb-sm mb-md flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">tune</span> SIMULATED SCENARIO
          </h2>
          <div className="flex-1 space-y-lg">
            {/* Slider Control */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-xs text-on-surface block font-semibold uppercase tracking-wider text-on-surface-variant" htmlFor="recycled-slider">
                  Target Recycled Material Input
                </label>
                <span className="font-mono-data text-sm text-primary bg-primary-container/10 border border-primary/20 px-2.5 py-1 rounded-md font-bold">
                  {recycledInput}%
                </span>
              </div>
              <input
                className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary transition-all duration-200"
                id="recycled-slider"
                max="90"
                min={metrics.avgRecycledPct}
                type="range"
                value={recycledInput}
                onChange={(e) => setRecycledInput(Number(e.target.value))}
              />
              <div className="flex justify-between mt-1 text-xs text-on-surface-variant font-medium">
                <span>{metrics.avgRecycledPct}% (Current)</span>
                <span>90% (Max Closed Loop)</span>
              </div>
            </div>

            {/* Toggle Control */}
            <div className="bg-surface-bright/70 p-md rounded-xl border border-outline-variant/60 shadow-sm">
              <span className="text-xs text-on-surface-variant block mb-3 uppercase tracking-wider font-semibold">Transport Mode Shift</span>
              <div className="grid grid-cols-2 gap-sm">
                <label className="cursor-pointer">
                  <input
                    className="peer sr-only"
                    name="transport_mode"
                    type="radio"
                    value="truck"
                    checked={transportMode === 'truck'}
                    onChange={() => setTransportMode('truck')}
                  />
                  <div className="p-sm text-center border border-outline-variant/85 rounded-lg peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary text-on-surface-variant transition-all font-body-sm text-xs flex flex-col items-center gap-1.5 font-bold shadow-sm">
                    <span className="material-symbols-outlined text-lg">local_shipping</span>
                    Highway Truck
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    className="peer sr-only"
                    name="transport_mode"
                    type="radio"
                    value="rail"
                    checked={transportMode === 'rail'}
                    onChange={() => setTransportMode('rail')}
                  />
                  <div className="p-sm text-center border border-outline-variant/85 rounded-lg peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary text-on-surface-variant transition-all font-body-sm text-xs flex flex-col items-center gap-1.5 font-bold shadow-sm">
                    <span className="material-symbols-outlined text-lg">train</span>
                    Intermodal Rail
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table / Results Panel */}
        <div className="col-span-12 premium-card rounded-xl overflow-hidden mt-md">
          <div className="p-md bg-surface-bright border-b border-outline-variant/60 flex justify-between items-center">
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Impact Comparison Projection</h3>
            <span className="text-xs font-mono-data bg-primary-container/10 text-primary border border-primary/20 px-2.5 py-1 rounded-md font-bold uppercase">
              Live Preview
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface font-label-md text-on-surface-variant border-b border-outline-variant/60">
                  <th className="py-3 px-md font-semibold">Metric</th>
                  <th className="py-3 px-md font-semibold">Dataset Baseline</th>
                  <th className="py-3 px-md font-semibold text-primary">Simulated Projection</th>
                  <th className="py-3 px-md font-semibold text-right">Variance</th>
                </tr>
              </thead>
              <tbody className="font-mono-data text-on-surface">
                <tr className="border-b border-outline-variant/60 hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-md font-body-sm text-on-surface font-medium">Carbon Impact (kg CO2e)</td>
                  <td className="py-3 px-md">{carbonBaseline.toLocaleString()} kg ({metrics.totalCO2Tons}t)</td>
                  <td className="py-3 px-md text-primary font-bold">{carbonSimulated.toLocaleString()} kg ({(carbonSimulated / 1000).toFixed(2)}t)</td>
                  <td className="py-3 px-md text-right text-primary font-bold flex items-center justify-end gap-xs">
                    <span className="material-symbols-outlined text-sm">arrow_downward</span> {carbonVariance}%
                  </td>
                </tr>
                <tr className="border-b border-outline-variant/60 hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-md font-body-sm text-on-surface font-medium">Energy Consumption (kWh)</td>
                  <td className="py-3 px-md">{energyBaseline.toLocaleString()} kWh ({metrics.totalEnergyMwh} MWh)</td>
                  <td className="py-3 px-md text-primary font-bold">{energySimulated.toLocaleString()} kWh ({(energySimulated / 1000).toFixed(1)} MWh)</td>
                  <td className="py-3 px-md text-right text-primary font-bold flex items-center justify-end gap-xs">
                    <span className="material-symbols-outlined text-sm">arrow_downward</span> {energyVariance}%
                  </td>
                </tr>
                <tr className="border-b border-outline-variant/60 hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-md font-body-sm text-on-surface font-medium">Circularity Index Score</td>
                  <td className="py-3 px-md">{circularityBaseline}/100</td>
                  <td className="py-3 px-md text-primary font-bold">{circularitySimulated}/100</td>
                  <td className="py-3 px-md text-right text-tertiary font-bold flex items-center justify-end gap-xs">
                    <span className="material-symbols-outlined text-sm">arrow_upward</span> +{circularityVariance}%
                  </td>
                </tr>
                <tr className="hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-md font-body-sm text-on-surface font-medium">Material Recovery Rate</td>
                  <td className="py-3 px-md">{recoveryBaseline}%</td>
                  <td className="py-3 px-md text-primary font-bold">{recoverySimulated}%</td>
                  <td className="py-3 px-md text-right text-tertiary font-bold flex items-center justify-end gap-xs">
                    <span className="material-symbols-outlined text-sm">arrow_upward</span> +{recoveryVariance}%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
