js2me.createClass({
	$STYLE_PLAINI: 0,
	$STYLE_BOLDI: 1,
	$STYLE_ITALICI: 2,
	$STYLE_UNDERLINED: 4,
	$FACE_SYSTEMI: 0,
	$FACE_MONOSPACEI: 32,
	$FACE_PROPORTIONALI: 64,
	$SIZE_SMALLI: 8,
	$SIZE_MEDIUMI: 0,
	$SIZE_LARGEI: 16,
	$getDefaultFont$$Ljavax_microedition_lcdui_Font_: function () {
		return this.prototype.$getFont$III$Ljavax_microedition_lcdui_Font_.apply(this, [0, 0, 0]);
	},
	$getFont$III$Ljavax_microedition_lcdui_Font_: function (face, style, size) {
		if (this.context == null) {
			var canvas = document.createElement('canvas');
			javaRoot.$javax.$microedition.$lcdui.$Font.prototype.context = canvas.getContext('2d');
		}
		var font = new javaRoot.$javax.$microedition.$lcdui.$Font();
		font.face = 'arial';
		font.height = 16;
		font.style = '';
		if (size & this.prototype.$SIZE_SMALLI) {
			font.height = 12;
		}
		if (size & this.prototype.$SIZE_LARGEI) {
			font.height = 20;
		}
		if (size & this.prototype.$FACE_MONOSPACEI) {
			font.face = 'monospace';
		}
		if (size & this.prototype.$FACE_MONOSPACEI) {
			font.face = 'monospace';
		}
		if (style & this.prototype.$SIZE_BOLDI) {
			font.style += 'bold ';
		}
		if (style & this.prototype.$SIZE_ITALICI) {
			font.style += 'italic ';
		}
		if (style & this.prototype.$SIZE_UNDERLINEDI) {
			//TODO
			console.log('underline unsupported');
		}
		return font;
	},
	$getFont$I$Ljavax_microedition_lcdui_Font_: function () {
		return this.prototype.$getDefaultFont$$Ljavax_microedition_lcdui_Font_.apply(this);
	},
	$getBaselinePosition$$I: function () {
		return Math.floor(this.height * 0.75);
	},
	$getHeight$$I: function () {
		return this.height;
	},
	$stringWidth$Ljava_lang_String_$I: function (str) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		this.context.font = this.getCSS();
		return this.context.measureText(str.text).width;
	},
	$substringWidth$Ljava_lang_String_II$I: function (str, offset, length) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		this.context.font = this.getCSS();
		return this.context.measureText(str.text.substr(offset, length)).width;
	},
	$charWidth$C$I: function (char) {
		this.context.font = this.getCSS();
		return this.context.measureText(String.fromCharCode(char)).width;
	},
	$charsWidth$_CII$I: function (data, offset, length) {
		var str = javaRoot.$java.$lang.$String.prototype.$valueOf$_CII$Ljava_lang_String_(data, offset, length)
		return this.$stringWidth$Ljava_lang_String_$I(str);
	},
	getCSS: function () {
		return this.style + ' ' + Math.floor(this.height * 0.75) + 'px ' + this.face;
	}
});
