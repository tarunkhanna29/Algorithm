var combination = function (str) {
	if (!str || str.length < 1) {
		return;
	}
	var arr = [];
	var obj = createObjAndArr (str, arr);
	combinationUtil (obj, arr, 0, str.length, "", 0);
}

var combinationUtil = function (obj, arr, index, length, outStr, level) {
	if (level == length) {		
		return;
	}
	for (var i=index; i<arr.length; i++) {		
		if (obj[arr[i]] > 0) {			
			outStr = updateString (outStr, level, arr[i]);	
			console.log (outStr);		
			obj[arr[i]]--;
			combinationUtil (obj, arr, i, length, outStr, level+1);
			obj[arr[i]]++;
		}
	}
}

var updateString = function (str, level, char) {
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

var createObjAndArr = function (str, arr) {
	var obj = {};
	for (var i=0; i<str.length; i++) {
		if (obj[str[i]]) {
			obj[str[i]]++;
		} else {
			obj[str[i]] = 1;
			arr.push (str[i]);
		}
	}
	return obj;
}

combination ("abc");
console.log ("<----------->");
combination ("aab");