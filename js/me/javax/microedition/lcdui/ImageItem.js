js2me.createClass({
	_init$Ljava_lang_String_Ljavax_microedition_lcdui_Image_ILjava_lang_String_$V: function (label, image, layout, altText) {
		this.$setLabel$Ljava_lang_String_$V(label);
		this.$setImage$Ljavax_microedition_lcdui_Image_$V(image);
		if (layout == this.$LAYOUT_RIGHTI) {
			this.content.style.textAlign = 'right';
		}
		if (layout == this.$LAYOUT_CENTERI) {
			this.content.style.textAlign = 'center';
		}
	},
	$setImage$Ljavax_microedition_lcdui_Image_$V: function (image) {
		this.image = image;
		var imageCopy = javaRoot.$javax.$microedition.$lcdui.$Image.prototype.$createImage$Ljavax_microedition_lcdui_Image_$Ljavax_microedition_lcdui_Image_(image);
		this.content.appendChild(imageCopy.element);
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Item'
});
	

