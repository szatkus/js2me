js2me.createClass({
	/*
	 * public static int abs(int a)
	 */
	$abs$D$D: function (value) {
		return {double: Math.abs(value.double)};
	},
	$abs$F$F: function (value) {
		return Math.abs(value);
	},
	/*
	 * public static int abs(int a)
	 */
	$abs$I$I: function (value) {
		if (value >= 0 || value === -2147483648) {
			return value;
		} else {
			return -value;
		}
	},
	/*
	 * public static long abs(long a)
	 */
	$abs$J$J: function (value) {
		if (js2me.lcmp(value, {hi:0, lo:0}) === 1 || js2me.lcmp(value, {hi: 0x80000000, lo: 0}) === 0) {
			return value;
		} else {
			return js2me.lneg(value);
		}
	},
	$cos$D$D: function (value) {
		return {double: Math.cos(value.double)};
	},
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
	},
	/*
	 * public static double toRadians(double angdeg)
	 */
	$toRadians$D$D: function (angle) {
		return {double: (angle.double / 180) * Math.PI};
	}
});
