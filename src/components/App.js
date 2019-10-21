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
      nodes: []
    }
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
      }, 10 * i);
    }
  }
  startAlgorithm() {
    console.log('start algorithm');
    const visitedNodesInOrder = dijkstra(Grid.state.nodes, Grid.state.nodes[StartNode.row][StartNode.column], Grid.state.nodes[TargetNode.row][TargetNode.column]);
    const shortestPathNodesInOrder = getNodesInShortestPathOrder(Grid.state.nodes[TargetNode.row][TargetNode.column])

    console.log(visitedNodesInOrder)
    console.log(shortestPathNodesInOrder)

    this.animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);

  }

  render() {
    return(
      <AppContext.Provider startAlgorithm={this.startAlgorithm(() => this.startAlgorithm())}>
        <div className="App">
          <ControlPanel />
          <Grid />
        </div>
        </AppContext.Provider>
    );
  }
  
}
