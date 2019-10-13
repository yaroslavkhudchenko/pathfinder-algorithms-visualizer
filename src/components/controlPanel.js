import React, {Component} from 'react';
import { dijkstra, getNodesInShortestPathOrder } from './../algorithms/dijkstra-alg';
import {TargetNodeRow, TargetNodeColumn, StartNodeRow, StartNodeColumn} from './Grid';

export default class controlPanel extends Component {
    constructor(props) {
        super(props);
        this.startAlgorithm = this.startAlgorithm.bind(this);
    }
    componentDidMount() {
        console.log(this.props.grid)
        console.log(this.props);
    } 
    animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
            this.animateShortestPath(shortestPathNodesInOrder);
            }, 10 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.column}`).className =
            'node node-visited';
        }, 10 * i);
        }
    }
    startAlgorithm() {

        console.log(this.props);
        const visitedNodesInOrder = dijkstra(this.props.grid, this.props.grid[StartNodeRow][StartNodeColumn], this.props.grid[TargetNodeRow][TargetNodeColumn]);
        const shortestPathNodesInOrder = getNodesInShortestPathOrder(this.props.grid[TargetNodeRow][TargetNodeColumn])

        console.log('---------------------')
        console.log(visitedNodesInOrder)
        console.log(shortestPathNodesInOrder)
        this.animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);

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