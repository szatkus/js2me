js2me.createClass({
	construct: function () {
		this.$buf_B = [];
		this.$countI = 0;
	},
	_init$$V: function () {
	},
	_init$I$V: function (size) {
		if (size < 0) {
			throw new javaRoot.$java.$lang.$IllegalArgumentException();
		}
	},
	$reset$$V: function () {
		this.$buf_B = [];
		this.$countI = 0;
	},
	$size$$I: function () {
		return this.$countI;
	},
	$toByteArray$$_B: function () {
		return this.$buf_B;
	},
	$toString$$Ljava_lang_String_: function () {
		var text = js2me.UTF8ToString(this.$buf_B);
		return new javaRoot.$java.$lang.$String(text);
	},
	$write$I$V: function (b) {
		while (b > 127) {
			b -= 256;
		}
		this.$buf_B.push(b);
		this.$countI = this.$buf_B.length;
	},
	superClass: 'javaRoot.$java.$io.$OutputStream'
});

