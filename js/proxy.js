js2me.sharedObjects = [];
js2me.invokeProxy = function (obj, funcName, id, args) {
	if (obj.constructor === String) {
		obj = window[obj];
	}
	if (obj[funcName].constructor === Function) {
		js2me.sharedObjects[id] = obj[funcName].apply(obj, args);
	} else {
		js2me.sharedObjects[id] = obj[funcName] = args[0];
	}
};
