import React from 'react';
import './App.css';
import { InteractiveImages } from './interactive-image/InteractiveImages';

function App() {
  return (
    <div className="App">
        <InteractiveImages imgList={['/a.png', '/b.jpg']} />
    </div>
  );
}



export default App;
