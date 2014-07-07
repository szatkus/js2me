js2me.createClass({
	/*
	 * public static Connection open(String name) throws IOException
	 */
	$open$Ljava_lang_String_$Ljavax_microedition_io_Connection_: function (url) {
		var parts = url.text.split(':');
		/*if (parts[0] === 'socket') {
			return new javaRoot.$javax.$microedition.$io.$SocketConnectionImpl(parts[1], parseInt(parts[2]));
		}*/
		if (parts[0] === 'localmsg') {
			return new javaRoot.$com.$nokia.$mid.$s40.$io.$LocalMessageProtocolConnection(parts[1]);
		}
		if (parts[0] === 'file') {
			return new javaRoot.$javax.$microedition.$io.$file.$FileConnectionImpl(parts[1], parts[2]);
		}
		throw new Error('Unsupported protocol: ' + url.text);
	},
	$open$Ljava_lang_String_I$Ljavax_microedition_io_Connection_: function (url) {
		return this.$open$Ljava_lang_String_$Ljavax_microedition_io_Connection_(url);
	},
	$open$Ljava_lang_String_IZ$Ljavax_microedition_io_Connection_: function (url) {
		return this.$open$Ljava_lang_String_$Ljavax_microedition_io_Connection_(url);
	},
	require: ['javaRoot.$javax.$microedition.$io.$file.$FileConnectionImpl', 'javaRoot.$com.$nokia.$mid.$s40.$io.$LocalMessageProtocolConnection']
});
	

