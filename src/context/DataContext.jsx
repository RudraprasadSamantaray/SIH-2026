import React, { createContext, useContext, useState, useMemo } from 'react';

const defaultRawDataset = [
  { id: 1, metal: 'Steel', product: 'Beam', quantity_kg: 500, virgin_material_pct: 30, recycled_material_pct: 70, energy_kwh: 2926, transport_km: 330, co2_kg: 498, water_l: 5657, manufacturing_loss_kg: 55, recovery_pct: 61, cost_inr: 64000, circularity: 64 },
  { id: 2, metal: 'Steel', product: 'Machine Part', quantity_kg: 500, virgin_material_pct: 40, recycled_material_pct: 60, energy_kwh: 3528, transport_km: 112, co2_kg: 520, water_l: 2488, manufacturing_loss_kg: 43, recovery_pct: 68, cost_inr: 49500, circularity: 64 },
  { id: 3, metal: 'Steel', product: 'Machine Part', quantity_kg: 500, virgin_material_pct: 40, recycled_material_pct: 60, energy_kwh: 2614, transport_km: 813, co2_kg: 531, water_l: 10928, manufacturing_loss_kg: 127, recovery_pct: 69, cost_inr: 56500, circularity: 65 },
  { id: 4, metal: 'Steel', product: 'Pipe', quantity_kg: 500, virgin_material_pct: 70, recycled_material_pct: 30, energy_kwh: 4659, transport_km: 512, co2_kg: 659, water_l: 7574, manufacturing_loss_kg: 91, recovery_pct: 64, cost_inr: 49000, circularity: 52 },
  { id: 5, metal: 'Copper', product: 'Electrical Wire', quantity_kg: 500, virgin_material_pct: 50, recycled_material_pct: 50, energy_kwh: 2196, transport_km: 447, co2_kg: 454, water_l: 7635, manufacturing_loss_kg: 174, recovery_pct: 71, cost_inr: 68000, circularity: 62 },
  { id: 6, metal: 'Aluminium', product: 'Beverage Can', quantity_kg: 1250, virgin_material_pct: 40, recycled_material_pct: 60, energy_kwh: 2311, transport_km: 467, co2_kg: 803, water_l: 3291, manufacturing_loss_kg: 161, recovery_pct: 73, cost_inr: 172500, circularity: 67 },
  { id: 7, metal: 'Steel', product: 'Machine Part', quantity_kg: 1000, virgin_material_pct: 40, recycled_material_pct: 60, energy_kwh: 2587, transport_km: 801, co2_kg: 753, water_l: 3139, manufacturing_loss_kg: 31, recovery_pct: 69, cost_inr: 134000, circularity: 69 },
  { id: 8, metal: 'Copper', product: 'Electrical Wire', quantity_kg: 750, virgin_material_pct: 80, recycled_material_pct: 20, energy_kwh: 3356, transport_km: 364, co2_kg: 649, water_l: 9428, manufacturing_loss_kg: 113, recovery_pct: 65, cost_inr: 81000, circularity: 47 },
  { id: 9, metal: 'Copper', product: 'Electrical Wire', quantity_kg: 1000, virgin_material_pct: 30, recycled_material_pct: 70, energy_kwh: 4599, transport_km: 743, co2_kg: 907, water_l: 3169, manufacturing_loss_kg: 175, recovery_pct: 95, cost_inr: 95000, circularity: 85 },
  { id: 10, metal: 'Steel', product: 'Machine Part', quantity_kg: 750, virgin_material_pct: 70, recycled_material_pct: 30, energy_kwh: 3693, transport_km: 468, co2_kg: 689, water_l: 6422, manufacturing_loss_kg: 162, recovery_pct: 69, cost_inr: 96000, circularity: 53 },
  { id: 11, metal: 'Copper', product: 'Electrical Wire', quantity_kg: 750, virgin_material_pct: 80, recycled_material_pct: 20, energy_kwh: 5097, transport_km: 403, co2_kg: 793, water_l: 8572, manufacturing_loss_kg: 88, recovery_pct: 59, cost_inr: 73500, circularity: 43 },
  { id: 12, metal: 'Steel', product: 'Machine Part', quantity_kg: 1000, virgin_material_pct: 70, recycled_material_pct: 30, energy_kwh: 4484, transport_km: 591, co2_kg: 879, water_l: 8482, manufacturing_loss_kg: 137, recovery_pct: 64, cost_inr: 101000, circularity: 50 },
  { id: 13, metal: 'Aluminium', product: 'Car Body Panel', quantity_kg: 1500, virgin_material_pct: 40, recycled_material_pct: 60, energy_kwh: 2876, transport_km: 844, co2_kg: 1006, water_l: 11577, manufacturing_loss_kg: 129, recovery_pct: 92, cost_inr: 165000, circularity: 79 },
  { id: 14, metal: 'Copper', product: 'Electrical Wire', quantity_kg: 750, virgin_material_pct: 40, recycled_material_pct: 60, energy_kwh: 3821, transport_km: 173, co2_kg: 663, water_l: 2771, manufacturing_loss_kg: 48, recovery_pct: 64, cost_inr: 93750, circularity: 62 },
  { id: 15, metal: 'Aluminium', product: 'Beverage Can', quantity_kg: 1250, virgin_material_pct: 40, recycled_material_pct: 60, energy_kwh: 2060, transport_km: 474, co2_kg: 784, water_l: 8252, manufacturing_loss_kg: 172, recovery_pct: 84, cost_inr: 147500, circularity: 74 },
  { id: 16, metal: 'Copper', product: 'Power Cable', quantity_kg: 500, virgin_material_pct: 30, recycled_material_pct: 70, energy_kwh: 4752, transport_km: 197, co2_kg: 628, water_l: 10797, manufacturing_loss_kg: 88, recovery_pct: 76, cost_inr: 46000, circularity: 73 },
  { id: 17, metal: 'Copper', product: 'Motor Coil', quantity_kg: 750, virgin_material_pct: 50, recycled_material_pct: 50, energy_kwh: 1813, transport_km: 819, co2_kg: 580, water_l: 6315, manufacturing_loss_kg: 148, recovery_pct: 66, cost_inr: 87750, circularity: 59 },
  { id: 18, metal: 'Aluminium', product: 'Beverage Can', quantity_kg: 1000, virgin_material_pct: 30, recycled_material_pct: 70, energy_kwh: 3879, transport_km: 703, co2_kg: 844, water_l: 5258, manufacturing_loss_kg: 59, recovery_pct: 78, cost_inr: 133000, circularity: 74 },
  { id: 19, metal: 'Aluminium', product: 'Beverage Can', quantity_kg: 1500, virgin_material_pct: 80, recycled_material_pct: 20, energy_kwh: 4253, transport_km: 411, co2_kg: 1064, water_l: 10005, manufacturing_loss_kg: 24, recovery_pct: 62, cost_inr: 216000, circularity: 49 },
  { id: 20, metal: 'Copper', product: 'Motor Coil', quantity_kg: 750, virgin_material_pct: 80, recycled_material_pct: 20, energy_kwh: 2786, transport_km: 660, co2_kg: 639, water_l: 3290, manufacturing_loss_kg: 41, recovery_pct: 86, cost_inr: 102750, circularity: 59 },
  { id: 21, metal: 'Aluminium', product: 'Beverage Can', quantity_kg: 750, virgin_material_pct: 70, recycled_material_pct: 30, energy_kwh: 4502, transport_km: 566, co2_kg: 765, water_l: 11007, manufacturing_loss_kg: 62, recovery_pct: 71, cost_inr: 88500, circularity: 54 },
  { id: 22, metal: 'Steel', product: 'Pipe', quantity_kg: 750, virgin_material_pct: 40, recycled_material_pct: 60, energy_kwh: 4893, transport_km: 827, co2_kg: 828, water_l: 5295, manufacturing_loss_kg: 99, recovery_pct: 80, cost_inr: 95250, circularity: 72 },
  { id: 23, metal: 'Steel', product: 'Pipe', quantity_kg: 1250, virgin_material_pct: 40, recycled_material_pct: 60, energy_kwh: 3649, transport_km: 203, co2_kg: 878, water_l: 6061, manufacturing_loss_kg: 77, recovery_pct: 59, cost_inr: 132500, circularity: 59 },
  { id: 24, metal: 'Aluminium', product: 'Beverage Can', quantity_kg: 1500, virgin_material_pct: 70, recycled_material_pct: 30, energy_kwh: 4210, transport_km: 305, co2_kg: 1048, water_l: 2117, manufacturing_loss_kg: 38, recovery_pct: 95, cost_inr: 132000, circularity: 69 },
  { id: 25, metal: 'Aluminium', product: 'Car Body Panel', quantity_kg: 500, virgin_material_pct: 60, recycled_material_pct: 40, energy_kwh: 2090, transport_km: 606, co2_kg: 464, water_l: 5899, manufacturing_loss_kg: 91, recovery_pct: 86, cost_inr: 49000, circularity: 67 },
  { id: 26, metal: 'Steel', product: 'Beam', quantity_kg: 1500, virgin_material_pct: 40, recycled_material_pct: 60, energy_kwh: 3736, transport_km: 328, co2_kg: 1013, water_l: 9749, manufacturing_loss_kg: 124, recovery_pct: 67, cost_inr: 136500, circularity: 64 },
  { id: 27, metal: 'Aluminium', product: 'Beverage Can', quantity_kg: 1250, virgin_material_pct: 60, recycled_material_pct: 40, energy_kwh: 3534, transport_km: 500, co2_kg: 905, water_l: 9651, manufacturing_loss_kg: 33, recovery_pct: 61, cost_inr: 110000, circularity: 52 },
  { id: 28, metal: 'Copper', product: 'Power Cable', quantity_kg: 1000, virgin_material_pct: 80, recycled_material_pct: 20, energy_kwh: 2818, transport_km: 276, co2_kg: 708, water_l: 5116, manufacturing_loss_kg: 157, recovery_pct: 83, cost_inr: 93000, circularity: 57 },
  { id: 29, metal: 'Copper', product: 'Electrical Wire', quantity_kg: 1000, virgin_material_pct: 50, recycled_material_pct: 50, energy_kwh: 2823, transport_km: 157, co2_kg: 694, water_l: 9260, manufacturing_loss_kg: 160, recovery_pct: 61, cost_inr: 88000, circularity: 58 },
  { id: 30, metal: 'Steel', product: 'Machine Part', quantity_kg: 500, virgin_material_pct: 80, recycled_material_pct: 20, energy_kwh: 4886, transport_km: 322, co2_kg: 654, water_l: 4724, manufacturing_loss_kg: 124, recovery_pct: 86, cost_inr: 57500, circularity: 59 }
];

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [rows, setRows] = useState(defaultRawDataset);
  const [selectedMetal, setSelectedMetal] = useState('All');
  const [activeFileName, setActiveFileName] = useState('PS_25069_Metal_LCA_Dataset.csv');
  
  // Simulator Controls State
  const [simControls, setSimControls] = useState({
    recycledPctTarget: 65, // % target
    railShiftPct: 50, // % long haul shifted to rail
    renewableEnergyPct: 40 // % energy from renewables
  });

  // Active filtered dataset
  const filteredRows = useMemo(() => {
    if (selectedMetal === 'All') return rows;
    return rows.filter((r) => r.metal.toLowerCase() === selectedMetal.toLowerCase());
  }, [rows, selectedMetal]);

  // Computed Baseline Metrics
  const metrics = useMemo(() => {
    const totalCount = filteredRows.length;
    if (totalCount === 0) return null;

    const totalQuantityKg = filteredRows.reduce((acc, r) => acc + (r.quantity_kg || 0), 0);
    const totalQuantityTons = totalQuantityKg / 1000;
    const totalCO2Kg = filteredRows.reduce((acc, r) => acc + (r.co2_kg || 0), 0);
    const totalCO2Tons = totalCO2Kg / 1000;
    const totalEnergyKwh = filteredRows.reduce((acc, r) => acc + (r.energy_kwh || 0), 0);
    const totalEnergyMwh = totalEnergyKwh / 1000;
    const totalWaterL = filteredRows.reduce((acc, r) => acc + (r.water_l || 0), 0);
    const totalWaterM3 = totalWaterL / 1000;
    const totalCostINR = filteredRows.reduce((acc, r) => acc + (r.cost_inr || 0), 0);
    const totalTransportKm = filteredRows.reduce((acc, r) => acc + (r.transport_km || 0), 0);
    const totalMfgLossKg = filteredRows.reduce((acc, r) => acc + (r.manufacturing_loss_kg || 0), 0);

    const avgRecycledPct = Math.round(filteredRows.reduce((acc, r) => acc + (r.recycled_material_pct || 0), 0) / totalCount);
    const avgVirginPct = Math.round(filteredRows.reduce((acc, r) => acc + (r.virgin_material_pct || 0), 0) / totalCount);
    const avgRecoveryPct = Math.round(filteredRows.reduce((acc, r) => acc + (r.recovery_pct || 0), 0) / totalCount);
    const avgCircularity = Math.round(filteredRows.reduce((acc, r) => acc + (r.circularity || 0), 0) / totalCount);

    const carbonIntensityPerKg = (totalCO2Kg / (totalQuantityKg || 1)).toFixed(2);
    const carbonIntensityPerTon = (totalCO2Tons / (totalQuantityTons || 1)).toFixed(2);
    const energyIntensityPerKg = (totalEnergyKwh / (totalQuantityKg || 1)).toFixed(2);

    // Metal breakdown stats
    const byMetal = {};
    filteredRows.forEach((r) => {
      if (!byMetal[r.metal]) {
        byMetal[r.metal] = { count: 0, quantity_kg: 0, co2_kg: 0, energy_kwh: 0, circularitySum: 0, recycledSum: 0 };
      }
      byMetal[r.metal].count += 1;
      byMetal[r.metal].quantity_kg += r.quantity_kg || 0;
      byMetal[r.metal].co2_kg += r.co2_kg || 0;
      byMetal[r.metal].energy_kwh += r.energy_kwh || 0;
      byMetal[r.metal].circularitySum += r.circularity || 0;
      byMetal[r.metal].recycledSum += r.recycled_material_pct || 0;
    });

    const metalStats = Object.keys(byMetal).map((m) => ({
      metal: m,
      count: byMetal[m].count,
      quantity_kg: byMetal[m].quantity_kg,
      quantity_tons: (byMetal[m].quantity_kg / 1000).toFixed(1),
      co2_kg: byMetal[m].co2_kg,
      co2_tons: (byMetal[m].co2_kg / 1000).toFixed(2),
      energy_mwh: (byMetal[m].energy_kwh / 1000).toFixed(1),
      avgCircularity: Math.round(byMetal[m].circularitySum / byMetal[m].count),
      avgRecycledPct: Math.round(byMetal[m].recycledSum / byMetal[m].count)
    }));

    // Identify Smelting/Processing Hotspot (42% of emissions)
    const smeltingCO2Tons = (totalCO2Tons * 0.42).toFixed(2);
    const miningCO2Tons = (totalCO2Tons * 0.27).toFixed(2);
    const transportCO2Tons = (totalCO2Tons * 0.14).toFixed(2);
    const refiningCO2Tons = (totalCO2Tons * 0.10).toFixed(2);
    const processingCO2Tons = (totalCO2Tons * 0.07).toFixed(2);

    // Scoring baseline
    const carbonScore = Math.min(100, Math.max(30, Math.round(100 - carbonIntensityPerTon * 20)));
    const circularityScore = avgCircularity;
    const resourceScore = Math.min(100, Math.round((avgRecycledPct + avgRecoveryPct) / 2));
    const transportScore = Math.min(100, Math.max(40, Math.round(100 - (totalTransportKm / totalCount) / 10)));
    const overallScore = Math.round((carbonScore * 0.35) + (circularityScore * 0.35) + (resourceScore * 0.15) + (transportScore * 0.15));

    return {
      totalCount,
      totalQuantityKg,
      totalQuantityTons: totalQuantityTons.toFixed(2),
      totalCO2Kg,
      totalCO2Tons: totalCO2Tons.toFixed(2),
      totalEnergyKwh,
      totalEnergyMwh: totalEnergyMwh.toFixed(1),
      totalWaterL,
      totalWaterM3: totalWaterM3.toFixed(1),
      totalCostINR,
      totalCostLakhs: (totalCostINR / 100000).toFixed(2),
      totalTransportKm,
      avgTransportKm: Math.round(totalTransportKm / totalCount),
      totalMfgLossKg,
      avgRecycledPct,
      avgVirginPct,
      avgRecoveryPct,
      avgCircularity,
      carbonIntensityPerKg,
      carbonIntensityPerTon,
      energyIntensityPerKg,
      metalStats,
      hotspots: {
        smeltingCO2Tons,
        miningCO2Tons,
        transportCO2Tons,
        refiningCO2Tons,
        processingCO2Tons,
        topEmittingMetal: metalStats.sort((a, b) => b.co2_kg - a.co2_kg)[0]?.metal || 'Aluminium'
      },
      scores: {
        carbonScore,
        circularityScore,
        resourceScore,
        transportScore,
        overallScore
      }
    };
  }, [filteredRows]);

  // Computed Simulation Metrics based on simControls
  const simMetrics = useMemo(() => {
    if (!metrics) return null;

    const currentRecycled = metrics.avgRecycledPct;
    const recycledGainFactor = (simControls.recycledPctTarget - currentRecycled) * 0.008; // carbon reduction per % gain
    const renewableGainFactor = simControls.renewableEnergyPct * 0.004;
    const railGainFactor = simControls.railShiftPct * 0.003;

    const totalReductionPct = Math.max(0.05, Math.min(0.45, recycledGainFactor + renewableGainFactor + railGainFactor));

    const simulatedCO2Tons = (parseFloat(metrics.totalCO2Tons) * (1 - totalReductionPct)).toFixed(2);
    const simulatedEnergyMwh = (parseFloat(metrics.totalEnergyMwh) * (1 - simControls.renewableEnergyPct * 0.0025)).toFixed(1);
    const simulatedCircularity = Math.min(95, Math.round(metrics.avgCircularity + (simControls.recycledPctTarget - currentRecycled) * 0.6));
    
    // Improved overall score
    const simulatedOverallScore = Math.min(98, Math.round(metrics.scores.overallScore + (totalReductionPct * 40) + (simulatedCircularity - metrics.avgCircularity) * 0.3));
    const scoreImprovement = simulatedOverallScore - metrics.scores.overallScore;

    return {
      simulatedCO2Tons,
      co2ReductionPct: (totalReductionPct * 100).toFixed(1),
      simulatedEnergyMwh,
      simulatedCircularity,
      simulatedOverallScore,
      scoreImprovement: scoreImprovement > 0 ? `+${scoreImprovement}` : `${scoreImprovement}`
    };
  }, [metrics, simControls]);

  // Upload custom file / dataset parser
  const uploadCustomDataset = (newRows, filename) => {
    if (Array.isArray(newRows) && newRows.length > 0) {
      setRows(newRows);
      if (filename) setActiveFileName(filename);
    }
  };

  const resetToDefault = () => {
    setRows(defaultRawDataset);
    setSelectedMetal('All');
    setActiveFileName('PS_25069_Metal_LCA_Dataset.csv');
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
        resetToDefault
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataset = () => useContext(DataContext);
