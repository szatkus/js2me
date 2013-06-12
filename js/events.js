js2me.listeners = [];
js2me.sendEvent = function (eventCode) {
	for (var i = 0; i < this.listeners.length; i++) {
		js2me.currentThread = js2me.mainThread.id;
		this.listeners[i](eventCode);
	}
};
js2me.addEventListener = function (listener) {
	this.listeners.push(listener);
};
js2me.removeEventListener = function (listener) {
	var pos = this.listeners.indexOf(listener);
	if (pos != -1) {
		this.listeners.splice(pos, 1);
	}
};
