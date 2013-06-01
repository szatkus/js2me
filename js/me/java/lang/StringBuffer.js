js2me.createClass({
	_init$$V: function () {
		this.capacity = 256;
		this.strings = [];
	},
	_init$I$V: function (length) {
		this._init__V();
		this.capacity = length;
	},
	$append$Ljava_lang_String_$Ljava_lang_StringBuffer_: function (str) {
		this.strings.push(str.text);
		return this;
	},
	$append$J$Ljava_lang_StringBuffer_: function (l) {
		this.strings.push(l.toString());
		return this;
	},
	$append$I$Ljava_lang_StringBuffer_: function (i) {
		this.strings.push(i.toString());
		return this;
	},
	$toString$$Ljava_lang_String_: function () {
		var text = '';
		for (var i = 0; i < this.strings.length; i++) {
			text += this.strings[i];
		}
		return new javaRoot.$java.$lang.$String(text);
	},
	$append$C$Ljava_lang_StringBuffer_: function (char) {
		this.strings.push(String.fromCharCode(char));
		return this;
	},
	package: 'javaRoot.$java.$lang',
	name: '$StringBuffer'
});

