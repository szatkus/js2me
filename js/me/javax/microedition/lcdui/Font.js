js2me.createClass({
	$getFont_III_Ljavax_microedition_lcdui_Font_: function (face, style, size) {
		//TODO
		var font = new javaRoot.$javax.$microedition.$lcdui.$Font();
		return font;
	},
	$getBaselinePosition__I: function () {
		//TODO
		return 10;
	},
	$getHeight__I: function () {
		return 10;
	},
	$stringWidth_Ljava_lang_String__I: function (str) {
		return str.text.length * 5;
	},
	$charWidth_C_I: function (char) {
		return 5;
	},
	$charsWidth__CII_I: function (data, offset, length) {
		return length * 5;
	},
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$Font'
});
