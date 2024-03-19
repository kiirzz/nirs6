import { useEffect, useRef } from 'react';

const InputAnalyzer = (audioElement, setInputFrequencyData) => {
    const intervalIdRef = useRef(null);

    useEffect(() => {
        if (audioElement) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();

            const source = audioContext.createMediaElementSource(audioElement);
            source.connect(analyser);
            analyser.connect(audioContext.destination);

            const bufferLength = 22000;
            const dataArray = new Uint8Array(bufferLength);

            const updateFrequencyData = () => {
                analyser.getByteFrequencyData(dataArray);
                const frequencies = Array.from(dataArray);
                setInputFrequencyData(frequencies);
            }

            audioElement.addEventListener('play', () => {
                intervalIdRef.current = setInterval(updateFrequencyData, 1000);
            });

            audioElement.addEventListener('pause', () => {
                clearInterval(intervalIdRef.current);
            });

            return () => {
                clearInterval(intervalIdRef.current);
            };
        }
        else {
            setInputFrequencyData(null);
        }
    }, [audioElement, setInputFrequencyData]);

    return null;
};

export default InputAnalyzer;