(function () {
	function PrintStream(output) {
		this.output = output;
	}
	PrintStream.prototype = {
		$println_Ljava_lang_String__V: function (x) {
			this.$print_Ljava_lang_String__V(x);
			this.output.$write_B_V(10);
		},
		$print_Ljava_lang_String__V: function (x) {
			for (var i = 0; i < x.text.length; i++) {
				this.output.$write_B_V(x.text.charCodeAt(i));
			}
		},
		$println_I_V: function (x) {
			this.$print_I_V(x);
			this.output.$write_B_V(10);
		},
		$print_I_V: function (x) {
			this.output.$write__B_V(x.toString());
		},
		$println_J_V: function (x) {
			this.output.$write__B_V(x.toString());
			this.output.$write_B_V(10);
		},
		$println_Ljava_lang_Object__V: function (obj) {
			this.$println_Ljava_lang_String__V(obj.$toString__Ljava_lang_String_());
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$io')['$PrintStream'] = PrintStream;
})();

