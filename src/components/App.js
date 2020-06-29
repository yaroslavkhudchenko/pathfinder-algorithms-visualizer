import React, {Component} from 'react';
import { ControlPanel } from './ControlPanel';
import { Grid } from './Grid';
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
				row: 6,
				column: 6
			},
			walls: [],
			startAlgorithm() {
				
				// check if target node was changed
				if (document.getElementById(`node-${this.state.targetNode.row}-${this.state.targetNode.column}`).classList.contains('singleNode-visited'))return;
				
				this.isStarted = true;

				const visitedNodesInOrder = dijkstra(
					this.state.nodes,
					this.state.nodes[this.state.startNode.row][
						this.state.startNode.column
					],
					this.state.nodes[this.state.targetNode.row][
						this.state.targetNode.column
					]
				);
			
				this.isStarted = false;
				const shortestPathNodesInOrder = getNodesInShortestPathOrder(
					this.state.nodes[this.state.targetNode.row][
						this.state.targetNode.column
					]
				);
				
				this.animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);
			},
			
			resetGrid() {
				
				if(this.isStarted)return;
				this.isStarted = false;
				
				let g = document.querySelectorAll('.singleNode-visited');
				
				for (let i = 0; i < g.length; i++) {
					//g[i].style.animationPlayState = "paused";
					g[i].classList.toggle('singleNode-visited')
				}
				let nodes = this.state.nodes;

				for (let i = 0; i < nodes.length; i++) {
					for (let j = 0; j < nodes[i].length; j++) {
						nodes[i][j].distance = Infinity;
						nodes[i][j].isVisited = false;
						if(nodes[i][j].previousNode) {
							 delete nodes[i][j].previousNode
							} 
					}

				} 
				this.setState({nodes})

			},
			clearWalls() {
				let w = document.querySelectorAll('.wall');
				console.log('wall clear')
				this.state.resetGrid();
				for (let i = 0; i < w.length; i++) {
					console.log(w[i])
					w[i].classList.remove('wall')
				}
				let nodes = this.state.nodes;

				for (let i = 0; i < nodes.length; i++) {
					for (let j = 0; j < nodes[i].length; j++) {
						if(nodes[i][j].isWall)nodes[i][j].isWall = false;
					}
				}
				
			},
			selectTool(e) {
				let s = document.getElementById("selectTool").value;
				this.selectedTool = s;
			},
			setNodes(e) {

				if (this.isStarted) return;

				let nodes = this.state.nodes;
				for (let i = 0; i < nodes.length; i++) {
					for(let j=0;j < nodes[i].length;j++) {
						nodes[i][j].distance = Infinity;
						nodes[i][j].isVisited = undefined;
						if (nodes[i][j].previousNode) {
							delete nodes[i][j].previousNode
						}
					}
					
				} 

				let s = this.selectedTool.toLowerCase();
				if(s === 'start') {
					//return;
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
			}
		}; 
		this.state.startAlgorithm = this.state.startAlgorithm.bind(this);
		this.state.setNodes = this.state.setNodes.bind(this);
		this.state.resetGrid = this.state.resetGrid.bind(this);
		this.state.clearWalls = this.state.clearWalls.bind(this);
		this.state.selectTool = this.state.selectTool.bind(this);
		this.isStarted = false;
		this.selectedTool = 'target';
	}

	 
	componentDidMount() {
		// create nodes array + choose start and target nodes
		let numberC = (window.innerHeight-100) / 41; 
		let numberR = window.innerWidth / 40.5;

		let nodes = [];
		for (let i = 0; i < numberC; i++) {
			nodes.push([]); // push array to display row
			for (let j = 0; j < numberR; j++) {
					nodes[i].push({
						column: j,
						row: i,
						key: shortid.generate(),
						distance: Infinity,
						isWall: false
					}); // target node
				//}
			}
		}
		this.setState({nodes})
	}


	animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder) {
		
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length) {
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
		for(let i=0;i<shortestPathNodesInOrder.length;i++) {
			setTimeout(() => {
				// console.log( document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`))
				document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`).style.backgroundColor = '#255a40a3';// '#ffeb3b';
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
