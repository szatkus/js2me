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
	package: 'javaRoot.$java.$lang',
	name: '$String'
});

