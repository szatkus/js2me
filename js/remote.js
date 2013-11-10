js2me.listeners = [];
js2me.fire = function (id) {
	js2me.listeners[id]();
};
js2me.getFakeFunction = function(func) {
	js2me.listeners.push(func);
	return {
		functionId: js2me.listeners.length - 1
	};
};
var document = (function () {
	function returnFakeDOM(funcName, arg) {
		var obj = {
			id: js2me.sharedId++,
			addEventListener: function (eventName, listener) {
				var fakeListener = js2me.getFakeFunction(listener);
				postMessage(['invokeProxy', this.id, 'addEventListener', 
					null, [eventName, fakeListener]])
			},
			appendChild: function (child) {
				postMessage(['invokeProxy', this.id, 'appendChild', 
					null, [{objectId: child.id}]]);
			},
			setAttribute: function (name, value) {
				postMessage(['invokeProxy', this.id, 'setAttribute', 
					null, [name, value]]);
			}
		};
		postMessage(['invokeProxy', 'document', funcName, obj.id, [arg]])
		return obj;
	}
	return {
		createElement: function (tagName) {
			return returnFakeDOM('createElement', tagName);
		},
		getElementById: function (elementId) {
			return returnFakeDOM('getElementById', elementId);
		}
	};
})();
