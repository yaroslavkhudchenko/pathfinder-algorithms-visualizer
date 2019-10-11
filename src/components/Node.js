import React, {Component} from 'react';

export default class Node extends Component { 
    
    render() {
        return <div 
            row={this.props.row} 
            column={this.props.dataId} 
            onClick={this.props.clickNode} 
            className="singleNode">
        </div>; 
    }
    
}