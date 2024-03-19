import React, { useState, useEffect } from 'react'
import { useGain } from '../../context/Gain'
import { useAudio } from '../../context/Audio';
import './GainControl.css'

const GainControl = () => {

    const { gain1, gain2, gain3, gain4, gain5, setGain1, setGain2, setGain3, setGain4, setGain5 } = useGain();
    const { audioElement } = useAudio();

    const [visualGain1, setVisualGain1] = useState(gain1);
    const [visualGain2, setVisualGain2] = useState(gain2);
    const [visualGain3, setVisualGain3] = useState(gain3);
    const [visualGain4, setVisualGain4] = useState(gain4);
    const [visualGain5, setVisualGain5] = useState(gain5);

    useEffect(() => {
        setVisualGain1(gain1);
        setVisualGain2(gain2);
        setVisualGain3(gain3);
        setVisualGain4(gain4);
        setVisualGain5(gain5);
    }, [gain1, gain2, gain3, gain4, gain5]);

    const handleGainChange = (setter, setVisualGain, e) => {
        const newValue = parseInt(e.target.value);
        setVisualGain(newValue);
        setter(newValue);
    };

    return (
        <div className="gain">
            <div className="gain-input-box">
                <span className="gain-input-title">{"<"}100 Hz</span>
                <div className="gain-input">
                    <input 
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={visualGain1}
                        onChange={(e) => handleGainChange(setGain1, setVisualGain1, e)} 
                        disabled={!audioElement}
                    />
                </div>
                <div className="gain-index">{audioElement? gain1 : ""}</div>
            </div>
            <div className="gain-input-box">
                <span className="gain-input-title">100-1935 Hz</span>
                <div className="gain-input">
                    <input 
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={visualGain2}
                        onChange={(e) => handleGainChange(setGain2, setVisualGain2, e)} 
                        disabled={!audioElement}
                    />
                </div>
                <div className="gain-index">{audioElement? gain2 : ""}</div>
            </div>
            <div className="gain-input-box">
                <span className="gain-input-title">1935-4515 Hz</span>
                <div className="gain-input">
                    <input 
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={visualGain3}
                        onChange={(e) => handleGainChange(setGain3, setVisualGain3, e)} 
                        disabled={!audioElement}
                    />
                </div>
                <div className="gain-index">{audioElement? gain3 : ""}</div>
            </div>
            <div className="gain-input-box">
                <span className="gain-input-title">4515-9675 Hz</span>
                <div className="gain-input">
                    <input 
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={visualGain4}
                        onChange={(e) => handleGainChange(setGain4, setVisualGain4, e)} 
                        disabled={!audioElement}
                    />
                </div>
                <div className="gain-index">{audioElement? gain4 : ""}</div>
            </div>
            <div className="gain-input-box">
                <span className="gain-input-title">{">"}9675 Hz</span>
                <div className="gain-input">
                    <input 
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={visualGain5}
                        onChange={(e) => handleGainChange(setGain5, setVisualGain5, e)} 
                        disabled={!audioElement}
                    />
                </div>
                <div className="gain-index">{audioElement? gain5 : ""}</div>
            </div>
        </div>
    )
}

export default GainControl