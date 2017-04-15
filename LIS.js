var LIS = function (arr) {
	if (!arr || arr.length < 1) {
		return -1;
	}
	var countArr = [];
	fillArray (countArr, arr.length);
	//LISUtil (arr, countArr);
	LISUtilRec (arr, countArr, 0, 1);
	return getMaxCountArr (countArr);
}

var fillArray = function (countArr, l) {
	for (var i = 0; i<l; i++) {
		countArr.push (1);
	}
}

var LISUtil = function (arr, countArr) {
	var i = 0;
	var j = 1;
	while (j < arr.length) {
		while (i < j) {
			if (arr[i] < arr[j]) {
				if (countArr[i] + 1 > countArr[j]) {
					countArr[j] = countArr[i] + 1;
				}
			}
			i++;
		}
		i = 0;
		j++;
	}
}

var LISUtilRec = function (arr, countArr, i, j) {
	if (j >= arr.length) {
		return;
	}
	while (i < j) {
		if (arr[i] < arr[j]) {
			if (countArr[i] + 1 > countArr[j]) {
				countArr[j] = countArr[i] + 1;
			}
		}
		i++;
	}
	LISUtilRec (arr, countArr, 0, j+1);
}

var getMaxCountArr = function (arr) {
	var max = -1;
	if (!arr || arr.length < 1) {
		return max;
	}	
	for (var i = 0; i < arr.length; i++) {
		if (max < arr[i]) {
			max = arr[i];
		}
	}
	return max;
}

var arr = [3,4,-1,0,6,2,3,-9];
console.log (LIS(arr));