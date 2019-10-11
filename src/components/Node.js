import React, {Component} from 'react';

export default class Node extends Component { 
  
    render() {
        return <div onClick={this.clickNode} className="oneNode"></div>; 
    }
    
}