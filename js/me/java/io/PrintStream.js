js2me.createClass({
	construct: function (output) {
		this.output = output;
	},
	_init$Ljava_io_OutputStream_$V: function (output) {
		this.output = output;
	},
	$checkError$$Z: function () {
		return 0;
	},
	$print$_C$V: function (chars) {
		for (var i = 0; i < chars.length; i++) {
			this.$print$C$V(chars[i]);
		}
	},
	$print$C$V: function (char) {
		this.print(String.fromCharCode(char));
	},
	$print$D$V: function (value) {
		this.print(value.double.toString());
	},
	$print$F$V: function (value) {
		this.print(value.toString());
	},
	$print$I$V: function (x) {
		this.print(x.toString());
	},
	$print$J$V: function (value) {
		this.output.$write$_B$V(value.toString());
	},
	$print$Ljava_lang_Object_$V: function (obj) {
		this.$print$Ljava_lang_String_$V(obj.$toString$$Ljava_lang_String_());
	},
	$print$Ljava_lang_String_$V: function (str) {
		this.print(str.text);
	},
	$print$Z$V: function (value) {
		if (value == 0) {
			this.print("false");
		} else {
			this.print("true");
		}
	},
	$println$$V: function () {
		this.output.$write$I$V(10);
	},
	$println$_C$V: function (chars) {
		this.$print$_C$V(chars);
		this.$println$$V();
	},
	$println$C$V: function (char) {
		this.$print$C$V(char);
		this.$println$$V();
	},
	$println$D$V: function (value) {
		this.$print$D$V(value);
		this.$println$$V();
	},
	$println$F$V: function (value) {
		this.$print$F$V(value);
		this.$println$$V();
	},
	$println$I$V: function (x) {
		this.$print$I$V(x);
		this.output.$write$I$V(10);
	},
	$println$J$V: function (x) {
		this.$print$J$V(x);
		this.output.$write$I$V(10);
	},
	$println$Ljava_lang_String_$V: function (x) {
		this.$print$Ljava_lang_String_$V(x);
		this.output.$write$I$V(10);
	},
	$println$Ljava_lang_Object_$V: function (obj) {
		this.$println$Ljava_lang_String_$V(obj.$toString$$Ljava_lang_String_());
	},
	$println$Z$V: function (value) {
		this.$print$Z$V(value);
		this.$println$$V();
	},
	$write$I$V: function (byte) {
		this.output.$write$I$V(byte);
	},
	print: function (text) {
		var bytes = js2me.stringToUTF8(text);
		this.output.$write$_B$V(bytes);
	},
	superClass: 'javaRoot.$java.$io.$OutputStream'
});

