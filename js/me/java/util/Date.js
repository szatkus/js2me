js2me.createClass({
	/*
	 * public Date()
	 */
	_init$$V: function () {
		this.date = new Date();
	},
	/*
	 * public Date(long date)
	 */
	_init$J$V: function (date) {
		this.date = new Date(date.hi * 0x100000000 + date.lo);
	},
	/*
	 * public long getTime()
	 */
	$getTime$$J: function () {
		var hi = Math.floor(this.date.getTime() / 0x100000000);
		var lo = this.date.getTime() % 0x100000000;
		return new js2me.Long(hi, lo);
	}
});
