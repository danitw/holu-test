import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getDoc, doc } from "firebase/firestore"

import { db } from '../firebase'

const CalculationResult = () => {
  const { id } = useParams();
  const [calculation, setCalculation] = useState(null);

  useEffect(() => {
    const fetchCalculation = async () => {
      try {
        const noteSnapshot = await getDoc(doc(db, 'calculations', id));

        console.log(noteSnapshot)

        if (noteSnapshot.exists) {
          setCalculation(noteSnapshot.data());
        } else {
          alert('Calculation not found!');
        }
      } catch (error) {
        console.error('Error fetching calculation:', error);
        alert('An error occurred while fetching the calculation.');
      }
    };

    fetchCalculation();
  }, [id]);

  return (
    <div>
      <h2>Calculation Result</h2>
      {calculation ? (
        <pre>{JSON.stringify(calculation, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CalculationResult;
