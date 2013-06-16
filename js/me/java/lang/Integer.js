js2me.createClass({
	$MIN_VALUEI: -2147483648,
	$MAX_VALUEI: 2147483647,
	construct: function (value) {
		this.value = value;
	},
	_init$I$V: function (value) {
		this.value = value;
	},
	$byteValue$$B: function () {
		var value = this.value;
		while (value > 127) {
			value -= 256;
		}
		while (value < -128) {
			value += 256;
		}
		return value;
	},
	$doubleValue$$D: function () {
		return new js2me.Double(this.value);
	},
	$equals$Ljava_lang_Object_$Z: function (obj) {
		if (obj != null && obj.value == this.value) {
			return 1;
		} else {
			return 0;
		}
	},
	$floatValue$$F: function () {
		return this.value;
	},
	$hashCode$$I: function () {
		return this.value;
	},
	$intValue$$I: function () {
		return this.value;
	},
	$longValue$$J: function () {
		if (this.value >= 0) {
			return new js2me.Long(0, this.value);
		} else {
			return new js2me.Long(-1, this.value);
		}
	},
	$parseInt$Ljava_lang_String_$I: function (str) {
		return javaRoot.$java.$lang.$Integer.prototype.$parseInt$Ljava_lang_String_I$I(str, 10);
	},
	$parseInt$Ljava_lang_String_I$I: function (str, radix) {
		if (str == null || radix < 2 || radix > 36 || (str != null && str.text == '')) {
			throw new javaRoot.$java.$lang.$NumberFormatException();
		}
		var value = parseInt(str.text, radix);
		if (isNaN(value)) {
			throw new javaRoot.$java.$lang.$NumberFormatException();
		}
		if (value < -0x80000000 || value >= 0x80000000) {
			throw new javaRoot.$java.$lang.$NumberFormatException();
		}
		return value;
	},
	$shortValue$$S: function () {
		var value = this.value;
		while (value > 32767) {
			value -= 65536;
		}
		while (value < -32768) {
			value += 65536;
		}
		return value;
	},
	$toBinaryString$I$Ljava_lang_String_: function (value) {
		if (value < 0) {
			value += 0x100000000;
		}
		return new javaRoot.$java.$lang.$String(value.toString(2));
	},
	$toHexString$I$Ljava_lang_String_: function (value) {
		if (value < 0) {
			value += 0x100000000;
		}
		return new javaRoot.$java.$lang.$String(value.toString(16));
	},
	$toOctalString$I$Ljava_lang_String_: function (value) {
		if (value < 0) {
			value += 0x100000000;
		}
		return new javaRoot.$java.$lang.$String(value.toString(8));
	},
	$toString$$Ljava_lang_String_: function () {
		return this.$toString$I$Ljava_lang_String_(this.value);
	},
	$toString$I$Ljava_lang_String_: function (i) {
		return new javaRoot.$java.$lang.$String(i.toString());
	},
	$toString$II$Ljava_lang_String_: function (i, radix) {
		if (radix < 2 || radix > 36) {
			radix = 10;
		}
		return new javaRoot.$java.$lang.$String(i.toString(radix));
	},
	$valueOf$Ljava_lang_String_$Ljava_lang_Integer_: function (str) {
		return this.$valueOf$Ljava_lang_String_I$Ljava_lang_Integer_(str, 10);
	},
	$valueOf$Ljava_lang_String_I$Ljava_lang_Integer_: function (str, radix) {
		var value = javaRoot.$java.$lang.$Integer.prototype.$parseInt$Ljava_lang_String_I$I(str, radix);
		return new javaRoot.$java.$lang.$Integer(value);
	}
});
