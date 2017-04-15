var permutation = function (str) {
	if (!str || str.length < 1) {
		return;
	}
	var obj = createObj (str);
	permutationUtil (obj, str.length, "", 0);
}

var permutationUtil = function (obj, length, outputStr, level) {
	if (length == 0) {
		return;
	}
	if (length == level) {
		console.log (outputStr);
		return;
	}
	for (var key in obj) {
		if (obj[key] > 0) {
			outputStr = updateOutputStr (outputStr, level, key);
			obj[key]--;
			permutationUtil (obj, length, outputStr, level+1);
			obj[key]++;
		}
	}
}

var updateOutputStr = function (str, level, char) {
	var newStr = "";
	for (var i = 0; i < str.length; i++) {
		if (i == level) {			
			break;
		}
		newStr += str[i];
	}
	newStr += char;
	for (var j=i+1; j<str.length; j++) {
		newStr += str[j];
	}	
	return newStr;
}

var createObj = function (str) {
	var obj = {};
	for (var i=0; i<str.length; i++) {
		if (!obj[str[i]]) {
			obj[str[i]] = 0;
		}
		obj[str[i]] = obj[str[i]]+1;		
	}
	return obj;
}

var str = "aab";
permutation (str);