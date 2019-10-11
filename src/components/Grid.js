import React, {Component} from 'react';
import Node from './Node';
import shortid from 'shortid';
export default class Grid extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            nodes : [],
            startNode:null,
            targetNode:null,
            currentNode:null
        }
        this.clickNode.bind(this.clickNode);
    } 

    componentDidMount() {
        let nodes = [];
        for (let i = 0; i <35; i++) {
            nodes.push([]); // push array to display row
            for (let j = 0; j < 50; j++) {
                nodes[i].push(<Node dataId={j} row={i} clickNode={this.clickNode} key={shortid.generate()} />); // every node(column)
            }
        }
        this.setState({nodes}) // assign local nodes to state's nodes
    }
    clickNode(e) {
        e.persist(); // avoid syntetic problem

        console.log('fafwafawfwafwafwa')
        console.log(e.target);
    }
    
    render() {
        let {nodes} = this.state; // assing state's nodes to local variable
        return (
            <div className="grid">
            {nodes.map((c, index) => ( // get every row(main array)
                <div className={`row row${index}`} key={shortid.generate()}> 
                    
                    {c.map((r) => r )}
                </div>
            ))}
            </div>
        );
    }
}
