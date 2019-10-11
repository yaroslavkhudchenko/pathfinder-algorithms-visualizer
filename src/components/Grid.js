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
            currentNode:null,
            startSet:false,
            targetSet:false
        }
        this.clickNode = this.clickNode.bind(this.clickNode);
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
        console.log(e.target);
        
        if(this.state.startSet === false) {
            this.setState = {
                startSet: true,
                startNode : e.target
            }
            e.target.classlist.add('active');
            return;
        } else if(this.state.targetSet === false) {
            this.setState = {
                targetSet: true,
                targetNode: e.target
            }
            e.target.classlist.add('target');
        }
        console.log(this.state);
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
