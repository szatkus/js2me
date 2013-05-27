(function () {
	function JavaString(text) {
		this.text = text
	};
	JavaString.prototype = {
		_init_Ljava_lang_String__V: function (value) {
			this.text = value.text;
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$String'] = JavaString;
})();

