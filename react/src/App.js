import './App.css';
import MainButton from './electron/renderer/pages/Button/MainButton.jsx';
import GainSlider from './electron/renderer/pages/Gain/GainSlider.jsx';

function App() {
  return (
    <div className="App">
      <iframe src="about:blank" title="sandboxed-iframe" sandbox="allow-scripts" style={{ display: 'none' }}></iframe>
      
      <div className="App-content">
        <GainSlider />
        <MainButton />
      </div>
    </div>
  );
}

export default App;
