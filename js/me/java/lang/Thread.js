js2me.createClass({
	construct: function (action) {
		this.$run__V = action;
	},
	_init_Ljava_lang_Runnable__V: function (runnable) {
		this.runnable = runnable;
	},
	$start__V: function () {
		var thread = this;
		var runnable = this.runnable || thread;
		thread.id = js2me.threads.length;
		js2me.threads.push(thread);
		setTimeout(function () {
			js2me.currentThread = thread.id;
			runnable.$run__V();
		}, 1);
	},
	$sleep_J_V: function (miliseconds) {
		js2me.suspendThread = true;
		var threadId = js2me.currentThread;
		setTimeout(function () {
			js2me.restoreThread(threadId);
		}, miliseconds.toInt());
	},
	$yield__V: function () {
		var currentThread = javaRoot.$java.$lang.$Thread.prototype.$currentThread__Ljava_lang_Thread_()
		currentThread.$sleep_J_V(new js2me.Long(0, 1));
	},
	$currentThread__Ljava_lang_Thread_: function () {
		return js2me.threads[js2me.currentThread];
	},
	$setPriority_I_V: function (priority) {
		this.priority = priority;
	},
	$activeCount__I: function () {
		return js2me.threads.length;
	},
	package: 'javaRoot.$java.$lang',
	name: '$Thread'
});

