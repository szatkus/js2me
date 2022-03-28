js2me.createClass({
	/*
	 * public StringItem(String label, String text)
	 */
	_init$Ljava_lang_String_Ljava_lang_String_$V: function (label, content) {
		this._init$Ljava_lang_String_Ljava_lang_String_I$V(label, content);
	},
	/*
	 * public StringItem(String label, String text, int appearanceMode)
	 */
	_init$Ljava_lang_String_Ljava_lang_String_I$V: function (label, content) {
		this.$setLabel$Ljava_lang_String_$V(label);
		this.content.innerHTML = content.text;
	},
	/*
	 * public void setFont(Font font)
	 */
	$setFont$Ljavax_microedition_lcdui_Font_$V: function (font) {
		this.font = font;
		this.element.style.font = font.getCSS();
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Item'
});
