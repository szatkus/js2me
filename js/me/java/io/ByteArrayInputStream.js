js2me.createClass({
	_init__B_V: function (buffer) {
		this._init__BII_V(buffer, 0, buffer.length);
	},
	_init__BII_V: function (buffer, offset, length) {
		this.$buf_B = buffer;
		this.$posI = offset;
		this.$countI = offset + length;
	},
	$read__I: function () {
		if (!this.$buf_B) {
			throw new javaRoot.$java.$io.$IOException();
		}
		if (this.$posI >= this.$countI) {
			return -1;
		}
		var value = this.$buf_B[this.$posI];
		if (value < 0) {
			value += 0xFFFF;
		}
		this.$posI++;
		return value;
	},
	superClass: 'javaRoot.$java.$io.$InputStream',
	name: '$ByteArrayInputStream',
	package: 'javaRoot.$java.$io',
	require: ['javaRoot.$java.$io.$IOException']
});
	

