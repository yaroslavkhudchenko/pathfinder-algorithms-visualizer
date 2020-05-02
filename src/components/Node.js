import React, {Component} from 'react';
import { AppContext } from "./App";

export default class Node extends Component { 
   
    render() {
        return ( 
            <AppContext.Consumer>
                    {context => 
                        <div 
                            row={this.props.row} 
                            column={this.props.column} 
                            className={`singleNode${
                                this.props.row === context.startNode.row && this.props.column === context.startNode.column ? ' start': 
                                this.props.row === context.targetNode.row && this.props.column === context.targetNode.column ? ' target': 
                                this.props.isWall ? ' wall': ''}`
                            } // set good color for start and target nodes
                            onMouseDown={context.downMouse}
                            onMouseOver={context.moveOver}
                            onMouseUp={context.upMouse}
                            id={`node-${this.props.row}-${this.props.column}`} // id for future animation
                            onClick={context.setNodes}
                        > 
                        </div>
                    }           
                </AppContext.Consumer>

        )    
    }
    
}