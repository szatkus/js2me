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
	}
};
