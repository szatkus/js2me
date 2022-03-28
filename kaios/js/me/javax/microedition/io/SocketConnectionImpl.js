js2me.createClass({
	construct: function (host, port) {
		this.socket = navigator.mozTCPSocket.open(host, port, {binaryType: 'arraybuffer'});
		var parent = this;
		this.socket.ondata = function (event) {
			parent.inputStream.buffer.push(event.data);
		};
		this.inputStream = new javaRoot.$java.$io.$InputStream();
		this.inputStream.buffer = [];
		this.inputStream.position = 0;
		this.inputStream.$read$$I = function () {
			if (this.buffer.length === 0) {
				return -1;
			}
			if (this.position >= this.buffer[0].length) {
				this.buffer.shift();
				this.position = 0;
			}
			if (this.buffer.length === 0) {
				return -1;
			}
			return this.buffer[0][this.position++];
		};
		this.outputStream = new javaRoot.$java.$io.$OutputStream();
		this.outputStream.buffer = new Uint8Array(1);
		this.outputStream.$write$I$V = function (byte) {
			this.buffer[0] = byte;
			parent.socket.send(this.buffer);
		};
	},
	/*
	 * public InputStream openInputStream() throws IOException
	 */
	
	interfaces: ['javaRoot.$javax.$microedition.$io.$SocketConnection']
});
