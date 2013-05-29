(function () {
	function JavaImage() {
	}
	JavaImage.prototype = {
		$createImage_II_Ljavax_microedition_lcdui_Image_: function (width, height) {
			var image = new JavaImage();
			image.element = document.createElement('canvas');
			image.element.width = width;
			image.element.height = height;
			return image;
		},
		$createImage__BII_Ljavax_microedition_lcdui_Image_: function (data, offset, length) {
			if (data == null) {
				throw new javaRoot.$java.$lang.$NullPointerException();
			}
			if (length < 0 || offset >= data.length || offset + length > data.length) {
				throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
			}
			var headers = {
				'image/png': [137, 80, 78, 71, 13, 10, 26, 10]
			};
			var mime = null;
			for (var i in headers) {
				var good = true;
				for (var j = 0; j < headers[i].length; j++) {
					if (data[offset + j] != headers[i][j]) {
						good = false;
					}
				}
				if (good) {
					mime = i;
				}
			}
			if (mime == null) {
				throw new Error('Unsupported image format');
			}
			var image = new javaRoot.$javax.$microedition.$lcdui.$Image.prototype.$createImage_II_Ljavax_microedition_lcdui_Image_(100, 100);
			var imageElement = new Image();
			imageElement.onload = function () {
				image.element.width = imageElement.width;
				image.element.height = imageElement.height;
				image.element.getContext('2d').drawImage(imageElement, 0, 0);
			};
			var dataURI = 'data:' + mime + ',';
			for (var j = offset; j < offset + length; j++) {
				dataURI += '%';
				var code = data[j].toString(16);
				if (code.length == 1) {
					dataURI += '0';
				}
				dataURI += code;
			}
			imageElement.src = dataURI;
			return image;
		},
		$getGraphics__Ljavax_microedition_lcdui_Graphics_: function () {
			return new javaRoot.$javax.$microedition.$lcdui.$Graphics(this.element);
		},
		$getWidth__I: function () {
			return this.element.width;
		},
		$getHeight__I: function () {
			return this.element.height;
		},
		require: ['javaRoot.$javax.$microedition.$lcdui.$Graphics']
	};
	js2me.findPackage('javaRoot.$javax.$microedition.$lcdui')['$Image'] = JavaImage;
})();
