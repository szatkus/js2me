js2me.createClass({
	construct: function (bufferStream) {
		this.stream = bufferStream;
	},
	/*
	 * 
	 */
	$read$$I: function () {
		if (this.stream.isEnd()) {
			return -1;
		}
		return this.stream.readUint8();
	},
	/*
	 * 
	 */
	$skip$J$J: function (n) {
		if (n.hi > 0) {
			console.log('Too large skip value');
		}
		return {hi: 0, lo: this.stream.skip(n.lo)};
	},
	/*
	 * 
	 */
	$available$$I: function () {
		return this.stream.getRemaining();
	},
	superClass: 'javaRoot.$java.$io.$InputStream'
});

