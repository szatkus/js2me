(function () {
	function Image() {
	}
	Image.prototype = {
		$createImage_II_Ljavax_microedition_lcdui_Image_: function (width, height) {
			var image = new Image();
			image.element = document.createElement('canvas');
			image.element.width = width;
			image.element.height = height;
			return image;
		},
		$getGraphics__Ljavax_microedition_lcdui_Graphics_: function () {
			var Graphics = js2me.findClass(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui.$Graphics');
			return new Graphics(this.element);
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Image'] = Image;
})();
