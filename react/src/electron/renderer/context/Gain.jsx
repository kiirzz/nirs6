import React, { useState, createContext, useContext, useEffect } from 'react';

const GainContext = createContext();

export const GainProvider = ({ children }) => {
    const [gain1, setGain1] = useState(0);
    const [gain2, setGain2] = useState(0);
    const [gain3, setGain3] = useState(0);
    const [gain4, setGain4] = useState(0);
    const [gain5, setGain5] = useState(0);

    // const debounceSetGain = (setter, value) => {
    //     clearTimeout(setter.timeoutId);
    //     setter.timeoutId = setTimeout(() => {
    //         setter(value);
    //     }, 100);
    // };

    return (
        <GainContext.Provider
            value={{
                gain1,
                gain2,
                gain3,
                gain4,
                gain5,
                // setGain1,
                // setGain2,
                // setGain3,
                // setGain4,
                // setGain5
                setGain1,
                setGain2,
                setGain3,
                setGain4,
                setGain5
            }}
        >
            {children}
        </GainContext.Provider>
    );
};

export const useGain = () => {
    return useContext(GainContext);
};
