import React, { useState, useEffect } from 'react';
import { useDataset } from '../context/DataContext';
import AnimatedNumber from '../components/AnimatedNumber';

export default function Circularity() {
  const { metrics, selectedMetal, setSelectedMetal } = useDataset();
  const [scrapRatio, setScrapRatio] = useState(46);

  useEffect(() => {
    if (metrics) {
      setScrapRatio(metrics.avgRecycledPct);
    }
  }, [metrics]);

  if (!metrics) return null;

  // Recalculate MCI dynamically based on scrap ratio slider
  const mciScore = (0.35 + (scrapRatio / 100) * 0.60).toFixed(2);
  const carbonSavings = (((scrapRatio - metrics.avgRecycledPct) * 0.08) * parseFloat(metrics.totalCO2Tons) / 100).toFixed(2);

  // Compute waste distribution tons
  const totalInputKg = (metrics.totalVirginKg || 0) + (metrics.totalRecycledKg || 0);
  const totalInputTons = totalInputKg / 1000 || 1;
  const productionTons = parseFloat(metrics.totalQuantityTons) || 0;
  const recoveredTons = (metrics.totalRecoveredKg || 0) / 1000;
  const lossTons = (metrics.totalWasteLossKg || 0) / 1000;

  // Pct calculations for visual bars
  const prodPct = Math.round((productionTons / totalInputTons) * 100) || 82;
  const recPct = Math.round((recoveredTons / totalInputTons) * 100) || 15;
  const lossPct = Math.round((lossTons / totalInputTons) * 100) || 3;

  return (
    <div className="space-y-lg animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-outline-variant/45">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">Circularity Analysis</h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Material Circularity Indicator (MCI) &amp; closed-loop scrap recovery metrics calculated live from active dataset.
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
      </div>

      {/* Top Circularity Score Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div className="premium-card rounded-xl p-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase text-on-surface-variant">MCI Score</span>
            <div className="font-mono-data text-4xl font-bold text-primary mt-1">
              <AnimatedNumber value={mciScore} decimals={2} />
            </div>
            <span className="text-[11px] text-primary font-semibold mt-1 block">
              Dataset Baseline: <AnimatedNumber value={(metrics.avgCircularity / 100)} decimals={2} /> ({metrics.avgCircularity}/100)
            </span>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-primary border-t-primary-container flex items-center justify-center text-primary font-bold font-mono-data text-sm shadow-sm">
            <AnimatedNumber value={mciScore * 100} decimals={0} suffix="%" />
          </div>
        </div>

        <div className="premium-card rounded-xl p-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase text-on-surface-variant">Recycled Material Input</span>
            <div className="font-mono-data text-4xl font-bold text-secondary mt-1">
              <AnimatedNumber value={scrapRatio} decimals={0} suffix="%" />
            </div>
            <span className="text-[11px] text-on-surface-variant mt-1 block">Virgin Input: <AnimatedNumber value={100 - scrapRatio} decimals={0} suffix="%" /></span>
          </div>
          <div className="w-12 h-12 bg-secondary-container/30 text-secondary rounded-full flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-2xl">recycling</span>
          </div>
        </div>

        <div className="premium-card rounded-xl p-lg flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase text-on-surface-variant">Recovery / Waste Diversion</span>
            <div className="font-mono-data text-4xl font-bold text-tertiary mt-1">
              <AnimatedNumber value={metrics.avgRecoveryPct} decimals={0} suffix="%" />
            </div>
            <span className="text-[11px] text-tertiary font-semibold mt-1 block">Total Loss: <AnimatedNumber value={metrics.totalMfgLossKg / 1000} decimals={2} suffix="t" /></span>
          </div>
          <div className="w-12 h-12 bg-tertiary-container/30 text-tertiary rounded-full flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-2xl">autorenew</span>
          </div>
        </div>
      </div>

      {/* Interactive Scrap Intake Adjuster */}
      <section className="premium-card rounded-xl p-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-md border-b border-outline-variant/60 pb-sm gap-2">
          <div>
            <h3 className="font-headline-sm text-base font-bold text-on-surface">Recycled Scrap Input Simulator</h3>
            <p className="text-xs text-on-surface-variant">Adjust secondary recycled material % to project MCI score &amp; carbon offset</p>
          </div>
          <span className="text-xs bg-primary-container/10 text-primary font-bold px-3 py-1.5 rounded-lg border border-primary/20 shadow-sm">
            Projected CO2 Offset: {parseFloat(carbonSavings) >= 0 ? `-${carbonSavings}` : `+${Math.abs(carbonSavings)}`} tCO2e
          </span>
        </div>

        <div className="py-4 space-y-4">
          <div className="flex justify-between text-xs font-semibold">
            <span>Virgin Primary Material: {100 - scrapRatio}%</span>
            <span className="text-primary">Secondary Recycled Input: {scrapRatio}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            value={scrapRatio}
            onChange={(e) => setScrapRatio(Number(e.target.value))}
            className="w-full h-2 bg-surface-variant rounded-lg appearance-none cursor-pointer accent-primary transition-all duration-200"
          />
          <div className="flex justify-between text-[11px] text-on-surface-variant">
            <span>10% Minimum</span>
            <span>{metrics.avgRecycledPct}% Dataset Baseline</span>
            <span>90% Maximum Closed Loop</span>
          </div>
        </div>
      </section>

      {/* Circular Material Flow Diagram */}
      <section className="premium-card rounded-xl p-lg">
        <h3 className="font-headline-sm text-base font-bold text-on-surface mb-md border-b border-outline-variant/60 pb-sm">
          Closed-Loop Material Flow (<AnimatedNumber value={metrics.totalQuantityTons} decimals={1} /> tonnes metal)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-md text-center py-4">
          <div className="bg-surface-bright/70 p-md border border-outline-variant/60 rounded-xl hover:border-primary/20 transition-all duration-200 shadow-sm">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">delete_sweep</span>
            <h4 className="font-bold text-sm text-on-surface">Industrial Scrap Input</h4>
            <p className="text-xs text-on-surface-variant mt-1">
              <AnimatedNumber value={((metrics.totalQuantityKg * metrics.avgRecycledPct / 100) / 1000)} decimals={2} /> tonnes recycled input
            </p>
          </div>

          <div className="bg-surface-bright/70 p-md border border-outline-variant/60 rounded-xl hover:border-secondary/20 transition-all duration-200 shadow-sm">
            <span className="material-symbols-outlined text-secondary text-3xl mb-2">filter_alt</span>
            <h4 className="font-bold text-sm text-on-surface">Material Recovery</h4>
            <p className="text-xs text-on-surface-variant mt-1">
              <AnimatedNumber value={metrics.avgRecoveryPct} decimals={0} suffix="%" /> recovery rate verified
            </p>
          </div>

          <div className="bg-surface-bright/70 p-md border border-outline-variant/60 rounded-xl hover:border-tertiary/20 transition-all duration-200 shadow-sm">
            <span className="material-symbols-outlined text-tertiary text-3xl mb-2">hvac</span>
            <h4 className="font-bold text-sm text-on-surface">Re-melting / Smelting</h4>
            <p className="text-xs text-on-surface-variant mt-1">
              <AnimatedNumber value={metrics.totalEnergyMwh} decimals={1} /> MWh total energy
            </p>
          </div>

          <div className="bg-surface-bright/70 p-md border border-outline-variant/60 rounded-xl hover:border-primary/20 transition-all duration-200 shadow-sm">
            <span className="material-symbols-outlined text-primary text-3xl mb-2">inventory_2</span>
            <h4 className="font-bold text-sm text-on-surface">Finished Product Output</h4>
            <p className="text-xs text-on-surface-variant mt-1">
              <AnimatedNumber value={metrics.totalQuantityTons} decimals={1} /> tonnes finished metal
            </p>
          </div>
        </div>
      </section>

      {/* Furnace Waste Loss & Recovery Breakdown Bar Chart (New Feature) */}
      <section className="premium-card rounded-xl p-lg space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-outline-variant/60">
          <div>
            <h3 className="text-base font-bold text-on-surface uppercase tracking-wider">Furnace Waste Loss &amp; Recovery</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Smelter output distribution and dross byproduct recovery analysis</p>
          </div>
          <span className="text-xs font-mono-data bg-tertiary-container/10 border border-tertiary/20 text-tertiary font-bold px-2.5 py-1 rounded-lg">
            Total Input: <AnimatedNumber value={totalInputTons} decimals={1} /> tonnes
          </span>
        </div>

        <div className="py-2 space-y-5">
          {/* Main Visual bar stacking */}
          <div>
            <span className="text-xs text-on-surface-variant block mb-2 font-semibold">Overall Material Distribution Ratio</span>
            <div className="w-full h-4 rounded-full overflow-hidden flex shadow-inner bg-surface-container-low">
              <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${prodPct}%` }} title={`Finished Product: ${prodPct}%`}></div>
              <div className="bg-tertiary h-full transition-all duration-1000" style={{ width: `${recPct}%` }} title={`Recovered Byproduct: ${recPct}%`}></div>
              <div className="bg-error h-full transition-all duration-1000" style={{ width: `${lossPct}%` }} title={`Dross/Slag Loss: ${lossPct}%`}></div>
            </div>
          </div>

          {/* Breakdown items list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-md pt-2">
            <div className="p-3 bg-surface-bright/50 border border-outline-variant/60 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-primary font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                Finished Product Output
              </div>
              <p className="text-base font-bold text-on-surface font-mono-data">
                <AnimatedNumber value={productionTons} decimals={1} /> <span className="text-xs text-on-surface-variant font-normal">tonnes</span>
              </p>
              <p className="text-[10px] text-on-surface-variant">Yielding {prodPct}% of total furnace input.</p>
            </div>

            <div className="p-3 bg-surface-bright/50 border border-outline-variant/60 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-tertiary font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                Diverted Byproduct (Recovered)
              </div>
              <p className="text-base font-bold text-on-surface font-mono-data">
                <AnimatedNumber value={recoveredTons} decimals={2} /> <span className="text-xs text-on-surface-variant font-normal">tonnes</span>
              </p>
              <p className="text-[10px] text-on-surface-variant">Re-injected into smelting loop ({recPct}%).</p>
            </div>

            <div className="p-3 bg-surface-bright/50 border border-outline-variant/60 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-error font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                Dross / Furnace Slag Loss
              </div>
              <p className="text-base font-bold text-on-surface font-mono-data">
                <AnimatedNumber value={lossTons} decimals={2} /> <span className="text-xs text-on-surface-variant font-normal">tonnes</span>
              </p>
              <p className="text-[10px] text-on-surface-variant">Unrecoverable slag waste ({lossPct}%).</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
