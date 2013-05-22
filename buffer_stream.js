js2me.BufferStream = function (buffer) {
	this.array = new Uint8Array(buffer);
	this.index = 0;
};

js2me.BufferStream.prototype = {
	nextByte: function () {
		var byte = this.array[this.index];
		this.index++;
		return byte;
	},
	nextWord: function () {
		return this.nextByte() * 256 + this.nextByte();
	},
	nextInt: function () {
		return this.nextWord() * 256 * 256 + this.nextWord();
	},
	getSubstream: function (length) {
		return new js2me.BufferStream(this.array.subarray(this.index, this.index + length));
	},
	skip: function (length) {
		this.index += length;
	},
	isEnd: function () {
		return this.index < this.array.length;
	}
};
