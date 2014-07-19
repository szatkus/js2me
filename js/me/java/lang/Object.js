js2me.createClass({
	/*
	 * public Object()
	 */
	_init$$V: function () {
	},
	classCache: [],
	/*
	 * public final Class getClass()
	 */
	$getClass$$Ljava_lang_Class_: function () {
		var cls = this.classCache[this.className];
		if (cls == null) {
			cls = new javaRoot.$java.$lang.$Class(js2me.findClass(this.className));
			this.classCache[this.className] = cls;
		}
		return cls;
	},
	/*
	 * public String toString()
	 */
	$toString$$Ljava_lang_String_: function () {
		var text = this.className + ':' + this.$hashCode$$I();
		return new javaRoot.$java.$lang.$String(text);
	},
	/*
	 * 
	 */
	$wait$J$V: js2me.markUnsafe(function (timeout) {
		var threadId = js2me.currentThread;
		this.checkOwnership();
		if (this.waitingThreads == null) {
			this.waitingThreads = [];
		}
		this.releaseOwnership();
		var data = {
			threadId: threadId,
			timeoutId: 0
		};
		this.waitingThreads.push(data);
		var waitingThreads = this.waitingThreads;
		var callee = this;
		js2me.restoreStack[threadId] = [function () {
			js2me.enterMonitor(callee);
		}];
		js2me.isThreadSuspended = true;
		if (timeout.lo > 0) {
			data.timeoutId = setTimeout(function () {
				var i = waitingThreads.indexOf(data);
				if (i !== -1) {
					waitingThreads[i] = waitingThreads[waitingThreads.length - 1];
					waitingThreads.pop();
					js2me.restoreThread(threadId);
				} else {
					console.error('This should not happen!');
				}
			}, timeout.lo);
		}
	}),
	/*
	 * 
	 */
	$wait$$V: js2me.markUnsafe(function () {
		this.$wait$J$V({hi: 0, lo: 0});
	}),
	/*
	 * public int hashCode()
	 */
	$hashCode$$I: function () {
		
		if (js2me.lastHash == null) {
			js2me.lastHash = 1;
		}
		if (this.hashCode == null) {
			this.hashCode = js2me.lastHash;
			js2me.lastHash++;
		}
		return this.hashCode;
	},
	/*
	 * public final void notify()
	 */
	$notify$$V: function () {
		this.checkOwnership();
		if (this.waitingThreads) {
			var data = this.waitingThreads.pop();
			if (data) {
				clearTimeout(data.timeoutId);
				setTimeout(function () {
					js2me.restoreThread(data.threadId);
				}, 1);
			}
		}
	},
	/*
	 * public final void notifyAll()
	 */
	$notifyAll$$V: function () {
		this.checkOwnership();
		if (this.waitingThreads) {
			var threadId;
			while (data = this.waitingThreads.pop()) {
				clearTimeout(data.timeoutId);
				(function (data) {
					setTimeout(function () {
						js2me.restoreThread(data.threadId);
					}, 1);
				})(data);
			}
		}
	},
	/*
	 * public boolean equals(Object obj)
	 */
	$equals$Ljava_lang_Object_$Z: function (obj) {
		if (this == obj) {
			return 1;
		} else {
			return 0;
		}
	},
	isImplement: function (className) {
		if (this.className == className) {
			return true;
		}
		try{
		for (var i = 0; this.interfaces && i < this.interfaces.length; i++) {
			var interface = js2me.findClass(this.interfaces[i]).prototype;
			if (interface.isImplement(className)) {
				return true;
			}
		}
		if (this.superClass) {
			var superClass = js2me.findClass(this.superClass).prototype;
			if (superClass.isImplement(className)) {
				return true;
			}
		}
	}catch(e) {
		debugger;
	}
		return false;
	},
	checkOwnership: function () {
		if (!this.monitorQueue || this.monitorQueue[0] !== js2me.currentThread) {
			throw new javaRoot.$java.$lang.$IllegalMonitorStateException();
		}
	},
	releaseOwnership: function () {
		if (this.monitorQueue) {
			while (this.monitorQueue[0] === js2me.currentThread) {
				this.monitorQueue.shift();
			}
			if (this.monitorQueue.length !== 0) {
				var threadId = this.monitorQueue[0];
				if (threadId != null) {
					setTimeout(function () {
						js2me.restoreThread(threadId);
					}, 1);
				}
			}
		}
	},
	require: ['javaRoot.$java.$lang.$IllegalMonitorStateException']
});
