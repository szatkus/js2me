js2me.createClass({
	/*
	 * public static int abs(int a)
	 */
	$abs$D$D: function (value) {
		return {double: Math.abs(value.double)};
	},
	$abs$I$I: Math.abs,
	$min$II$I: Math.min,
	$max$II$I: Math.max,
	/*
	 * public static int max(int a, int b)
	 */
	$max$JJ$J: function (a, b) {
		if (js2me.lcmp(a, b) == 1) {
			return a;
		} else {
			return b;
		}
	},
	
	$min$JJ$J: function (a, b) {
		if (js2me.lcmp(a, b) == 1) {
			return b;
		} else {
			return a;
		}
	},
	
	/*
	 * public static double sin(double a)
	 */
	$sin$D$D: function (value) {
		return {double: Math.sin(value.double)};
	},
	/*
	 * public static double sqrt(double a)
	 */
	$sqrt$D$D: function (value) {
		return {double: Math.sqrt(value.double)};
	}
});
