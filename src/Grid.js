import React, {Component} from 'react';
import Node from './Node';

export default class Grid extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            nodes : [],
            startNode:null,
            targetNode:null,
            currentNode:null
        }
    } 

    componentDidMount() {
        let nodes = [];
        for (let i = 0; i <50; i++) {
            nodes.push([]); // push array to display row
            for (let j = 0; j < 40; j++) {
                nodes[i].push(<div key={j} onClick={this.clickNode} className="oneNode"></div>); // every node(column)
            }
        }
        this.setState({nodes}) // assign local nodes to state's nodes
    }
    
    clickNode(e) {
        console.log(e)
    }
    render() {
        let {nodes} = this.state; // assing state's nodes to local variable
        return (
            <div className="grid">
            {nodes.map((r, index) => ( // get every row(main array)
            <div className='row' id={index}> 
                return 
                    {r.map(c => <Node />)}}; 
            </div>
            ))}
            </div>
        );
    }
}
