import React, {Component} from 'react';
import Node from './Node';
import { dijkstra, getNodesInShortestPathOrder } from './../algorithms/dijkstra-alg';
import shortid from 'shortid';

// global variables for good start and target node position on the grid

export const StartNode = {
    row:12,
    column:12
}
export const TargetNode = {
    row:32,
    column:47
}

export default class Grid extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            nodes : [], // all nodes (array of sub-arrays => columns inside rows)
            startNode:null,
            targetNode:null,
            currentNode:null,
            startSet:false,
            targetSet:false
        }
        // this.clickNode = this.clickNode.bind(this);
        this.startAlgorithm = this.startAlgorithm.bind(this);

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

        this.animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);

    }



    componentDidMount() {
        // create nodes array + choose start and target nodes
        let nodes = [];
        for (let i = 0; i < 35; i++) {
            nodes.push([]); // push array to display row
            for (let j = 0; j < 50; j++) {
                if(j === StartNode.column && i === StartNode.row) {
                    nodes[i].push({
                        column: j,
                        row: i,
                        key: shortid.generate(),
                        isStart: true,
                        isTarget: false,
                        distance:Infinity

                    }); // start node
                } else if (j === TargetNode.column && i === TargetNode.row) {
                    nodes[i].push({
                        column: j,
                        row: i,
                        key: shortid.generate(),
                        isStart: false,
                        isTarget: true,
                        distance:Infinity

                    }); // every node(column)
                } else {
                    nodes[i].push({
                        column: j,
                        row: i,
                        key: shortid.generate(),
                        isStart: false,
                        isTarget: false,
                        distance:Infinity

                    }); // target node
                }
            }
        }
        this.setState({ nodes }) // assign local nodes to state's nodes
    }
    render() {
        let {nodes} = this.state; // assing state's nodes to local variable
        return (
            <div className="grid">
            {nodes.map((c, index) => ( // get every row(main array)
                <div className={`row row${index}`} key={shortid.generate()}> 
                    
                    {c.map(node => {
                        const {isStart, isTarget} = node;
                        return (
                            <Node 
                                key={node.key}
                                row={node.row}
                                column={node.column}
                                isStart={isStart}
                                isTarget={isTarget}
                                // clickNode={this.clickNode}
                            />
                        )
                    }
                )}
                </div>
            ))}
            </div>
        );
    }
}
