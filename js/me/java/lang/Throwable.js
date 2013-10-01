js2me.createClass({	
	construct: function (message) {
		try {
			throw new Error();
		} catch (e) {
			this.stack = e.stack;
		}
		if (message) {
			this.message = new javaRoot.$java.$lang.$String(message);
		}
	},
	/*
	 * public Throwable()
	 */
	_init$Ljava_lang_String_$V: function (message) {
		this.message = message;
	},
	/*
	 * public String getMessage()
	 */
	$getMessage$$Ljava_lang_String_: function () {
		return this.message;
	},
	/*
	 * public void printStackTrace()
	 */
	$printStackTrace$$V: function () {
		console.log(this);
	},
	/*
	 * public String toString()
	 */
	$toString$$Ljava_lang_String_: function () {
		var text = this.className;
		if (this.message) {
			text += ': ' + this.message.text;
		}
		return new javaRoot.$java.$lang.$String(text);
	},
	toString: function () {
		return this.$toString$$Ljava_lang_String_().text + '\n' + this.stack;
	}
});

