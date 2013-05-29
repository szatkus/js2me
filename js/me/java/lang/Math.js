(function () {
	function JavaMath () {
	}
	JavaMath.prototype = {
		$abs_I_I: Math.abs,
		$min_II_I: Math.min,
		$max_JJ_J: function (a, b) {
			if (a.toInt() > b.toInt()) {
				return a;
			} else {
				return b;
			}
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$Math'] = JavaMath ;
})();

