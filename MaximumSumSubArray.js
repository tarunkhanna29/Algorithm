var MaxSum = function (arr) {
	if (!arr || arr.length < 1) {
		return;
	}
	var maxSum = arr[0];
	var currentSum = arr[0];
	var maxSumIndex = 0;
	var maxSumStartIndex = 0;
	for (var i = 1; i < arr.length; i++) {
		currentSum = (currentSum + arr[i] > arr[i]) ? currentSum + arr[i] : arr[i];
		if (currentSum > maxSum) {
			maxSum = currentSum;
			maxSumIndex = i;
		}
	}
	currentSum = 0;
	for (var i = maxSumIndex; i >= 0; i--) {
		currentSum += arr[i];
		if (currentSum == maxSum) {
			maxSumStartIndex = i;
			break;
		}
	} 
	var obj = {
		'maxSumStartIndex' : maxSumStartIndex,
		'maxSumEndIndex' : maxSumIndex,
		'maxSum' : maxSum
	};
	return obj;
}

var arr = [-1, 3, -2, 5, -6, 1];
console.log (MaxSum (arr));