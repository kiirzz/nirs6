import React from 'react';
import { useAudio } from '../../context/Audio';
import './Upload.css';

const Upload = () => {
    const { audio, setAudio } = useAudio();

    const handleChange = e => {
        setAudio(e.target.files[0]);
    }

    const handleButtonClick = () => {
        const fileUpload = document.getElementById("fileUpload");
        if (audio) {
            setAudio(null)
            fileUpload.value = '';
        }
        else {
            fileUpload.click();
        }
    }

    return (
        <div className="audio">
            <input 
                type="file" 
                id="fileUpload" 
                accept="audio/mp3, audio/mp4, audio/wav, audio/mpeg, audio/ogg, audio/aac, audio/aiff"
                onChange={handleChange} 
                style={{ display:'none' }}
            />
            <div className="audio-name-box">
                {audio ? 
                    <p className="audio-name">{audio.name}</p>
                    : <p className="audio-name">No file uploaded</p>
                }
            </div>
            <div className="audio-button-box">
                <button className="audio-button" onClick={handleButtonClick}>
                    {audio ? 'Delete' : 'Upload'}
                </button>
            </div>
        </div>
    )
}

export default Upload