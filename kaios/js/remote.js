js2me.fakeFunctions = [];
js2me.fire = function (id) {
	js2me.fakeFunctions[id]();
};
js2me.createFakeFunction = function(func) {
	js2me.fakeFunctions.push(func);
	return {
		functionId: js2me.fakeFunctions.length - 1
	};
};
js2me.storages = {};
js2me.sharedObjects = [];
var document = (function () {
	function FakeElement() {
		this.sharedId = js2me.sharedObjects.length;
		js2me.sharedObjects.push(this);
		mapProperty(this, 'width');
		mapProperty(this, 'height');
		//var style = {};
		this.style = {};
	}
	FakeElement.prototype = {
		addEventListener: function (eventName, listener) {
			var fakeListener = js2me.createFakeFunction(listener);
			postMessage([this.sharedId, 'addEventListener', -1, eventName, fakeListener])
		},
		appendChild: function (child) {
			postMessage([this.sharedId, 'appendChild', -1, {objectId: child.sharedId}]);
		},
		getContext: function (type) {
			var obj = new FakeContext();
			postMessage([this.sharedId, 'getContext', obj.sharedId, type])
			return obj;
		},
		pause: function () {
			postMessage([this.sharedId, 'pause', -1])
		},
		play: function () {
			postMessage([this.sharedId, 'play', -1])
		},
		setAttribute: function (name, value) {
			postMessage([this.sharedId, 'setAttribute', -1, name, value]);
		}
	};
	function mapProperty(obj, name) {
		var value = '';
		obj.__defineGetter__(name, function () {
			return value;
		});
		obj.__defineSetter__(name, function (newValue) {
			value = newValue;
			postMessage([{sharedId: obj.sharedId, name: name, value: value}])
		});
	}
	function FakeContext() {
		this.sharedId = js2me.sharedObjects.length;
		js2me.sharedObjects.push(this);
		mapProperty(this, 'strokeStyle');
		mapProperty(this, 'fillStyle');
	}
	FakeContext.prototype = {
		beginPath: function () {
			postMessage([this.sharedId, 'beginPath', -1])
		},
		clip: function () {
			postMessage([this.sharedId, 'clip', -1])
		},
		closePath: function () {
			postMessage([this.sharedId, 'closePath', -1])
		},
		drawImage: function (image) {
			var args = [];
			for (var i = 1; i < arguments.length; i++) {
				args[i - 1] = arguments[i];
			}
			postMessage([this.sharedId, 'drawImage', -1, {objectId: image.sharedId}].concat(args));
		},
		fill: function () {
			postMessage([this.sharedId, 'fill', -1]);
		},
		fillRect: function (x, y, width, height) {
			postMessage([this.sharedId, 'fillRect', -1, x, y, width, height]);
		},
		fillText: function (text, x, y) {
			postMessage([this.sharedId, 'fillText', -1, text, x, y]);
		},
		lineTo: function (x, y) {
			postMessage([this.sharedId, 'lineTo', -1, x, y])
		},
		measureText: function (text) {
			return {width: text.length * 10};
		},
		moveTo: function (x, y) {
			postMessage([this.sharedId, 'moveTo', -1, x, y])
		},
		quadraticCurveTo: function (x, y, width, height) {
			postMessage([this.sharedId, 'quadraticCurveTo', -1, x, y, width, height])
		},
		rect: function (x, y, width, height) {
			postMessage([this.sharedId, 'rect', -1, x, y, width, height])
		},
		restore: function () {
			postMessage([this.sharedId, 'restore', -1])
		},
		rotate: function (angle) {
			postMessage([this.sharedId, 'rotate', -1, angle]);
		},
		save: function () {
			postMessage([this.sharedId, 'save', -1])
		},
		scale: function (x, y) {
			postMessage([this.sharedId, 'scale', -1, x, y])
		},
		stroke: function () {
			postMessage([this.sharedId, 'stroke', -1])
		},
		strokeRect: function (x, y, width, height) {
			postMessage([this.sharedId, 'strokeRect', -1, x, y, width, height])
		},
		translate: function (x, y) {
			postMessage([this.sharedId, 'translate', -1, x, y])
		}
	};
	return {
		body: new FakeElement(),
		createElement: function (tagName) {
			var obj = new FakeElement();
			postMessage(['document', 'createElement', obj.sharedId, tagName])
			return obj;
		},
		getElementById: function (elementId) {
			var obj = new FakeElement();
			postMessage(['document', 'getElementById', obj.sharedId, elementId])
			return obj;
		}
	};
})();
var localStorage = {
	storage: {},
	getItem: function (key) {
		return this.storage[key];
	},
	setItem: function (key, value) {
		value += '';
		this.storage[key] = value;
		postMessage(['localStorage', 'setItem', -1, key, value]);
	}
};
js2me.setStorage = function (storage) {
	localStorage.storage = storage;
};
js2me.setProperties = function (sharedId, props) {
	var obj = js2me.sharedObjects[sharedId];
	for (var i in props) {
		obj[i] = props[i];
	}
};
