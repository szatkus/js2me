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
		return this.prototype.$getFont$III$Ljavax_microedition_lcdui_Font_.apply(this, [0, 0, 0]);
	},
	/*
	 * public static Font getFont(int fontSpecifier)
	 */
	$getFont$III$Ljavax_microedition_lcdui_Font_: function (face, style, size) {
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
	 * public int stringWidth(String str)
	 */
	$stringWidth$Ljava_lang_String_$I: function (str) {
		//TODO
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		return this.height * str.text.length / 2;
	},
	/*
	 * public int substringWidth(String str, int offset, int len)
	 */
	$substringWidth$Ljava_lang_String_II$I: function (str, offset, length) {
		//TODO
		if (str == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		return this.height * length  / 2;
	},
	/*
	 * public int charWidth(char ch)
	 */
	$charWidth$C$I: function (char) {
		//TODO
		return this.height / 2;
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
