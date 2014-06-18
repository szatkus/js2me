js2me.createClass({
	construct: function (array, start) {
		this.array = array;
		this.position = start || 0;
	},
	/*
	 * public abstract void write(int b) throws IOException
	 */
	$write$I$V: function (byte) {
		this.array[this.position] = byte;
		this.position++;
	},
	superClass: 'javaRoot.$java.$io.$OutputStream'
});

