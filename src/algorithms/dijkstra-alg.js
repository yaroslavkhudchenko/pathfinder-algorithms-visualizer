// global func for dijkstra algorithm
export function dijkstra(grid, startNode, targetNode) {
  const visitedNodesInOrder = [];
  console.log(grid)
  console.log(startNode)
  console.log(targetNode)
  debugger;

  startNode.distance = 0; // set distance for start node to 0 (all the rest to infinity)
  const unvisitedNodes = getAllNodes(grid); 
  debugger;
  // !! will return boolean value
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes); 
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity)return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === targetNode)return visitedNodesInOrder; // if we have reached the target node
    updateUnvisitedNeighbors(closestNode, grid);
  }
}


function sortNodesByDistance(unvisitedNodes) {
 // debugger;
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
 // debugger;
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
 // debugger;
  const neighbors = [];
  const {column, row} = node;

  

  if(row > 0)neighbors.push(grid[row - 1][column])
  if(row < (grid.length - 1))neighbors.push(grid[row + 1][column])
  if(column > 0)neighbors.push(grid[row][column - 1]) 
  if(column < (grid[0].length - 1))neighbors.push(grid[row][column + 1]) 

  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  debugger;
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  console.log(finishNode)
  debugger;

  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;

  debugger;
  while (currentNode !== null && currentNode !== undefined) {
    console.log('in lopp')
    console.log(nodesInShortestPathOrder)
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  console.log(nodesInShortestPathOrder)
  debugger;

  return nodesInShortestPathOrder;
}