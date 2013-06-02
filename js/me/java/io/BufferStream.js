js2me.createClass({
	construct: function (bufferStream) {
		this.stream = bufferStream;
	},
	$read$$I: function () {
		if (this.stream.isEnd()) {
			return -1;
		}
		return this.stream.readUint8();
	},
	$skip$J$J: function (n) {
		if (n.hi > 0) {
			console.log('Too large skip value');
		}
		this.stream.skip(n.lo);
	},
	superClass: 'javaRoot.$java.$io.$InputStream',
	package: 'javaRoot.$java.$io',
	name: '$BufferStream'
});

