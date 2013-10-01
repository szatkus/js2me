js2me.createClass({
	/*
	 * public TextField(String label, String text, int maxSize, int constraints)
	 */
	_init$Ljava_lang_String_Ljava_lang_String_II$V: function (label, text, maxSize, constraints) {
		//TODO: constraints
		this.$setLabel$Ljava_lang_String_$V(label);
		this.input = document.createElement('input');
		this.input.maxLength = maxSize;
		this.input.value = text.text;
		this.content.appendChild(this.input);
	},
	/*
	 * public String getString()
	 */
	$getString$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String(this.input.value);
	},
	/*
	 * public void setString(String text)
	 */
	$setString$Ljava_lang_String_$V: function (str) {
		this.input.value = str.text;
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Item'
});
	

