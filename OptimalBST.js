var optimalBT = function (arr) {
	if (!arr || arr.length < 1) {
		return;
	}
	var minValueArr = [];
	var rootArr = [];
	for (var i = 0; i < arr.length; i++) {
		minValueArr[i] = [];
		minValueArr[i][i] = arr[i];
		rootArr[i] = [];
	}
	optimalBTUtil (arr, 0, arr.length-1, minValueArr, rootArr);
	printInformation (minValueArr, rootArr);
}

var optimalBTUtil = function (arr, i, j, minValueArr, rootArr) {
	if (i > j) {
		return 0;
	}
	if (minValueArr && minValueArr[i] && minValueArr[i][j]) {
		return minValueArr[i][j];
	}
	var root = i;
	var currVal = 0;
	var valueArr = [];
	for (var x = i; x <= j; x++) {
		currVal += arr[x];
	}
	while (root <= j) {
		var leftValue = 0, rightValue = 0;
		if (root > i) leftValue = optimalBTUtil (arr, i, root-1, minValueArr, rootArr);
		if (root < j) rightValue = optimalBTUtil (arr, root+1, j, minValueArr, rootArr);
		valueArr[root] = leftValue + rightValue;
		root++;
	}
	currVal += FindRootAndMinValue (valueArr, rootArr, i, j);
	minValueArr[i][j] = currVal;
	return currVal;
}

var FindRootAndMinValue = function (arr, rootArr, i, j) {
	if (!arr || arr.length < 1) {
		return 0;
	}
	var min = -1;
	var minIndex = -1;
	for (var x = 0; x < arr.length; x++) {
		if (arr[x] && min == -1) {
			min = arr[x];
			minIndex = x;
		} else if (arr[x] && arr[x] < min) {
			min = arr[x];
			minIndex = x;
		}
	}
	rootArr[i][j] = minIndex;
	return min;
}

var printInformation = function (minValueArr, rootArr) {
	console.log ("Cost of accessing Binary Tree is " + minValueArr[0][minValueArr.length-1]);
	printInformationUtil (rootArr, 0, rootArr.length-1);
}

var printInformationUtil = function (rootArr, i, j) {
	if (i > j || i < 0 || j < 0) {
		return;
	}
	if (i == j) {
		console.log (i);
		return;
	}
	console.log ("\nroot is " + rootArr[i][j]);
	console.log ("\nLeft Child");
	printInformationUtil (rootArr, i, rootArr[i][j]-1);
	console.log ("\nRight Child");
	printInformationUtil (rootArr, rootArr[i][j]+1, j);
}

var arr = [4,2,6,3];		//These are frequency of accessing each node. For BST, there will be nodes with data = [7, 9, 10, 11] and frequecy = [4, 2, 6, 3]. Data array shoudl be sorted for BST.
optimalBT (arr);