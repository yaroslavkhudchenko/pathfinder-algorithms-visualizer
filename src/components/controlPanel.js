import React, {Component} from 'react';
import { AppContext } from './App';
import { dijkstra } from '../algorithms/dijkstra-alg';

export default class ControlPanel extends Component {
    render() {
        return (
          <AppContext.Consumer>
            {context => (
              <div className="controlPanel">
				  <div className='cTop'>
					
					
				{/*<div className="selectAlgorithm">
					 <select>
						<option onClick={() => this.selectAlgorithm(dijkstra)}>
						dijkstra
						</option>
					</select
					</div>	> */}
					<div className="selectTool">
					<select id='selectTool' onChange={context.selectTool} defaultValue='Target'>
						<option>
						Start
						</option>
						<option >
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
					<div
						className="startButton"
						onClick={context.startAlgorithm}
					>
						Start
					</div>
					<div id='clearPart'>
						<div className='resetButton'
							onClick={
								context.resetGrid
							}
						>
							Reset
						</div>
						<div className='clearButton'
							onClick={
								context.clearWalls
							}
						>
							Clear
						</div>
					</div>


						</div>
					<div className='cBottom'>

					</div>
              </div>
            )}
          </AppContext.Consumer>
        );
    }
}