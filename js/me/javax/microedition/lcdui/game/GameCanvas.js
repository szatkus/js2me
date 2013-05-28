(function () {
	function GameCanvas() {
		
	}
	GameCanvas.prototype = {
		_init_Z_V : function (suppressKeyEvents) {
			javaRoot.$javax.$microedition.$lcdui.$Canvas.prototype._init__V.apply(this);
		},
		superClass: 'javaRoot.$javax.$microedition.$lcdui.$Canvas'
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui.$game')['$GameCanvas'] = GameCanvas;
})();

