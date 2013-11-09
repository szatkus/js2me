js2me.createClass({
	/*
	 * public static int abs(int a)
	 */
	$abs$D$D: function (value) {
		return new js2me.Double(Math.abs(value.double));
	},
	$abs$I$I: Math.abs,
	$min$II$I: Math.min,
	$max$II$I: Math.max,
	/*
	 * public static int max(int a, int b)
	 */
	$max$JJ$J: function (a, b) {
		if (a.toInt() > b.toInt()) {
			return a;
		} else {
			return b;
		}
	},
	/*
	 * public static double sin(double a)
	 */
	$sin$D$D: function (value) {
		return new js2me.Double(Math.sin(value.double));
	},
	/*
	 * public static double sqrt(double a)
	 */
	$sqrt$D$D: function (value) {
		return new js2me.Double(Math.sqrt(value.double));
	}
});
