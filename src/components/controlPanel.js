import React, {Component} from 'react';
import { dijkstra } from './../algorithms/dijkstra-alg';

export default class controlPanel extends Component {
    startAlgorithm() {
        dijkstra(document.querySelector('.grid'), document.querySelector('.start'), document.querySelector('.target'))
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