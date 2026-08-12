import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Simulator() {
  const [recycledInput, setRecycledInput] = useState(50);
  const [transportMode, setTransportMode] = useState('rail');
  const navigate = useNavigate();

  // Dynamic variance calculation based on inputs
  const carbonBaseline = 4250;
  const carbonSimulated = Math.round(carbonBaseline * (1 - (recycledInput - 30) * 0.007 - (transportMode === 'rail' ? 0.12 : 0)));
  const carbonVariance = (((carbonSimulated - carbonBaseline) / carbonBaseline) * 100).toFixed(1);

  const energyBaseline = 1120;
  const energySimulated = Math.round(energyBaseline * (1 - (recycledInput - 30) * 0.006));
  const energyVariance = (((energySimulated - energyBaseline) / energyBaseline) * 100).toFixed(1);

  const circularityBaseline = 42.5;
  const circularitySimulated = (circularityBaseline + (recycledInput - 30) * 0.785).toFixed(1);
  const circularityVariance = (((circularitySimulated - circularityBaseline) / circularityBaseline) * 100).toFixed(1);

  const recoveryBaseline = 30.0;
  const recoverySimulated = Number(recycledInput).toFixed(1);
  const recoveryVariance = (((recoverySimulated - recoveryBaseline) / recoveryBaseline) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto space-y-gutter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-outline-variant pb-md gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Scenario Simulator</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Compare the current condition with a simulated scenario.
          </p>
        </div>
        <div className="flex gap-md">
          <button
            onClick={() => navigate('/scoring')}
            className="bg-primary-container text-on-primary font-label-md text-label-md px-md py-sm rounded hover:bg-primary transition-opacity font-bold cursor-pointer"
          >
            Run Simulation
          </button>
          <button
            onClick={() => navigate('/scoring')}
            className="bg-surface-container-lowest text-on-surface border border-outline-variant font-label-md text-label-md px-md py-sm rounded hover:bg-surface-container-low transition-colors flex items-center gap-xs font-semibold cursor-pointer"
          >
            Compare Results <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Current Scenario Card */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col shadow-sm">
          <h2 className="font-headline-sm text-headline-sm text-on-surface border-b border-outline-variant pb-sm mb-md flex items-center gap-xs font-bold">
            <span className="material-symbols-outlined text-on-surface-variant">history</span> CURRENT SCENARIO
          </h2>
          <div className="flex-1 space-y-md">
            <div className="bg-surface p-md rounded border border-outline-variant">
              <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Material Composition</span>
              <div className="flex justify-between items-center mb-unit">
                <span className="font-body-sm text-body-sm text-on-surface">Raw Material</span>
                <span className="font-mono-data text-mono-data text-on-surface font-bold">70%</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2 mb-sm">
                <div className="bg-outline h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="flex justify-between items-center mb-unit">
                <span className="font-body-sm text-body-sm text-on-surface">Recycled Material</span>
                <span className="font-mono-data text-mono-data text-on-surface font-bold">30%</span>
              </div>
              <div className="w-full bg-surface-variant rounded-full h-2">
                <div className="bg-primary-container h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div className="bg-surface p-md rounded border border-outline-variant flex items-center justify-between">
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Transport Mode</span>
                <span className="font-body-md text-body-md text-on-surface flex items-center gap-xs font-semibold">
                  <span className="material-symbols-outlined">local_shipping</span> Truck
                </span>
              </div>
              <span className="font-mono-data text-mono-data text-on-surface-variant">Default Baseline</span>
            </div>
          </div>
        </div>

        {/* Divider / Connection (Desktop only) */}
        <div className="hidden lg:flex col-span-2 items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-outline-variant">sync_alt</span>
        </div>

        {/* Simulated Scenario Card (Controls) */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest border-2 border-primary rounded-lg p-lg flex flex-col relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10"></div>
          <h2 className="font-headline-sm text-headline-sm text-primary border-b border-primary/20 pb-sm mb-md flex items-center gap-xs font-bold">
            <span className="material-symbols-outlined">tune</span> SIMULATED SCENARIO
          </h2>
          <div className="flex-1 space-y-lg">
            {/* Slider Control */}
            <div>
              <div className="flex justify-between items-end mb-sm">
                <label className="font-label-md text-label-md text-on-surface block font-semibold" htmlFor="recycled-slider">
                  Recycled Material Input
                </label>
                <span className="font-mono-data text-mono-data text-primary-container bg-surface-container px-sm py-xs rounded font-bold">
                  {recycledInput}%
                </span>
              </div>
              <input
                className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary-container"
                id="recycled-slider"
                max="100"
                min="30"
                type="range"
                value={recycledInput}
                onChange={(e) => setRecycledInput(Number(e.target.value))}
              />
              <div className="flex justify-between mt-unit font-label-md text-label-md text-on-surface-variant">
                <span>30% (Current)</span>
                <span>100% (Max)</span>
              </div>
            </div>

            {/* Toggle Control */}
            <div className="bg-surface p-md rounded border border-outline-variant">
              <span className="font-label-md text-label-md text-on-surface-variant block mb-md">Transport Mode Override</span>
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
                  <div className="p-sm text-center border border-outline-variant rounded peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary text-on-surface-variant transition-all font-body-sm text-body-sm flex flex-col items-center gap-unit font-semibold">
                    <span className="material-symbols-outlined">local_shipping</span>
                    Truck
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
                  <div className="p-sm text-center border border-outline-variant rounded peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary text-on-surface-variant transition-all font-body-sm text-body-sm flex flex-col items-center gap-unit font-semibold">
                    <span className="material-symbols-outlined">train</span>
                    Rail
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table / Results Panel */}
        <div className="col-span-12 bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden mt-md shadow-sm">
          <div className="p-md bg-surface-bright border-b border-outline-variant flex justify-between items-center">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Impact Comparison Projection</h3>
            <span className="font-label-md text-label-md px-sm py-xs bg-surface-container text-on-surface-variant rounded font-bold">
              Live Preview
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface font-label-md text-label-md text-on-surface-variant">
                  <th className="py-sm px-md font-semibold border-b border-outline-variant">Metric</th>
                  <th className="py-sm px-md font-semibold border-b border-outline-variant">Current</th>
                  <th className="py-sm px-md font-semibold border-b border-outline-variant text-primary">Simulated</th>
                  <th className="py-sm px-md font-semibold border-b border-outline-variant text-right">Variance</th>
                </tr>
              </thead>
              <tbody className="font-mono-data text-mono-data text-on-surface">
                <tr className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                  <td className="py-sm px-md font-body-sm text-body-sm">Carbon Impact (kg CO2e)</td>
                  <td className="py-sm px-md">{carbonBaseline.toLocaleString()}</td>
                  <td className="py-sm px-md text-primary font-bold">{carbonSimulated.toLocaleString()}</td>
                  <td className="py-sm px-md text-right text-primary-container font-bold flex items-center justify-end gap-xs">
                    <span className="material-symbols-outlined text-sm">arrow_downward</span> {carbonVariance}%
                  </td>
                </tr>
                <tr className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                  <td className="py-sm px-md font-body-sm text-body-sm">Energy Consumption (MWh)</td>
                  <td className="py-sm px-md">{energyBaseline.toLocaleString()}</td>
                  <td className="py-sm px-md text-primary font-bold">{energySimulated.toLocaleString()}</td>
                  <td className="py-sm px-md text-right text-primary-container font-bold flex items-center justify-end gap-xs">
                    <span className="material-symbols-outlined text-sm">arrow_downward</span> {energyVariance}%
                  </td>
                </tr>
                <tr className="border-b border-outline-variant hover:bg-surface/50 transition-colors">
                  <td className="py-sm px-md font-body-sm text-body-sm">Circularity Index</td>
                  <td className="py-sm px-md">{circularityBaseline}</td>
                  <td className="py-sm px-md text-primary font-bold">{circularitySimulated}</td>
                  <td className="py-sm px-md text-right text-primary-container font-bold flex items-center justify-end gap-xs">
                    <span className="material-symbols-outlined text-sm">arrow_upward</span> +{circularityVariance}%
                  </td>
                </tr>
                <tr className="hover:bg-surface/50 transition-colors">
                  <td className="py-sm px-md font-body-sm text-body-sm">Material Recovery Rate</td>
                  <td className="py-sm px-md">{recoveryBaseline.toFixed(1)}%</td>
                  <td className="py-sm px-md text-primary font-bold">{recoverySimulated}%</td>
                  <td className="py-sm px-md text-right text-primary-container font-bold flex items-center justify-end gap-xs">
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
