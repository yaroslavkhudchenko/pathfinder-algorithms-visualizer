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
        this.clickNode = this.clickNode.bind(this);
    } 

    componentDidMount() {
        let nodes = [];
        for (let i = 0; i <35; i++) {
            nodes.push([]); // push array to display row
            for (let j = 0; j < 50; j++) {
                if(j === 30 && i === 20) {
                    nodes[i].push(<Node dataId={j} row={i} className='start' clickNode={this.clickNode} key={shortid.generate()} />); // every node(column)

                } else {
                    nodes[i].push(<Node dataId={j} row={i} clickNode={this.clickNode} key={shortid.generate()} />); // every node(column)
                }
            }
        }
        this.setState({nodes}) // assign local nodes to state's nodes
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
           // return;
        } else if(this.state.targetSet === false) {
            this.setState({
                targetSet: true,
                targetNode: e.target
            })
            e.target.classList.add('target');

        }

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
