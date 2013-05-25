(function () {
	function Font() {
	}
	Font.prototype = {
		$getFont_III_Ljavax_microedition_lcdui_Font_: function (face, style, size) {
			//TODO
			var font = new Font();
			return font;
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Font'] = Font;
})();
