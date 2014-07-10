js2me.createClass({	
	construct: function (message) {
		if (!js2me.config.app) {
			try {
				throw new Error();
			} catch (e) {
				this.stack = e.stack;
			}
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
		console.log(this.stack);
	},
	/*
	 * public String toString()
	 */
	$toString$$Ljava_lang_String_: function () {
		var str = this.$getClass$$Ljava_lang_Class_().$getName$$Ljava_lang_String_();
		if (this.message) {
			str.text += ': ' + this.message.text;
		}
		return str;
	},
	toString: function () {
		return this.$toString$$Ljava_lang_String_().text + '\n' + this.stack;
	}
});

