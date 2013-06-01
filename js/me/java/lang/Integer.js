js2me.createClass({
	_init_I_V: function (value) {
		this.value = value;
	},
	$toString_I_Ljava_lang_String_: function (i) {
		return new javaRoot.$java.$lang.$String(i.toString());
	},
	$parseInt_Ljava_lang_String__I: function (str) {
		return parseInt(str.text);
	},
	$hashCode__I: function () {
		return this.value;
	},
	package: 'javaRoot.$java.$lang',
	name: '$Integer'
});
