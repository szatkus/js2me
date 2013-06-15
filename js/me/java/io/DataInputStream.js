js2me.createClass({
	_init$Ljava_io_InputStream_$V: function (stream) {
		this.stream = stream;
	},
	$readShort$$S: function () {
		var a = this.stream.$read$$I() 
		var b = this.stream.$read$$I();
		if (a == -1 || b == -1) {
			throw new javaRoot.$java.$io.$EOFException();
		}
		var value = (a << 8) + b;
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
		if (value == -1) {
			throw new javaRoot.$java.$io.$EOFException();
		}
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
	$readBoolean$$Z: function () {
		var byte = this.stream.$read$$I();
		if (byte == 0) {
			return 0;
		}
		if (byte > 0) {
			return 1;
		}
		if (byte < 0) {
			throw new javaRoot.$java.$io.$EOFException();
		}
	},
	$readLong$$J: function () {
		var a = this.stream.$read$$I();
		var b = this.stream.$read$$I();
		var c = this.stream.$read$$I();
		var d = this.stream.$read$$I();
		return new js2me.Long(a * 0x100000000 + b, c * 0x100000000 + d);
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
		return this.stream.$skip$J$J(n);
	},
	$skipBytes$I$I: function (n) {
		return this.$skip$J$J(new js2me.Long(0, n)).lo;
	},
	$available$$I: function () {
		return this.stream.$available$$I();
	},
	$read$$I: function () {
		return this.stream.$read$$I();
	},
	superClass: 'javaRoot.$java.$io.$InputStream',
	package: 'javaRoot.$java.$io',
	name: '$DataInputStream',
	require: ['javaRoot.$java.$io.$EOFException', 'javaRoot.$java.$io.$UTFDataFormatException']
});

