(function () {
	function JavaClass(className) {
		this.classObj = js2me.findClass(className);
	}
	JavaClass.prototype = {
		$getResourceAsStream_Ljava_lang_String__Ljava_io_InputStream_: function (name) {
			var resourceName = name.text;
			if (resourceName.charAt(0) == '/') {
				resourceName = resourceName.substr(1);
			}
			var resource = js2me.resources[resourceName];
			var stream = new js2me.BufferStream(resource);
			return new javaRoot.$java.$io.$BufferStream(stream);
		},
		require: ['javaRoot.$java.$io.$BufferStream']
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$Class'] = JavaClass;
})();
