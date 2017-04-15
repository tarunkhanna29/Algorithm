var LCS = function (str1, str2) {
	if (!str1 || str1.length < 1 || !str2 || str2.length < 1) {
		return null;
	}
	var arr = [];
	fillArrayZeroIndex (arr, str1.length, str2.length);
	fillArray (str1, str2, arr);
	return getLCS (str1, str2, arr, str1.length, str2.length);
}

var getLCS = function (str1, str2, arr, i, j) {
	var outStr = "";
	while (i >= 1 && j >= 1) {		
		if (str1[i-1] == str2[j-1]) {
			outStr += str1[i-1];
			i--;
			j--;
		} else {
			if (arr[j][i-1] > arr[j-1][i]) {
				i--;
			} else {
				j--;
			}
		}
	}	
	outStr = reverseString (outStr);
	return outStr;
}

var fillArray = function (str1, str2, arr) {
	for (var i = 1; i <= str2.length; i++) {
		for (var j = 1; j <= str1.length; j++) {
			if (str1[j-1] == str2[i-1]) {
				arr[i][j] = arr[i-1][j-1] + 1;
			} else {
				arr[i][j] = Math.max (arr[i-1][j], arr[i][j-1]);
			}
		}
	}
}

var fillArrayZeroIndex = function (arr, l1, l2) {
	if (!arr) {
		return;
	}
	for (i = 0; i <= l2; i++) {
		arr[i] = [];
		arr[i][0] = 0;
	}
	for (var i = 0; i <= l1; i++) {
		arr[0][i] = 0;
	}
}

var reverseString = function (str) {
	if (!str || str.length < 1) {
		return null;
	}
	var outStr = "";
	for (var i=str.length-1; i>=0; i--) {
		outStr += str[i];
	}
	return outStr;
}

console.log (LCS ("abcdef", "acdgf"));