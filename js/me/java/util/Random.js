js2me.createClass({
	_init$$V: function () {
	},
	_init$J$V: function (seed) {
		// is it needed?
		//console.log(seed.lo);
	},
	$nextInt$I$I: function (n) {
		return Math.floor(Math.random() * n)
	},
	$nextInt$$I: function () {
		return this.$nextInt$I$I(4294967296) - 2147483648;
	},
	package: 'javaRoot.$java.$util',
	name: '$Random'
});
