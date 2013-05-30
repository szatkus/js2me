(function () {
	function Graphics(canvas) {
		this.element = canvas;
		this.context = canvas.getContext('2d');
		this.context.textBaseline = 'top';
		this.$setColor_III_V(0, 0, 0);
	}
	Graphics.prototype = {
		$setColor_III_V: function (r, g, b) {
			this.color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
			this.context.fillStyle = this.color;
			this.context.strokeStyle = this.color;
		},
		$setColor_I_V: function (rgb) {
			var red = (rgb & 0xff0000) >> 16;
			var green = (rgb & 0x00ff00) >> 8;
			var blue = (rgb & 0x0000ff);
			this.$setColor_III_V(red, green, blue);
		},
		$fillRect_IIII_V: function (x, y, width, height) {
			this.context.fillRect(x, y, width, height);
		},
		$drawRect_IIII_V: function (x, y, width, height) {
			this.context.strokeRect(x, y, width, height);
		},
		$drawLine_IIII_V: function (x1, y1, x2, y2) {
			this.context.beginPath();
			this.context.moveTo(x1, y1);
			this.context.lineTo(x2, y2);
			this.context.stroke();
			this.context.closePath();
		},
		$drawChar_CIII_V: function (char, x, y, anchor) {
			this.$drawString_Ljava_lang_String_III_V(String.fromCharCode(char), x, y, anchor);
		},
		$drawChars__CIIIII_V: function (data, offset, length, x, y, anchor) {
			var text = '';
			for (var i = 0; i < length; i++) {
				text += String.fromCharCode(data[offset + i]);
			}
			var str = new javaRoot.$java.$lang.$String(text);
			this.$drawString_Ljava_lang_String_III_V(str, x, y, anchor);
		},
		$drawArc_IIIIII_V: function (x, y, width, height, startAngle, arcAngle) {
			//TODO: maybe it isn't an arc...
			this.context.strokeRect(x, y, width, height);
		},
		$setFont_Ljavax_microedition_lcdui_Font__V: function (font) {
			//TODO
		},
		$drawString_Ljava_lang_String_III_V: function (str, x, y, anchor) {
			//TODO: anchor
			this.context.fillText(str.text, x, y);
		},
		$drawImage_Ljavax_microedition_lcdui_Image_III_V: function (img, x, y, anchor) {
			//TODO: anchor
			this.context.drawImage(img.element, x, y);
		},
		$setClip_IIII_V: function (x, y, width, height) {
			this.context.beginPath();
			this.context.rect(x, y, width, height);
			this.context.clip();
		},
		$drawRegion_Ljavax_microedition_lcdui_Image_IIIIIIII_V: function(src, sx, sy, width, height, transform, dx, dy, anchor) {
			//TODO: transformations and achor
			this.context.drawImage(src.element, sx, sy, width, height, dx, dy, width, height);
		}
			
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Graphics'] = Graphics;
})();
