js2me.createClass({
	construct: function (action) {
		this.$run$$V = action;
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
		setTimeout(function () {
			js2me.currentThread = thread.id;
			runnable.$run$$V();
		}, 1);
	},
	/*
	 * 
	 */
	$sleep$J$V: function (miliseconds) {
		js2me.suspendThread = true;
		var threadId = js2me.currentThread;
		setTimeout(function () {
			js2me.restoreThread(threadId);
		}, miliseconds.toInt());
	},
	/*
	 * public static void yield()
	 */
	$yield$$V: function () {
		var currentThread = javaRoot.$java.$lang.$Thread.prototype.$currentThread$$Ljava_lang_Thread_()
		currentThread.$sleep$J$V(new js2me.Long(0, 1));
	},
	/*
	 * public static Thread currentThread()
	 */
	$currentThread$$Ljava_lang_Thread_: function () {
		return js2me.threads[js2me.currentThread];
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
	},
	package: 'javaRoot.$java.$lang',
	name: '$Thread'
});

