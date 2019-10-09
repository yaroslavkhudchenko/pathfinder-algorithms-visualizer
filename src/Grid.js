import React, {Component} from 'react';


export default class Grid extends Component { 
        constructor(props) {
            super(props);
            this.state = {
                nodes : []
            }
        } 

        componentDidMount() {
            let nodes = [];
            //let columns = [];
            for (let i = 0; i < 20; i++) {
                nodes.push([]); // push array to display row
                for (let j = 0; j < 20; j++) {
                    nodes[i].push(<div key={j} className="oneNode"></div>); // every node(column)
                }
            }
            this.setState({nodes})
        }

        render() {
           let {nodes} = this.state;
            return (
              <div className="grid">
                {nodes.map(r => { // get every row(main array)
                  return <div>{r.map(c => c)}</div>; // build node based on main array index(20 per row)
                })}
              </div>
            );
        }
}
