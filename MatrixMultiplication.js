var matMul = function (MulArr) {
	if (!MulArr || MulArr.length < 2) {
		return 0;
	}
	var Matrix2D = [];
	createRowArrays (Matrix2D, MulArr.length);
	return matMulUtil (MulArr, 0, MulArr.length-1, Matrix2D);
}

//This is wrong. This should be something like OptimalBST
/*var matMulUtil = function (MulArr, leftIndex, rightIndex) {
	if (leftIndex >= rightIndex) {
		return 0;
	}
	var leftMul = matMulUtil (MulArr, leftIndex, rightIndex-1) + MulArr[leftIndex][0]*MulArr[rightIndex][0]*MulArr[rightIndex][1];
	var rightMul = matMulUtil (MulArr, leftIndex+1, rightIndex) + MulArr[leftIndex][0]*MulArr[leftIndex][1]*MulArr[rightIndex][1];
	return Math.min (leftMul, rightMul);
}*/

var matMulUtil = function (MulArr, leftIndex, rightIndex, Matrix2D) {
	if (!MulArr || MulArr.length < 1 || Matrix2D.length < 1 || !Matrix2D) {
		return -1;
	}
	if (leftIndex >= rightIndex) {	
		return 0;
	}
	if (Matrix2D[leftIndex][rightIndex]) {
		return Matrix2D[leftIndex][rightIndex];
	}
	var matResult = [];
	for (var i = leftIndex; i < rightIndex; i++) {
		matResult[i] = matMulUtil (MulArr, leftIndex, i, Matrix2D) + matMulUtil (MulArr, i+1, rightIndex, Matrix2D) + MulArr[leftIndex][0]*MulArr[i][1]*MulArr[rightIndex][1];		
	}
	Matrix2D[leftIndex][rightIndex] = FindMinInArray (matResult);
	return Matrix2D[leftIndex][rightIndex];
}

var FindMinInArray = function (arr) {
	if (!arr || arr.length < 1) return -1;
	var min = arr[0];
	for (var i = 1; i < arr.length; i++) {
		if (arr[i] && !min) {
			min = arr[i];
		} else if (arr[i] && arr[i] < min) {
			min = arr[i];
		}
	}
	return min;
}

var createRowArrays = function (Matrix2D, len) {
	if (!Matrix2D) {
		return;
	}
	for (var i = 0; i < len; i++) {
		Matrix2D[i] = [];
	}
}

var MulArr = [[2,3],
[3,6],
[6,4],
[4,5]];
console.log (matMul (MulArr)); 