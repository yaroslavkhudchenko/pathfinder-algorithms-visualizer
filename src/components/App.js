import React, {Component} from 'react';
import ControlPanel from './ControlPanel';
import Grid from './Grid';
import shortid from 'shortid';
import { dijkstra, getNodesInShortestPathOrder } from './../algorithms/dijkstra-alg';
import '../index.scss';
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

				console.log(shortestPathNodesInOrder)
				this.animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);
			},
			setStartNode(e) {
				if (this.state.startNode.row && this.state.targetNode.row){
					console.log('set already both')

					this.setState({
						targetNode: {
							row: e.target.getAttribute("row") * 1,
							column: e.target.getAttribute("column") * 1
						}
					});


					return;
				}
				console.log("ee");

				if (!this.state.startNode.row) {
					this.setState({
						startNode: {
							row: e.target.getAttribute("row") * 1,
							column: e.target.getAttribute("column") * 1
						}
				});

				} else {
					this.setState({
						targetNode: {
							row: e.target.getAttribute("row") * 1,
							column: e.target.getAttribute("column") * 1
						}
					});
				}
			},
			
			setGridSize() {

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
		this.state.setGridSize = this.state.setGridSize.bind(this);
	}
	 
componentDidMount() {
	// create nodes array + choose start and target nodes
	let nodes = [];
	for (let i = 0; i < 35; i++) {
		nodes.push([]); // push array to display row
		for (let j = 0; j < 50; j++) {
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
		console.log('animate shortest path func')
		for(let i=0;i<shortestPathNodesInOrder.length;i++) {
			console.log('shortes for loop')
			 setTimeout(() => {
				 console.log( document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`))
				 document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`).style.backgroundColor = '#ffeb3b';
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
