js2me.createClass({
	construct: function (canvas) {
		this.element = canvas;
		this.context = canvas.getContext('2d');
		this.context.textBaseline = 'top';
		this.$setColor$III$V(0, 0, 0);
		this.$setClip$IIII$V(0, 0, this.element.width, this.element.height);
		this.translateX = 0;
		this.translateY = 0;
	},
	$HCENTERI: 1,
	$VCENTERI: 2,
	$LEFTI: 4,
	$RIGHTI: 8,
	$TOPI: 16,
	$BOTTOMI: 32,
	$BASELINEI: 64,
	$SOLIDI: 0,
	$DOTTEDI: 1,
	/*
	 * public int getColor()
	 */
	$getColor$$I: function () {
		return this.colorValue;
	},
	/*
	 * public void setColor(int red, int green, int blue)
	 */
	$setColor$III$V: function (r, g, b) {
		this.color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		this.colorValue = r * 0x10000 + g * 0x100 + b;
	},
	/*
	 * public void setColor(int red, int green, int blue)
	 */
	$setColor$I$V: function (rgb) {
		var red = (rgb & 0xff0000) >> 16;
		var green = (rgb & 0x00ff00) >> 8;
		var blue = (rgb & 0x0000ff);
		this.$setColor$III$V(red, green, blue);
	},
	$setGrayScale$I$V: function (color) {
			this.$setColor$III$V(color, color, color);
	},
	/*
	 * public void fillRect(int x, int y, int width, int height)
	 */
	$fillRect$IIII$V: function (x, y, width, height) {
		this.loadContext();
		if (width == 0) {
			width = 1;
		}
		if (height == 0) {
			height = 1;
		}
		this.context.fillRect(x, y, width, height);
		this.context.restore();
	},
	/*
	 * public void fillTriangle(int x1, int y1, int x2, int y2, int x3, int y3)
	 */
	$fillTriangle$IIIIII$V: function (x1, y1, x2, y2, x3, y3) {
		this.loadContext();
		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.lineTo(x3, y3);
		this.context.lineTo(x1, y1);
		this.context.fill();
		this.context.closePath();
		this.context.restore();
	},
	/*
	 * public void drawRect(int x, int y, int width, int height)
	 */
	$drawRect$IIII$V: function (x, y, width, height) {
		this.loadContext();
		if (width == 0) {
			width = 1;
		}
		if (height == 0) {
			height = 1;
		}
		this.context.strokeRect(x, y, width, height);
		this.context.restore();
	},
	/*
	 * public void drawRGB(int[] rgbData, int offset, int scanlength, int x, int y, int width, int height, boolean processAlpha)
	 */
	$drawRGB$_IIIIIIIZ$V: function (data, offset, length, x, y, width, height, processAlpha) {
			//TODO: maybe little faster...
			var oldColor = this.$getColor$$I();
			for (var i = 0; i < height; i++) {
				for (var j = 0; j < width; j++) {
					var pixel = data[offset + i * length + j];
					var red = (pixel & 0xff0000) >> 16;
					var green = (pixel & 0x00ff00) >> 8;
					var blue = (pixel & 0x0000ff);
					var alpha = 1;
					if (processAlpha) {
							alpha = pixel / 0x100000000;
					}
					var color = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
					this.context.fillStyle = color;
					this.context.fillRect(x + j, y + i, 1, 1);
				}
			}
			this.$setColor$I$V(oldColor);
	},
	/*
	 * public void drawRoundRect(int x, int y, int width, int height, int arcWidth, int arcHeight)
	 */
	$drawRoundRect$IIIIII$V: function (x, y, width, height, arcWidth, arcHeight) {
		this.loadContext();
		this.drawRoundRectPath(x, y, width, height, arcWidth, arcHeight);
		this.context.stroke();
		this.context.closePath();
		this.context.restore();
	},
	/*
	 * public void fillRoundRect(int x, int y, int width, int height, int arcWidth, int arcHeight)
	 */
	$fillRoundRect$IIIIII$V: function (x, y, width, height, arcWidth, arcHeight) {
		this.loadContext();
		this.drawRoundRectPath(x, y, width, height, arcWidth, arcHeight);
		this.context.fill();
		this.context.closePath();
		this.context.restore();
	},
	/*
	 * public void drawLine(int x1, int y1, int x2, int y2)
	 */
	$drawLine$IIII$V: function (x1, y1, x2, y2) {
		this.loadContext();
		this.context.beginPath();
		if (x1 > x2) {
			x1++;
		}
		if (x2 > x1) {
			x2++;
		}
		if (y1 > y2) {
			y1++;
		}
		if (y2 > y1) {
			y1++;
		}
		if (y2 == y1 && x1 == x2) {
			x2++;
			y2++;
		}
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.stroke();
		this.context.closePath();
		this.context.restore();
	},
	/*
	 * public void drawChar(char character, int x, int y, int anchor)
	 */
	$drawChar$CIII$V: function (char, x, y, anchor) {
		var str = new javaRoot.$java.$lang.$String(String.fromCharCode(char));
		this.$drawString$Ljava_lang_String_III$V(str, x, y, anchor);
	},
	/*
	 * public void drawChars(char[] data, int offset, int length, int x, int y, int anchor)
	 */
	$drawChars$_CIIIII$V: function (data, offset, length, x, y, anchor) {
		var str = javaRoot.$java.$lang.$String.prototype.$valueOf$_CII$Ljava_lang_String_(data, offset, length);
		this.$drawString$Ljava_lang_String_III$V(str, x, y, anchor);
	},
	/*
	 * public void drawArc(int x, int y, int width, int height, int startAngle, int arcAngle)
	 */
	$drawArc$IIIIII$V: function (x, y, width, height, startAngle, arcAngle) {
		this.loadContext();
		this.drawArcPath(x, y, width, height, startAngle, arcAngle);
		this.context.stroke();
		this.context.closePath();
		this.context.restore();
	},
	/*
	 * public void fillArc(int x, int y, int width, int height, int startAngle, int arcAngle)
	 */
	$fillArc$IIIIII$V: function (x, y, width, height, startAngle, arcAngle) {
		this.loadContext();
		this.drawArcPath(x, y, width, height, startAngle, arcAngle);
		this.context.fill();
		this.context.closePath();
		this.context.restore();
	},
	/*
	 * public void setFont(Font font)
	 */
	$setFont$Ljavax_microedition_lcdui_Font_$V: function (font) {
		this.font = font;
	},
	/*
	 * public void drawString(String str, int x, int y, int anchor)
	 */
	$drawString$Ljava_lang_String_III$V: function (str, x, y, anchor) {
		this.loadContext();
		if (anchor == 0) {
			anchor = this.$TOPI | this.$LEFTI;
		}
		if (anchor & this.$TOPI) {
			this.context.textBaseline = 'top';
		}
		if (anchor & this.$VCENTERI) {
			this.context.textBaseline = 'middle';
		}
		if (anchor & this.$BASELINEI) {
			this.context.textBaseline = 'alphabetic';
		}
		if (anchor & this.$BOTTOMI) {
			this.context.textBaseline = 'bottom';
		}
		if (anchor & this.$HCENTERI) {
			x -= this.context.measureText(str.text).width / 2;
		}
		if (anchor & this.$RIGHTI) {
			x -= this.context.measureText(str.text).width;
		}
		this.context.fillText(str.text, x, y);
		this.context.restore();
	},
	/*
	 * public void drawImage(Image img, int x, int y, int anchor)
	 */
	$drawImage$Ljavax_microedition_lcdui_Image_III$V: function (img, x, y, anchor) {
		this.loadContext();
		if (anchor == 0) {
			anchor = this.$TOPI | this.$LEFTI;
		}
		if (anchor & this.$VCENTERI) {
			y -= img.element.height / 2;
		}
		if (anchor & this.$BASELINEI) {
			console.log('baseline,  what to do?');
		}
		if (anchor & this.$RIGHTI) {
			x -= img.element.width;
		}
		if (anchor & this.$HCENTERI) {
			x -= img.element.width / 2;
		}
		if (anchor & this.$BOTTOMI) {
			y -= img.element.height;
		}
		this.context.drawImage(img.element, x, y);
		this.context.restore();
	},
	/*
	 * public void clipRect(int x, int y, int width, int height)
	 */
	$clipRect$IIII$V: function (x, y, width, height) {
		var clipX = Math.max(x, this.clipX);
		var clipY = Math.max(y, this.clipY);
		var clipWidth = Math.min(x + width, this.clipX + this.clipWidth) - clipX;
		var clipHeight = Math.min(y + height, this.clipY + this.clipHeight) - clipY;
		this.$setClip$IIII$V(clipX, clipY, clipWidth, clipHeight);
	},
	/*
	 * public void setClip(int x, int y, int width, int height)
	 */
	$setClip$IIII$V: function (x, y, width, height) {
		if (width < 0) {
			width = 0;
		}
		if (height < 0) {
			height = 0;
		}
		this.clipX = x;
		this.clipY = y;
		this.clipWidth = width;
		this.clipHeight = height;
		this.context.restore();
		this.context.save();
		this.context.translate(this.translateX, this.translateY);
		this.context.beginPath();
		this.context.rect(x, y, width, height);
		this.context.clip();
		this.context.closePath();
		this.context.translate(-this.translateX, -this.translateY);
	},
	/*
	 * public int getClipX()
	 */
	$getClipX$$I: function () {
		return this.clipX + this.translateX;
	},
	/*
	 * public int getClipY()
	 */
	$getClipY$$I: function () {
		return this.clipY + this.translateY;
	},
	/*
	 * public int getClipWidth()
	 */
	$getClipWidth$$I: function () {
		return this.clipWidth;
	},
	/*
	 * public int getClipHeight()
	 */
	$getClipHeight$$I: function () {
		return this.clipHeight;
	},
	/*
	 * public Font getFont()
	 */
	$getFont$$Ljavax_microedition_lcdui_Font_: function () {
		return this.font;
	},
	/*
	 * public void drawSubstring(String str, int offset, int len, int x, int y, int anchor)
	 */
	$drawSubstring$Ljava_lang_String_IIIII$V: function (str, offset, length, x, y, anchor) {
		var substring = str.$substring$II$Ljava_lang_String_(offset, offset + length);
		this.$drawString$Ljava_lang_String_III$V(substring, x, y, anchor);
	},
	/*
	 * public void drawRegion(Image src, int x_src, int y_src, int width, int height, int transform, int x_dest, int y_dest, int anchor)
	 */
	$drawRegion$Ljavax_microedition_lcdui_Image_IIIIIIII$V: function(src, sx, sy, width, height, transform, dx, dy, anchor) {
		this.loadContext();
		var dw = width;
		var dh = height;
		if (transform >= 4) {
			var dh = width;
			var dw = height;
		}
		if (anchor & this.$VCENTERI) {
			dy -= dh / 2;
		}
		if (anchor & this.$BASELINEI) {
			console.log('baseline,  what to do?');
		}
		if (anchor & this.$RIGHTI) {
			dx -= dw;
		}
		if (anchor & this.$HCENTERI) {
			dx -= dw / 2;
		}
		if (anchor & this.$BOTTOMI) {
			dy -= dh;
		}
		this.context.translate(dx + width / 2, dy + height / 2);
		var sprite = javaRoot.$javax.$microedition.$lcdui.$game.$Sprite.prototype;
		if (transform == sprite.$TRANS_MIRRORI || transform == sprite.$TRANS_MIRROR_ROT180I) {
			this.context.scale(-1, 1);
		}
		if (transform == sprite.$TRANS_MIRROR_ROT90I || transform == sprite.$TRANS_MIRROR_ROT270I) {
			this.context.scale(1, -1);
		}
		if (transform == sprite.$TRANS_ROT90I || transform == sprite.$TRANS_MIRROR_ROT90I) {
			this.context.rotate(Math.PI / 2);
		}
		if (transform == sprite.$TRANS_ROT180I || transform == sprite.$TRANS_MIRROR_ROT180I) {
			this.context.rotate(Math.PI);
		}
		if (transform == sprite.$TRANS_ROT270I || transform == sprite.$TRANS_MIRROR_ROT270I) {
			this.context.rotate(3 * Math.PI / 2);
		}
		this.context.drawImage(src.element, sx, sy, width, height, -dw / 2, -dh / 2, width, height);
		this.context.restore();
	},
	/*
	 * public int getTranslateX()
	 */
	$getTranslateX$$I: function () {
		return this.translateX;
	},
	/*
	 * public int getTranslateY()
	 */
	$getTranslateY$$I: function () {
		return this.translateY;
	},
	/*
	 * public void translate(int x, int y)
	 */
	$translate$II$V: function (x, y) {
		this.translateX += x;
		this.translateY += y;
	},
	/*
	 * public void setStrokeStyle(int style)
	 */
	$setStrokeStyle$I$V: function (style) {
		this.style = style;
	},
	// FML, it only exists because of stupid canvas clip
	loadContext: function () {
		this.context.save();
		if (this.style == this.$DOTTEDI) {
			this.context.mozDash = [2];
		} else {
			this.context.mozDash = null;
		}
		this.context.fillStyle = this.color;
		this.context.strokeStyle = this.color;
		if (this.font) {
			this.context.font = this.font.getCSS();
		}
		this.context.translate(this.translateX, this.translateY);
	},
	drawArcPath: function (x, y, width, height, startAngle, arcAngle) {
        this.context.beginPath();
        this.context.translate(x - width / 2, y - height / 2);
        if (width != 0 && height != 0) {
			this.context.scale(width, height);
		}
        this.context.arc(1, 1, 1, (startAngle / 180) * Math.PI, ((startAngle + arcAngle) / 180) * Math.PI, true);
	},
	drawRoundRectPath: function (x, y, width, height, arcWidth, arcHeight) {
		this.context.beginPath();
		this.context.moveTo(x + arcWidth, y);
		this.context.lineTo(x + width - arcWidth, y);
		this.context.quadraticCurveTo(x + width, y, x + width, y + arcHeight);
		this.context.lineTo(x +  width, y + height - arcHeight);
		this.context.quadraticCurveTo(x + width, y + height, x + width - arcWidth, y + height);
		this.context.lineTo(x + arcWidth, y + height);
		this.context.quadraticCurveTo(x, y + height, x, y + height - arcHeight);
		this.context.lineTo(x, y + arcHeight);
		this.context.quadraticCurveTo(x, y, x + arcWidth, y);
	}
});
