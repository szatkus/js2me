js2me.createClass({
	/*
	 * public Character(char value)
	 */
	_init$C$V: function (value) {
		this.value = value;
	},
	/*
	 * public char charValue()
	 */
	$charValue$$C: function () {
		return this.value;
	},
	/*
	 * public static int digit(char ch, int radix)
	 */
	$digit$CI$I: function (char, radix) {
		if (radix < 2 || radix > 36) {
			return -1;
		}
		var value = -1;
		if (char >= 48 && char <= 57) {
			value = char - 48;
		}
		if (char >= 97 && char <= 122) {
			value = char - 87;
		}
		if (char >= 65 && char <= 90) {
			value = char - 55;
		}
		if (value >= 0 && value < radix) {
			return value;
		}
		return -1;
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
	 * public String toString()
	 */
	$toString$$Ljava_lang_String_: function () {
		var text = String.fromCharCode(this.value);
		return new javaRoot.$java.$lang.$String(text);
	},
	/*
	 * public static char toUpperCase(char ch)
	 */
	$toUpperCase$C$C: function (char) {
		return String.fromCharCode(char).toUpperCase().charCodeAt(0);
	}
});
