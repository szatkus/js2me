js2me.createClass({
	construct: function (text) {
		this.text = text
	},
	_init$Ljava_lang_String_$V: function (value) {
		this.text = value.text;
	},
	_init$_BLjava_lang_String_$V: function (data, enc) {
		this.text = js2me.UTF8ToString(data);
	},
	_init$_B$V: function (data) {
		this._init$_BLjava_lang_String_$V(data);
	},
	_init$_BII$V: function (data, offset, length) {
		this.text = js2me.UTF8ToString(data, offset, length);
	},
	_init$_C$V: function (data) {
		if (data == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		this.text = '';
		for (var i = 0; i < data.length; i++) {
			this.text += String.fromCharCode(data[i]);
		}
	},
	$equals$Ljava_lang_Object_$Z: function (obj) {
		if (obj == null) {
			return 0;
		}
		if (this.className == obj.className && this.text == obj.text) {
			return 1;
		} else {
			return 0;
		}
	},
	$equalsIgnoreCase$Ljava_lang_String_$Z: function (str) {
		if (str == null) {
			return 0;
		}
		if (this.text.toLowerCase() == str.text.toLowerCase()) {
			return 1;
		} else {
			return 0;
		}
	},
	$toString$$Ljava_lang_String_: function () {
		return this;
	},
	$valueOf$_CII$Ljava_lang_String_: function (data, offset, length) {
		var text = '';
		for (var i = 0; i < length; i++) {
			text += String.fromCharCode(data[offset + i]);
		}
		return new javaRoot.$java.$lang.$String(text);
	},
	$valueOf$I$Ljava_lang_String_: function (value) {
		return new javaRoot.$java.$lang.$String(value.toString());
	},
	$valueOf$C$Ljava_lang_String_: function (char) {
		return new javaRoot.$java.$lang.$String(String.fromCharCode(char));
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
		return js2me.stringToUTF8(this.text);
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
	$indexOf$I$I: function (charCode) {
		return this.$indexOf$II$I(charCode, 0);
	},
	$indexOf$II$I: function (charCode, index) {
		if (index < 0) {
			index = 0;
		}
		for (var i = index; i < this.text.length; i++) {
			if (this.text.charCodeAt(i) == charCode) {
				return i;
			}
		}
		return -1;
	},
	$lastIndexOf$I$I: function (charCode) {
		for (var i = this.text.length - 1; i >= 0; i--) {
			if (this.text.charCodeAt(i) == charCode) {
				return i;
			}
		}
		return -1;
	},
	$lastIndexOf$Ljava_lang_String_$I: function (str) {
		return this.text.lastIndexOf(str.text);
	},
	$substring$II$Ljava_lang_String_: function (beginIndex, endIndex) {
		if (beginIndex < 0 || endIndex > this.text.length || beginIndex > endIndex) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		return new javaRoot.$java.$lang.$String(this.text.substring(beginIndex, endIndex));
	},
	$substring$I$Ljava_lang_String_: function (index) {
		return this.$substring$II$Ljava_lang_String_(index, this.text.length);
	},
	$charAt$I$C: function (index) {
		if (index < 0 || index >= this.text.length) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		return this.text.charCodeAt(index);
	},
	$hashCode$$I: function () {
		var hashCode = 0;
		for (var i = 0; i < this.text.length; i++) {
			var value = this.text.charCodeAt(i);
			var n = this.text.length - i - 1;
			for (var j = 0; j < n; j++) {
				value = (value * 31) % 0x100000000;
			}
			hashCode = (hashCode + value) % 0x100000000;
		}
		if (hashCode >= 0x80000000) {
			hashCode -= 0x80000000;
		}
		return hashCode;
	},
	$toUpperCase$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.text.toUpperCase());
	},
	$indexOf$Ljava_lang_String_$I: function (str) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		return this.text.indexOf(str.text);
	},
	$startsWith$Ljava_lang_String_$Z: function (str) {
		if (this.text.indexOf(str.text) == 0) {
			return 1;
		} else {
			return 0;
		}
	},
	$endsWith$Ljava_lang_String_$Z: function (str) {
		if (this.text.indexOf(str.text) == this.text.length - str.text.length) {
			return 1;
		} else {
			return 0;
		}
	}
});

