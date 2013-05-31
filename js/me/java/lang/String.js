js2me.createClass({
	construct: function (text) {
		this.text = text
	},
	_init_Ljava_lang_String__V: function (value) {
		this.text = value.text;
	},
	$equals_Ljava_lang_Object__Z: function (obj) {
		return (this.className == obj.className && this.text == obj.text);
	},
	$valueOf__CII_Ljava_lang_String_: function (data, offset, length) {
		var text = '';
		for (var i = 0; i < length; i++) {
			text += String.fromCharCode(data[offset + i]);
		}
		return new javaRoot.$java.$lang.$String(text);
	},
	package: 'javaRoot.$java.$lang',
	name: '$String'
});

