var MinHeap = require ('./../Data Structure/MinHeapWithMap');
var Graph = require ('./../Data Structure/WeightedUndirectionalGraph');

var Prims = function (graph, startVertex) {
	if (!graph) return;
	var heap = new MinHeap.Heap ();
	InitializeHeap (graph, startVertex, heap);
	var hash = {};
	while (!heap.isEmpty()) {
		var obj = heap.extractMin ();
		PrimsUtil (graph, heap, hash, obj);
	}
	return hash;
}

var PrimsUtil = function (graph, heap, hash, obj) {
	if (!graph || !heap || !hash || !obj) return;
	var edgesArr = graph.edges[obj.key];
	var distArr = graph.distance[obj.key];
	for (var i = 0; i < edgesArr.length; i++) {
		if (heap.contains (JSON.stringify (edgesArr[i])) && (distArr[i] < heap.getValue (edgesArr[i]))) {
			heap.decrease (JSON.stringify (edgesArr[i]), distArr[i]);
			hash[edgesArr[i]] = JSON.parse (obj.key) + edgesArr[i];
		}
	}
}

var InitializeHeap = function (graph, startVertex, heap) {
	var Max = 99999999;
	for (var key in graph.edges) {
		var node = {key : key, data : Max};
		if (key == startVertex || JSON.parse (key) == startVertex) node.data = -1;
		heap.addNode (node);
	}
}

var printEdges = function (hash) {
	if (!hash) return;
	for (var key in hash) {
		console.log (hash[key]);
	}
}

var newGraph = new Graph.Graph();
newGraph.addVertex ('A');
newGraph.addVertex ("B");
newGraph.addVertex ("C");
newGraph.addVertex ("D");
newGraph.addVertex ("E");
newGraph.addVertex ("F");
newGraph.addEdge ("A", "B", 3);
newGraph.addEdge ("A", "D", 1);
newGraph.addEdge ("B", "D", 3);
newGraph.addEdge ("C", "D", 1);
newGraph.addEdge ("B", "C", 1);
newGraph.addEdge ("C", "F", 4);
newGraph.addEdge ("E", "F", 2);
newGraph.addEdge ("E", "D", 6);
newGraph.addEdge ("E", "C", 5);
newGraph.printGraph ();

console.log ("\n<-- Minimum Spanning Tree -->")
var outputHash = Prims (newGraph, "A");
printEdges (outputHash);