js2me.createClass({
	closed: false,
	/*
	 * 
	 */
	$close$$V: function () {
		this.closed = true;
	},
	/*
	 * public void mark(int readlimit)
	 */
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
	/*
	 * public void mark(int readlimit)
	 */
	$read$_B$I: function (buffer) {
		return this.$read$_BII$I(buffer, 0, buffer.length);
	},
	getBytes: function () {
		var bytes =  [];
		var byte = -1;
		while ((byte = this.$read$$I()) != -1) {
			if (byte >= 128) {
				byte -= 256;
			}
			bytes.push(byte);
		}
		return bytes;
	}
});

