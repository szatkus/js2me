js2me.createClass({
	construct: function () {
		this.buffer = [];
	},
	_init$$V: function () {
	},
	_init$I$V: function (size) {
	},
	$write$I$V: function (b) {
		b = b & 0xff;
		if (b > 127) {
			b -= 255;
		}
		this.buffer.push(b);
	},
	$toByteArray$$_B: function () {
		return this.buffer.slice(0);
	},
	$size$$I: function () {
		return this.buffer.length;
	},
	superClass: 'javaRoot.$java.$io.$OutputStream',
	package: 'javaRoot.$java.$io',
	name: '$ByteArrayOutputStream'
});

