import React, {Component} from 'react';

export default class Node extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            isStart:false,
            isTarget:false,
            isChecked:false
        }
    }
    render() {
        return <div 
            row={this.props.row} 
            column={this.props.column} 
            // onClick={this.props.clickNode}
            className={`singleNode${this.props.isStart ? ' start': this.props.isTarget ? ' target': ''}`} // set good color for start and target nodes
            id={`node-${this.props.row}-${this.props.column}`} // id for future animation
        > 
        </div>; 
    }
    
}