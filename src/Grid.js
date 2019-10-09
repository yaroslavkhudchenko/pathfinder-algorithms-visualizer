import React, {Component} from 'react';


export default class Grid extends Component { 
        constructor(props) {
            super(props);
        }

        render() {
            let nodes = [];
        
            for(let i = 0; i < 20;i++) {
                nodes.push([]);
                for(let j=0;j<20;j++) {
                    nodes[i].push(<div key={j} className='oneNode'></div>);
                }

            }
            
            console.log(nodes);
            return (
              <div className="grid">
                {nodes.map(single=>single) }
              </div>
            );
        }
}
