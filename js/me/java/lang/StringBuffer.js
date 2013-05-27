(function () {
	function StringBuffer () {
	}
	StringBuffer.prototype = {
		_init__V: function () {
			this.capacity = 256;
			this.strings = [];
		},
		_init_I_V: function (length) {
			this._init__V();
			this.capacity = length;
		},
		$append_Ljava_lang_String__Ljava_lang_StringBuffer_: function (str) {
			this.strings.push(str.text);
			return this;
		},
		$append_J_Ljava_lang_StringBuffer_: function (l) {
			this.strings.push(l.toString());
			return this;
		},
		$append_I_Ljava_lang_StringBuffer_: function (i) {
			this.strings.push(i.toString());
			return this;
		},
		$toString__Ljava_lang_String_: function () {
			var text = '';
			for (var i = 0; i < this.strings.length; i++) {
				text += this.strings[i];
			}
			return new javaRoot.$java.$lang.$String(text);
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$StringBuffer'] = StringBuffer ;
})();

