import React, { useState } from 'react';
import {collection, addDoc, Timestamp} from 'firebase/firestore'

import { db } from '../firebase'

const CalculatorForm = () => {
  const [powerTotalKiloWatts, setPowerTotalKiloWatts] = useState('');
  const [panelPowerWatts, setPanelPowerWatts] = useState('');
  const [panelLengthMeters, setPanelLengthMeters] = useState('');
  const [panelWidthMeters, setPanelWidthMeters] = useState('');
  const [roofType, setRoofType] = useState('');

  const calculateSolarSystem = (powerTotalKiloWatts, panelPowerWatts, panelLengthMeters, panelWidthMeters, roofType) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const totalPowerKiloWatts = parseFloat(powerTotalKiloWatts);
      const panelPower = parseFloat(panelPowerWatts);
      const panelLength = parseFloat(panelLengthMeters);
      const panelWidth = parseFloat(panelWidthMeters);

      const result = calculateSolarSystem(totalPowerKiloWatts, panelPower, panelLength, panelWidth, roofType)

      const calculationData = {
        panelQuantity: result.panelQuantity,
        inverterQuantity: result.inverterQuantity,
        panelPowerWatts:  result.panelPowerWatts,
        structureLengthMeters: result.structureLengthMeters,
        usefulAreaSquareMeters: result.usefulAreaSquareMeters,
        createdAt: Timestamp.now(),
      };
      await addDoc(collection(db, 'calculations'), calculationData)
      alert('Calculation saved successfully!');
    } catch (error) {
      console.error('Error saving calculation:', error);
      alert('An error occurred while saving the calculation.');
    }
  };

  return (
    <div>
      <h2>Calculator Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Total Power (kW):
          <input
            type="number"
            value={powerTotalKiloWatts}
            onChange={(e) => setPowerTotalKiloWatts(e.target.value)}
            required
          />
        </label>

        <label>
          Panel Power (W):
          <input
            type="number"
            value={panelPowerWatts}
            onChange={(e) => setPanelPowerWatts(e.target.value)}
            required
          />
        </label>

        <label>
          Panel Length (m):
          <input
            type="number"
            step="0.01"
            value={panelLengthMeters}
            onChange={(e) => setPanelLengthMeters(e.target.value)}
            required
          />
        </label>

        <label>
          Panel Width (m):
          <input
            type="number"
            step="0.01"
            value={panelWidthMeters}
            onChange={(e) => setPanelWidthMeters(e.target.value)}
            required
          />
        </label>

        <label>
          Roof Type:
          <select value={roofType} onChange={(e) => setRoofType(e.target.value)} required>
            <option value="">Select Roof Type</option>
            <option value="fibrocement">Fibrocement</option>
            <option value="ceramic">Ceramic</option>
            <option value="concrete">Concrete</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CalculatorForm;
