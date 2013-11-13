js2me.createClass({
	/*
	 * public Timer()
	 */
	_init$$V: function () {
		this.threadId = js2me.threads.length;
		js2me.threads.push(this);
		this.timers = [];
	},
	/*
	 * public void schedule(TimerTask task, long delay)
	 */
	$schedule$Ljava_util_TimerTask_J$V: function (task, delay) {
		task.executing = true;
		var timer = this;
		task.timer = setTimeout(function () {
			task.executing = false;
			task.$run$$V();
		}, delay.lo);
		this.timers.push(task.timer);
	},
	/*
	 * public void schedule(TimerTask task, long delay)
	 */
	$schedule$Ljava_util_TimerTask_JJ$V: function (task, delay, interval) {
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
					task.$run$$V();
				}, interval.lo);
				timer.timers.push(task.timer);
			}
			task.$run$$V();
		}, delay.lo);
		this.timers.push(task.timer);
	},
	/*
	 * public void scheduleAtFixedRate(TimerTask task, long delay, long period)
	 */
	$scheduleAtFixedRate$Ljava_util_TimerTask_JJ$V: function (task, delay, interval) {
		task.executing = true;
		var timer = this;
		task.timer = setTimeout(function () {
			if (interval) {
				task.timer = setInterval(function () {
					task.$run$$V();
				}, interval.lo);
				timer.timers.push(task.timer);
			}
			task.$run$$V();
		}, delay.lo);
		this.timers.push(task.timer);
	},
	/*
	 * public void cancel()
	 */
	$cancel$$V: function () {
		for (var i = 0; i < this.timers.length; i++) {
			clearTimeout(this.timers[i]);
		}
	}
});

