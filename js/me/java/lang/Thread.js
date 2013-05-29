js2me.createClass({
	construct: function (action) {
		this.$run__V = action;
	},
	_init_Ljava_lang_Runnable__V: function (runnable) {
		this.runnable = runnable;
	},
	$start__V: function () {
		var runnable = this.runnable || this;
		setTimeout(function () {
			js2me.currentThread = js2me.threads.length;
			js2me.threads.push(this);
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
	$currentThread__Ljava_lang_Thread_: function () {
	},
	package: 'javaRoot.$java.$lang',
	name: '$Thread'
});

