import React, {Component} from 'react';
import ControlPanel from './ControlPanel';
import Grid from './Grid';
import { dijkstra, getNodesInShortestPathOrder } from './../algorithms/dijkstra-alg';
import '../App.css';
import {StartNode, TargetNode } from './Grid';
const AppContext = React.createContext();

export default class App extends Component { 
  constructor(props) {
    super(props);
    
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
    console.log(this.state)
    const visitedNodesInOrder = dijkstra(Grid.state.nodes, Grid.state.nodes[StartNode.row][StartNode.column], Grid.state.nodes[TargetNode.row][TargetNode.column]);
    const shortestPathNodesInOrder = getNodesInShortestPathOrder(Grid.state.nodes[TargetNode.row][TargetNode.column])

    console.log(visitedNodesInOrder)
    console.log(shortestPathNodesInOrder)

    this.animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);

  }

  render() {
    return(
      <AppContext.Provider animateAlgorithm={this.animateAlgorithm}>
        <div className="App">
          <ControlPanel start={this.startAlgorithm} />
          <Grid />
        </div>
        </AppContext.Provider>
    );
  }
  
}
