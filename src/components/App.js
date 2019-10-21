import React, {Component} from 'react';
import ControlPanel from './ControlPanel';
import Grid from './Grid';
import shortid from 'shortid';
import { dijkstra, getNodesInShortestPathOrder } from './../algorithms/dijkstra-alg';
import '../App.css';
export const AppContext = React.createContext();
export const StartNode = {
  row: 12,
  column: 12
}
export const TargetNode = {
  row: 32,
  column: 47
}

export default class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      startAlgorithm() {
        console.log('start algorithm');
        const visitedNodesInOrder = dijkstra(this.state.nodes, this.state.nodes[StartNode.row][StartNode.column], this.state.nodes[TargetNode.row][TargetNode.column]);
        const shortestPathNodesInOrder = getNodesInShortestPathOrder(this.state.nodes[TargetNode.row][TargetNode.column])
        this.animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);
      }
    };
    this.state.startAlgorithm = this.state.startAlgorithm.bind(this);
  }
   
componentDidMount() {
  // create nodes array + choose start and target nodes
  let nodes = [];
  for (let i = 0; i < 35; i++) {
    nodes.push([]); // push array to display row
    for (let j = 0; j < 50; j++) {
      if (j === StartNode.column && i === StartNode.row) {
        nodes[i].push({
          column: j,
          row: i,
          key: shortid.generate(),
          isStart: true,
          isTarget: false,
          distance: Infinity

        }); // start node
      } else if (j === TargetNode.column && i === TargetNode.row) {
        nodes[i].push({
          column: j,
          row: i,
          key: shortid.generate(),
          isStart: false,
          isTarget: true,
          distance: Infinity
        }); // every node(column)
      } else {
        nodes[i].push({
          column: j,
          row: i,
          key: shortid.generate(),
          isStart: false,
          isTarget: false,
          distance: Infinity
        }); // target node
      }
    }
  }
  this.setState({nodes})
}

  animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder) {
    console.log('animate algorithm');
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(shortestPathNodesInOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.column}`).className =
          'singleNode singleNode-visited';
      }, 7 * i);
    }
  }

  // draw line from start to target
  animateShortestPath(shortestPathNodesInOrder) {
    for(let i=0;i<shortestPathNodesInOrder.length;i++) {
      setTimeout(() => {
        document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`).style.background = 'red';
      }, 100);
    }
  }

  render() {
    return(
      <AppContext.Provider value={this.state}>
        <div className="App">
          <ControlPanel />
          <Grid />
        </div>
        </AppContext.Provider>
    );
  }
  
}
