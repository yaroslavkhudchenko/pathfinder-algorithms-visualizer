import React, {Component} from 'react';
import { AppContext } from './App';
// import { dijkstra } from '../algorithms/dijkstra-alg';

export default class ControlPanel extends Component {

    componentDidMount() {
        console.log(this.props);
    } 
    selectAlgorithm(e) {
        console.log(e)
        console.log('selectAlgorithm')
    }
    
    render() {
        return (
          <AppContext.Consumer>
            {context => (
              <div className="controlPanel">
                <div
                  className="startButton"
                  onClick={
                    
                    ((context.startNode.row  || context.startNode.row === 0) && (context.targetNode.column || context.targetNode.column === 0))
                      ? context.startAlgorithm
                      : console.log("first set nodes")
                  }
                >
                  {((context.startNode.row  || context.startNode.row === 0) && (context.targetNode.column || context.targetNode.column === 0))
                    ? "Start"
                    : "First set start/target nodes"}
                </div>
                <div className='resetButton'
                onClick={
                  context.resetGrid
                }
                >
                  Reset
                </div>
               {/*  <div className="selectAlgorithm">
                  <select>
                    <option onClick={() => this.selectAlgorithm(dijkstra)}>
                      dijkstra
                    </option>
                  </select>
                </div> */}
                <div className="selectTool">
                  <select id='selectTool' onChange={context.selectTool}>
                    <option>
                      Start
                    </option>
                    <option>
                      Target
                    </option>
                    <option>
                      Wall
                    </option>
                    <option>
                      Clear Wall
                    </option>
                  </select>
                </div>
                
                <div className="setGridSize" /* onClick={context.setGridSize} */>
                 {/*  <div>Build nodes</div> */}
                  <div>
                    <div>
                      Row: <input className="rowNumber" type="number" defaultValue={40} onChange={context.setGridSize} min={1}/>
                    </div>
                    <div>
                      Column: <input className="columnNumber" type="number" defaultValue={35} onChange={context.setGridSize} min={1}/>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </AppContext.Consumer>
        );
    }
}