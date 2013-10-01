js2me.createClass({
	/*
	 * public Date()
	 */
	_init$$V: function () {
		this.date = new Date();
	},
	/*
	 * public long getTime()
	 */
	$getTime$$J: function () {
		return new js2me.Long(0, this.date.getTime());
	},
	name: '$Date',
	package: 'javaRoot.$java.$util'
});
