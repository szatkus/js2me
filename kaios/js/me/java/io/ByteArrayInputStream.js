js2me.createClass({
	/*
	 * public ByteArrayInputStream(byte[] buf)
	 */
	_init$_B$V: function (buffer) {
		if (buffer == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		this._init$_BII$V(buffer, 0, buffer.length);
	},
	/*
	 * public ByteArrayInputStream(byte[] buf)
	 */
	_init$_BII$V: function (buffer, offset, length) {
		this.$buf_B = buffer;
		this.$posI = offset;
		this.$countI = offset + length;
		this.$markI = 0;
	},
	/*
	 * public int available()
	 */
	$available$$I: function () {
		return this.$buf_B.length - this.$posI;
	},
	/*
	 * public void close() throws IOException
	 */
	$close$$V: function () {
		delete this.$buf_B;
		this.closed = true;
	},
	/*
	 * public boolean markSupported()
	 */
	$mark$I$V: function () {
		this.$markI = this.$posI;
	},
	/*
	 * public boolean markSupported()
	 */
	$markSupported$$Z: function () {
		return 1;
	},
	/*
	 * public int read()
	 */
	$read$$I: function () {
		if (this.$posI >= this.$countI) {
			return -1;
		}
		var value = this.$buf_B[this.$posI];
		if (value < 0) {
			value += 256;
		}
		this.$posI++;
		return value;
	},
	/*
	 * public void reset()
	 */
	$reset$$V: function () {
		this.$posI = this.$markI;
	},
	/*
	 * public long skip(long n)
	 */
	$skip$J$J: function (skip) {
		if (this.$posI + skip.lo < this.$buf_B.length) {
			var result = skip.lo;
			this.$posI += skip.lo;
		} else {
			var result = this.$buf_B.length - this.$posI;
			this.$posI = this.$buf_B.length;
		}
		return {hi: 0, lo: result};
	},
	superClass: 'javaRoot.$java.$io.$InputStream'
});
	

