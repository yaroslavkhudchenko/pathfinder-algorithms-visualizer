import React, {Component} from 'react';
import { dijkstra, getNodesInShortestPathOrder } from './../algorithms/dijkstra-alg';
import {TargetNode, StartNode} from './Grid';

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
            'singleNode singleNode-visited';
        }, 10 * i);
        }
    }
    startAlgorithm() {

        const visitedNodesInOrder = dijkstra(this.props.grid, this.props.grid[StartNode.row][StartNode.column], this.props.grid[TargetNode.row][TargetNode.column]);
        const shortestPathNodesInOrder = getNodesInShortestPathOrder(this.props.grid[TargetNode.row][TargetNode.column])
        console.log(visitedNodesInOrder)
        console.log(shortestPathNodesInOrder)
        // this.animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);

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