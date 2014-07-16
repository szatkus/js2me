js2me.createClass({
	closed: false,
	/*
	 * public void close() throws IOException
	 */
	$close$$V: function () {
		this.closed = true;
	},
	/*
	 * public boolean markSupported()
	 */
	$markSupported$$Z: function () {
		
	},
	/*
	 * public void mark(int readlimit)
	 */
	$read$_BII$I: function (buffer, offset, length) {
		if (this.$available$$I() === 0) {
			return -1;
		}
		for (var i = 0; i < length; i++) {
			var value = this.$read$$I();
			if (value != -1) {
				if (value >= 128) {
					value -= 256;
				}
				buffer[offset + i] = value;
			} else {
				if (i === 0) {
					return -1;
				}
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

