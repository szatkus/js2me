js2me.createClass({
	_init$$V: function () {
		this.capacity = 256;
		this.string = '';
	},
	_init$I$V: function (length) {
		this._init$$V();
		this.capacity = length;
	},
	_init$Ljava_lang_String_$V: function (str) {
		this.string = str.text;
	},
	$append$Ljava_lang_String_$Ljava_lang_StringBuffer_: function (str) {
		this.string += str.text;
		return this;
	},
	$append$J$Ljava_lang_StringBuffer_: function (l) {
		this.string += js2me.UTF8ToString(l.toString());
		return this;
	},
	$append$I$Ljava_lang_StringBuffer_: function (i) {
		this.string += i.toString();
		return this;
	},
	$toString$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.string);
	},
	$append$C$Ljava_lang_StringBuffer_: function (char) {
		this.string += String.fromCharCode(char);
		return this;
	},
	$append$Ljava_lang_Object_$Ljava_lang_StringBuffer_: function (obj) {
		return this.$append$Ljava_lang_String_$Ljava_lang_StringBuffer_(obj.$toString$$Ljava_lang_String_());
	},
	$length$$I: function () {
		return this.string.length;
	},
	$delete$II$Ljava_lang_StringBuffer_: function (start, end) {
		if (start < 0 || start > this.string.length || start > end) {
			throw new javaRoot.$java.$lang.$StringIndexOutOfBoundsException();
		}
		this.string = this.string.substring(0, start) + this.string.substring(end);
		return this;
	},
	$deleteCharAt$I$Ljava_lang_StringBuffer_: function (index) {
		return this.$delete$II$Ljava_lang_StringBuffer_(index, index + 1);
	},
	$charAt$I$C: function (index) {
		if (index < 0 || index >= this.string.length) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		return this.string.charCodeAt(index);
	},
	$ensureCapacity$I$V: function (capacity) {
		this.capacity = capacity;
	},
	package: 'javaRoot.$java.$lang',
	name: '$StringBuffer'
});

