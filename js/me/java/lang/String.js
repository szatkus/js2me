js2me.createClass({
	construct: function (text) {
		this.text = text || '';
	},
	/*
	 * public String()
	 */
	_init$Ljava_lang_String_$V: function (value) {
		this.text = value.text;
	},
	/*
	 * public String(byte[] bytes, String enc)
	 */
	_init$_BLjava_lang_String_$V: function (data, enc) {
		if (enc.text.toLowerCase() === 'utf-8') {
			this.text = js2me.UTF8ToString(data);
			return;
		}
		if (enc.text.toLowerCase() === 'iso-8859-1') {
			this.text = '';
			for (var i = 0; i < data.length; i++) {
				this.text += String.fromCharCode(data[i]);
			}
			return;
		}
		throw new javaRoot.$java.$io.$UnsupportedEncodingException(enc.text);
	},
	/*
	 * public String()
	 */
	_init$_B$V: function (data) {
		this._init$_BLjava_lang_String_$V(data);
	},
	/*
	 * public String()
	 */
	_init$_BII$V: function (data, offset, length) {
		this.text = js2me.UTF8ToString(data, offset, length);
	},
	/*
	 * public String()
	 */
	_init$_BIILjava_lang_String_$V: function (data, offset, length) {
		this._init$_BII$V(data, offset, length);
	},
	/*
	 * public String()
	 */
	_init$_C$V: function (data) {
		if (data == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		this.text = '';
		for (var i = 0; i < data.length; i++) {
			this.text += String.fromCharCode(data[i]);
		}
	},
	/*
	 * public String()
	 */
	_init$_CII$V: function (data, offset, length) {
		this._init$_C$V(data.slice(offset, offset + length));
	},
	/*
	 * public boolean equals(Object anObject)
	 */
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
	/*
	 * public boolean equalsIgnoreCase(String anotherString)
	 */
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
	/*
	 * public boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)
     */
	$regionMatches$ZILjava_lang_String_II$Z: function (ignoreCase, toffset, other, ooffset, len) {
		if (toffset < 0 || ooffset < 0) {
			return 0;
		}
		if (toffset+len > this.text.length || ooffset+len > other.text.length) {
			return 0;
		}
		if (ignoreCase && this.text.toLowerCase().substr(toffset, len) === other.text.toLowerCase().substr(ooffset, len)) {
			return 1;
		}
		if (this.text.substr(toffset, len) === other.text.substr(ooffset, len)) {
			return 1;
		}
		return 0;
	},
	/*
	 * public String toString()
	 */
	$toString$$Ljava_lang_String_: function () {
		return this;
	},
	/*
	 * public static String valueOf(Object obj)
	 */
	$valueOf$_CII$Ljava_lang_String_: function (data, offset, length) {
		var text = '';
		for (var i = 0; i < length; i++) {
			text += String.fromCharCode(data[offset + i]);
		}
		return new javaRoot.$java.$lang.$String(text);
	},
	/*
	 * public static String valueOf(Object obj)
	 */
	$valueOf$I$Ljava_lang_String_: function (value) {
		return new javaRoot.$java.$lang.$String(value.toString());
	},
	/*
	 * public static String valueOf(Object obj)
	 */
	$valueOf$C$Ljava_lang_String_: function (char) {
		return new javaRoot.$java.$lang.$String(String.fromCharCode(char));
	},
	/*
	 * public static String valueOf(Object obj)
	 */
	$valueOf$Ljava_lang_Object_$Ljava_lang_String_: function (obj) {
		if (obj == null) {
			return new javaRoot.$java.$lang.$String('null');
		}
		return obj.$toString$$Ljava_lang_String_();
	},
	/*
	 * public int compareTo(String anotherString)
	 */
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
	/*
	 * public byte[] getBytes()
	 */
	$getBytes$$_B: function () {
		return js2me.stringToUTF8(this.text);
	},
	/*
	 * public char[] toCharArray()
	 */
	$toCharArray$$_C: function () {
		var result = [];
		for (var i = 0; i < this.text.length; i++) {
			result.push(this.text.charCodeAt(i));
		}
		return result;
	},
	/*
	 * public int length()
	 */
	$length$$I: function () {
		return this.text.length;
	},
	/*
	 * public String trim()
	 */
	$trim$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.text.trim());
	},
	/*
	 * public void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)
	 */
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
	/*
	 * public int indexOf(int ch)
	 */
	$indexOf$I$I: function (charCode) {
		return this.$indexOf$II$I(charCode, 0);
	},
	/*
	 * public int indexOf(int ch)
	 */
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
	/*
	 * public int lastIndexOf(int ch)
	 */
	$lastIndexOf$I$I: function (charCode) {
		for (var i = this.text.length - 1; i >= 0; i--) {
			if (this.text.charCodeAt(i) == charCode) {
				return i;
			}
		}
		return -1;
	},
	/*
	 * public int lastIndexOf(int ch)
	 */
	$lastIndexOf$Ljava_lang_String_$I: function (str) {
		return this.text.lastIndexOf(str.text);
	},
	/*
	 * public String substring(int beginIndex)
	 */
	$substring$II$Ljava_lang_String_: function (beginIndex, endIndex) {
		if (beginIndex < 0 || endIndex > this.text.length || beginIndex > endIndex) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		return new javaRoot.$java.$lang.$String(this.text.substring(beginIndex, endIndex));
	},
	/*
	 * public String substring(int beginIndex)
	 */
	$substring$I$Ljava_lang_String_: function (index) {
		return this.$substring$II$Ljava_lang_String_(index, this.text.length);
	},
	/*
	 * public char charAt(int index)
	 */
	$charAt$I$C: function (index) {
		if (index < 0 || index >= this.text.length) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		return this.text.charCodeAt(index);
	},
	/*
	 * public int hashCode()
	 */
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
	/*
	 * public String replace(char oldChar, char newChar)
	 */
	$replace$CC$Ljava_lang_String_: function (oldChar, newChar) {
		return new javaRoot.$java.$lang.$String(this.text.replace(String.fromCharCode(oldChar), String.fromCharCode(newChar)));
	},
	/*
	 * public String toLowerCase()
	 */
	$toLowerCase$$Ljava_lang_String_: function () {
		new javaRoot.$java.$lang.$String(this.text.toLowerCase());
	},
	/*
	 * public String toUpperCase()
	 */
	$toUpperCase$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.text.toUpperCase());
	},
	/*
	 * public int indexOf(int ch)
	 */
	$indexOf$Ljava_lang_String_$I: function (str) {
		return this.$indexOf$Ljava_lang_String_I$I(str, 0);
	},
	/*
	 * public int indexOf(int ch)
	 */
	$indexOf$Ljava_lang_String_I$I: function (str, start) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		return this.text.indexOf(str.text, start);
	},
	/*
	 * public boolean startsWith(String prefix, int toffset)
	 */
	$startsWith$Ljava_lang_String_$Z: function (str) {
		if (this.text.indexOf(str.text) == 0) {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * public boolean endsWith(String suffix)
	 */
	$endsWith$Ljava_lang_String_$Z: function (str) {
		if (this.text.indexOf(str.text) == this.text.length - str.text.length) {
			return 1;
		} else {
			return 0;
		}
	}
});

