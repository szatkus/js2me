js2me.createClass({
	$TRANS_NONEI: 0,
	$TRANS_ROT90I: 5,
	$TRANS_ROT180I: 3,
	$TRANS_ROT270I: 6,
	$TRANS_MIRRORI: 2,
	$TRANS_MIRROR_ROT90I: 7,
	$TRANS_MIRROR_ROT180I: 1,
	$TRANS_MIRROR_ROT270I:  4,
	/*
	 * public Sprite(Image image)
	 */
	_init$Ljavax_microedition_lcdui_Image_$V: function (image) {
		this.image = image;
		this.width = image.element.width;
		this.height = image.element.height;
		this.transform = 0;
	},
	/*
	 * public void setTransform(int transform)
	 */
	$setTransform$I$V: function (transform) {
		this.transform = transform;
	},
	/*
	 * 
	 */
	$getWidth$$I: function () {
		if (this.transform != this.$TRANS_ROT90I && this.transform != this.$TRANS_ROT270I &&
			this.transform != this.$TRANS_MIRROR_ROT90I && this.transform != this.$TRANS_MIRROR_ROT270I) {
			return this.width;
		} else {
			return this.height;
		}
	},
	/*
	 * public final void paint(Graphics g)
	 */
	$paint$Ljavax_microedition_lcdui_Graphics_$V: function (graphics) {
		//TODO: animation and stuff
		if (graphics == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		graphics.$drawRegion$Ljavax_microedition_lcdui_Image_IIIIIIII$V(this.image, 0, 0, this.width, this.height,
			this.transform, this.x, this.y, 0);
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$game.$Layer'
});

