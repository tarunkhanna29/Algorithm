var gamePick = function (arr) {
	if (!arr || arr.length < 1) {
		return;
	}
	var calcArr = [];
	fillCalcArr (arr, calcArr);
	gamePickUtil (arr, calcArr, 0, arr.length-1, 0);
	printPlayerValues (arr, calcArr, 0, 0, arr.length-1);
}

var gamePickUtil = function (arr, calcArr, min, max, player) {
	if (!arr || arr.length < 1 || !calcArr || calcArr.length < 1) {
		return 0;
	}
	if (calcArr[min][max]) {
		return calcArr[min][max];
	}
	if (max < min) {
		return 0;
	}
	var altPlayer = (player == 0) ? 1 : 0;
	var leftPlayerValue = gamePickUtil (arr, calcArr, min, min, player)[0][player] + gamePickUtil (arr, calcArr, min+1, max, player)[0][altPlayer];
	var leftAltPlayerValue = gamePickUtil (arr, calcArr, min+1, max, player)[0][player];
	var rightPlayerValue = gamePickUtil (arr, calcArr, min, max-1, player)[0][altPlayer] + gamePickUtil (arr, calcArr, max, max, player)[0][player];
	var rightAltPlayerValue = gamePickUtil (arr, calcArr, min, max-1, player)[0][player];
	if (leftPlayerValue > rightPlayerValue) {
		calcArr[min][max] = [[leftPlayerValue, leftAltPlayerValue], min];
	} else {
		calcArr[min][max] = [[rightPlayerValue, rightAltPlayerValue], max];
	}
	return calcArr[min][max];
}

var fillCalcArr = function (arr, calcArr) {
	if (!arr || !calcArr) {
		return;
	}
	for (var i = 0; i < arr.length; i++) {
		calcArr[i] = [];
		calcArr[i][i] = [[arr[i], 0], i];
	}
	for (var i = 0; i < arr.length-1; i++) {
		var maxIndex = findMax (arr, i, i+1);
		var nonMaxIndex = i;
		if (maxIndex == i) nonMaxIndex = i+1;
		calcArr[i][i+1] = [[arr[maxIndex], arr[nonMaxIndex]], maxIndex];
	}
}

var findMax = function (arr, i, j) {
	return (arr[i] > arr[j]) ? i : j;
}

var printPlayerValues = function (arr, calcArr, player, min, max) {
	if (!arr || arr.length < 1 || !calcArr || calcArr.length < 1) {
		return;
	}
	if (max < min) {
		return;
	}
	console.log ("Player " + player + " Value " + arr[calcArr[min][max][1]] + " at Index " + calcArr[min][max][1] + " with net Value " + calcArr[min][max][0][0]);
	var altPlayer = (player == 0) ? 1 : 0;
	if (calcArr[min][max][1] == min) {
		printPlayerValues (arr, calcArr, altPlayer, min+1, max);
	} else {
		printPlayerValues (arr, calcArr, altPlayer, min, max-1);
	}
}

var arr = [3, 9, 1, 6, 2];
gamePick (arr);