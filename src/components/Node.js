import React from 'react';
import { AppContext } from "./App";

export const Node = ({
    row,    
    column, 
    isVisited,  
    isWall
}) => {
    return (
        <AppContext.Consumer>
            {context => 
                <div 
                    row={row} 
                    column={column} 
                    className={`singleNode${
                        row === context.startNode.row && column === context.startNode.column ? ' start': 
                        row === context.targetNode.row && column === context.targetNode.column ? ' target': 
                        isWall ? ' wall': ''}`
                    } // set good color for start and target nodes
                    onMouseDown={context.downMouse}
                    onMouseOver={context.moveOver}
                    onMouseUp={context.upMouse}
                    id={`node-${row}-${column}`} // id for future animation
                    onClick={context.setNodes}
                > 
                </div>
            }           
        </AppContext.Consumer>
    )
}
       