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
	package: 'javaRoot.$java.$lang',
	name: '$String'
});

