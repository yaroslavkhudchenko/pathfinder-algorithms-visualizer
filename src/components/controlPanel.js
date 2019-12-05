import React, {Component} from 'react';
import { AppContext } from './App';
import { dijkstra } from '../algorithms/dijkstra-alg';

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
                {context =>
                    <div className='controlPanel'>
                        <div className='startButton' onClick={context.startNode.row && context.targetNode.column ? context.startAlgorithm : console.log('first set nodes')}>
                            {context.startNode.row && context.targetNode.column ? 'Start' : 'First set start/target nodes' }
                        </div>
                        <div className='selectAlgorithm'>
                            <select>
                                <option onClick={() => this.selectAlgorithm(dijkstra)}>dijkstra</option>
                            </select>
                        </div>
                    </div>
                }
                </AppContext.Consumer>
        )
    }
}