var list = [1, 2, 3, [4, 5, ["hello", 6, 7], 8, 9], 3];

var calculateSum = function (list) {
	if (!list || list.length < 1) {
		return 0;
	}
	return calculateSumUtil (list, 1, 0);	
}

var calculateSumUtil = function (list, level, sum) {
	for (var i=0; i < list.length; i++) {
		if (typeof (list[i]) == "number") {
			sum = sum + level * list[i];
		} else if (isArray (list[i])) {
			sum = calculateSumUtil (list[i], level+1, sum);
		}
	}
	return sum;
}

var isArray = function (list) {
	if (!list) {
		return false;
	}
	if (Array.isArray (list)) {
		return true;
	}
	return false;
}

console.log (calculateSum (list));