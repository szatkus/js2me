(function () {
	function BufferStream(bufferStream) {
		this.stream = bufferStream;
	}
	BufferStream.prototype = {
		superClass: 'javaRoot.$java.$io.$InputStream'
	};
	js2me.findPackage('javaRoot.$java.$io')['$BufferStream'] = BufferStream ;
})();

