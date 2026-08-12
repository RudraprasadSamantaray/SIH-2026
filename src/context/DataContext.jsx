import React, { createContext, useContext, useState, useMemo } from 'react';

// ─── Emission Factors ────────────────────────────────────────────────────────
// India electricity grid emission factor: 0.82 kg CO2/kWh (CEA 2023-24)
const ELECTRICITY_CO2_FACTOR = 0.82;
// Diesel/HFO emission factor: 2.68 kg CO2/litre
const FUEL_CO2_FACTOR = 2.68;

// ─── Per-Row Derivation Engine ───────────────────────────────────────────────
// Computes all calculated/scored fields from raw industry inputs.
// No pre-calculated scores are stored in the raw dataset.
const enrichRow = (r) => {
  const virgin_kg  = r.virgin_material_kg  || 0;
  const recycled_kg = r.recycled_material_kg || 0;
  const total_material_kg = virgin_kg + recycled_kg;

  const recycled_material_pct = total_material_kg > 0
    ? Math.round((recycled_kg / total_material_kg) * 100)
    : 50;
  const virgin_material_pct = 100 - recycled_material_pct;

  const recovery_pct = (r.production_kg || 0) > 0
    ? Math.round(((r.recovered_material_kg || 0) / r.production_kg) * 100)
    : 0;

  // CO2 calculated from electricity consumption + fuel consumption
  const co2_kg = Math.round(
    (r.electricity_kwh || 0) * ELECTRICITY_CO2_FACTOR +
    (r.fuel_l          || 0) * FUEL_CO2_FACTOR
  );

  // Simplified Material Circularity Index (MCI):
  //   40% weight on recycled input + 60% weight on end-of-life recovery
  const circularity = Math.min(100, Math.round(
    recycled_material_pct * 0.4 + recovery_pct * 0.6
  ));

  return {
    ...r,
    // ── Derived / calculated fields ──────────────────────────────────────
    total_material_kg,
    recycled_material_pct,
    virgin_material_pct,
    recovery_pct,
    co2_kg,
    circularity,
    // ── Backward-compat aliases (keep all existing component references working)
    metal:                   r.material,
    quantity_kg:             r.production_kg,
    energy_kwh:              r.electricity_kwh,
    manufacturing_loss_kg:   r.waste_loss_kg,
  };
};

