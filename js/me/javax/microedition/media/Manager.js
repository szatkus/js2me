js2me.createClass({
	/*
	 * 
	 */
	$createPlayer$Ljava_io_InputStream_Ljava_lang_String_$Ljavax_microedition_media_Player_: js2me.markUnsafe(function(stream, mime) {
		if (stream == null) {
			throw new javaRoot.$java.$lang.$IllegalArgumentException();
		}
		return new javaRoot.$javax.$microedition.$media.$PlayerImpl(stream, mime.text);
	}),
	require: ['javaRoot.$javax.$microedition.$media.$PlayerImpl']
});
	

