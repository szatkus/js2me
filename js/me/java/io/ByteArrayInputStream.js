js2me.createClass({
	_init__B_V: function (array) {
		this.$array_B = array;
		this.$posI = 0;
	},
	$read__I: function () {
		if (!this.$array_B) {
			throw new javaRoot.$java.$io.$IOException();
		}
		if (this.$posI >= this.$array_B.length) {
			return -1;
		}
		var value = this.$array_B[this.$posI];
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
	

