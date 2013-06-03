js2me.createClass({
	_init$$V: function () {
		this.date = new Date();
	},
	$getTime$$J: function () {
		return new js2me.Long(0, this.date.getTime());
	},
	name: '$Date',
	package: 'javaRoot.$java.$util'
});
