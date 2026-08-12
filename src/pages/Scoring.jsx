import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataset } from '../context/DataContext';
import AnimatedNumber from '../components/AnimatedNumber';

export default function Scoring() {
  const { metrics, simMetrics } = useDataset();
  const navigate = useNavigate();

  if (!metrics || !simMetrics) return null;

  const energyDelta = (((parseFloat(metrics.totalEnergyMwh) - parseFloat(simMetrics.simulatedEnergyMwh)) / parseFloat(metrics.totalEnergyMwh)) * 100).toFixed(1);
  const circularityDelta = simMetrics.simulatedCircularity - metrics.avgCircularity;

  return (
    <div className="space-y-lg animate-fade-in-up">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-outline-variant/45">
        <div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-on-surface">
            Sustainability Scoring Board
          </h2>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Compare baseline compliance indices with project target indicators.
          </p>
        </div>
      </header>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Projection Summary Card (Spans 5 columns) */}
        <div className="lg:col-span-5 premium-card rounded-xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-primary-container"></div>
          
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
            CURRENT DATASET SCORE
          </span>
          <div className="font-mono-data text-5xl font-bold text-on-surface mb-3">
            <AnimatedNumber value={metrics.scores.overallScore} decimals={0} /><span className="text-xl text-on-surface-variant font-normal">/100</span>
          </div>

          <span className="material-symbols-outlined text-on-surface-variant text-xl my-3">arrow_downward</span>

          <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
            SIMULATED PROJECTION SCORE
          </span>
          <div className="font-mono-data text-6xl font-bold text-primary mb-6">
            <AnimatedNumber value={simMetrics.simulatedOverallScore} decimals={0} /><span className="text-2xl text-primary/70 font-normal">/100</span>
          </div>

          <div className="bg-primary-container/10 border border-primary/20 text-primary text-xs font-bold py-2 px-6 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <AnimatedNumber value={simMetrics.scoreImprovement} decimals={0} /> POINT IMPROVEMENT
          </div>
        </div>

        {/* Right Details Section (Spans 7 columns) */}
        <div className="lg:col-span-7 space-y-gutter">
          {/* Notice Box */}
          <div className="p-md bg-surface-bright border-l-4 border-primary border border-outline-variant/60 rounded-xl flex items-start gap-md shadow-sm">
            <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
            <p className="text-sm text-on-surface leading-relaxed">
              Simulated scenario achieves <span className="font-bold text-primary"><AnimatedNumber value={simMetrics.co2ReductionPct} decimals={1} />% lower carbon emissions</span> and improves circularity index to <span className="font-bold text-tertiary"><AnimatedNumber value={simMetrics.simulatedCircularity} decimals={0} />/100</span>.
            </p>
          </div>

          {/* Metric Breakdown Table */}
          <div className="premium-card rounded-xl overflow-hidden shadow-sm">
            <div className="p-md bg-surface-bright border-b border-outline-variant/60">
              <h3 className="font-headline-sm text-base font-bold text-on-surface">Metric Breakdown</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-surface font-label-md text-xs text-on-surface-variant border-b border-outline-variant/60 uppercase">
                    <th className="py-3 px-md font-semibold">INDICATOR</th>
                    <th className="py-3 px-md font-semibold">CURRENT</th>
                    <th className="py-3 px-md font-semibold text-primary">SIMULATED</th>
                    <th className="py-3 px-md font-semibold text-right">DELTA</th>
                  </tr>
                </thead>
                <tbody className="font-mono-data text-on-surface">
                  <tr className="border-b border-outline-variant/60 hover:bg-surface/50 transition-colors">
                    <td className="py-3 px-md font-body-sm text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-primary">co2</span> Carbon Emissions
                    </td>
                    <td className="py-3 px-md"><AnimatedNumber value={metrics.totalCO2Tons} decimals={1} /> tCO2e</td>
                    <td className="py-3 px-md text-primary font-bold"><AnimatedNumber value={simMetrics.simulatedCO2Tons} decimals={1} /> tCO2e</td>
                    <td className="py-3 px-md text-right text-primary font-bold">-{simMetrics.co2ReductionPct}%</td>
                  </tr>

                  <tr className="border-b border-outline-variant/60 hover:bg-surface/50 transition-colors">
                    <td className="py-3 px-md font-body-sm text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-tertiary">bolt</span> Energy Usage
                    </td>
                    <td className="py-3 px-md"><AnimatedNumber value={metrics.totalEnergyMwh} decimals={1} /> MWh</td>
                    <td className="py-3 px-md text-primary font-bold"><AnimatedNumber value={simMetrics.simulatedEnergyMwh} decimals={1} /> MWh</td>
                    <td className="py-3 px-md text-right text-primary font-bold">
                      -{energyDelta}%
                    </td>
                  </tr>

                  <tr className="border-b border-outline-variant/60 hover:bg-surface/50 transition-colors">
                    <td className="py-3 px-md font-body-sm text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-secondary">sync</span> Circularity Index
                    </td>
                    <td className="py-3 px-md"><AnimatedNumber value={metrics.avgCircularity} decimals={0} />/100</td>
                    <td className="py-3 px-md text-primary font-bold"><AnimatedNumber value={simMetrics.simulatedCircularity} decimals={0} />/100</td>
                    <td className="py-3 px-md text-right text-tertiary font-bold">
                      +{circularityDelta} PTS
                    </td>
                  </tr>

                  <tr className="hover:bg-surface/50 transition-colors">
                    <td className="py-3 px-md font-body-sm text-on-surface font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-primary">water_drop</span> Material Recovery
                    </td>
                    <td className="py-3 px-md"><AnimatedNumber value={metrics.avgRecoveryPct} decimals={0} />%</td>
                    <td className="py-3 px-md text-primary font-bold"><AnimatedNumber value={Math.min(98, metrics.avgRecoveryPct + 12)} decimals={0} />%</td>
                    <td className="py-3 px-md text-right text-tertiary font-bold">+12%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => navigate('/recommendations')}
              className="bg-primary text-on-primary font-label-md text-sm px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-primary-fixed-variant transition-all font-bold cursor-pointer shadow active:scale-97"
            >
              View Mitigation Recommendations
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
