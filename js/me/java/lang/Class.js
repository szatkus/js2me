js2me.createClass({
	construct: function (className) {
		this.classObj = js2me.findClass(className);
	},
	$getResourceAsStream$Ljava_lang_String_$Ljava_io_InputStream_: function (name) {
		var resourceName = name.text;
		if (resourceName.charAt(0) == '/') {
			resourceName = resourceName.substr(1);
		}
		var resource = js2me.resources[resourceName];
		if (resource == null) {
			return null;
		}
		var stream = new js2me.BufferStream(resource);
		return new javaRoot.$java.$io.$BufferStream(stream);
	},
	$getName$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.classObj.prototype.className);
	},
	require: ['javaRoot.$java.$io.$BufferStream'],
	package: 'javaRoot.$java.$lang',
	name: '$Class'
});
