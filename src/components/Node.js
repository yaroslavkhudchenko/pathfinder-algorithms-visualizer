import React, {Component} from 'react';
import { AppContext } from "./App";

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
        return ( 
            <AppContext.Consumer>
                    {context => 
                        <div 
                            row={this.props.row} 
                            column={this.props.column} 
                            // onClick={this.props.clickNode}
                            className={`singleNode${this.props.isStart ? ' start': this.props.isTarget ? ' target': ''}`} // set good color for start and target nodes
                            id={`node-${this.props.row}-${this.props.column}`} // id for future animation
                            onClick={context.setStartTargetNodes}
                        > 
                        </div>
                    }           
                </AppContext.Consumer>

        )    
    }
    
}