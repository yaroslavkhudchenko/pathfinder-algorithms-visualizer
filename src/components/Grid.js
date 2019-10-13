import React, {Component} from 'react';
import Node from './Node';
import ControlPanel from './ControlPanel';

import shortid from 'shortid';

export const StartNodeRow = 1;
export const StartNodeColumn = 1;
export const TargetNodeColumn= 48;
export const TargetNodeRow = 33;

export default class Grid extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            nodes : [],
            startNode:null,
            targetNode:null,
            currentNode:null,
            startSet:false,
            targetSet:false
        }
        this.clickNode = this.clickNode.bind(this);
    } 

 
    clickNode(e) {
        e.persist(); // avoid syntetic problem
        console.log(e.target);
        
        if (this.state.startSet === false) {
            e.target.classList.add('start'); 

            this.setState({
                startSet: true,
                startNode : e.target
            })
            console.log('ss')
            console.log(this.state.startSet);
            return;
        } else if(this.state.targetSet === false) {
            this.setState({
                targetSet: true,
                targetNode: e.target
            })
            e.target.classList.add('target');

        }

    }
   
    componentDidMount() {
        let nodes = [];
        for (let i = 0; i < 35; i++) {
            nodes.push([]); // push array to display row
            for (let j = 0; j < 50; j++) {
                if(j === StartNodeColumn && i === StartNodeRow) {
                    nodes[i].push({
                        column: j,
                        row: i,
                        key: shortid.generate(),
                        isStart: true,
                        isTarget: false

                    }); // start node
                } else if (j === TargetNodeColumn && i === TargetNodeRow) {
                    nodes[i].push({
                        column: j,
                        row: i,
                        key: shortid.generate(),
                        isStart: false,
                        isTarget: true

                    }); // every node(column)
                } else {
                    nodes[i].push({
                        column: j,
                        row: i,
                        key: shortid.generate(),
                        isStart: false,
                        isTarget: false

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
            <ControlPanel grid={nodes}/>
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
                                clickNode={this.clickNode}
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
