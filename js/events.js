js2me.listeners = {
	keypress: [],
	keyreleased: []
};
js2me.sendEvent = function (eventName, data) {
	for (var i = 0; i < this.listeners[eventName].length; i++) {
		(function (listener) {
			js2me.currentVM = 1;
			js2me.launchThread(function () {
				listener(data);
			});
		})(js2me.listeners[eventName][i]);
	}
};
js2me.addEventListener = function (eventName, listener) {
	this.listeners[eventName].push(listener);
};
js2me.removeEventListener = function (eventName, listener) {
	var pos = this.listeners[eventName].indexOf(listener);
	if (pos != -1) {
		this.listeners[eventName].splice(pos, 1);
	}
};
js2me.sendKeyPressEvent = function (keyCode) {
	this.sendEvent('keypress', keyCode);
};
js2me.sendKeyReleasedEvent = function (keyCode) {
	this.sendEvent('keyreleased', keyCode);
};
