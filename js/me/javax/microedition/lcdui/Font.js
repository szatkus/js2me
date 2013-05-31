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
	$getFont_III_Ljavax_microedition_lcdui_Font_: function (face, style, size) {
		if (this.context == null) {
			var canvas = document.createElement('canvas');
			javaRoot.$javax.$microedition.$lcdui.$Font.prototype.context = canvas.getContext('2d');
		}
		var font = new javaRoot.$javax.$microedition.$lcdui.$Font();
		font.face = 'sans-serif';
		font.height = 20;
		font.style = '';
		if (size & this.$SIZE_SMALLI) {
			font.height = 16;
		}
		if (size & this.$SIZE_LARGEI) {
			font.height = 24;
		}
		if (size & this.$FACE_MONOSPACEI) {
			font.face = 'monospace';
		}
		if (size & this.$FACE_MONOSPACEI) {
			font.face = 'monospace';
		}
		if (style & this.$SIZE_BOLDI) {
			font.style += 'bold ';
		}
		if (style & this.$SIZE_ITALICI) {
			font.style += 'italic ';
		}
		if (style & this.$SIZE_UNDERLINEDI) {
			//TODO
			console.log('underline unsupported');
		}
		return font;
	},
	$getBaselinePosition__I: function () {
		//TODO
		return 10;
	},
	$getHeight__I: function () {
		return this.height;
	},
	$stringWidth_Ljava_lang_String__I: function (str) {
		this.context.font = this.getCSS();
		return this.context.measureText(str.text).width;
	},
	$charWidth_C_I: function (char) {
		this.context.font = this.getCSS();
		return this.context.measureText(String.fromCharCode(char)).width;
	},
	$charsWidth__CII_I: function (data, offset, length) {
		var str = javaRoot.$java.$lang.$String.prototype.$valueOf__CII_Ljava_lang_String_(data, offset, length)
		return this.$stringWidth_Ljava_lang_String__I(str);
	},
	getCSS: function () {
		return this.style + (this.height * 0.75) + 'px/' + this.height + 'px ' + this.face;
	},
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$Font'
});
