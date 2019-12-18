import React, {Component} from 'react';
import { AppContext } from "./App";

export default class Node extends Component { 
   /*  constructor(props) {
        super(props);
        
    } */
    render() {
        return ( 
            <AppContext.Consumer>
                    {context => 
                        <div 
                            row={this.props.row} 
                            column={this.props.column} 
                            // onClick={this.props.clickNode}
                            className={`singleNode${
                                this.props.row === context.startNode.row && this.props.column === context.startNode.column ? ' start': 
                                this.props.row === context.targetNode.row && this.props.column === context.targetNode.column ? ' target': ''}`
                            } // set good color for start and target nodes
                            id={`node-${this.props.row}-${this.props.column}`} // id for future animation
                            onClick={context.setStartNode}
                           
                > 
                        </div>
                    }           
                </AppContext.Consumer>

        )    
    }
    
}