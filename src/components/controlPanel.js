import React, {Component} from 'react';
import { dijkstra, getNodesInShortestPathOrder } from './../algorithms/dijkstra-alg';
import {TargetNodeRow, TargetNodeColumn} from './Grid';

export default class controlPanel extends Component {
    constructor(props) {
        super(props);
        this.startAlgorithm = this.startAlgorithm.bind(this);
    }
    componentDidMount() {
        console.log(this.props.grid)
        console.log(this.props);
    }
    startAlgorithm() {

        console.log(this.props);
        dijkstra(this.props.grid, document.querySelector('.start'), document.querySelector('.target'))
        getNodesInShortestPathOrder(this.props.grid[TargetNodeRow][TargetNodeColumn])
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