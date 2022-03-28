js2me.createClass({
	/*
	 * 
	 */
	$write$_BII$V: function (buffer, offset, length) {
		if (offset + length > buffer.length) {
			length = buffer.length - offset;
		}
		for (var i = offset; i < offset + length; i++) {
			this.$write$I$V(buffer[i]);
		}
	},
	/*
	 * 
	 */
	$write$_B$V: function (buffer) {
		this.$write$_BII$V(buffer, 0, buffer.length);
	},
	/*
	 * 
	 */
	$flush$$V: function () {
	},
	/*
	 * 
	 */
	$close$$V: function () {
	},
	package: 'javaRoot.$java.$io',
	name: '$OutputStream'
});

