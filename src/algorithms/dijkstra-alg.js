// global func for dijkstra algorithm
export function dijkstra(grid, startNode, targetNode) {
  const visitedNodesInOrder = [];

  startNode.distance = 0; // set distance for start node to 0 (all the rest to infinity)
  const unvisitedNodes = getAllNodes(grid);
 
  // !! will return boolean value
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes); // resort every time
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, skip it.
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
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
 // console.log('update unvisited start')
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
//  console.log('update unvisited ENDDDD')
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {column, row} = node;

  

  if(row > 0)neighbors.push(grid[row - 1][column])
  if(row < (grid.length - 1))neighbors.push(grid[row + 1][column])
  if(column > 0)neighbors.push(grid[row][column - 1]) 
  if(column < (grid[0].length - 1))neighbors.push(grid[row][column + 1]) 

  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
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
  
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  
  while (currentNode !== null && currentNode !== undefined) {
    nodesInShortestPathOrder.unshift(currentNode); // add current node to the array
    currentNode = currentNode.previousNode; // check for previous node 
  }

  return nodesInShortestPathOrder;
}
