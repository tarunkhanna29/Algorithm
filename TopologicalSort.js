var Graph = require ("./../Data Structure/DirectionalGraph"); //Using Directional Graph

var TopologicalSort = function (graph) {
	if (!graph) {
		return;
	}
	var visited = {};
	var stack = [];
	for (var key in graph.edges) {
		TopologicalSortUtil (graph, visited, stack, key);
	}
	printTopologicalSort (stack);
}

var TopologicalSortUtil = function (graph, visited, stack, vertex) {
	if (!graph || !visited || !stack) {
		return;
	}
	var arr = graph.edges[vertex];	
	if (!arr) return;
	if (!visited[vertex]) {		
		visited[vertex] = true;
		for (var i = 0; i < arr.length; i++) {
			TopologicalSortUtil (graph, visited, stack, JSON.stringify (arr[i]));
		}
		stack.push (vertex);
	}
}

var printTopologicalSort = function (stack) {
	while (stack.length != 0) {
		console.log (stack.pop());
	}
}

var newGraph = new Graph.Graph();
var v1 = "A"
var v2 = "B";
var v3 = "C";
var v4 = "D";
var v5 = "E";
var v6 = "F";
var v7 = "G";
var v8 = "H";
console.log (newGraph.addVertex (v3));
console.log (newGraph.addVertex (v1));
console.log (newGraph.addVertex (v2));
console.log (newGraph.addVertex (v6));
console.log (newGraph.addVertex (v7));
console.log (newGraph.addVertex (v8));
console.log (newGraph.addVertex (v4));
console.log (newGraph.addVertex (v5));
console.log (newGraph.addEdge (v1, v3));
console.log (newGraph.addEdge (v2, v3));
console.log (newGraph.addEdge (v2, v4));
console.log (newGraph.addEdge (v3, v5));
console.log (newGraph.addEdge (v4, v6));
console.log (newGraph.addEdge (v5, v6));
console.log (newGraph.addEdge (v5, v8));
console.log (newGraph.addEdge (v6, v7));
console.log (newGraph);
newGraph.printGraph ();

console.log ("\n<-- Printing Topological Sort -->")
TopologicalSort (newGraph);