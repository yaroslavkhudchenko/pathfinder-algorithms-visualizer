import React from 'react';
import ControlPanel from './ControlPanel';
import Grid from './Grid';
import '../App.css';

export const App = () => {
    return(
      <div className="App">
        <ControlPanel />
        <Grid />
      </div>
    );
  
}
export default App;
