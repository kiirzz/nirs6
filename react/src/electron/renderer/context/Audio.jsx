import React, { useState, createContext, useContext, useEffect } from 'react';

const AudioContext =  createContext();

export const AudioProvider = ({ children }) => {
    const [audio, setAudio] = useState(null);
    const [audioElement, setAudioElement] = useState(null);
    const [inputFrequencyData, setInputFrequencyData] = useState(null);
    const [outputRawData, setOutputRawData] = useState(null);
    const [outputFrequencyData, setOutputFrequencyData] = useState(null);

    useEffect(() => {
        if (audio) {
            const audioURL = URL.createObjectURL(audio);
            const newAudioElement = new Audio(audioURL);
            setAudioElement(newAudioElement);
        } else {
            setAudioElement(null);
        }
    }, [audio]);

    return (
        <AudioContext.Provider value={{ audio, setAudio, inputFrequencyData, setInputFrequencyData, audioElement, outputRawData, setOutputRawData, outputFrequencyData, setOutputFrequencyData }}>
            {children}
        </AudioContext.Provider>
    )
}

export const useAudio = () => {
    return useContext(AudioContext);
}