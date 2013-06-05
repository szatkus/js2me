js2me.createClass({
	_init$Ljava_lang_String_Ljava_lang_String_$V: function (label, content) {
		this.$setLabel$Ljava_lang_String_$V(label);
		this.content.innerHTML = content.text;
	},
	$setFont$Ljavax_microedition_lcdui_Font_$V: function (font) {
		this.font = font;
		this.element.style.font = font.getCSS();
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Item'
});
