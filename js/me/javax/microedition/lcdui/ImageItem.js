js2me.createClass({
	/*
	 * public ImageItem(String label, Image img, int layout, String altText)
	 */
	_init$Ljava_lang_String_Ljavax_microedition_lcdui_Image_ILjava_lang_String_$V: function (label, image, layout, altText) {
		this.$setLabel$Ljava_lang_String_$V(label);
		this.$setImage$Ljavax_microedition_lcdui_Image_$V(image);
		this.$setLayout$I$V(layout);
	},
	/*
	 * public void setImage(Image img)
	 */
	$setImage$Ljavax_microedition_lcdui_Image_$V: function (image) {
		this.image = image;
		var imageCopy = javaRoot.$javax.$microedition.$lcdui.$Image.prototype.$createImage$Ljavax_microedition_lcdui_Image_$Ljavax_microedition_lcdui_Image_(image);
		this.content.appendChild(imageCopy.element);
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Item'
});
	

