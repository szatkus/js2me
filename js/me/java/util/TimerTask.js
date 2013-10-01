js2me.createClass({
	/*
	 * public boolean cancel()
	 */
	$cancel$$Z: function () {
		clearTimeout(this.timer);
		return this.executing;
	},
	name: '$TimerTask',
	package: 'javaRoot.$java.$util'
});
