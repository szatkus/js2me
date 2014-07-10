js2me.createClass({
	/*
	 * public final void notifyDestroyed()
	 */
	$notifyDestroyed$$V: function () {
		//TODO
		console.log('EXIT');
		location.reload();
	},
	/*
	 * protected MIDlet()
	 */
	_init$$V: function () {
	},
	/*
	 * public final String getAppProperty(String key)
	 */
	$getAppProperty$Ljava_lang_String_$Ljava_lang_String_: function (name) {
		var property = js2me.manifest[name.text.toLowerCase()];
		if (property != null) {
			return new javaRoot.$java.$lang.$String(property);
		}
		return null;
	}
});

