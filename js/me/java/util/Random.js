(function () {
	function Random() {
	}
	Random.prototype = {
		_init__V: function () {
		},
		$nextInt_I__I: function (n) {
			return Math.floor(Math.random() * n)
		},
		$nextInt__I: function () {
			return this.$nextInt_I__I(4294967296) - 2147483648;
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$util')['$Random'] = Random;
})();
