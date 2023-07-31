import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CalculatorForm from './components/CalculatorForm';
import CalculationResult from './components/CalculationResult';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/calculo" element={<CalculatorForm />} />
          <Route path="/calculo/:id" element={<CalculationResult />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
