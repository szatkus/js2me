js2me.createClass({
	construct: function (output) {
		this.output = output;
	},
	/*
	 * public PrintStream(OutputStream out)
	 */
	_init$Ljava_io_OutputStream_$V: function (output) {
		this.output = output;
	},
	/*
	 * public boolean checkError()
	 */
	$checkError$$Z: function () {
		return 0;
	},
	/*
	 * public void print(boolean b)
	 */
	$print$_C$V: function (chars) {
		for (var i = 0; i < chars.length; i++) {
			this.$print$C$V(chars[i]);
		}
	},
	/*
	 * public void print(boolean b)
	 */
	$print$C$V: function (char) {
		this.print(String.fromCharCode(char));
	},
	/*
	 * public void print(boolean b)
	 */
	$print$D$V: function (value) {
		this.print(value.double.toString());
	},
	/*
	 * public void print(boolean b)
	 */
	$print$F$V: function (value) {
		this.print(value.toString());
	},
	/*
	 * public void print(boolean b)
	 */
	$print$I$V: function (x) {
		this.print(x.toString());
	},
	/*
	 * public void print(boolean b)
	 */
	$print$J$V: function (value) {
		this.output.$write$_B$V(js2me.longToString(value));
	},
	/*
	 * public void print(boolean b)
	 */
	$print$Ljava_lang_Object_$V: function (obj) {
		this.$print$Ljava_lang_String_$V(obj.$toString$$Ljava_lang_String_());
	},
	/*
	 * public void print(boolean b)
	 */
	$print$Ljava_lang_String_$V: function (str) {
		this.print(str.text);
	},
	/*
	 * public void print(boolean b)
	 */
	$print$Z$V: function (value) {
		if (value == 0) {
			this.print("false");
		} else {
			this.print("true");
		}
	},
	/*
	 * public void println()
	 */
	$println$$V: function () {
		this.output.$write$I$V(10);
	},
	/*
	 * public void println()
	 */
	$println$_C$V: function (chars) {
		this.$print$_C$V(chars);
		this.$println$$V();
	},
	/*
	 * public void println()
	 */
	$println$C$V: function (char) {
		this.$print$C$V(char);
		this.$println$$V();
	},
	/*
	 * public void println()
	 */
	$println$D$V: function (value) {
		this.$print$D$V(value);
		this.$println$$V();
	},
	/*
	 * public void println()
	 */
	$println$F$V: function (value) {
		this.$print$F$V(value);
		this.$println$$V();
	},
	/*
	 * public void println()
	 */
	$println$I$V: function (x) {
		this.$print$I$V(x);
		this.output.$write$I$V(10);
	},
	/*
	 * public void println()
	 */
	$println$J$V: function (x) {
		this.$print$J$V(x);
		this.output.$write$I$V(10);
	},
	/*
	 * public void println()
	 */
	$println$Ljava_lang_String_$V: function (x) {
		this.$print$Ljava_lang_String_$V(x);
		this.output.$write$I$V(10);
	},
	/*
	 * public void println()
	 */
	$println$Ljava_lang_Object_$V: function (obj) {
		this.$println$Ljava_lang_String_$V(obj.$toString$$Ljava_lang_String_());
	},
	/*
	 * public void println()
	 */
	$println$Z$V: function (value) {
		this.$print$Z$V(value);
		this.$println$$V();
	},
	/*
	 * public void write(int b)
	 */
	$write$I$V: function (byte) {
		this.output.$write$I$V(byte);
	},
	print: function (text) {
		var bytes = js2me.stringToUTF8(text);
		this.output.$write$_B$V(bytes);
	},
	superClass: 'javaRoot.$java.$io.$OutputStream'
});

