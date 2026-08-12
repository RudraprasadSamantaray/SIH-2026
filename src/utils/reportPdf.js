/**
 * Generate and download the executive EPD report as a properly formatted PDF
 * using a print-to-PDF approach via a new window, which is universally reliable.
 */
export const downloadExecutiveReport = ({ metrics, simMetrics, simControls, activeFileName, selectedMetal }) => {
  const format = new Intl.NumberFormat('en-IN');
  const timestamp = new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date());

  const metalRows = metrics.metalStats.map((m) =>
    `<tr>
      <td>${m.metal}</td>
      <td>${m.count}</td>
      <td>${m.quantity_tons} t</td>
      <td>${m.co2_tons} tCO2e</td>
      <td>${m.energy_mwh} MWh</td>
      <td>${m.avgCircularity}/100</td>
      <td>${m.avgRecycledPct}%</td>
    </tr>`
  ).join('');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>EcoMetrix AI - Executive EPD Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, Helvetica, sans-serif; color: #1c2025; background: #fff; padding: 40px 50px; line-height: 1.6; font-size: 11pt; }
    .header { border-bottom: 3px solid #006e2f; padding-bottom: 16px; margin-bottom: 24px; }
    .header h1 { font-size: 22pt; color: #006e2f; margin-bottom: 4px; }
    .header .subtitle { font-size: 10pt; color: #52595f; }
    .header .meta { font-size: 9pt; color: #777; margin-top: 6px; }
    h2 { font-size: 13pt; color: #006e2f; margin: 20px 0 8px; border-bottom: 1px solid #e0e0e0; padding-bottom: 4px; }
    p { margin-bottom: 8px; }
    .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 10px 0 16px; }
    .kpi-box { background: #f5f7f5; border: 1px solid #e0e0e0; border-radius: 6px; padding: 10px 12px; }
    .kpi-box .label { font-size: 8pt; color: #666; text-transform: uppercase; font-weight: 600; }
    .kpi-box .value { font-size: 15pt; font-weight: 700; color: #1c2025; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 10pt; }
    th { background: #006e2f; color: #fff; padding: 6px 10px; text-align: left; font-weight: 600; }
    td { padding: 6px 10px; border-bottom: 1px solid #e8e8e8; }
    tr:nth-child(even) { background: #f9faf9; }
    .highlight { color: #006e2f; font-weight: 700; }
    .section-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 10px 0; }
    ol { padding-left: 20px; margin: 8px 0; }
    ol li { margin-bottom: 4px; }
    .footer { margin-top: 30px; padding-top: 12px; border-top: 1px solid #e0e0e0; font-size: 8pt; color: #999; }
    @media print {
      body { padding: 20px 30px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>EXECUTIVE EPD &amp; COMPLIANCE REPORT</h1>
    <div class="subtitle">EcoMetrix AI - Lifecycle and circularity analysis generated from the active dataset</div>
    <div class="meta">Generated: ${timestamp} | Dataset: ${activeFileName} | Material Filter: ${selectedMetal}</div>
  </div>

  <h2>1. Report Scope</h2>
  <p>This report covers <strong>${metrics.totalCount}</strong> active production batch records representing <strong>${metrics.totalQuantityTons} tonnes</strong> of metal output. All values are recalculated from the currently selected material data and active scenario simulation controls.</p>

  <h2>2. Baseline Performance</h2>
  <div class="kpi-grid">
    <div class="kpi-box">
      <div class="label">Carbon Footprint</div>
      <div class="value">${metrics.totalCO2Tons} tCO2e</div>
    </div>
    <div class="kpi-box">
      <div class="label">Energy Consumed</div>
      <div class="value">${metrics.totalEnergyMwh} MWh</div>
    </div>
    <div class="kpi-box">
      <div class="label">Water Consumed</div>
      <div class="value">${metrics.totalWaterM3} m&sup3;</div>
    </div>
    <div class="kpi-box">
      <div class="label">Mfg. Loss</div>
      <div class="value">${format.format(metrics.totalMfgLossKg)} kg</div>
    </div>
  </div>
  <p>Carbon intensity: <strong>${metrics.carbonIntensityPerKg} kg CO2e/kg</strong> | Energy intensity: <strong>${metrics.energyIntensityPerKg} kWh/kg</strong> | Total freight: <strong>${format.format(metrics.totalTransportKm)} km</strong> (avg ${metrics.avgTransportKm} km/batch).</p>
  <p>Material mix: <span class="highlight">${metrics.avgRecycledPct}% recycled</span> and ${metrics.avgVirginPct}% virgin input | Recovery rate: ${metrics.avgRecoveryPct}%.</p>

  <h2>3. Circularity &amp; Scoring</h2>
  <div class="section-grid">
    <div>
      <p>Baseline circularity index: <strong class="highlight">${metrics.avgCircularity}/100</strong></p>
      <p>Overall sustainability score: <strong class="highlight">${metrics.scores.overallScore}/100</strong></p>
    </div>
    <div>
      <p>Carbon Score: ${metrics.scores.carbonScore}/100</p>
      <p>Circularity Score: ${metrics.scores.circularityScore}/100</p>
      <p>Resource Score: ${metrics.scores.resourceScore}/100</p>
      <p>Transport Score: ${metrics.scores.transportScore}/100</p>
    </div>
  </div>

  <h2>4. Hotspot Assessment</h2>
  <p>Highest-emitting material group: <strong class="highlight">${metrics.hotspots.topEmittingMetal}</strong>.</p>
  <p>Estimated lifecycle stage allocation: Smelting <strong>${metrics.hotspots.smeltingCO2Tons} tCO2e (42%)</strong>, Mining ${metrics.hotspots.miningCO2Tons} tCO2e (27%), Transport ${metrics.hotspots.transportCO2Tons} tCO2e (14%), Refining ${metrics.hotspots.refiningCO2Tons} tCO2e (10%), Processing ${metrics.hotspots.processingCO2Tons} tCO2e (7%).</p>

  <h2>5. Active Improvement Scenario</h2>
  <p>Scenario controls: Recycled-content target <strong>${simControls.recycledPctTarget}%</strong>, Rail shift <strong>${simControls.railShiftPct}%</strong>, Renewable energy <strong>${simControls.renewableEnergyPct}%</strong>.</p>
  <div class="kpi-grid">
    <div class="kpi-box">
      <div class="label">Projected CO2</div>
      <div class="value" style="color:#006e2f">${simMetrics.simulatedCO2Tons} t</div>
    </div>
    <div class="kpi-box">
      <div class="label">CO2 Reduction</div>
      <div class="value" style="color:#006e2f">-${simMetrics.co2ReductionPct}%</div>
    </div>
    <div class="kpi-box">
      <div class="label">Projected Circularity</div>
      <div class="value" style="color:#006e2f">${simMetrics.simulatedCircularity}/100</div>
    </div>
    <div class="kpi-box">
      <div class="label">Projected Score</div>
      <div class="value" style="color:#006e2f">${simMetrics.simulatedOverallScore}/100</div>
    </div>
  </div>
  <p>Score improvement: <strong class="highlight">${simMetrics.scoreImprovement} points</strong> over baseline.</p>

  <h2>6. Material Breakdown</h2>
  <table>
    <thead>
      <tr>
        <th>Material</th>
        <th>Records</th>
        <th>Output</th>
        <th>CO2e</th>
        <th>Energy</th>
        <th>Circularity</th>
        <th>Recycled %</th>
      </tr>
    </thead>
    <tbody>
      ${metalRows}
    </tbody>
  </table>

  <h2>7. Recommended Actions</h2>
  <ol>
    <li>Increase recycled material input toward the active target of <strong>${simControls.recycledPctTarget}%</strong> to reduce primary-material demand and lower smelting energy requirements.</li>
    <li>Shift eligible long-haul freight (&gt;300 km) toward electrified rail; the active scenario models a <strong>${simControls.railShiftPct}%</strong> shift.</li>
    <li>Increase renewable electricity to <strong>${simControls.renewableEnergyPct}%</strong> and reduce manufacturing scrap loss through closed-loop dross recovery technology.</li>
  </ol>

  <div class="footer">
    <p>This data-driven executive report is generated in-browser by EcoMetrix AI from the active PS 25069 dataset and calculated application metrics. It is not an independently verified Environmental Product Declaration (EPD) under ISO 14025. For compliance certification, submit to an accredited third-party verifier.</p>
  </div>

  <script>
    window.onload = function() { window.print(); };
  </script>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  }
};
