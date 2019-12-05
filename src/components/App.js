import React, {Component} from 'react';
import ControlPanel from './ControlPanel';
import Grid from './Grid';
import shortid from 'shortid';
import { dijkstra, getNodesInShortestPathOrder } from './../algorithms/dijkstra-alg';
import '../App.css';
export const AppContext = React.createContext();

export default class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      startNode: {
        row: null,
        column: null
      },
      targetNode: {
        row: null,
        column: null
      },
      startAlgorithm() {
        console.log("start algorithm");
        console.log(this.state.nodes);
        console.log(this.state.startNode);
        console.log(this.state.targetNode);
        const visitedNodesInOrder = dijkstra(
          this.state.nodes,
          this.state.nodes[this.state.startNode.row][
            this.state.startNode.column
          ],
          this.state.nodes[this.state.targetNode.row][
            this.state.targetNode.column
          ]
        );
        const shortestPathNodesInOrder = getNodesInShortestPathOrder(
          this.state.nodes[this.state.targetNode.row][
            this.state.targetNode.column
          ]
        );
        this.animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);
      },
      setStartNode(e) {
        console.log("ee");
        this.setState({
          startNode: {
            row: e.target.getAttribute("row") * 1,
            column: e.target.getAttribute("column") * 1
          }
        });
      },
      setTargetNode(e) {
        console.log("ee");
        this.setState({
          targetNode: {
            row: e.target.getAttribute("row") * 1,
            column: e.target.getAttribute("column") * 1
          }
        });
      },
      buildNodes() {

        let row = document.querySelector(".rowNumber").value;
        let column = document.querySelector(".columnNumber").value;

        // create nodes array + choose start and target nodes
        let nodes = [];
        for (let i = 0; i < column; i++) {
          nodes.push([]); // push array to display row
          for (let j = 0; j < row; j++) {
            nodes[i].push({
              column: j,
              row: i,
              key: shortid.generate(),
              isStart: false,
              isTarget: false,
              distance: Infinity
            }); // target node
            //}
          }
        }
        this.setState({ nodes });
      }
    };
    this.state.startAlgorithm = this.state.startAlgorithm.bind(this);
    this.state.setStartNode = this.state.setStartNode.bind(this);
    this.state.setTargetNode = this.state.setTargetNode.bind(this);
    this.state.buildNodes = this.state.buildNodes.bind(this);

  }
   
componentDidMount() {
  // create nodes array + choose start and target nodes
  let nodes = [];
  for (let i = 0; i < 35; i++) {
    nodes.push([]); // push array to display row
    for (let j = 0; j < 50; j++) {
      /* if (j === StartNode.column && i === StartNode.row) {
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
      } else { */
        nodes[i].push({
          column: j,
          row: i,
          key: shortid.generate(),
          isStart: false,
          isTarget: false,
          distance: Infinity
        }); // target node
      //}
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
        document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`).style.background = 'rgba(255, 0, 0, .7);';
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
