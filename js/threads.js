/**
 * Restores suspended thread with given id.
 * @param {number} threadId Id of some thread which is currently suspended.
 */
js2me.restoreThread = function (threadId) {
	js2me.lastStop = +new Date;
	if (js2me.kill) {
		return;
	}
	if (js2me.restoreStack[threadId] == undefined) {
		return;
	}
	js2me.isThreadSuspended = false;
	var restoreStack = js2me.restoreStack[threadId].pop();
	if (restoreStack) {
		//console.error(threadId);
		js2me.currentThread = threadId;
		if (typeof restoreStack == 'function') {
			return restoreStack();
		} else {
			return js2me.execute.apply(js2me, restoreStack);
		}
	}
};
/**
 * Launch new thread.
 * @param {function} func Action to be executed.
 */
js2me.launchThread = function (func) {
	var threadId = -js2me.lastThread;
	js2me.lastThread++;
	if (!js2me.restoreStack[threadId]) {
		js2me.restoreStack[threadId] = [];
	}
	setZeroTimeout(function () {
		//console.error(threadId);
		try {
			js2me.isThreadSuspended = false;
			js2me.currentThread = threadId;
			func();
			js2me.isThreadSuspended = false;
		} catch (e) {
			console.error(e.stack);
			js2me.showError(e.message);
		}
	}, 1);
};
js2me.lastThread = 1;
js2me.enterMonitor = function (obj) {
	if (obj.className == 'javaRoot.$agt') {
		//console.debug('='+js2me.currentThread);
		//console.debug(obj.monitorQueue);
	}
	if (obj.monitorQueue == null) {
		obj.monitorQueue = [];
	}
	if (obj.monitorQueue.length === 0 || obj.monitorQueue[0] === js2me.currentThread) {
		obj.monitorQueue.unshift(js2me.currentThread)
	} else {
		obj.monitorQueue.push(js2me.currentThread)
		js2me.isThreadSuspended = true;
	}
};
js2me.exitMonitor = function (obj) {
	if (this.monitorQueue == null) {
		this.monitorQueue = [];
	}
	obj.monitorQueue.shift();
	if (obj.monitorQueue.length !== 0 && obj.monitorQueue[0] !== js2me.currentThread) {
		var threadId = obj.monitorQueue[0];
		if (threadId != null) {
			setTimeout(function () {
				js2me.restoreThread(threadId);
			}, 1);
		}
	}
};
js2me.suspendThread = function (func) {
	js2me.isThreadSuspended = true;
	if (func) {
		if (js2me.restoreStack[js2me.currentThread].length > 0) {
			console.error('Trying to overwrite a thread!');
		}
		js2me.restoreStack[js2me.currentThread] = [func];
	}
	return js2me.currentThread;
};
