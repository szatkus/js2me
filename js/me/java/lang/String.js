js2me.createClass({
	construct: function (text) {
		this.text = text
	},
	_init$Ljava_lang_String_$V: function (value) {
		this.text = value.text;
	},
	$equals$Ljava_lang_Object_$Z: function (obj) {
		return (this.className == obj.className && this.text == obj.text);
	},
	$valueOf$_CII$Ljava_lang_String_: function (data, offset, length) {
		var text = '';
		for (var i = 0; i < length; i++) {
			text += String.fromCharCode(data[offset + i]);
		}
		return new javaRoot.$java.$lang.$String(text);
	},
	$compareTo$Ljava_lang_String_$I: function (str) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (this.text == str.text) {
			return 0;
		}
		if (this.text.length != str.text.length) {
			return this.text.length - str.text.length;
		}
		for (var i = 0; i < this.text.length; i++) {
			if (this.text.charAt(i) != str.text.charAt(i)) {
				return this.text.charCodeAt(i) - str.text.charCodeAt(i);
			}
		}
	},
	$getBytes$$_B: function () {
		var result = [];
		for (var i = 0; i < this.text.length; i++) {
			var char = this.text.charCodeAt(i);
			if (char >= 0x01 && char <= 0x007F) {
				result.push(char);
			}
			if (char == 0 || (char >= 0x0080 && char <= 0x07FF)) {
				result.push(0xC0 | (0x1F & (char >> 6)));
				result.push(0x80 | (0x3F & char));
			}
			if (char >= 0x0800 && char <= 0xFFFF) {
				result.push(0xE0 | (0x0F & (char >> 12)));
				result.push(0x80 | (0x3F & (char >>  6)));
				result.push(0x80 | (0x3F & char));
			}
		}
		return result;
	},
	$toCharArray$$_C: function () {
		var result = [];
		for (var i = 0; i < this.text.length; i++) {
			result.push(this.text.charCodeAt(i));
		}
		return result;
	},
	$length$$I: function () {
		return this.text.length;
	},
	$trim$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.text.trim());
	},
	$getChars$II_CI$V: function (srcBegin, srcEnd, dst, dstBegin) {
		var length = srcEnd - srcBegin;
		if (srcBegin < 0 || srcBegin > srcEnd || srcEnd > this.text.length ||
			dstBegin < 0 || dstBegin + length > dst.length) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		if (dst == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		for (var i = 0; i < length; i++) {
			dst[dstBegin + i] = this.text.charCodeAt(srcBegin + i);
		}
	},
	package: 'javaRoot.$java.$lang',
	name: '$String'
});

