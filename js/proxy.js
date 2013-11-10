js2me.sharedObjects = [];
js2me.invokeProxy = function (obj, funcName, id, args) {
	if (obj.constructor === String) {
		obj = window[obj];
	}
	if (obj.constructor === Number) {
		obj = js2me.sharedObjects[obj];
	}
	for (var i in args) {
		if (args[i] != null) {
			if (args[i].functionId >= 0) {
				(function (functionId) {
					args[i] = function () {
						js2me.worker.postMessage(['fire', functionId]);
					};
				})(args[i].functionId);
			}
			if (args[i].objectId >= 0) {
				args[i] = js2me.sharedObjects[args[i].objectId];
			}
		}
	}
	if (obj[funcName].constructor === Function) {
		js2me.sharedObjects[id] = obj[funcName].apply(obj, args);
	} else {
		js2me.sharedObjects[id] = obj[funcName] = args[0];
	}
};
