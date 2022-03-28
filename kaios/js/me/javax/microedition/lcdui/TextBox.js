js2me.createClass({
	/*
	 * public TextBox(String title, String text, int maxSize, int constraints)
	 */
	_init$Ljava_lang_String_Ljava_lang_String_II$V: function (title, text, maxSize, constraints) {
		//TODO: constraints are ignored
		if (maxSize <= 0) {
			throw new javaRoot.$java.$lang.$IllegalArgumentException('maxSize <= 0');
		}
		this.element = document.createElement('textarea');
		if (text) {
			if (text.text.length > maxSize) {
				throw new javaRoot.$java.$lang.$IllegalArgumentException('text longer than maxSize');
			}
			this.element.value = text.text;
		}
		this.element.maxLength = maxSize;
		this.$setTitle$Ljava_lang_String_$V(title);
		this.init();
	},
	/*
	 * public String getString()
	 */
	$getString$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.element.value);
	},
	/*
	 * public int setMaxSize(int maxSize)
	 */
	$setMaxSize$I$I: function (maxSize) {
		//TODO: constraints are ignored
	},
	/*
	 * public void setString(String text)
	 */
	$setString$Ljava_lang_String_$V: function (text) {
		this.element.value = text;
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Screen'
});

