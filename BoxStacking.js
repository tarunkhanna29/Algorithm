var  stackBox = function (arr) {
	if (!arr || arr.length < 1) {
		return -1;
	}
	var rotatedBoxes = rotateBoxes (arr);
	sortBoxes (rotatedBoxes);
	var maxHt = [], parentBox = [];
	fillArrays (rotatedBoxes, maxHt, parentBox);
	LISUtil (rotatedBoxes, maxHt, parentBox);
	var maxHtIndex = FindMaxHtIndex (maxHt);
	return maxHt[maxHtIndex];
}

var FindMaxHtIndex = function (arr) {
	var max = -1;
	var maxIndex = -1;
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] >  max) {
			max = arr[i];
			maxIndex = i;
		}
	}
	return maxIndex;
}

var LISUtil = function (rotatedBoxes, maxHtArr, parentBoxArr) {
	if (!rotatedBoxes || !maxHtArr || !parentBoxArr) {
		return;
	}
	for (var i = 1; i < rotatedBoxes.length; i++) {
		for (var j = 0; j < i; j++) {
			if (rotatedBoxes[j][0] > rotatedBoxes[i][0] && rotatedBoxes[j][1] > rotatedBoxes[i][1]) {
				parentBoxArr[i] = (maxHtArr[j] + rotatedBoxes[i][2] > maxHtArr[i]) ? j : parentBoxArr[i];
				maxHtArr[i] = (maxHtArr[j] + rotatedBoxes[i][2] > maxHtArr[i]) ? maxHtArr[j] + rotatedBoxes[i][2] : maxHtArr[i];				
			}
		}
	}
}

var fillArrays = function (arr, maxHtArr, parentBoxArr) {
	if (!arr || arr.length < 1) {
		return;
	}
	for (var i = 0; i < arr.length; i++) {
		maxHtArr.push (arr[i][2]);
		parentBoxArr.push (i);
	}
}

var rotateBoxes = function (arr) {
	var newArr = [];
	if (!arr || arr.length < 1) {
		return newArr;
	}
	for (var i = 0; i < arr.length; i++) {
		sortBoxDimensions (arr[i]);
		var currentIndex = newArr.length;
		newArr[newArr.length] = [];
		newArr[newArr.length] = [];
		newArr[newArr.length] = [];
		newArr[currentIndex].push (arr[i][0]);
		newArr[currentIndex].push (arr[i][1]);
		newArr[currentIndex++].push (arr[i][2]);
		swap (arr[i], 1, 2);		
		newArr[currentIndex].push (arr[i][0]);
		newArr[currentIndex].push (arr[i][1]);
		newArr[currentIndex++].push (arr[i][2]);
		swap (arr[i], 0, 2);
		newArr[currentIndex].push (arr[i][0]);
		newArr[currentIndex].push (arr[i][1]);
		newArr[currentIndex++].push (arr[i][2]);
	}
	return newArr;
}

var sortBoxes = function (arr) {
	if (!arr || arr.length < 1) {
		return;
	}
	var areaArr = [];
	fillAreaArray (arr, areaArr);
	mergeSortUtil (arr, areaArr, 0, arr.length-1);
}

var mergeSortUtil = function (arr, areaArr, i, j) {
	if (i >= j) {
		return;
	}
	var mid = Math.floor ((i + j)/2);
	mergeSortUtil (arr, areaArr, i, mid);
	mergeSortUtil (arr, areaArr, mid+1, j);
	merge (arr, areaArr, i, mid, j);
}

var merge = function (arr, areaArr, i, mid, j) {
	if (!arr || !areaArr || arr.length != areaArr.length) {
		return null;
	}
	var leftArr = [], leftBoxArr = [];
	var rightArr = [], rightBoxArr = [];
	for (var x=i; x<=mid; x++) {
		leftArr.push (areaArr[x]);
		leftBoxArr.push (arr[x]);
	}
	for (var x=mid+1; x<=j; x++) {
		rightArr.push (areaArr[x]);
		rightBoxArr.push (arr[x]);
	}
	var leftArrIndex=0, rightArrIndex=0;
	while (leftArrIndex < leftArr.length && rightArrIndex < rightArr.length) {
		if (leftArr[leftArrIndex] < rightArr[rightArrIndex]) {
			arr[i] = rightBoxArr[rightArrIndex];
			i++;
			rightArrIndex++;
		} else {
			arr[i] = leftBoxArr[leftArrIndex];
			i++;
			leftArrIndex++;
		}
	}
	while (leftArrIndex < leftArr.length) {
		arr[i++] = leftBoxArr[leftArrIndex++];
	}
	while (rightArrIndex < rightArr.length) {
		arr[i++] = rightBoxArr[rightArrIndex++];
	}
}

var fillAreaArray = function (arr, areaArr) {
	for (var i = 0; i<arr.length; i++) {
		areaArr[i] = arr[i][0] * arr[i][1];
	}
}

var sortBoxDimensions = function (arr) {
	var newArr = [];
	if (!arr || arr.length != 3) {
		return newArr;
	}
	for (var i=1; i<3; i++) {
		for (var j=0; j<i; j++) {
			if (arr[j] < arr[i]) {
				swap (arr, j, i);
			}
		}
	}
}

var swap = function (arr, i, j) {
	var tmp = arr[j];
	arr[j] = arr[i];
	arr[i] = tmp;
}

var boxes = [[1, 2, 4], 
[3, 2, 5]];
console.log (stackBox (boxes));