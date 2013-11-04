js2me.createClass({
	construct: function () {
		this.$buf_B = [];
		this.$countI = 0;
	},
	/*
	 * public ByteArrayOutputStream()
	 */
	_init$$V: function () {
	},
	/*
	 * public ByteArrayOutputStream()
	 */
	_init$I$V: function (size) {
		if (size < 0) {
			throw new javaRoot.$java.$lang.$IllegalArgumentException();
		}
	},
	/*
	 * public void reset()
	 */
	$reset$$V: function () {
		this.$buf_B = [];
		this.$countI = 0;
	},
	/*
	 * public ByteArrayOutputStream(int size)
	 */
	$size$$I: function () {
		return this.$countI;
	},
	/*
	 * public byte[] toByteArray()
	 */
	$toByteArray$$_B: function () {
		return this.$buf_B.slice(0);
	},
	/*
	 * public String toString()
	 */
	$toString$$Ljava_lang_String_: function () {
		var text = js2me.UTF8ToString(this.$buf_B);
		return new javaRoot.$java.$lang.$String(text);
	},
	/*
	 * public void write(int b)
	 */
	$write$I$V: function (b) {
		while (b > 127) {
			b -= 256;
		}
		while (b < -128) {
			b += 256;
		}
		this.$buf_B.push(b);
		this.$countI = this.$buf_B.length;
	},
	superClass: 'javaRoot.$java.$io.$OutputStream'
});

