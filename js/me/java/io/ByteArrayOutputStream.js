(function () {
	function ByteArrayOutputStream() {
		this.buffer = [];
	}
	ByteArrayOutputStream.prototype = {
		_init__V: function () {
		},
		_init_I_V: function (size) {
		},
		$write_I_V: function (b) {
			b = b & 0xff;
			if (b > 127) {
				b -= 255;
			}
			this.buffer.push(b);
		},
		$toByteArray___B: function () {
			return this.buffer.slice(0);
		},
		superClass: 'javaRoot.$java.$io.$OutputStream'
	};
	js2me.findPackage('javaRoot.$java.$io')['$ByteArrayOutputStream'] = ByteArrayOutputStream ;
})();

