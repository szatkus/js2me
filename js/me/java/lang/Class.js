js2me.createClass({
	construct: function (className) {
		this.classObj = js2me.findClass(className);
		if (this.classObj == null) {
			throw new javaRoot.$java.$lang.ClassNotFoundException();
		}
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
	$forName$Ljava_lang_String_$Ljava_lang_Class_: function (name) {
		var innerName = ('javaRoot.' + name.text).replace(/\./g, '.$');
		return new javaRoot.$java.$lang.$Class(innerName);
	},
	$newInstance$$Ljava_lang_Object_: function () {
		var obj = new this.classObj();
		obj._init$$V();
		return obj;
	},
	package: 'javaRoot.$java.$lang',
	name: '$Class'
});
