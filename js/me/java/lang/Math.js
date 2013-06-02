(function () {
	function JavaMath () {
	}
	JavaMath.prototype = {
		$abs$I$I: Math.abs,
		$min$II$I: Math.min,
		$max$JJ$J: function (a, b) {
			if (a.toInt() > b.toInt()) {
				return a;
			} else {
				return b;
			}
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$Math'] = JavaMath ;
})();

