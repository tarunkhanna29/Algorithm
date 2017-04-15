var obj = {
	a : 5
};

var recFunc = function (obj) {
	console.log (obj.a);
	obj["a"]--;
	if (obj["a"] == 0) {
		console.log (obj.a);
		return;
	}
	recFunc (obj);
	console.log (obj.a);
}

recFunc (obj);