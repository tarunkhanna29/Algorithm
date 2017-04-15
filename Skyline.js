var Heap = require ("./../Data Structure/Heap");

var skyLine = function (arr) {
	if (!arr || arr.length < 1) {
		return;
	}
	var points = [];
	fillPoints (arr, points);
	sortPoints (points);
	var output = [];
	var myHeap = new Heap.Heap();
	myHeap.addNode (0);
	skyLineUtil (points, output, myHeap);
	return output;
}

var skyLineUtil = function (points, output, myHeap) {
	var maxHt = 0;
	var outputIndex = 0;
	for (var i = 0; i < points.length; i++) {
		if (points[i][2] == 's') {
			myHeap.addNode (points[i][1]);
			if (maxHt < points[i][1]) {
				maxHt = points[i][1];
				output[outputIndex] = [];
				output[outputIndex][0] = points[i][0];
				output[outputIndex][1] = points[i][1];
				outputIndex++;
			}
		} else {
			myHeap.deleteNode (points[i][1]);
			var newMaxHt = myHeap.maxValue();
			if (newMaxHt != maxHt) {
				maxHt = newMaxHt;
				output[outputIndex] = [];
				output[outputIndex][0] = points[i][0];
				output[outputIndex][1] = maxHt;
				outputIndex++;
			}
		}
	}
}

var fillPoints = function (arr, points) {
	if (!arr || !points || arr.length < 1) {
		return;
	}
	var j = 0;
	for (var i = 0; i < arr.length; i++) {
		var x = arr[i][0];
		var y = arr[i][1];
		var ht = arr[i][2];
		points[j] = [];
		points[j][0] = x;
		points[j][1] = ht;
		points[j][2] = 's';
		j++;
		points[j] = [];
		points[j][0] = y;
		points[j][1] = ht;
		points[j][2] = 'e';
		j++;
	}
}

var sortPoints = function (arr) {
	if (!arr || arr.length < 1) {
		return;
	}
	for (var i = 0; i < arr.length; i++) {
		for (var j = i+1; j < arr.length; j++) {
			if (arr[j][0] < arr[i][0]) {
				swapFn (arr, i, j);
			} else if (arr[j][0] == arr[i][0] && arr[i][2] == 's' && arr[j][2] == 's' && arr[j][1] > arr[i][1]) {
				swapFn (arr, i, j);
			} else if (arr[j][0] == arr[i][0] && arr[i][2] == 'e' && arr[j][2] == 'e' && arr[j][1] < arr[i][1]) {
				swapFn (arr, i, j);
			} else if (arr[j][0] == arr[i][0] && arr[i][2] == 'e' && arr[j][2] == 's') {
				swapFn (arr, i, j);
			}
		}
	}
}

var swapFn = function (arr, i, j) {
	if (!arr || arr.length < 1 || i < 0 || i > arr.length-1 || j < 0 || j > arr.length-1) {
		return;
	}
	var tmp = arr[i];
	arr[i] = arr[j];
	arr[j] = tmp;
}

var arr = [
[1,3,3],
[2,4,4],
[5,8,2],
[6,7,4],
[8,9,4]
];

console.log (skyLine (arr));