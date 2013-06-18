js2me.createClass({
	$abs$D$D: function (value) {
		return new js2me.Double(Math.abs(value.double));
	},
	$abs$I$I: Math.abs,
	$min$II$I: Math.min,
	$max$II$I: Math.max,
	$max$JJ$J: function (a, b) {
		if (a.toInt() > b.toInt()) {
			return a;
		} else {
			return b;
		}
	},
	$sin$D$D: function (value) {
		return new js2me.Double(Math.sin(value.double));
	},
	$sqrt$D$D: function (value) {
		return new js2me.Double(value.double, value.double);
	}
});
