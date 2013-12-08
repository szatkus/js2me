js2me.createClass({
	/*
	 * public Character(char value)
	 */
	_init$C$V: function (value) {
		this.value = value;
	},
	/*
	 * public static char toUpperCase(char ch)
	 */
	$toUpperCase$C$C: function (char) {
		return String.fromCharCode(char).toUpperCase().charCodeAt(0);
	}
});
