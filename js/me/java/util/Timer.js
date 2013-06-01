js2me.createClass({
	_init__V: function () {
		this.threadId = js2me.threads.length;
		js2me.threads.push(this);
		this.timers = [];
	},
	$schedule_Ljava_util_TimerTask_J_V: function (task, delay) {
		task.executing = true;
		var timer = this;
		task.timer = setTimeout(function () {
			task.executing = false;
			task.$run__V();
		}, delay.toInt());
		this.timers.push(task.timer);
	},
	$schedule_Ljava_util_TimerTask_JJ_V: function (task, delay, interval) {
		task.executing = true;
		var timer = this;
		task.timer = setInterval(function () {
			js2me.currentThread = timer.threadId;
			if (js2me.restoreStack[timer.threadId] && js2me.restoreStack[timer.threadId].length > 0) {
				return;
			}
			clearTimeout(task.timer);
			if (interval) {
				task.timer = setInterval(function () {
					js2me.currentThread = timer.threadId;
					if (js2me.restoreStack[timer.threadId] && js2me.restoreStack[timer.threadId].length > 0) {
						return;
					}
					task.$run__V();
				}, interval.toInt());
				timer.timers.push(task.timer);
			}
			task.$run__V();
		}, delay.toInt());
		this.timers.push(task.timer);
	},
	$cancel__V: function () {
		for (var i = 0; i < this.timers.length; i++) {
			clearTimeout(this.timers[i]);
		}
	},
	package: 'javaRoot.$java.$util',
	name: '$Timer'
});

