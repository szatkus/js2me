js2me.createClass({
	/*
	 * public StringBuffer()
	 */
	_init$$V: function () {
		this.capacity = 256;
		this.string = '';
	},
	/*
	 * public StringBuffer()
	 */
	_init$I$V: function (length) {
		this._init$$V();
		this.capacity = length;
	},
	/*
	 * public StringBuffer()
	 */
	_init$Ljava_lang_String_$V: function (str) {
		this.string = str.text;
	},
	/*
	 * public StringBuffer append(Object obj)
	 */
	$append$Ljava_lang_String_$Ljava_lang_StringBuffer_: function (str) {
		if (str !=  null) {
			this.string += str.text;
		} else {
			this.string += 'null';
		}
		return this;
	},
	/*
	 * public StringBuffer append(Object obj)
	 */
	$append$J$Ljava_lang_StringBuffer_: function (l) {
		this.string += js2me.UTF8ToString(l.toString());
		return this;
	},
	/*
	 * public StringBuffer append(Object obj)
	 */
	$append$I$Ljava_lang_StringBuffer_: function (i) {
		this.string += i.toString();
		return this;
	},
	/*
	 * public String toString()
	 */
	$toString$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.string);
	},
	/*
	 * public StringBuffer append(Object obj)
	 */
	$append$C$Ljava_lang_StringBuffer_: function (char) {
		this.string += String.fromCharCode(char);
		return this;
	},
	/*
	 * public StringBuffer append(Object obj)
	 */
	$append$Ljava_lang_Object_$Ljava_lang_StringBuffer_: function (obj) {
		return this.$append$Ljava_lang_String_$Ljava_lang_StringBuffer_(obj.$toString$$Ljava_lang_String_());
	},
	/*
	 * public StringBuffer append(Object obj)
	 */
	$append$D$Ljava_lang_StringBuffer_: function (value) {
		this.string += value.double.toString();
		return this;
	},
	/*
	 * public StringBuffer append(Object obj)
	 */
	$append$Z$Ljava_lang_StringBuffer_: function (value) {
		if (value != 1) {
			this.strings += 'true';
		} else {
			this.strings += 'false';
		}
		return this;
	},
	/*
	 * public StringBuffer(int length)
	 */
	$length$$I: function () {
		return this.string.length;
	},
	/*
	 * public StringBuffer delete(int start, int end)
	 */
	$delete$II$Ljava_lang_StringBuffer_: function (start, end) {
		if (start < 0 || start > this.string.length || start > end) {
			throw new javaRoot.$java.$lang.$StringIndexOutOfBoundsException();
		}
		this.string = this.string.substring(0, start) + this.string.substring(end);
		return this;
	},
	/*
	 * public StringBuffer deleteCharAt(int index)
	 */
	$deleteCharAt$I$Ljava_lang_StringBuffer_: function (index) {
		return this.$delete$II$Ljava_lang_StringBuffer_(index, index + 1);
	},
	/*
	 * public char charAt(int index)
	 */
	$charAt$I$C: function (index) {
		if (index < 0 || index >= this.string.length) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		return this.string.charCodeAt(index);
	},
	/*
	 * public void ensureCapacity(int minimumCapacity)
	 */
	$ensureCapacity$I$V: function (capacity) {
		this.capacity = capacity;
	},
	/*
	 * public StringBuffer insert(int offset, Object obj)
	 */
	$insert$II$Ljava_lang_StringBuffer_: function (value, index) {
		this.string = this.string.substr(0, index) + value.toString() + this.string.substr(index);
	},
	package: 'javaRoot.$java.$lang',
	name: '$StringBuffer'
});

