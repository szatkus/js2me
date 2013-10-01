js2me.createClass({
	construct: function (className) {
		this.classObj = js2me.findClass(className);
		if (this.classObj == null) {
			throw new javaRoot.$java.$lang.ClassNotFoundException();
		}
	},
	/*
	 * 
	 */
	$forName$Ljava_lang_String_$Ljava_lang_Class_: function (name) {
		var innerName = ('javaRoot.' + name.text).replace(/\./g, '.$');
		return new javaRoot.$java.$lang.$Class(innerName);
	},
	/*
	 * public InputStream getResourceAsStream(String name)
	 */
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
	/*
	 * public String getName()
	 */
	$getName$$Ljava_lang_String_: function () {
		var className = this.classObj.prototype.className.replace(/\$/g, '').replace('javaRoot.', '');
		return new javaRoot.$java.$lang.$String(className);
	},
	/*
	 * public boolean isArray()
	 */
	$isArray$$Z: function () {
		if (this.className.indexOf('[') != -1) {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * public boolean isAssignableFrom(Class cls)
	 */
	$isAssignableFrom$Ljava_lang_Class_$Z: function (cls) {
		if (cls.classObj.prototype.isImplement(this.classObj.prototype.className)) {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * public boolean isInstance(Object obj)
	 */
	$isInstance$Ljava_lang_Object_$Z: function (obj) {
		if (obj.isImplement(this.classObj.prototype.className)) {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * public boolean isInterface()
	 */
	$isInterface$$Z: function (obj) {
		if (this.classObj.prototype.type == 'interface') {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * 
	 */
	$newInstance$$Ljava_lang_Object_: function () {
		var obj = new this.classObj();
		obj._init$$V();
		return obj;
	},
	/*
	 * public String toString()
	 */
	$toString$$Ljava_lang_String_: function () {
		var text = 'class ' + this.$getName$$Ljava_lang_String_().text;
		return new javaRoot.$java.$lang.$String(text);
	}
});
