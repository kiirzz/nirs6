import React, { useState, createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
    const [audio, setAudio] = useState(null);
    const [soundData, setSoundData] = useState({
        sound: [],
        gain: [0, 0, 0, 0, 0],
    });

    return (
        <SoundContext.Provider value={{ audio, setAudio, soundData, setSoundData }}>
            {children}
        </SoundContext.Provider>
    )
}

export const useSound = () => {
    return useContext(SoundContext);
}