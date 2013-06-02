js2me.createClass({
	_init$Ljava_io_InputStream_$V: function (stream) {
		this.stream = stream;
	},
	$readShort$$S: function () {
		var value = (this.stream.$read$$I() << 8) + this.stream.$read__I();
		if (value < 0) {
			throw new javaRoot.$java.$io.$EOFException();
		}
		if (value >= 0x8000) {
			value -= 0xffff;
		}
		return value;
	},
	$readInt$$I: function () {
		var value = 0;
		for (var i = 0; i < 4; i++) {
			value = value << 8;
			var byte = this.stream.$read$$I();
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
	$readByte$$B: function () {
		var value = this.stream.$read$$I();
		if (value >= 128) {
			value -= 256;
		}
		return value;
	},
	$readUnsignedByte$$I: function () {
		return this.stream.$read$$I();
	},
	$readUnsignedShort$$I: function () {
		return (this.stream.$read$$I() << 8) + this.stream.$read$$I();
	},
	$readFully$_B$V: function (buffer) {
		if (this.stream.$read$_BII$I(buffer, 0, buffer.length) < buffer.length) {
			throw new javaRoot.$java.$io.$EOFException();
		}
	},
	$readUTF$$Ljava_lang_String_: function () {
		var length = (this.stream.$read$$I() << 8) + this.stream.$read$$I();
		var buffer = [];
		if (this.stream.$read$_BII$I(buffer, 0, length) < length) {
			throw new javaRoot.$java.$io.$EOFException();
		}
		var result = js2me.UTF8ToString(buffer);
		if (result == null) {
			throw new javaRoot.$java.$io.$UTFDataFormatException();
		}
		return new javaRoot.$java.$lang.$String(result);
	},
	$skip$J$J: function (n) {
		this.stream.$skip$J$J(n);
	},
	superClass: 'javaRoot.$java.$io.$InputStream',
	package: 'javaRoot.$java.$io',
	name: '$DataInputStream',
	require: ['javaRoot.$java.$io.$EOFException', 'javaRoot.$java.$io.$UTFDataFormatException']
});

