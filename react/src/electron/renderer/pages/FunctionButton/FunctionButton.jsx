import React, { useState, useEffect } from 'react';
import { useAudio } from '../../context/Audio';
import InputAnalyzer from '../../../../service/handler/InputAnalyzer';
import Processer from '../../../../service/handler/Processer';
import OutputAnalyzer from '../../../../service/handler/OutputAnalyzer';

const FunctionButton = () => {
    const { inputFrequencyData, setInputFrequencyData, audioElement, outputRawData, outputFrequencyData, setOutputFrequencyData } = useAudio();
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioBufferSource, setAudioBufferSource] = useState(null);
    const [volume, setVolume] = useState(0.2);
    const [gainNode, setGainNode] = useState(null);

    const AudContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudContext();
    
    InputAnalyzer(audioElement, setInputFrequencyData);
    Processer();
    OutputAnalyzer(outputRawData, setOutputFrequencyData);

    console.log(audioBufferSource);

    useEffect(() => {
        if (outputFrequencyData && audioContext) {
            const audioBuffer = audioContext.createBuffer(1, outputFrequencyData.length, audioContext.sampleRate);
            const audioBufferData = audioBuffer.getChannelData(0);
            for (let i = 0; i < outputFrequencyData.length; i++) {
                audioBufferData[i] = outputFrequencyData[i];
            }

            const sourceNode = audioContext.createBufferSource();
            sourceNode.buffer = audioBuffer;
            sourceNode.loop = false;

            const gainNode = audioContext.createGain();
            gainNode.gain.value = volume;
            sourceNode.connect(gainNode);
            gainNode.connect(audioContext.destination);

            setAudioBufferSource(sourceNode);

            if (isPlaying) {
                sourceNode.start();
            }
        }
    }, [outputFrequencyData, audioContext]);

    const handlePlay = () => {
        if (audioElement) {
            if (isPlaying) {
                audioElement.pause();
                if (audioBufferSource) audioBufferSource.stop();
            } else {
                audioElement.play();
                if (audioBufferSource) audioBufferSource.start();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleStop = () => {
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
            if (audioBufferSource) {
                audioBufferSource.pause();
                audioBufferSource.disconnect();
            }
            setIsPlaying(false);
            setInputFrequencyData(null);
        }
    };

    // const handlePlay = () => {
    //     if (audioBufferSource) {
    //         if (isPlaying) {
    //             audioBufferSource.stop();
    //         } else {
    //             audioBufferSource.start();
    //         }
    //         setIsPlaying(!isPlaying);
    //     }
    // };

    // const handleStop = () => {
    //     if (audioBufferSource) {
    //         audioBufferSource.pause();
    //         audioBufferSource.disconnect();
    //         setIsPlaying(false);
    //         setInputFrequencyData(null);
    //     }
    // };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioBufferSource && gainNode) {
            gainNode.gain.setValueAtTime(newVolume, audioContext.currentTime);
        }
    };

    return (
        <div>
            <button onClick={handlePlay} disabled={!audioElement}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={handleStop} disabled={!audioElement}>
                Stop
            </button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                disabled={!audioElement}
            />
        </div>
    );
};

export default FunctionButton;