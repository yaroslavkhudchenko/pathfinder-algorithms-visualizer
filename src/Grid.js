import React, {Component} from 'react';
import {Title} from './Title';

export default class Grid extends Component {
     
        render() {
            let nodes = [];
            for(let i = 0; i < 200;i++) {
                nodes.push('nodeSingle');
            }
            
            console.log(nodes);
            return (
              <div className="grid">
                {nodes.map((i) => (
                  <Title key={{i}}/>
                ))}
              </div>
            );
        }
        
}

 /*export const Grid = () => {
    constructor(props) {
        super(props);
        this.state = {
            gridSize: 100,
            gridNode: []
        }
    };

 */
   /*  render() { */
       
        
    //};

    
//}