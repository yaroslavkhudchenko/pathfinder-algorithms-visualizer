import React, {Component} from 'react';
import Node from './Node';
import shortid from 'shortid';
import { AppContext } from './App';

export default class Grid extends Component { 

    render() {

        return (
            <AppContext.Consumer>
                    {context => 
                        <div id='grid'>
                            {context.nodes.map((c, index) => ( // get every row(main array)
                            <div className={`row row${index}`} key={shortid.generate()}> 
                                {c.map(node => {
                                    return (
                                        <Node 
                                            key={node.key}
                                            row={node.row}
                                            column={node.column}
                                            isVisited={false}
                                            isWall={node.isWall ? true : false}
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
