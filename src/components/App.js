import React from 'react';
import Grid from "./Grid";
import '../App.css';
import ControlPanel from './controlPanel';

export const App = () => {
    return(
    
      <div className="App">
        <ControlPanel />
        <Grid />
      </div>
    );
  
}
export default App;
