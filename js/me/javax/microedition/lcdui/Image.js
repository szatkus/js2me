js2me.createClass({
	/*
	 * public static Image createImage(InputStream stream)
	 */
	$createImage$Ljava_io_InputStream_$Ljavax_microedition_lcdui_Image_: js2me.markUnsafe(function (stream) {
		if (stream == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		var data = [];
		var byte;
		while ((byte = stream.$read$$I()) != -1) {
			if (byte >= 128) {
				byte -= 256;
			}
			data.push(byte);
		}
		return this.$createImage$_BII$Ljavax_microedition_lcdui_Image_(data, 0, data.length);
	}),
	/*
	 * public static Image createImage(int width, int height)
	 */
	$createImage$II$Ljavax_microedition_lcdui_Image_: function (width, height) {
		var image = new javaRoot.$javax.$microedition.$lcdui.$Image();
		image.element = document.createElement('canvas');
		image.element.width = width;
		image.element.height = height;
		image.mutable = true;
		return image;
	},
	/*
	 * public static Image createImage(int width, int height)
	 */
	$createImage$Ljava_lang_String_$Ljavax_microedition_lcdui_Image_: js2me.markUnsafe(function (name) {
		if (name == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		var resourceName = name.text;
		if (resourceName.charAt(0) == '/') {
			resourceName = resourceName.substr(1);
		}
		var data;
		var async = true;
		js2me.loadResource(name.text, function (resource) {
			async = false;
			if (resource == null) {
				data = null;
				return;
			}
			data = new Int8Array(resource);
			js2me.restoreThread(threadId);
		});
		if (async) {
			js2me.isThreadSuspended = true;
			var threadId = js2me.currentThread;
			js2me.restoreStack[threadId] = [function () {
				if (data == null) {
					throw new javaRoot.$java.$io.$IOException();
				}
				javaRoot.$javax.$microedition.$lcdui.$Image.prototype.$createImage$_BII$Ljavax_microedition_lcdui_Image_(data, 0, data.length);
			}];
		} else {
			if (data == null) {
				throw new javaRoot.$java.$io.$IOException();
			}
			javaRoot.$javax.$microedition.$lcdui.$Image.prototype.$createImage$_BII$Ljavax_microedition_lcdui_Image_(data, 0, data.length);
		}
		
	}),
	/*
	 * public static Image createImage(int width, int height)
	 */
	$createImage$Ljavax_microedition_lcdui_Image_$Ljavax_microedition_lcdui_Image_: function (source) {
		if (source == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		var image = javaRoot.$javax.$microedition.$lcdui.$Image.prototype.$createImage$II$Ljavax_microedition_lcdui_Image_(source.$getWidth$$I(), source.$getHeight$$I());
		var graphics = image.$getGraphics$$Ljavax_microedition_lcdui_Graphics_();
		graphics.$drawImage$Ljavax_microedition_lcdui_Image_III$V(source, 0, 0, 0);
		image.mutable = false;
		return image;
	},
	/*
	 * public static Image createImage(int width, int height)
	 */
	$createImage$Ljavax_microedition_lcdui_Image_IIIII$Ljavax_microedition_lcdui_Image_ : function (source, x, y, width, height, transform) {
		var image = javaRoot.$javax.$microedition.$lcdui.$Image.prototype.$createImage$II$Ljavax_microedition_lcdui_Image_(width, height);
		var graphics = image.$getGraphics$$Ljavax_microedition_lcdui_Graphics_();
		graphics.$drawRegion$Ljavax_microedition_lcdui_Image_IIIIIIII$V(source, x, y, width, height, transform, 0, 0, 0);
		image.mutable = false;
		return image;
	},
	/*
	 * public static Image createImage(int width, int height)
	 */
	$createImage$_BII$Ljavax_microedition_lcdui_Image_: js2me.markUnsafe(function (data, offset, length) {
		if (data == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (length < 0 || offset >= data.length || offset + length > data.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		var headers = {
			'image/png': [-119, 80, 78, 71, 13, 10, 26, 10]
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
		var image = new javaRoot.$javax.$microedition.$lcdui.$Image.prototype.$createImage$II$Ljavax_microedition_lcdui_Image_(100, 100);
		var imageElement = document.createElement('img');
		imageElement.addEventListener('load', function () {
			image.element.width = imageElement.width;
			image.element.height = imageElement.height;
			image.element.getContext('2d').drawImage(imageElement, 0, 0);
			js2me.restoreThread(threadId);
		});
		var isError = false;
		imageElement.addEventListener('error', function () {
			isError = true;
			js2me.restoreThread(threadId);
		});
		var url = js2me.bytesToDataURI(data, offset, length, mime);
		imageElement.setAttribute('src', url);
		js2me.isThreadSuspended = true;
		var threadId = js2me.currentThread;
		js2me.restoreStack[threadId] = [function () {
			if (isError) {
				throw new javaRoot.$java.$io.$IOException('Cannot load image');
			}
			return image;
		}];
		image.mutable = false;
		return image;
	}),
	/*
	 * public static Image createRGBImage(int[] rgb, int width, int height, boolean processAlpha)
	 */
	$createRGBImage$_IIIZ$Ljavax_microedition_lcdui_Image_: function (rgb, width, height, alphaProcessing) {
		var image = this.$createImage$II$Ljavax_microedition_lcdui_Image_(width, height);
		var context = image.element.getContext('2d');
		var imageData = context.getImageData(0, 0, width, height);
		for (var i = 0; i < width * height; i++) {
			var value = rgb[i];
			if (value < 0) {
				value += 0x100000000;
			}
			var blue = value % 256;
			value = Math.floor(value / 256);
			var green = value % 256;
			value = Math.floor(value / 256);
			var red = value % 256;
			value = Math.floor(value / 256);
			var alpha = value % 256;
			imageData.data[i * 4] = red;
			imageData.data[i * 4 + 1] = green;
			imageData.data[i * 4 + 2] = blue;
			if (alphaProcessing) {
				imageData.data[i * 4 + 3] = alpha;
			} else {
				imageData.data[i * 4 + 3] = 255;
			}
		}
		context.putImageData(imageData, 0, 0);
		image.mutable = false;
		return image;
	},
	/*
	 * public Graphics getGraphics()
	 */
	$getGraphics$$Ljavax_microedition_lcdui_Graphics_: function () {
		return new javaRoot.$javax.$microedition.$lcdui.$Graphics(this.element);
	},
	/*
	 * public void getRGB(int[] rgbData, int offset, int scanlength, int x, int y, int width, int height)
	 */
	$getRGB$_IIIIIII$V: function (rgbData, offset, scanlength, x, y, width, height) {
		var context = this.element.getContext('2d');
		var imageData = context.getImageData(x, y, width, height);
		for (var i = 0; i < width * height; i++) {
			var value = imageData.data[i * 4] << 24;
			value += imageData.data[i * 4 + 1] << 16;
			value += imageData.data[i * 4 + 2] << 8;
			value += imageData.data[i * 4 + 3];
			if (value >= 0x100000000) {
				value -= 0x100000000;
			}
			rgbData[offset + (i % width - x) + (Math.floor(i / width) - y) * scanlength] = value;
		}
	},
	/*
	 * public int getWidth()
	 */
	$getWidth$$I: function () {
		return this.element.width;
	},
	/*
	 * public int getHeight()
	 */
	$getHeight$$I: function () {
		return this.element.height;
	},
	/*
	 * public boolean isMutable()
	 */
	$isMutable$$Z: function () {
		if (this.mutable) {
			return 1;
		} else {
			return 0;
		}
	}
});
