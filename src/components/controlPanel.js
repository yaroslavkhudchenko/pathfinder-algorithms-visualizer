import React, {Component} from 'react';
import { dijkstra } from './../algorithms/dijkstra-alg';

export default class controlPanel extends Component {
   /*  constructor(props) {
        super(props);
    } */
    startAlgorithm() {
        dijkstra(this.props.grid, document.querySelector('.start'), document.querySelector('.target'))
    }
    render() {
        return (
            <div className='controlPanel'>
                <div 
                    onClick={this.startAlgorithm}
                >
                    Start
                </div>
            </div>
        )
    }
}