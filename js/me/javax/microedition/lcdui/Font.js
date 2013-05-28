(function () {
	function Font() {
	}
	Font.prototype = {
		$getFont_III_Ljavax_microedition_lcdui_Font_: function (face, style, size) {
			//TODO
			var font = new Font();
			return font;
		},
		$getBaselinePosition__I: function () {
			//TODO
			return 10;
		},
		$getHeight__I: function () {
			return 10;
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Font'] = Font;
})();
