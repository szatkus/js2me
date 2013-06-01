js2me.createClass({
	construct: function (canvas) {
		this.element = canvas;
		this.context = canvas.getContext('2d');
		this.context.textBaseline = 'top';
		this.$setColor$III$V(0, 0, 0);
	},
	$HCENTERI: 1,
	$VCENTERI: 2,
	$LEFTI: 4,
	$RIGHTI: 8,
	$TOPI: 16,
	$BOTTOMI: 32,
	$BASELINEI: 64,
	$setColor$III$V: function (r, g, b) {
		this.color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
		this.context.fillStyle = this.color;
		this.context.strokeStyle = this.color;
	},
	$setColor$I$V: function (rgb) {
		var red = (rgb & 0xff0000) >> 16;
		var green = (rgb & 0x00ff00) >> 8;
		var blue = (rgb & 0x0000ff);
		this.$setColor$III$V(red, green, blue);
	},
	$fillRect$IIII$V: function (x, y, width, height) {
		if (width == 0) {
			width = 1;
		}
		if (height == 0) {
			height = 1;
		}
		this.context.fillRect(x, y, width, height);
	},
	$drawRect$IIII$V: function (x, y, width, height) {
		if (width == 0) {
			width = 1;
		}
		if (height == 0) {
			height = 1;
		}
		this.context.strokeRect(x, y, width, height);
	},
	$drawLine$IIII$V: function (x1, y1, x2, y2) {
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
	},
	$drawChar$CIII$V: function (char, x, y, anchor) {
		var str = new javaRoot.$java.$lang.$String(String.fromCharCode(char));
		this.$drawString_Ljava_lang_String_III_V(str, x, y, anchor);
	},
	$drawChars$_CIIIII$V: function (data, offset, length, x, y, anchor) {
		var str = javaRoot.$java.$lang.$String.prototype.$valueOf__CII_Ljava_lang_String_(data, offset, length);
		this.$drawString_Ljava_lang_String_III_V(str, x, y, anchor);
	},
	$drawArc$IIIIII$V: function (x, y, width, height, startAngle, arcAngle) {
		//TODO: maybe it isn't an arc...
		this.context.strokeRect(x, y, width, height);
	},
	$setFont$Ljavax_microedition_lcdui_Font_$V: function (font) {
		this.context.font = font.getCSS();
	},
	$drawString$Ljava_lang_String_III$V: function (str, x, y, anchor) {
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
	},
	$drawImage$Ljavax_microedition_lcdui_Image_III$V: function (img, x, y, anchor) {
		//TODO: anchor
		this.context.drawImage(img.element, x, y);
	},
	$setClip$IIII$V: function (x, y, width, height) {
		this.clipX = x;
		this.clipY = y;
		this.clipWidth = width;
		this.clipHeight = height;
		this.context.restore();
		this.context.save();
		this.context.beginPath();
		this.context.rect(x, y, width, height);
		this.context.clip();
		this.context.closePath();
	},
	$getClipX$$I: function () {
		return this.clipX;
	},
	$getClipY$$I: function () {
		return this.clipY;
	},
	$getClipWidth$$I: function () {
		return this.clipWidth;
	},
	$getClipHeight$$I: function () {
		return this.clipHeight;
	},
	$drawRegion$Ljavax_microedition_lcdui_Image_IIIIIIII$V: function(src, sx, sy, width, height, transform, dx, dy, anchor) {
		//TODO: transformations and achor
		this.context.drawImage(src.element, sx, sy, width, height, dx, dy, width, height);
	},		
	package: 'javaRoot.$javax.$microedition.$lcdui', 
	name: '$Graphics'
});
