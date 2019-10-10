import React, {Component} from 'react';
import shortid from 'shortid';

export default class Node extends Component { 
  
    render() {
        return <div onClick={this.clickNode} className="oneNode"></div>; 
    }
    
}