import React, { useState, useRef, useEffect } from 'react';
import { useSound } from '../../context/Sound';
import './MainButton.css';

const MainButton = () => {
    const { audio, setAudio, soundData, setSoundData } = useSound()
    const [audioName, setAudioName] = useState();
    const [isSendingData, setIsSendingData] = useState(false);
    const [isAudioConnected, setIsAudioConnected] = useState(false);
    const [websocket, setWebsocket] = useState(null);
    const audioContextRef = useRef(null);
    const websocketRef = useRef(null);
    const analyserRef = useRef(null);

    useEffect(() => {
        // Create an AudioContext
        audioContextRef.current = new AudioContext();
        return () => {
            // Close the AudioContext when component unmounts
            audioContextRef.current.close();
        };
    }, []);

    const handlePlay = () => {
        if (audio) {
            if (!isSendingData) {
                setIsSendingData(true);
                startSendingData();
            } else {
                setIsSendingData(false);
                stopSendingData();
            }
        }
    }

    const handleStop = () => {
        if (audio) {
            setIsSendingData(false);
            stopSendingData();
        }
    }

    const startSendingData = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        }
    
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 2048; // Adjust the FFT size as needed
    
        // Check if audio is already connected
        if (!isAudioConnected) {
            const audioSource = audioContextRef.current.createMediaElementSource(audio);
            audioSource.connect(analyserRef.current);
            setIsAudioConnected(true);
        }

        // Start sending frequency-domain data to backend
        const sendFrequencyData = () => {
            const frequencyDataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
            analyserRef.current.getByteFrequencyData(frequencyDataArray);
            setSoundData(prev => ({ ...prev, gain: frequencyDataArray }))
            const data = JSON.stringify(soundData);
            websocketRef.current.send(data);
            if (isSendingData) {
                requestAnimationFrame(sendFrequencyData);
            }
        };

        // Create WebSocket connection
        if (!websocket) {
            // Establish WebSocket connection when play button is clicked
            const newWebsocket = new WebSocket('ws://localhost:8000/ws');
            newWebsocket.onopen = () => {
                console.log('WebSocket connection established');
                setIsSendingData(true); // Start sending data once the WebSocket is open
            };
            newWebsocket.onclose = () => {
                console.log('WebSocket connection closed');
            };
            newWebsocket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
            setWebsocket(newWebsocket);
        } else {
            setIsSendingData(!isSendingData); // Toggle sending data
        }
    };

    const stopSendingData = () => {
        setIsSendingData(false);
        if (websocket) {
            websocket.close();
            setWebsocket(null);
        }
    };

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        setAudioName(selectedFile.name)
        if (selectedFile) {
            const audioElement = new Audio(URL.createObjectURL(selectedFile));
            setAudio(audioElement);
        }
    };

    const handleButtonClick = () => {
        const fileUpload = document.getElementById("fileUpload");
        if (audio) {
            setAudio(null)
            setSoundData({
                sound: [],
                gain: [0, 0, 0, 0, 0],
            })
            fileUpload.value = '';
        }
        else {
            fileUpload.click();
        }
    }

    return (
        <div>
            <div className="control-button-box">
                <div className="control-button">
                    <button onClick={handlePlay} disabled={!audio}>
                        {isSendingData ? 'Pause' : 'Play'}
                    </button>
                    <button onClick={handleStop} disabled={!audio}>
                        Stop
                    </button>
                </div>
                <div className="volume-box">
                    <span>volume</span>
                    <input
                        className="volume-input"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={1}
                        onChange={1}
                        disabled={!audio}
                    />
                </div>
            </div>
            <div className="audio">
                <div className="audio-button-box">
                        <button className="audio-button" onClick={handleButtonClick}>
                            {audio ? 'Delete' : 'Upload'}
                        </button>
                </div>
                <input 
                    type="file" 
                    id="fileUpload" 
                    accept="audio/mp3, audio/mp4, audio/wav, audio/mpeg, audio/ogg, audio/aac, audio/aiff"
                    onChange={handleChange} 
                    style={{ display:'none' }}
                />
                <div className="audio-name-box">
                    {audio ? 
                        <p className="audio-name">{audioName}</p>
                        : <p className="audio-name">No file uploaded</p>
                    }
                </div>  
            </div>
        </div>
    )
}

export default MainButton