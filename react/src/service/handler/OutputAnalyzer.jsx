import React, { useEffect } from 'react'
import Interpolation from './Interpolation';

const OutputAnalyzer = (outputRawData, setOutputFrequencyData) => {
    useEffect(() => {
        if (outputRawData) {
            const newOutputData = Interpolation(outputRawData, 22000);
            setOutputFrequencyData(newOutputData);
        }
    }, [outputRawData, setOutputFrequencyData])

  return null;
}

export default OutputAnalyzer