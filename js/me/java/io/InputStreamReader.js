js2me.createClass({
	superClass: 'javaRoot.$java.$io.$Reader',
	/*
	 * public InputStreamReader(InputStream is)
	 */
	_init$Ljava_io_InputStream_$V: function(stream) {
		this.stream = stream;
	},
	/*
	 * public InputStreamReader(InputStream is, String enc) throws UnsupportedEncodingException
	 */
	_init$Ljava_io_InputStream_Ljava_lang_String_$V: function (stream) {
		// I don't care about your encoding
		this.stream = stream;
	},
	/*
	 * public void close() throws IOException
	 */
	$close$$V: function () {
		this.stream.$close$$V();
	},
	/*
	 * public int read(char[] cbuf) throws IOException
	 */
	$read$_C$I: function (output) {
		var buffer = new Array(this.stream.$available$$I());
		var length = this.stream.$read$_BII$I(buffer, 0, buffer.length);
		if (length === -1) {
			return -1;
		}
		var str = js2me.UTF8ToString(buffer, 0, length);
		for (var i = 0; i < str.length; i++) {
			output[i] = str.charCodeAt(i);
		}
		return str.length;
	},
	/*
	 * public int read()
	 */
	$read$$I: function() {
		return this.stream.$read$$I();
	}
});

