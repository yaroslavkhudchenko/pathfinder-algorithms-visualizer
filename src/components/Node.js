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
            onClick={this.props.clickNode}
            key={this.props.key}
            className={`singleNode ${this.state.isStart ? 'start':''}`}>
        </div>; 
    }
    
}