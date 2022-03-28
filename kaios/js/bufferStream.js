js2me.BufferStream = function (buffer) {
	if (buffer.array) {
		this.array = buffer.array;
	} else {
		this.array = new Uint8Array(buffer);
	}
	this.index = 0;
};

js2me.BufferStream.prototype = {
	readUint8: function () {
		var byte = this.array[this.index];
		this.index++;
		return byte;
	},
	readUint16: function () {
		return this.readUint8() * 256 + this.readUint8();
	},
	readUint32: function () {
		return this.readUint16() * 65536 + this.readUint16();
	},
	readUint64: function () {
		return this.readUint32() * 65536 * 65536 + this.readUint32();
	},
	getSubstream: function (length) {
		return new js2me.BufferStream(this.array.subarray(this.index, this.index + length));
	},
	skip: function (length) {
		var pos = this.index;
		this.index += length;
		if (this.index > this.array.length) {
			this.index = this.array.length;
		}
		return this.index - pos;
	},
	getRemaining: function () {
		return this.array.length - this.index;
	},
	isEnd: function () {
		return this.index >= this.array.length;
	},
	seek: function (index) {
		this.index = index;
	},
	readInt16: function () {
		var value = this.readUint16();
		if (value > 32767) {
			value = value - 65536;
		}
		return value;
	},
	readInt8: function () {
		var value = this.readUint8();
		if (value > 127) {
			value = value - 256;
		}
		return value;
	},
	readInt32: function () {
		var value = this.readUint32();
		if (value > 2147483647) {
			value = value - 4294967296;
		}
		return value;
	},
	readInt64: function () {
		var value = this.readUint64();
		if (value > 9223372036854775807) {
			value = value - 18446744073709551616;
		}
		return value;
	},
	reset: function () {
		this.index = 0;
	}
};
