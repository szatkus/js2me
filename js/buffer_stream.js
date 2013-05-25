js2me.BufferStream = function (buffer) {
	this.array = new Uint8Array(buffer);
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
		return this.readUint16() * 256 * 256 + this.readUint16();
	},
	getSubstream: function (length) {
		return new js2me.BufferStream(this.array.subarray(this.index, this.index + length));
	},
	skip: function (length) {
		this.index += length;
	},
	isEnd: function () {
		return this.index < this.array.length;
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
	reset: function () {
		this.index = 0;
	}
};
