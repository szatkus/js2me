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
	_init$Ljava_lang_String_$V: function (message) {
		this.message = message;
	},
	$getMessage$$Ljava_lang_String_: function () {
		return this.message;
	},
	$printStackTrace$$V: function () {
		console.log(this);
	},
	$toString$$Ljava_lang_String_: function () {
		var text = this.className;
		if (this.message) {
			text += ': ' + this.message.text;
		}
		return new javaRoot.$java.$lang.$String(text);
	},
	toString: function () {
		return this.className + ': ' + message + '\n' + this.stack;
	}
});

