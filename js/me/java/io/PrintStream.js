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
			this.output.$write__B_V(x);
		},
		$println_I_V: function (x) {
			this.$print_I_V(x);
			this.output.$write_B_V(10);
		},
		$print_I_V: function (x) {
			this.output.$write__B_V(x.toString());
		},
		$println_J_V: function (x) {
			
			this.output.$write__B_V();
			this.output.$write_B_V(10);
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$io')['$PrintStream'] = PrintStream;
})();

