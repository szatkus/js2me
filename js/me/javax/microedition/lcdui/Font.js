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
	/*
	 * public static Font getDefaultFont()
	 */
	$getDefaultFont$$Ljavax_microedition_lcdui_Font_: function () {
		return this.$getFont$III$Ljavax_microedition_lcdui_Font_.apply(this, [0, 0, 0]);
	},
	/*
	 * public int getFace()
	 */
	$getFace$$I: function () {
		return this.javaFace;
	},
	/*
	 * public static Font getFont(int fontSpecifier)
	 */
	$getFont$III$Ljavax_microedition_lcdui_Font_: function (face, style, size) {
		if (this.context == null) {
			var canvas = document.createElement('canvas');
			javaRoot.$javax.$microedition.$lcdui.$Font.prototype.context = canvas.getContext('2d');
		}
		var font = new javaRoot.$javax.$microedition.$lcdui.$Font();
		font.face = 'arial';
		font.height = 16;
		font.style = '';
		font.javaFace = face;
		font.javaStyle = style;
		font.javaSize = size;
		if (size & this.$SIZE_SMALLI) {
			font.height = 12;
		}
		if (size & this.$SIZE_LARGEI) {
			font.height = 20;
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
	/*
	 * public static Font getFont(int fontSpecifier)
	 */
	$getFont$I$Ljavax_microedition_lcdui_Font_: function () {
		return this.prototype.$getDefaultFont$$Ljavax_microedition_lcdui_Font_.apply(this);
	},
	/*
	 * public int getBaselinePosition()
	 */
	$getBaselinePosition$$I: function () {
		return Math.floor(this.height * 0.75);
	},
	/*
	 * public int getHeight()
	 */
	$getHeight$$I: function () {
		return this.height;
	},
	/*
	 * public int getSize()
	 */
	$getSize$$I: function () {
		return this.javaSize;
	},
	/*
	 * public int getStyle()
	 */
	$getStyle$$I: function () {
		return this.javaStyle;
	},
	/*
	 * public int stringWidth(String str)
	 */
	$stringWidth$Ljava_lang_String_$I: function (str) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		this.context.font = this.getCSS();
		return Math.ceil(this.context.measureText(str.text).width);
	},
	/*
	 * public int substringWidth(String str, int offset, int len)
	 */
	$substringWidth$Ljava_lang_String_II$I: function (str, offset, length) {
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		this.context.font = this.getCSS();
		return Math.ceil(this.context.measureText(str.text.substr(offset, length)).width);
	},
	/*
	 * public int charWidth(char ch)
	 */
	$charWidth$C$I: function (char) {
		this.context.font = this.getCSS();
		return Math.ceil(this.context.measureText(String.fromCharCode(char)).width);
	},
	/*
	 * public int charsWidth(char[] ch, int offset, int length)
	 */
	$charsWidth$_CII$I: function (data, offset, length) {
		var str = javaRoot.$java.$lang.$String.prototype.$valueOf$_CII$Ljava_lang_String_(data, offset, length)
		return this.$stringWidth$Ljava_lang_String_$I(str);
	},
	getCSS: function () {
		return this.style + ' ' + Math.floor(this.height * 0.75) + 'px ' + this.face;
	}
});
