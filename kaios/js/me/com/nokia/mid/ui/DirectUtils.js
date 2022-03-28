js2me.createClass({
	/*
	 * public static javax.microedition.lcdui.Image createImage(int width, int height, int color)
	 */
    $createImage$III$Ljavax_microedition_lcdui_Image_: function (width, height, color) {
		var image = javaRoot.$javax.$microedition.$lcdui.$Image.prototype.$createImage$II$Ljavax_microedition_lcdui_Image_(width, height);
		var graphics = new javaRoot.$javax.$microedition.$lcdui.$Graphics(image.element);
		var directGraphics = this.$getDirectGraphics$Ljavax_microedition_lcdui_Graphics_$Lcom_nokia_mid_ui_DirectGraphics_(graphics);
		directGraphics.$setARGBColor$I$V(color);
		graphics.$fillRect$IIII$V(0, 0, width, height);
		return image;
	},
	/*
	 * public static DirectGraphics getDirectGraphics(javax.microedition.lcdui.Graphics g)
	 */
	$getDirectGraphics$Ljavax_microedition_lcdui_Graphics_$Lcom_nokia_mid_ui_DirectGraphics_: function (graphics) {
		return new javaRoot.$com.$nokia.$mid.$ui.$DirectGraphics(graphics);
	},
	require: ['javaRoot.$com.$nokia.$mid.$ui.$DirectGraphics', 'javaRoot.$javax.$microedition.$lcdui.$Image']
});

