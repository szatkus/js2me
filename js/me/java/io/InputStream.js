js2me.createClass({
	$read$_BII$I: function (buffer, offset, length) {
		for (var i = 0; i < length; i++) {
			var value = this.$read$$I();
			if (value != -1) {
				if (value >= 128) {
					value -= 256;
				}
				buffer[offset + i] = value;
			} else {
				return i;
			}
		}
		return length;
	},
	$read$_B$I: function (buffer) {
		return this.$read$_BII$I(buffer, 0, buffer.length);
	},
	$close$$V: function () {
		// for what?
	},
	package: 'javaRoot.$java.$io',
	name: '$InputStream'
});

