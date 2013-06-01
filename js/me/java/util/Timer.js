js2me.createClass({
	_init__V: function () {
		this.timers = [];
	},
	$schedule_Ljava_util_TimerTask_J_V: function (task, delay) {
		task.executed = false;
		task.timer = setTimeout(function () {
			task.executed = true;
			task.$run__V();
		}, delay.toInt());
		this.timers.push(task.timer);
	},
	$schedule_Ljava_util_TimerTask_JJ_V: function (task, delay, interval) {
		task.executed = false;
		var timer = this;
		task.timer = setTimeout(function () {
			task.timer = setInterval(function () {
				task.$run__V();
			}, interval.toInt());
			timer.timers.push(task.timer);
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

