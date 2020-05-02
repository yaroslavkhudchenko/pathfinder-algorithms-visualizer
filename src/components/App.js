import React, {Component} from 'react';
import ControlPanel from './ControlPanel';
import Grid from './Grid';
import shortid from 'shortid';
import { dijkstra, getNodesInShortestPathOrder } from './../algorithms/dijkstra-alg';
import '../index.scss';
import { debounce} from 'lodash';

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
				row: 15,
				column: 20
			},
			walls: [],
			startAlgorithm() {
				
				// check if target node was changed
				if (document.getElementById(`node-${this.state.targetNode.row}-${this.state.targetNode.column}`).classList.contains('singleNode-visited'))return;
				
				this.isStarted = true;

				/* let toRemove = document.querySelectorAll('.singleNode-visited-instant');
				
				for (let i = 0; i < toRemove.length; i++) {
					toRemove[i].classList.remove('singleNode-visited-instant')
				} */
				
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
				// return;
		//		if (this.mousePressed)return;
				this.animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);
			},
			/* async startAlgorithmQuick() {
				// this.state.resetGrid()

				let g = document.querySelectorAll('.singleNode-visited');
				
				for (let i = 0; i < g.length; i++) {
					//g[i].style.animationPlayState = "paused";
					g[i].classList.remove('singleNode-visited')
				}
				let nodes = this.state.nodes; 
				// console.log(`nodesnodes}`)
				// console.log(nodes)
				 for (let i = 0; i < nodes.length; i++) {
					for (let j = 0; j < nodes[i].length; j++) {
						nodes[i][j].distance = Infinity;
						nodes[i][j].isVisited = null;
					}
				}
				await this.setState({ nodes }) 
			
				const visitedNodesInOrder = dijkstra(
					this.state.nodes,
					this.state.nodes[this.state.startNode.row][this.state.startNode.column],
					this.state.nodes[this.state.targetNode.row][this.state.targetNode.column]
				);
				const shortestPathNodesInOrder = getNodesInShortestPathOrder(
					this.state.nodes[this.state.targetNode.row][this.state.targetNode.column]
				);

				for (let i = 0; i <= visitedNodesInOrder.length; i++) {
					if (i === visitedNodesInOrder.length) {
						for (let i = 0; i < shortestPathNodesInOrder.length; i++) {
							//console.log('shortes for loop new')
							// setTimeout(() => {
							// console.log( document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`))
							document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`).style.backgroundColor = '#255a40a3';// '#ffeb3b';
							// }, i * 7);

						}
						return;
					}
					// setTimeout(() => {
						// colored visited nodes
						const node = visitedNodesInOrder[i];
						document.getElementById(`node-${node.row}-${node.column}`).classList.add('singleNode-visited-instant');
					// }, 3 * i);

				} 

				/////////////////

				

				


			}, */
			resetGrid() {
				// console.log('reset')
				// console.log('reset grid start')
				// console.log(this.isStarted);
				//	if(this.isStarted)return;
			
				// this.isStarted = false;
				
				let g = document.querySelectorAll('.singleNode-visited');
				//let w = document.querySelectorAll('.wall');
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
						nodes[i][j].distance = Infinity;
						nodes[i][j].isVisited = false;
						if(nodes[i][j].previousNode) {
							 delete nodes[i][j].previousNode
							} 
					}

				} 
				this.setState({nodes})



			/* 	for (let i = 0; i < nodes.length; i++) {
					for (let j = 0; j < nodes[i].length; j++) {
						nodes[i][j].walls = false;
					}

				}  */
				//setTimeout(() => {
					/* this.setState({
						startNode: {
							row: 4,
							column: 4
						},
						targetNode: {
							row: 30,
							column: 35
						}
					}) */
				//}, 1000);
				

			},
			selectTool(e) {
				let s = document.getElementById("selectTool").value;
				this.selectedTool = s;
			},
			setNodes(e) {
				// console.log(e)
				// console.log(e.target)
				

				if (this.selectedTool.toLowerCase() === 'start'){
					console.log('start')
					// return;
				}

				// console.log('setnodes')
				if (this.isStarted) return;
				/* console.log('000000000000000000000000000')
				
				for (let i = 0; i < this.state.nodes.length; i++) {
					for (let j = 0; j < this.state.nodes[i].length; j++) {
						console.log(this.state.nodes[i][j].isVisited)
					}

				}  */




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
			/* 	for (let i = 0; i < nodes.length; i++) {
					for (let j = 0; j < nodes[i].length; j++) {
						console.log(nodes[i][j].isVisited)
					}

				}  */

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
			},
			/* downMouse(e) {
				
				if (this.isStarted) return;
				
				if(e.target.classList.contains('start')) {
					//console.log('downmouse in check 1')
					this.setState({
						currentDrag:'start'
					})
					//console.log('downmouse in check 2')

					this.mousePressed = true;
					//console.log('downmouse in check 3')

				} else if(e.target.classList.contains('target')) {
					this.setState({
						currentDrag:'target'
					})
					this.mousePressed = true;
				} return;
			}, */
			
			/* moveOver(e) {
				if(!this.mousePressed)return;

				 // console.log(e.target)
				// console.log(this.lastTargetOver)
				if(this.lastTargetOver && !this.firstTouchOnMoveOver) {
					if ((e.target.getAttribute('row') === this.lastTargetOver.getAttribute('row') && e.target.getAttribute('column') === this.lastTargetOver.getAttribute('column')) 
						|| e.target.classList.contains('wall'))return;
				}
					this.firstTouchOnMoveOver = false;
					let current = e.target;
					this.lastTargetOver = current;
					// this.state.resetGrid();
					
					//	console.log(e.target.getAttribute("row") * 1, e.target.getAttribute("rcolumnow") * 1)
					if (this.state.currentDrag === 'start') {
						current = 'start'
					//	console.log('in moveover in check start')
						this.startN = {
							row: e.target.getAttribute("row") * 1,
							column: e.target.getAttribute("column") * 1
						}
						
					} else if (this.state.currentDrag === 'target') {
						current = 'target'
						this.targetN = {
							row: e.target.getAttribute("row") * 1,
							column: e.target.getAttribute("column") * 1
						}
					}
				
				(debounce(async() => {
					if (current === 'start') {
						
						 //console.log('current is tart')
						this.setState({
							startNode: this.startN
						})
						
						this.state.startAlgorithmQuick(); 
					} else if (current === 'target') {
						// console.log('current is arget')
						this.setState({
							targetNode: this.targetN

						})
						this.state.startAlgorithmQuick();
					}
				}, .1))()
			},
			upMouse(e) {
				this.mousePressed = false;
			},*/
		}; 
		this.state.startAlgorithm = this.state.startAlgorithm.bind(this);
		this.state.setNodes = this.state.setNodes.bind(this);
		this.state.resetGrid = this.state.resetGrid.bind(this);
		this.state.selectTool = this.state.selectTool.bind(this);
		//this.state.downMouse = this.state.downMouse.bind(this);
		//this.state.moveOver = this.state.moveOver.bind(this); 
		//this.state.upMouse = this.state.upMouse.bind(this);
		//this.state.startAlgorithmQuick = this.state.startAlgorithmQuick.bind(this);
		this.isStarted = false;
		this.selectedTool = 'target';
		// this.startN = this.state.startNode;
		// this.targetN = this.state.targetNode;
		// this.mousePressed = false;
		// this.lastTargetOver = null;
		// this.firstTouchOnMoveOver = true;
		//	this.debouncedFunction = 
	}

	 
	componentDidMount() {
		// create nodes array + choose start and target nodes
		let numberC = (window.innerHeight-100) / 41; 
		let numberR = window.innerWidth / 40.5;

		console.log(numberC)
		console.log(numberR)

		let nodes = [];
		for (let i = 0; i < numberC; i++) {
			nodes.push([]); // push array to display row
			for (let j = 0; j < numberR; j++) {
					nodes[i].push({
						column: j,
						row: i,
						key: shortid.generate(),
						distance: Infinity,
						isWall: i === 11 && j === 11 ? true : false
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
