js2me.createClass({
	construct: function (classObj) {
		this.classObj = classObj;
	},
	/*
	 * 
	 */
	$forName$Ljava_lang_String_$Ljava_lang_Class_: js2me.markUnsafe(function (name) {
		var innerName = ('javaRoot.' + name.text).replace(/\./g, '.$');
		var result;
		var async = true;
		var threadId = js2me.currentThread;
		js2me.loadClass(innerName, function (classObj) {
			async = false;
			result = new javaRoot.$java.$lang.$Class(classObj);
			js2me.restoreStack[threadId] = [function () {
				return result;
			}];
			js2me.isThreadSuspended = true;
			setTimeout(function () {
				js2me.restoreThread(threadId);
			}, 1);
		}, function () {
			js2me.restoreStack[threadId].unshift(function () {
				throw new javaRoot.$java.$lang.$ClassNotFoundException();
			});
			js2me.isThreadSuspended = true;
			setTimeout(function () {
				js2me.restoreThread(threadId);
			}, 1);
		});
		if (async) {
			js2me.isThreadSuspended = true;
		} else {
			return result;
		}
	}),
	/*
	 * public InputStream getResourceAsStream(String name)
	 */
	$getResourceAsStream$Ljava_lang_String_$Ljava_io_InputStream_: js2me.markUnsafe(function (name) {
		var resourceName = name.text;
		if (resourceName.charAt(0) == '/') {
			resourceName = resourceName.substr(1);
		}
		var stream;
		var async = true;
		js2me.loadResource(name.text, function (resource) {
			async = false;
			if (resource == null) {
				stream = null;
				return;
			}
			stream = new javaRoot.$java.$io.$BufferStream(new js2me.BufferStream(resource));
			js2me.restoreThread(threadId);
		});
		if (async) {
			js2me.isThreadSuspended = true;
			var threadId = js2me.currentThread;
			js2me.restoreStack[threadId] = [function () {
				return stream;
			}];
		} else {
			return stream;
		}
	}),
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
	},
	require: ['javaRoot.$java.$io.$BufferStream']
});
