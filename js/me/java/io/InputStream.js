js2me.createClass({
	$read__BII_I: function (buffer, offset, length) {
		for (var i = 0; i < length; i++) {
			var value = this.$read__I();
			if (value != -1) {
				buffer[offset + i] = value;
			} else {
				return i;
			}
		}
		return length;
	},
	$close__V: function () {
		// for what?
	},
	package: 'javaRoot.$java.$io',
	name: '$InputStream'
});

