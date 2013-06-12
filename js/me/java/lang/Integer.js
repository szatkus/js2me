js2me.createClass({
	construct: function (value) {
		this.value = value;
	},
	_init$I$V: function (value) {
		this.value = value;
	},
	$toString$I$Ljava_lang_String_: function (i) {
		return new javaRoot.$java.$lang.$String(i.toString());
	},
	$parseInt$Ljava_lang_String_$I: function (str) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NumberFormatException();
		}
		var value = parseInt(str.text);
		if (isNaN(value)) {
			throw new javaRoot.$java.$lang.$NumberFormatException();
		}
		return value;
	},
	$hashCode$$I: function () {
		return this.value;
	},
	$toHexString$I$Ljava_lang_String_: function (value) {
		return new javaRoot.$java.$lang.$String(value.toString(16));
	},
	$valueOf$Ljava_lang_String_$Ljava_lang_Integer_: function (str) {
		return new javaRoot.$java.$lang.$Integer(this.$parseInt$Ljava_lang_String_$I(str));
	},
	$intValue$$I: function () {
		return this.value;
	}
});
