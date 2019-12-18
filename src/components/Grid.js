import React, {Component} from 'react';
import Node from './Node';
import shortid from 'shortid';
import { AppContext } from './App';

export default class Grid extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            nodes : [], // all nodes (array of sub-arrays => columns inside rows)
            startNode:null,
            targetNode:null,
            currentNode:null,
            startSet:false,
            targetSet:false
        }
    } 
  


    
    render() {

        return (
            <AppContext.Consumer>
                    {context => 
                        <div id='grid'>
                            {context.nodes.map((c, index) => ( // get every row(main array)
                            <div className={`row row${index}`} key={shortid.generate()}> 
                                {c.map(node => {
                                    const {isStart, isTarget} = node;
                                    return (
                                        <Node 
                                            key={node.key}
                                            row={node.row}
                                            column={node.column}
                                            isStart={isStart}
                                            isTarget={isTarget}
                                        />
                                    )
                                    })}
                            </div>
                            ))}
                       </div>
                    }           
                    
            </AppContext.Consumer>
        )
    }
}
