js2me.createClass({
	$SOUND_PLAYINGI: 0,
	$SOUND_STOPPEDI: 1,
	$SOUND_UNINITIALIZEDI: 3,
	/*
	 * 
	 */
	_init$_BI$V: function (data, type) {
		console.log(type);
		this.state = this.$SOUND_STOPPEDI;
	},
	/*
	 * 
	 */
	$getState$$I: function () {
		return this.state;
	},
	/*
	 * 
	 */
	$init$_BI$V: function () {
	},
	/*
	 * 
	 */
	$play$I$V: function () {
		this.state = this.$SOUND_PLAYINGI;
	},
	/*
	 * 
	 */
	$setGain$I$V: function () {
	},
	/*
	 * 
	 */
	$stop$$V: function () {
		this.state = this.$SOUND_STOPPEDI;
	}
});

