js2me.createClass({
	/*
	 * public static Connection open(String name) throws IOException
	 */
	$open$Ljava_lang_String_$Ljavax_microedition_io_Connection_: function (url) {
		var parts = url.text.slice(':');
		if (parts[0] === 'socket') {
			return new javaRoot.$javax.$microedition.$io.$SocketConnectionImpl(parts[1], parseInt(parts[2]));
		}
		throw new Error('Unsupported protocol: ' + url.text);
	},
	$open$Ljava_lang_String_I$Ljavax_microedition_io_Connection_: function (url) {
		return this.$open$Ljava_lang_String_$Ljavax_microedition_io_Connection_(url);
	},
	$open$Ljava_lang_String_IZ$Ljavax_microedition_io_Connection_: function (url) {
		return this.$open$Ljava_lang_String_$Ljavax_microedition_io_Connection_(url);
	}
});
	

