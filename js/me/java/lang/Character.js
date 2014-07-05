js2me.createClass({
	/*
	 * public Character(char value)
	 */
	_init$C$V: function (value) {
		this.value = value;
	},
	$charValue$$C: function () {
		return this.value;
	},
	/*
	 * public static boolean isDigit(char ch)
	 */
	$isDigit$C$Z: function (char) {
		if (char >= 48 && char <= 57) {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * public static char toUpperCase(char ch)
	 */
	$toUpperCase$C$C: function (char) {
		return String.fromCharCode(char).toUpperCase().charCodeAt(0);
	}
});
