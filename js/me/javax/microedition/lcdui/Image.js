js2me.createClass({
	$createImage$II$Ljavax_microedition_lcdui_Image_: function (width, height) {
		var image = new javaRoot.$javax.$microedition.$lcdui.$Image();
		image.element = document.createElement('canvas');
		image.element.width = width;
		image.element.height = height;
		return image;
	},
	$createImage$Ljava_lang_String_$Ljavax_microedition_lcdui_Image_: function (name) {
		var data = javaRoot.$java.$lang.$Class.prototype.$getResourceAsStream_Ljava_lang_String__Ljava_io_InputStream_(name).stream.array;
		return javaRoot.$javax.$microedition.$lcdui.$Image.prototype.$createImage__BII_Ljavax_microedition_lcdui_Image_(data, 0, data.length);
	},
	$createImage$_BII$Ljavax_microedition_lcdui_Image_: function (data, offset, length) {
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
			js2me.restoreThread(threadId);
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
		//console.log(dataURI);
		js2me.suspendThread = true;
		var threadId = js2me.currentThread;
		js2me.restoreStack[threadId] = [function () {
			return image;
		}];
		return image;
	},
	$getGraphics$$Ljavax_microedition_lcdui_Graphics_: function () {
		return new javaRoot.$javax.$microedition.$lcdui.$Graphics(this.element);
	},
	$getWidth$$I: function () {
		return this.element.width;
	},
	$getHeight$$I: function () {
		return this.element.height;
	},
	require: ['javaRoot.$javax.$microedition.$lcdui.$Graphics', 'javaRoot.$java.$lang.$Class'],
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$Image'
});
