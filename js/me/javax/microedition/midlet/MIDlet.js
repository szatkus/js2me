js2me.createClass({
	$notifyDestroyed$$V: function () {
		//TODO
		console.log('EXIT');
	},
	_init$$V: function () {
	},
	$getAppProperty$Ljava_lang_String_$Ljava_lang_String_: function (name) {
		var property = js2me.manifest[name.text.toLowerCase()];
		if (property != null) {
			return new javaRoot.$java.$lang.$String(property);
		}
	},
	package: 'javaRoot.$javax.$microedition.$midlet',
	name: '$MIDlet'
});

