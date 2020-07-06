import React, {useState, useEffect} from 'react';
import { ControlPanel } from './ControlPanel';
import { Grid } from './Grid';
import shortid from 'shortid';
import { dijkstra, getNodesInShortestPathOrder } from './../algorithms/dijkstra-alg';
import '../index.scss';

export const AppContext = React.createContext();
export const App = () => {
	const [AppState, setAppState] = useState({

			nodes: [],
			startNode: {
				row: 4,
				column: 4
			},
			targetNode: {
				row: 6,
				column: 12
			},
			walls: [],
			startAlgorithm() {
				console.log("start alg changed");
				console.log(AppState);


				// check if target node was changed
				if (document.getElementById(`node-${AppState.targetNode.row}-${AppState.targetNode.column}`).classList.contains('singleNode-visited'))return;
				// console.log('start alg changed')
				// console.log(AppState);

				isStarted = true;
				const visitedNodesInOrder = dijkstra(
					AppState.nodes,
					AppState.nodes[AppState.startNode.row][
						AppState.startNode.column
					],
					AppState.nodes[AppState.targetNode.row][
						AppState.targetNode.column
					]
				);
			
				isStarted = false;
				const shortestPathNodesInOrder = getNodesInShortestPathOrder(
					AppState.nodes[AppState.targetNode.row][
						AppState.targetNode.column
					]
				);
				animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);
			},
			
			resetGrid() {
				
				if(isStarted)return;
				isStarted = false;
				
				let g = document.querySelectorAll('.singleNode-visited');
				
				for (let i = 0; i < g.length; i++) {
					//g[i].style.animationPlayState = "paused";
					g[i].classList.toggle('singleNode-visited')
				}
				let nodes = AppState.nodes;

				for (let i = 0; i < nodes.length; i++) {
					for (let j = 0; j < nodes[i].length; j++) {
						nodes[i][j].distance = Infinity;
						nodes[i][j].isVisited = false;
						if(nodes[i][j].previousNode) {
							 delete nodes[i][j].previousNode
							} 
					}

				} 
				setAppState({
					...AppState,
					nodes:nodes
				})

			},
			clearWalls() {
				let w = document.querySelectorAll('.wall');
				//console.log('wall clear')
				AppState.resetGrid();
				for (let i = 0; i < w.length; i++) {
					//console.log(w[i])
					w[i].classList.remove('wall')
				}
				let nodes = AppState.nodes;

				for (let i = 0; i < nodes.length; i++) {
					for (let j = 0; j < nodes[i].length; j++) {
						if(nodes[i][j].isWall)nodes[i][j].isWall = false;
					}
				}
				
			},
			selectTool(e) {
				let s = document.getElementById("selectTool").value;
				selectedTool = s;
			},
			


			setNodes(e) {
				
				if (isStarted) return;
				let nodes = AppState.nodes;
				for (let i = 0; i < nodes.length; i++) {
					for(let j=0;j < nodes[i].length;j++) {
						nodes[i][j].distance = Infinity;
						nodes[i][j].isVisited = undefined;
						if (nodes[i][j].previousNode) {
							delete nodes[i][j].previousNode
						}
					}
					
				} 
				//console.log(nodes);

				let s = selectedTool.toLowerCase();
				// console.log(s)
				// console.log(e.target)
				if(s === 'start') {
					//return;
					setAppState({
						...AppState,
						startNode: {
							row: e.target.getAttribute("row") * 1,
							column: e.target.getAttribute("column") * 1
						}
					});
				} else if (s === 'target') {
					console.log('set nodes')
					console.log(AppState)
					console.log(e.target)
					let neww = AppState;
		neww.targetNode.row= e.target.getAttribute("row") * 1;
		neww.targetNode.column= e.target.getAttribute("column") * 1;


					setAppState({
            ...AppState,
            targetNode: neww,
          });
					
				} else if (s === 'wall') {
					nodes[e.target.getAttribute('row')][e.target.getAttribute('column')].isWall = true;
					setAppState({...AppState, nodes:nodes });	
				} else if (s === 'clear wall') {
					nodes[e.target.getAttribute('row')][e.target.getAttribute('column')].isWall = false;
					setAppState({...AppState, nodes:nodes });	
				}
				
			}
		});
		useEffect(() => {
			console.log("use eff app state");
			console.log(AppState);
			AppState.nodes.length !== 0 && AppState.startAlgorithm();
		}, []);
		useEffect(()=>{
			// create nodes array + choose start and target nodes
			let numberC = (window.innerHeight - 100) / 41;
			let numberR = window.innerWidth / 40.5;

			let nodes = AppState.nodes;
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
			//console.log(AppState.nodes)
			//console.log(nodes);
			setAppState({ ...AppState, nodes: nodes })
		},[])
	
		let isStarted = false;
		let selectedTool = 'target';
	


	const animateAlgorithm = (visitedNodesInOrder, shortestPathNodesInOrder) => {
		
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length) {
				setTimeout(() => {
					// drawing line fron start to finish based on shortest path
					animateShortestPath(shortestPathNodesInOrder);
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
	const animateShortestPath = (shortestPathNodesInOrder) => {
		for(let i=0;i<shortestPathNodesInOrder.length;i++) {
			setTimeout(() => {
				// console.log( document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`))
				document.getElementById(`node-${shortestPathNodesInOrder[i].row}-${shortestPathNodesInOrder[i].column}`).style.backgroundColor = '#255a40a3';// '#ffeb3b';
			}, i * 7);
			
		}
		isStarted = false;
	}

	return(
		<AppContext.Provider value={AppState}>
			<div className="App">
				<ControlPanel />
				<Grid />
			</div>
			</AppContext.Provider>
	);

	
}
