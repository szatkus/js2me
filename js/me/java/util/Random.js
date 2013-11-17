js2me.createClass({
	/*
	 * public Random()
	 */
	_init$$V: function () {
	},
	/*
	 * public Random()
	 */
	_init$J$V: function (seed) {
		// is it needed?
		//console.log(seed.lo);
	},
	/*
	 * public int nextInt()
	 */
	$nextInt$I$I: function (n) {
		return Math.floor(Math.random() * n)
	},
	/*
	 * public int nextInt()
	 */
	$nextInt$$I: function () {
		return this.$nextInt$I$I(4294967296) - 2147483648;
	},
	/*
	 * public long nextLong()
	 */
	$nextLong$$J: function () {
		return {hi: Math.floor(Math.random() * 0x100000000), lo: Math.floor(Math.random() * 0x100000000)};
	},
	/*
	 * public void setSeed(long seed)
	 */
	$setSeed$J$V: function () {
		// no
	}
});
