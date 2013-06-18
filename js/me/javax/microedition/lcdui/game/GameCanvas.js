js2me.createClass({
	_init$Z$V : function (suppressKeyEvents) {
		javaRoot.$javax.$microedition.$lcdui.$Canvas.prototype._init$$V.apply(this);
	},
	$getGraphics$$Ljavax_microedition_lcdui_Graphics_: function () {
		var graphics = new javaRoot.$javax.$microedition.$lcdui.$Graphics(this.element);
		return graphics;
	},
	$flushGraphics$$V: function () {
		//TODO: later...
	},
	$getKeyStates$$I: function () {
		var gameState = this.gameState;
		this.gameState = 0;
		return gameState;
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Canvas'
});

