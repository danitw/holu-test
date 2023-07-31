function calculateSolarSystem(powerTotalKiloWatts, panelPowerWatts, panelLengthMeters, panelWidthMeters, roofType) {
  const powerTotalWatts = powerTotalKiloWatts * 1000;
  
  const panelQuantity = Math.ceil(powerTotalWatts / panelPowerWatts);
  const inverterQuantity = Math.ceil(panelQuantity / 4);
  
  const structureLengthMeters = panelQuantity * panelLengthMeters;
  const usefulAreaSquareMeters = panelQuantity * panelLengthMeters * panelWidthMeters;
  
  return {
    panelQuantity,
    inverterQuantity,
    panelPowerWatts,
    structureLengthMeters,
    usefulAreaSquareMeters
  };
}

const powerTotalKiloWatts = 4.5;
const panelPowerWatts = 550;
const panelLengthMeters = 1.95;
const panelWidthMeters = 1.1;
const roofType = "laje";

const result = calculateSolarSystem(powerTotalKiloWatts, panelPowerWatts, panelLengthMeters, panelWidthMeters, roofType);

console.log("Results:");
console.log("Number of panels: " + result.panelQuantity);
console.log("Number of inverters: " + result.inverterQuantity);
console.log("Power of the utilized panel: " + result.panelPowerWatts + " Watts");
console.log("Necessary structure length: " + result.structureLengthMeters + " meters");
console.log("Required useful area: " + result.usefulAreaSquareMeters + " square meters");
