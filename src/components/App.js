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
				row: 4,
				column: 4
			},
			targetNode: {
				row: 30,
				column: 35
			},
			walls: [],
			// isStarted: false,
			// selectedTool: null,
			// reseting:false,
			startAlgorithm() {
				// avoid multiple start
				if(this.isStarted)return;
				if (document.getElementById(`node-${this.state.targetNode.row}-${this.state.targetNode.column}`).classList.contains('singleNode-visited'))return;
				
				this.isStarted = true;
				
				// console.log('state nodesssssssssss')
				// console.log(this.state.nodes)

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
			resetGrid() {
				// console.log('reset grid start')
				// console.log(this.isStarted);
				if(this.isStarted)return;
				
				// this.isStarted = false;
				
				let g = document.querySelectorAll('.singleNode-visited');
				let w = document.querySelectorAll('.wall');
				// console.log('w', w)

				// not working, why? I have no idea
				/* for (let i = 0; i < w.length; i++) {
					console.log(w[i])
					w[i].classList.toggle('wall')
				} */
				for (let i = 0; i < g.length; i++) {
					//g[i].style.animationPlayState = "paused";
					g[i].classList.toggle('singleNode-visited')
				}
				let nodes = this.state.nodes;

				for (let i = 0; i < nodes.length; i++) {
					for (let j = 0; j < nodes[i].length; j++) {
						nodes[i][j].walls = false;
					}

				} 
				//setTimeout(() => {
					this.setState({
						startNode: {
							row: 4,
							column: 4
						},
						targetNode: {
							row: 30,
							column: 35
						}
					})
				//}, 1000);
				

			},
			selectTool(e) {
				let s = document.getElementById("selectTool").value;
				this.selectedTool = s;
			},
			setNodes(e) {
				// console.log('setnodes')
				if (this.isStarted) return;
				let nodes = this.state.nodes;
				for (let i = 0; i < nodes.length; i++) {
					for(let j=0;j < nodes[i].length;j++) {
						nodes[i][j].distance = Infinity;
						nodes[i][j].isVisited = false;
					}
					
				} 
				let s = this.selectedTool.toLowerCase();
				if(s === 'start') {
					this.setState({
						startNode: {
							row: e.target.getAttribute("row") * 1,
							column: e.target.getAttribute("column") * 1
						}
					});
				} else if (s === 'target') {
					this.setState({
						targetNode: {
							row: e.target.getAttribute("row") * 1,
							column: e.target.getAttribute("column") * 1
						}
					});
				} else if (s === 'wall') {
					nodes[e.target.getAttribute('row')][e.target.getAttribute('column')].isWall = true;
					this.setState({ nodes });	
				} else if (s === 'clear wall') {
					nodes[e.target.getAttribute('row')][e.target.getAttribute('column')].isWall = false;
					this.setState({ nodes });	
				}
			},
			dragPlayground(e) {
				console.log(e.target)
				console.log('drag playground')
				
			},
			onDropPlayground(e) {
				console.log(e.target)
				console.log('drag drop')
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
							distance: Infinity
						}); // target node
						//}
					}
				}
				this.setState({ nodes });
			},
		};
		this.state.startAlgorithm = this.state.startAlgorithm.bind(this);
		this.state.setNodes = this.state.setNodes.bind(this);
		this.state.setGridSize = this.state.setGridSize.bind(this);
		this.state.resetGrid = this.state.resetGrid.bind(this);
		this.state.selectTool = this.state.selectTool.bind(this);
		this.state.dragPlayground = this.state.dragPlayground.bind(this);
		this.state.onDropPlayground = this.state.onDropPlayground.bind(this);
		this.isStarted = false;
		this.selectedTool = 'target';

	}

	 
	componentDidMount() {
		// create nodes array + choose start and target nodes
		let nodes = [];
		for (let i = 0; i < 35; i++) {
			nodes.push([]); // push array to display row
			for (let j = 0; j < 40; j++) {
					nodes[i].push({
						column: j,
						row: i,
						key: shortid.generate(),
						distance: Infinity
					}); // target node
				//}
			}
		}
		this.setState({nodes})
	}


	animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder) {
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length) {
				// console.log('%c EQUEL', 'font-size:40px')
				setTimeout(() => {
					// drawing line fron start to finish based on shortest path
					this.animateShortestPath(shortestPathNodesInOrder);
				}, 4 * i);
				return;
			}
			setTimeout(() => {
				// colored visited nodes
				const node = visitedNodesInOrder[i];
				document.getElementById(`node-${node.row}-${node.column}`).classList.toggle('singleNode-visited');
			}, 3 * i);

		}
	}

	// draw line from start to target
	animateShortestPath(shortestPathNodesInOrder) {
		//console.log('animate shortest path func')
		for(let i=0;i<shortestPathNodesInOrder.length;i++) {
			// console.log('shortes for loop')
			setTimeout(() => {
				// console.log( document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`))
				 document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`).style.backgroundColor = '#ffeb3b';
			}, i * 7);
			
		}
		this.isStarted = false;
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