// ─── Default Raw Industry Dataset ────────────────────────────────────────────
// Schema: date, plant_id, plant_name, location, material, product,
//         production_kg, electricity_kwh, water_l, virgin_material_kg,
//         recycled_material_kg, fuel_l, transport_km,
//         waste_loss_kg, recovered_material_kg
//
// NO pre-calculated scores are stored here.
// All derived values (co2_kg, circularity, recovery_pct, etc.) are computed
// by enrichRow() from these raw operational inputs.
const defaultRawDataset = [
  // ── Steel — Plant P001 ─────────────────────────────────────────────────────
  { id:  1, date: '2024-01-15', plant_id: 'P001', plant_name: 'Tata Steel Industrial Plant', location: 'Mumbai', material: 'Steel',     product: 'Beam',           production_kg:  500, electricity_kwh: 2926, water_l:  5657, virgin_material_kg:  150, recycled_material_kg:  350, fuel_l:  65, transport_km:  330, waste_loss_kg:  55, recovered_material_kg:  305 },
  { id:  2, date: '2024-01-22', plant_id: 'P001', plant_name: 'Tata Steel Industrial Plant', location: 'Mumbai', material: 'Steel',     product: 'Machine Part',   production_kg:  500, electricity_kwh: 3528, water_l:  2488, virgin_material_kg:  200, recycled_material_kg:  300, fuel_l:  72, transport_km:  112, waste_loss_kg:  43, recovered_material_kg:  340 },
  { id:  3, date: '2024-02-05', plant_id: 'P001', plant_name: 'Tata Steel Industrial Plant', location: 'Mumbai', material: 'Steel',     product: 'Machine Part',   production_kg:  500, electricity_kwh: 2614, water_l: 10928, virgin_material_kg:  200, recycled_material_kg:  300, fuel_l:  58, transport_km:  813, waste_loss_kg: 127, recovered_material_kg:  345 },
  { id:  4, date: '2024-02-18', plant_id: 'P001', plant_name: 'Tata Steel Industrial Plant', location: 'Mumbai', material: 'Steel',     product: 'Pipe',           production_kg:  500, electricity_kwh: 4659, water_l:  7574, virgin_material_kg:  350, recycled_material_kg:  150, fuel_l:  85, transport_km:  512, waste_loss_kg:  91, recovered_material_kg:  320 },
  { id:  5, date: '2024-03-01', plant_id: 'P001', plant_name: 'Tata Steel Industrial Plant', location: 'Mumbai', material: 'Steel',     product: 'Machine Part',   production_kg: 1000, electricity_kwh: 2587, water_l:  3139, virgin_material_kg:  400, recycled_material_kg:  600, fuel_l:  58, transport_km:  801, waste_loss_kg:  31, recovered_material_kg:  690 },
  { id:  6, date: '2024-03-14', plant_id: 'P001', plant_name: 'Tata Steel Industrial Plant', location: 'Mumbai', material: 'Steel',     product: 'Machine Part',   production_kg:  750, electricity_kwh: 3693, water_l:  6422, virgin_material_kg:  525, recycled_material_kg:  225, fuel_l:  75, transport_km:  468, waste_loss_kg: 162, recovered_material_kg:  518 },
  { id:  7, date: '2024-03-28', plant_id: 'P001', plant_name: 'Tata Steel Industrial Plant', location: 'Mumbai', material: 'Steel',     product: 'Machine Part',   production_kg: 1000, electricity_kwh: 4484, water_l:  8482, virgin_material_kg:  700, recycled_material_kg:  300, fuel_l:  88, transport_km:  591, waste_loss_kg: 137, recovered_material_kg:  640 },
  { id:  8, date: '2024-04-10', plant_id: 'P001', plant_name: 'Tata Steel Industrial Plant', location: 'Mumbai', material: 'Steel',     product: 'Pipe',           production_kg:  750, electricity_kwh: 4893, water_l:  5295, virgin_material_kg:  300, recycled_material_kg:  450, fuel_l:  92, transport_km:  827, waste_loss_kg:  99, recovered_material_kg:  600 },
  { id:  9, date: '2024-04-24', plant_id: 'P001', plant_name: 'Tata Steel Industrial Plant', location: 'Mumbai', material: 'Steel',     product: 'Pipe',           production_kg: 1250, electricity_kwh: 3649, water_l:  6061, virgin_material_kg:  500, recycled_material_kg:  750, fuel_l:  74, transport_km:  203, waste_loss_kg:  77, recovered_material_kg:  738 },
  { id: 10, date: '2024-05-08', plant_id: 'P001', plant_name: 'Tata Steel Industrial Plant', location: 'Mumbai', material: 'Steel',     product: 'Machine Part',   production_kg:  500, electricity_kwh: 4886, water_l:  4724, virgin_material_kg:  400, recycled_material_kg:  100, fuel_l:  92, transport_km:  322, waste_loss_kg: 124, recovered_material_kg:  430 },
  // ── Aluminium — Plant P002 ──────────────────────────────────────────────────
  { id: 11, date: '2024-01-18', plant_id: 'P002', plant_name: 'Hindalco Aluminium Plant',    location: 'Pune',   material: 'Aluminium', product: 'Beverage Can',   production_kg: 1250, electricity_kwh: 2311, water_l:  3291, virgin_material_kg:  500, recycled_material_kg:  750, fuel_l:  52, transport_km:  467, waste_loss_kg: 161, recovered_material_kg:  913 },
  { id: 12, date: '2024-02-02', plant_id: 'P002', plant_name: 'Hindalco Aluminium Plant',    location: 'Pune',   material: 'Aluminium', product: 'Car Body Panel', production_kg: 1500, electricity_kwh: 2876, water_l: 11577, virgin_material_kg:  600, recycled_material_kg:  900, fuel_l:  64, transport_km:  844, waste_loss_kg: 129, recovered_material_kg: 1380 },
  { id: 13, date: '2024-02-16', plant_id: 'P002', plant_name: 'Hindalco Aluminium Plant',    location: 'Pune',   material: 'Aluminium', product: 'Beverage Can',   production_kg: 1250, electricity_kwh: 2060, water_l:  8252, virgin_material_kg:  500, recycled_material_kg:  750, fuel_l:  46, transport_km:  474, waste_loss_kg: 172, recovered_material_kg: 1050 },
  { id: 14, date: '2024-03-05', plant_id: 'P002', plant_name: 'Hindalco Aluminium Plant',    location: 'Pune',   material: 'Aluminium', product: 'Beverage Can',   production_kg: 1000, electricity_kwh: 3879, water_l:  5258, virgin_material_kg:  300, recycled_material_kg:  700, fuel_l:  78, transport_km:  703, waste_loss_kg:  59, recovered_material_kg:  780 },
  { id: 15, date: '2024-03-19', plant_id: 'P002', plant_name: 'Hindalco Aluminium Plant',    location: 'Pune',   material: 'Aluminium', product: 'Beverage Can',   production_kg: 1500, electricity_kwh: 4253, water_l: 10005, virgin_material_kg: 1200, recycled_material_kg:  300, fuel_l:  84, transport_km:  411, waste_loss_kg:  24, recovered_material_kg:  930 },
  { id: 16, date: '2024-04-02', plant_id: 'P002', plant_name: 'Hindalco Aluminium Plant',    location: 'Pune',   material: 'Aluminium', product: 'Beverage Can',   production_kg:  750, electricity_kwh: 4502, water_l: 11007, virgin_material_kg:  525, recycled_material_kg:  225, fuel_l:  88, transport_km:  566, waste_loss_kg:  62, recovered_material_kg:  533 },
  { id: 17, date: '2024-04-16', plant_id: 'P002', plant_name: 'Hindalco Aluminium Plant',    location: 'Pune',   material: 'Aluminium', product: 'Beverage Can',   production_kg: 1250, electricity_kwh: 3534, water_l:  9651, virgin_material_kg:  750, recycled_material_kg:  500, fuel_l:  72, transport_km:  500, waste_loss_kg:  33, recovered_material_kg:  763 },
  { id: 18, date: '2024-04-30', plant_id: 'P002', plant_name: 'Hindalco Aluminium Plant',    location: 'Pune',   material: 'Aluminium', product: 'Beverage Can',   production_kg: 1500, electricity_kwh: 4210, water_l:  2117, virgin_material_kg: 1050, recycled_material_kg:  450, fuel_l:  83, transport_km:  305, waste_loss_kg:  38, recovered_material_kg: 1425 },
  { id: 19, date: '2024-05-14', plant_id: 'P002', plant_name: 'Hindalco Aluminium Plant',    location: 'Pune',   material: 'Aluminium', product: 'Car Body Panel', production_kg:  500, electricity_kwh: 2090, water_l:  5899, virgin_material_kg:  300, recycled_material_kg:  200, fuel_l:  46, transport_km:  606, waste_loss_kg:  91, recovered_material_kg:  430 },
  { id: 20, date: '2024-05-28', plant_id: 'P002', plant_name: 'Hindalco Aluminium Plant',    location: 'Pune',   material: 'Aluminium', product: 'Beverage Can',   production_kg: 1250, electricity_kwh: 3736, water_l:  9749, virgin_material_kg:  500, recycled_material_kg:  750, fuel_l:  76, transport_km:  328, waste_loss_kg: 124, recovered_material_kg:  838 },
  // ── Copper — Plant P003 ─────────────────────────────────────────────────────
  { id: 21, date: '2024-01-20', plant_id: 'P003', plant_name: 'Hindustan Copper Works',      location: 'Surat',  material: 'Copper',    product: 'Electrical Wire',production_kg:  500, electricity_kwh: 2196, water_l:  7635, virgin_material_kg:  250, recycled_material_kg:  250, fuel_l:  50, transport_km:  447, waste_loss_kg: 174, recovered_material_kg:  355 },
  { id: 22, date: '2024-02-07', plant_id: 'P003', plant_name: 'Hindustan Copper Works',      location: 'Surat',  material: 'Copper',    product: 'Electrical Wire',production_kg:  750, electricity_kwh: 3356, water_l:  9428, virgin_material_kg:  600, recycled_material_kg:  150, fuel_l:  68, transport_km:  364, waste_loss_kg: 113, recovered_material_kg:  488 },
  { id: 23, date: '2024-02-21', plant_id: 'P003', plant_name: 'Hindustan Copper Works',      location: 'Surat',  material: 'Copper',    product: 'Electrical Wire',production_kg: 1000, electricity_kwh: 4599, water_l:  3169, virgin_material_kg:  300, recycled_material_kg:  700, fuel_l:  90, transport_km:  743, waste_loss_kg: 175, recovered_material_kg:  950 },
  { id: 24, date: '2024-03-07', plant_id: 'P003', plant_name: 'Hindustan Copper Works',      location: 'Surat',  material: 'Copper',    product: 'Electrical Wire',production_kg:  750, electricity_kwh: 3821, water_l:  2771, virgin_material_kg:  300, recycled_material_kg:  450, fuel_l:  77, transport_km:  173, waste_loss_kg:  48, recovered_material_kg:  480 },
  { id: 25, date: '2024-03-21', plant_id: 'P003', plant_name: 'Hindustan Copper Works',      location: 'Surat',  material: 'Copper',    product: 'Power Cable',    production_kg:  500, electricity_kwh: 4752, water_l: 10797, virgin_material_kg:  150, recycled_material_kg:  350, fuel_l:  92, transport_km:  197, waste_loss_kg:  88, recovered_material_kg:  380 },
  { id: 26, date: '2024-04-04', plant_id: 'P003', plant_name: 'Hindustan Copper Works',      location: 'Surat',  material: 'Copper',    product: 'Motor Coil',     production_kg:  750, electricity_kwh: 1813, water_l:  6315, virgin_material_kg:  375, recycled_material_kg:  375, fuel_l:  42, transport_km:  819, waste_loss_kg: 148, recovered_material_kg:  495 },
  { id: 27, date: '2024-04-18', plant_id: 'P003', plant_name: 'Hindustan Copper Works',      location: 'Surat',  material: 'Copper',    product: 'Electrical Wire',production_kg:  750, electricity_kwh: 3356, water_l:  9428, virgin_material_kg:  600, recycled_material_kg:  150, fuel_l:  68, transport_km:  403, waste_loss_kg:  88, recovered_material_kg:  443 },
  { id: 28, date: '2024-05-02', plant_id: 'P003', plant_name: 'Hindustan Copper Works',      location: 'Surat',  material: 'Copper',    product: 'Power Cable',    production_kg: 1000, electricity_kwh: 2818, water_l:  5116, virgin_material_kg:  800, recycled_material_kg:  200, fuel_l:  62, transport_km:  276, waste_loss_kg: 157, recovered_material_kg:  830 },
  { id: 29, date: '2024-05-16', plant_id: 'P003', plant_name: 'Hindustan Copper Works',      location: 'Surat',  material: 'Copper',    product: 'Electrical Wire',production_kg: 1000, electricity_kwh: 2823, water_l:  9260, virgin_material_kg:  500, recycled_material_kg:  500, fuel_l:  62, transport_km:  157, waste_loss_kg: 160, recovered_material_kg:  610 },
  { id: 30, date: '2024-05-30', plant_id: 'P003', plant_name: 'Hindustan Copper Works',      location: 'Surat',  material: 'Copper',    product: 'Motor Coil',     production_kg:  750, electricity_kwh: 2786, water_l:  3290, virgin_material_kg:  600, recycled_material_kg:  150, fuel_l:  61, transport_km:  660, waste_loss_kg:  41, recovered_material_kg:  645 },
];

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [rows, setRows] = useState(defaultRawDataset);
  const [selectedMetal, setSelectedMetal] = useState('All');
  const [activeFileName, setActiveFileName] = useState('Industry_Raw_Dataset_2024.csv');

  // Simulator Controls State
  const [simControls, setSimControls] = useState({
    recycledPctTarget: 65,   // % target for recycled material input
    railShiftPct: 50,        // % long-haul freight shifted to rail
    renewableEnergyPct: 40   // % electricity from renewables
  });

  // ── Active filtered dataset — enriched with all derived calculations ────────
  // enrichRow() computes CO2, circularity, percentages, etc. from raw inputs
  const filteredRows = useMemo(() => {
    const enriched = rows.map(enrichRow);
    if (selectedMetal === 'All') return enriched;
    return enriched.filter((r) => r.material.toLowerCase() === selectedMetal.toLowerCase());
  }, [rows, selectedMetal]);

  // ── Computed Baseline Metrics ──────────────────────────────────────────────
  const metrics = useMemo(() => {
    const totalCount = filteredRows.length;
    if (totalCount === 0) return null;

    // Raw operational totals
    const totalProductionKg   = filteredRows.reduce((a, r) => a + (r.production_kg   || 0), 0);
    const totalElectricityKwh = filteredRows.reduce((a, r) => a + (r.electricity_kwh || 0), 0);
    const totalFuelL          = filteredRows.reduce((a, r) => a + (r.fuel_l          || 0), 0);
    const totalWaterL         = filteredRows.reduce((a, r) => a + (r.water_l         || 0), 0);
    const totalTransportKm    = filteredRows.reduce((a, r) => a + (r.transport_km    || 0), 0);
    const totalWasteLossKg    = filteredRows.reduce((a, r) => a + (r.waste_loss_kg   || 0), 0);
    const totalVirginKg       = filteredRows.reduce((a, r) => a + (r.virgin_material_kg   || 0), 0);
    const totalRecycledKg     = filteredRows.reduce((a, r) => a + (r.recycled_material_kg || 0), 0);
    const totalRecoveredKg    = filteredRows.reduce((a, r) => a + (r.recovered_material_kg|| 0), 0);

    // Derived totals (CO2 calculated from electricity + fuel — not stored)
    const totalCO2Kg  = filteredRows.reduce((a, r) => a + (r.co2_kg || 0), 0);

    // Convenience unit conversions
    const totalQuantityKg  = totalProductionKg;
    const totalQuantityTons = totalProductionKg / 1000;
    const totalCO2Tons     = totalCO2Kg / 1000;
    const totalEnergyKwh   = totalElectricityKwh;
    const totalEnergyMwh   = totalElectricityKwh / 1000;
    const totalWaterM3     = totalWaterL / 1000;
    const totalMfgLossKg   = totalWasteLossKg;    // alias for existing page components

    // Per-row derived averages
    const avgRecycledPct  = Math.round(filteredRows.reduce((a, r) => a + (r.recycled_material_pct || 0), 0) / totalCount);
    const avgVirginPct    = Math.round(filteredRows.reduce((a, r) => a + (r.virgin_material_pct   || 0), 0) / totalCount);
    const avgRecoveryPct  = Math.round(filteredRows.reduce((a, r) => a + (r.recovery_pct          || 0), 0) / totalCount);
    const avgCircularity  = Math.round(filteredRows.reduce((a, r) => a + (r.circularity           || 0), 0) / totalCount);

    // Intensity metrics
    const carbonIntensityPerKg  = (totalCO2Kg  / (totalQuantityKg  || 1)).toFixed(2);
    const carbonIntensityPerTon = (totalCO2Tons / (totalQuantityTons|| 1)).toFixed(2);
    const energyIntensityPerKg  = (totalEnergyKwh / (totalQuantityKg || 1)).toFixed(2);

    // ── Material breakdown (grouped by material — backward-compat key: 'metal') ─
    const byMaterial = {};
    filteredRows.forEach((r) => {
      const key = r.material;
      if (!byMaterial[key]) {
        byMaterial[key] = { count: 0, production_kg: 0, co2_kg: 0, electricity_kwh: 0, circularitySum: 0, recycledSum: 0 };
      }
      byMaterial[key].count           += 1;
      byMaterial[key].production_kg   += r.production_kg   || 0;
      byMaterial[key].co2_kg          += r.co2_kg          || 0;
      byMaterial[key].electricity_kwh += r.electricity_kwh || 0;
      byMaterial[key].circularitySum  += r.circularity     || 0;
      byMaterial[key].recycledSum     += r.recycled_material_pct || 0;
    });

    const metalStats = Object.keys(byMaterial).map((m) => ({
      metal:          m,   // keep 'metal' key for backward compat with all page components
      material:       m,   // also expose as 'material'
      count:          byMaterial[m].count,
      quantity_kg:    byMaterial[m].production_kg,
      quantity_tons:  (byMaterial[m].production_kg / 1000).toFixed(1),
      co2_kg:         byMaterial[m].co2_kg,
      co2_tons:       (byMaterial[m].co2_kg / 1000).toFixed(2),
      energy_mwh:     (byMaterial[m].electricity_kwh / 1000).toFixed(1),
      avgCircularity: Math.round(byMaterial[m].circularitySum / byMaterial[m].count),
      avgRecycledPct: Math.round(byMaterial[m].recycledSum    / byMaterial[m].count),
    }));

    // ── Lifecycle stage allocation (ISO 14040/44 model) ───────────────────────
    const smeltingCO2Tons   = (totalCO2Tons * 0.42).toFixed(2);
    const miningCO2Tons     = (totalCO2Tons * 0.27).toFixed(2);
    const transportCO2Tons  = (totalCO2Tons * 0.14).toFixed(2);
    const refiningCO2Tons   = (totalCO2Tons * 0.10).toFixed(2);
    const processingCO2Tons = (totalCO2Tons * 0.07).toFixed(2);

    const lifecycleAllocation = [
      { id: 'mining',    name: 'Mining',              share: 0.27, icon: 'landscape' },
      { id: 'processing',name: 'Processing',          share: 0.07, icon: 'factory' },
      { id: 'refining',  name: 'Refining',            share: 0.10, icon: 'science' },
      { id: 'smelting',  name: 'Metal Smelting',      share: 0.42, icon: 'local_fire_department' },
      { id: 'transport', name: 'Logistics / Transport',share: 0.14, icon: 'local_shipping' },
    ];
    const lifecycleStages = lifecycleAllocation.map((stage) => ({
      ...stage,
      carbonTons:       Number((totalCO2Tons  * stage.share).toFixed(2)),
      energyMwh:        Number((totalEnergyMwh * stage.share).toFixed(2)),
      contributionPct:  Math.round(stage.share * 100),
    }));
    lifecycleStages.push({
      id: 'recovery', name: 'Recovery / Recycled', icon: 'recycling',
      recoveryPct:    avgRecoveryPct,
      recycledPct:    avgRecycledPct,
      recycledTons:   Number((totalQuantityTons * (avgRecycledPct / 100)).toFixed(2)),
      contributionPct: avgRecycledPct,
    });

    // ── Sustainability Scoring ────────────────────────────────────────────────
    // Carbon score: penalises high carbon intensity (tCO2/t production)
    const carbonScore      = Math.min(100, Math.max(20, Math.round(100 - carbonIntensityPerTon * 10)));
    const circularityScore = avgCircularity;
    const resourceScore    = Math.min(100, Math.round((avgRecycledPct + avgRecoveryPct) / 2));
    const transportScore   = Math.min(100, Math.max(40, Math.round(100 - (totalTransportKm / totalCount) / 10)));
    const overallScore     = Math.round(
      carbonScore      * 0.35 +
      circularityScore * 0.35 +
      resourceScore    * 0.15 +
      transportScore   * 0.15
    );

    return {
      // Counts & production
      totalCount,
      totalQuantityKg,
      totalQuantityTons:   totalQuantityTons.toFixed(2),
      // Carbon (calculated from electricity + fuel — NOT stored in raw data)
      totalCO2Kg,
      totalCO2Tons:        totalCO2Tons.toFixed(2),
      // Energy
      totalEnergyKwh,
      totalEnergyMwh:      totalEnergyMwh.toFixed(1),
      // Fuel (new field)
      totalFuelL,
      // Water
      totalWaterL,
      totalWaterM3:        totalWaterM3.toFixed(1),
      // Transport
      totalTransportKm,
      avgTransportKm:      Math.round(totalTransportKm / totalCount),
      // Material flows
      totalMfgLossKg,
      totalWasteLossKg,
      totalVirginKg,
      totalRecycledKg,
      totalRecoveredKg,
      // Derived averages
      avgRecycledPct,
      avgVirginPct,
      avgRecoveryPct,
      avgCircularity,
      // Intensities
      carbonIntensityPerKg,
      carbonIntensityPerTon,
      energyIntensityPerKg,
      // Breakdowns
      lifecycleStages,
      metalStats,
      hotspots: {
        smeltingCO2Tons,
        miningCO2Tons,
        transportCO2Tons,
        refiningCO2Tons,
        processingCO2Tons,
        topEmittingMetal: [...metalStats].sort((a, b) => b.co2_kg - a.co2_kg)[0]?.metal || 'Steel',
      },
      scores: { carbonScore, circularityScore, resourceScore, transportScore, overallScore },
    };
  }, [filteredRows]);

  // ── Simulation Metrics (computed from simControls + baseline) ─────────────
  const simMetrics = useMemo(() => {
    if (!metrics) return null;

    const currentRecycled   = metrics.avgRecycledPct;
    const recycledGainFactor = (simControls.recycledPctTarget - currentRecycled) * 0.008;
    const renewableGainFactor = simControls.renewableEnergyPct * 0.004;
    const railGainFactor      = simControls.railShiftPct * 0.003;

    const totalReductionPct = Math.max(0.05, Math.min(0.45,
      recycledGainFactor + renewableGainFactor + railGainFactor
    ));

    const simulatedCO2Tons     = (parseFloat(metrics.totalCO2Tons) * (1 - totalReductionPct)).toFixed(2);
    const simulatedEnergyMwh   = (parseFloat(metrics.totalEnergyMwh) * (1 - simControls.renewableEnergyPct * 0.0025)).toFixed(1);
    const simulatedCircularity = Math.min(95, Math.round(
      metrics.avgCircularity + (simControls.recycledPctTarget - currentRecycled) * 0.6
    ));
    const simulatedOverallScore = Math.min(98, Math.round(
      metrics.scores.overallScore + (totalReductionPct * 40) + (simulatedCircularity - metrics.avgCircularity) * 0.3
    ));
    const scoreImprovement = simulatedOverallScore - metrics.scores.overallScore;

    return {
      simulatedCO2Tons,
      co2ReductionPct:       (totalReductionPct * 100).toFixed(1),
      simulatedEnergyMwh,
      simulatedCircularity,
      simulatedOverallScore,
      scoreImprovement: scoreImprovement > 0 ? `+${scoreImprovement}` : `${scoreImprovement}`,
    };
  }, [metrics, simControls]);

  // ── Dataset Upload — accepts new raw industry schema ──────────────────────
  // enrichRow() will automatically derive all calculated values from raw inputs.
  const uploadCustomDataset = (newRows, filename) => {
    if (Array.isArray(newRows) && newRows.length > 0) {
      setRows(newRows);
      if (filename) setActiveFileName(filename);
      setSelectedMetal('All');
    }
  };

  const resetToDefault = () => {
    setRows(defaultRawDataset);
    setSelectedMetal('All');
    setActiveFileName('Industry_Raw_Dataset_2024.csv');
  };

  return (
    <DataContext.Provider
      value={{
        rows,
        filteredRows,
        metrics,
        simMetrics,
        simControls,
        setSimControls,
        selectedMetal,
        setSelectedMetal,
        activeFileName,
        uploadCustomDataset,
        resetToDefault,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataset = () => useContext(DataContext);
