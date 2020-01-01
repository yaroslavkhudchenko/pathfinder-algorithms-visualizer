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
			isStarted: false,
			startAlgorithm() {
				// avoid multiple start
				if(this.state.isStarted)return;
				
				this.setState({
					isStarted:true
				})
				
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
				this.setState({
					isStarted: false
				})
				
				let g = document.querySelectorAll('.singleNode-visited');

				for (let i = 0; i < g.length; i++) {
					g[i].style.animationPlayState = "paused";
				}
			
				setTimeout(() => {
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
				}, 1000);
				

			},
			setNodes(e) {
				
				// if both are set only target can be changed
				if (this.state.startNode.row === true && this.state.targetNode.row === true){
					//console.log('set already both')

					this.setState({
						targetNode: {
							row: e.target.getAttribute("row") * 1,
							column: e.target.getAttribute("column") * 1
						}
					});
					

					return;
				}
				// if start is set set target if not set start
				if (!this.state.startNode.row && this.state.startNode.row !== 0) {
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
							distance: Infinity
						}); // target node
						//}
					}
				}
				this.setState({ nodes });
			}
		};
		this.state.startAlgorithm = this.state.startAlgorithm.bind(this);
		this.state.setNodes = this.state.setNodes.bind(this);
		this.state.setGridSize = this.state.setGridSize.bind(this);
		this.state.resetGrid = this.state.resetGrid.bind(this);
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
		// console.log('%c animateALGORITHM', 'font-size:30px;color:yellow;')
		// console.log(visitedNodesInOrder)
		// console.log(shortestPathNodesInOrder)
		// console.log('animate algorithm');
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			// console.log(i)
			// console.log('visi'+ visitedNodesInOrder.length);
			if (i === visitedNodesInOrder.length) {
				console.log('%c EQUEL', 'font-size:40px')
				setTimeout(() => {
					// drawing line fron start to finish based on shortest path
					this.animateShortestPath(shortestPathNodesInOrder);
				}, 5.5 * i);
				return;
			}
			setTimeout(() => {
				// colored visited nodes
				const node = visitedNodesInOrder[i];
				document.getElementById(`node-${node.row}-${node.column}`).className =
					'singleNode singleNode-visited';
			}, 3 * i);
		}
	}

	// draw line from start to target
	animateShortestPath(shortestPathNodesInOrder) {
		//console.log('animate shortest path func')
		for(let i=0;i<shortestPathNodesInOrder.length;i++) {
			console.log('shortes for loop')
			setTimeout(() => {
				// console.log( document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`))
				 document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`).style.backgroundColor = '#ffeb3b';
			}, i * 10);
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
