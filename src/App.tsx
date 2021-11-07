import React, {useState} from 'react';
import './App.css';
import Bathtub, {BathtubMode} from './components/Bathtub';

function App() {
  const handleBathhub = (mode:BathtubMode)=>() => {
    setMode(mode);
  }
  const [mode, setMode] = useState(BathtubMode.Initial)
  const renderButton = () => {
    return (
      <div className="d-inline-flex text-white m-3">
        <button className="p-2 bg-info" onClick={handleBathhub(BathtubMode.Increase)}>increaseWaterLevel</button>
        <button className="p-2 bg-info" onClick={handleBathhub(BathtubMode.Decrease)}>decreaseWaterLevel</button>
        <button className="p-2 bg-info" onClick={handleBathhub(BathtubMode.Stop)}>stop</button>
        <button className="p-2 bg-info" onClick={handleBathhub(BathtubMode.Initial)}>initial</button>
      </div>
    );
  }
  const end = () => {
    setMode(BathtubMode.Stop);
  }
  return (
    <div className="App">
        <Bathtub mode={mode} onEnd={end} />
        {renderButton()}
    </div>
  );
}

export default App;
