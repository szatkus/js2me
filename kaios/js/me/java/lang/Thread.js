js2me.createClass({
	construct: function (action) {
		if (action instanceof Function) {
			this.$run$$V = action;
		}
	},
	/*
	 * public Thread()
	 */
	_init$Ljava_lang_Runnable_Ljava_lang_String_$V: function (runnable, name) {
		this.runnable = runnable;
		this.name = name;
	},
	/*
	 * public Thread()
	 */
	_init$Ljava_lang_Runnable_$V: function (runnable) {
		this._init$Ljava_lang_Runnable_Ljava_lang_String_$V(runnable);
	},
	/*
	 * public void start()
	 */
	$start$$V: function () {
		var thread = this;
		var runnable = this.runnable || thread;
		thread.id = js2me.threads.length;
		js2me.threads.push(thread);
		js2me.restoreStack[thread.id] = [];
		js2me.VMMapping[thread.id] = js2me.currentVM;
		setTimeout(function () {
			js2me.switchVM(thread.id);
			runnable.$run$$V();
		}, 1);
	},
	/*
	 * 
	 */
	$sleep$J$V: js2me.markUnsafe(function (miliseconds) {
		js2me.isThreadSuspended = true;
		var threadId = js2me.currentThread;
		setTimeout(function () {
			js2me.restoreThread(threadId);
		}, miliseconds.lo);
		/*var time = Date.now();
		var count = 0;
		while (Date.now() - time < miliseconds.lo) {count++};
		console.log(count);*/
	}),
	/*
	 * public static void yield()
	 */
	$yield$$V: js2me.markUnsafe(function () {
		js2me.isThreadSuspended = true;
		var threadId = js2me.currentThread;
		setTimeout(function () {
			js2me.restoreThread(threadId);
		}, 10);
	}),
	/*
	 * public static Thread currentThread()
	 */
	$currentThread$$Ljava_lang_Thread_: function () {
		return js2me.threads[js2me.currentThread];
	},
	/*
	 * public void interrupt()
	 */
	$interrupt$$V: function () {
		//TODO
	},
	/*
	 * public final boolean isAlive()
	 */
	$isAlive$$Z: function () {
		if (this.id === js2me.currentThread || js2me.restoreStack[this.id]) {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * public final void setPriority(int newPriority)
	 */
	$setPriority$I$V: function (priority) {
		this.priority = priority;
	},
	/*
	 * public static int activeCount()
	 */
	$activeCount$$I: function () {
		return js2me.threads.length;
	}
});

