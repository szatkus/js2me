js2me.createClass({
	construct: function (double) {
		this.double = double;
	},
	/*
	 * public Double(double value)
	 */
	_init$D$V: function (double) {
		this.double = double;
	},
	/*
	 * public double doubleValue()
	 */
	$doubleValue$$D: function () {
		return this.double;
	},
	/*
	 * public static double parseDouble(String s) throws NumberFormatException
	 */
	$parseDouble$Ljava_lang_String_$D: function (str) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		//TODO: hex
		if (str.text.indexOf('0x') != -1) {
			throw new Error('Hex double!');
		}
		var value = parseFloat(str.text);
		if (isNaN(value)) {
			throw new javaRoot.$java.$lang.$NumberFormatException();
		}
		return {double: value};
	},
	/*
	 * public static Double valueOf(String s) throws NumberFormatException
	 */
	$valueOf$Ljava_lang_String_$Ljava_lang_Double_: function (str) {
		var double = this.$parseDouble$Ljava_lang_String_$D(str);
		return new javaRoot.$java.$lang.$Double(double);
	}
});
