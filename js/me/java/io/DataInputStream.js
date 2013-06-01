js2me.createClass({
	_init_Ljava_io_InputStream__V: function (stream) {
		this.stream = stream;
	},
	$readShort__S: function () {
		var value = (this.stream.$read__I() << 8) + this.stream.$read__I();
		if (value < 0) {
			throw new javaRoot.$java.$io.$EOFException();
		}
		if (value >= 0x8000) {
			value -= 0xffff;
		}
		return value;
	},
	$readInt__I: function () {
		var value = 0;
		for (var i = 0; i < 4; i++) {
			value = value << 8;
			var byte = this.stream.$read__I();
			if (byte == -1) {
				throw new javaRoot.$java.$io.$EOFException();
			} 
			value += byte;
		}
		if (value >= 0x80000000) {
			value -= 0xffffffff;
		}
		return value;
	},
	$readUnsignedByte__I: function () {
		return this.stream.$read__I();
	},
	$readFully__B_V: function (buffer) {
		if (this.stream.$read__BII_I(buffer, 0, buffer.length) < buffer.length) {
			throw new javaRoot.$java.$io.$EOFException();
		}
	},
	$readUTF__Ljava_lang_String_: function () {
		var length = (this.stream.$read__I() << 8) + this.stream.$read__I();
		var buffer = [];
		if (this.stream.$read__BII_I(buffer, 0, length) < length) {
			throw new javaRoot.$java.$io.$EOFException();
		}
		var result = js2me.UTF8ToString(buffer);
		if (result == null) {
			throw new javaRoot.$java.$io.$UTFDataFormatException();
		}
		return new javaRoot.$java.$lang.$String(result);
	},
	superClass: 'javaRoot.$java.$io.$InputStream',
	package: 'javaRoot.$java.$io',
	name: '$DataInputStream',
	require: ['javaRoot.$java.$io.$EOFException', 'javaRoot.$java.$io.$UTFDataFormatException']
});

