import React, {Component} from 'react';


export default class Grid extends Component { 
      /*   constructor(props) {
            super(props);
        } */

        render() {
            let rows = [];
            //let columns = [];
            for(let i = 0; i < 20;i++) {
                rows.push([]);
                for (let j = 0; j < 20; j++) {
                  rows[i].push(<div key={j} className="oneNode"></div>);
                }

            }
            
            console.log(rows);
            return (
              <div className="grid">
                
               
                {rows.map((s) => {
                        return <div>
                            {s.map((c) => c)} 
                        </div>
                    })};
                }
              </div>
            );
        }
}
