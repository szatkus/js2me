js2me.createClass({
	construct: function (bufferStream) {
		this.stream = bufferStream;
	},
	$read__I: function () {
		if (this.stream.isEnd()) {
			return -1;
		}
		return this.stream.readUint8();
	},
	superClass: 'javaRoot.$java.$io.$InputStream',
	package: 'javaRoot.$java.$io',
	name: '$BufferStream'
});

