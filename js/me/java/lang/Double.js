js2me.createClass({
	construct: function (double) {
		this.double = double;
	},
	/*
	 * public double doubleValue()
	 */
	$doubleValue$$D: function () {
		return this.double;
	},
	/*
	 * 
	 */
	$valueOf$Ljava_lang_String_$Ljava_lang_Double_: function (str) {
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
		return new javaRoot.$java.$lang.$Double(new js2me.Double(value));
	}
});
