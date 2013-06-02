js2me.createClass({
	_init$I$V: function (value) {
		this.value = value;
	},
	$toString$I$Ljava_lang_String_: function (i) {
		return new javaRoot.$java.$lang.$String(i.toString());
	},
	$parseInt$Ljava_lang_String_$I: function (str) {
		return parseInt(str.text);
	},
	$hashCode$$I: function () {
		return this.value;
	},
	$toHexString$I$Ljava_lang_String_: function (value) {
		return new javaRoot.$java.$lang.$String(value.toString(16));
	},
	package: 'javaRoot.$java.$lang',
	name: '$Integer'
});
