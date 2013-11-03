js2me.createClass({
	superClass: 'javaRoot.$java.$io.$Reader',
	/*
	 * public InputStreamReader(InputStream is)
	 */
	_init$Ljava_io_InputStream_$V: function(stream) {
		this.stream = stream;
	},
	$close$$V: function () {
		this.stream.$close$$V();
	},
	/*
	 * public int read()
	 */
	$read$$I: function() {
		return this.stream.$read$$I();
	}
});

