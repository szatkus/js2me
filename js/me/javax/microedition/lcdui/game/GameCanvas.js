js2me.createClass({
	/*
	 * protected GameCanvas(boolean suppressKeyEvents)
	 */
	_init$Z$V : function (suppressKeyEvents) {
		javaRoot.$javax.$microedition.$lcdui.$Canvas.prototype._init$$V.apply(this);
	},
	/*
	 * protected Graphics getGraphics()
	 */
	$getGraphics$$Ljavax_microedition_lcdui_Graphics_: function () {
		var graphics = new javaRoot.$javax.$microedition.$lcdui.$Graphics(this.element);
		return graphics;
	},
	/*
	 * public void flushGraphics(int x, int y, int width, int height)
	 */
	$flushGraphics$$V: function () {
		//TODO: later...
	},
	/*
	 * public int getKeyStates()
	 */
	$getKeyStates$$I: function () {
		var gameState = this.gameState;
		this.gameState = 0;
		return gameState;
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Canvas'
});

