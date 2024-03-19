import React, { useState, useEffect } from 'react'
import { useSound } from '../../context/Sound'
import './GainSlider.css'

const GainSlider = () => {
    const { audio, soundData, setSoundData } = useSound();

    const gainTitle = ["<100 Hz", "100-1935 Hz", "1935-4515 Hz", "4515-9675 Hz", ">9675 Hz"]

    function handleGainChange(data, index) {
        setSoundData(prev => ({
            ...prev, 
            gain: prev.gain.map((value, i) => i === index ? parseInt(data) : value) 
        }))
    }

    return (
        <div className="gain">
            {soundData ?
                soundData.gain.map((gainValue, index) => (
                    <div className="gain-input-box">
                        <span className="gain-input-title">{gainTitle[index]}</span>
                        <div className="gain-input">
                            <input 
                                type="range"
                                min="-60"
                                max="0"
                                step="1"
                                name="gain"
                                value={gainValue}
                                onChange={(event) => handleGainChange(event.target.value, index)} 
                                disabled={!audio}
                            />
                        </div>
                        <div className="gain-index">{audio? gainValue : ""}</div>
                    </div>
                ))
                : <div className="">Error</div>
            }

            {/* <div className="gain-input-box">
                <span className="gain-input-title">{"<"}100 Hz</span>
                <div className="gain-input">
                    <input 
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={gain1}
                        onChange={1} 
                        disabled={!audio}
                    />
                </div>
                <div className="gain-index">{audio? gain1 : ""}</div>
            </div>
            <div className="gain-input-box">
                <span className="gain-input-title">100-1935 Hz</span>
                <div className="gain-input">
                    <input 
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={gain2}
                        onChange={1} 
                        disabled={!audio}
                    />
                </div>
                <div className="gain-index">{audio? gain2 : ""}</div>
            </div>
            <div className="gain-input-box">
                <span className="gain-input-title">1935-4515 Hz</span>
                <div className="gain-input">
                    <input 
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={gain3}
                        onChange={1} 
                        disabled={!audio}
                    />
                </div>
                <div className="gain-index">{audio? gain3 : ""}</div>
            </div>
            <div className="gain-input-box">
                <span className="gain-input-title">4515-9675 Hz</span>
                <div className="gain-input">
                    <input 
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={gain4}
                        onChange={1} 
                        disabled={!audio}
                    />
                </div>
                <div className="gain-index">{audio? gain4 : ""}</div>
            </div>
            <div className="gain-input-box">
                <span className="gain-input-title">{">"}9675 Hz</span>
                <div className="gain-input">
                    <input 
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={gain5}
                        onChange={1} 
                        disabled={!audio}
                    />
                </div>
                <div className="gain-index">{audio? gain5 : ""}</div>
            </div> */}
        </div>
    )
}

export default GainSlider