js2me.createClass({
	_init$Z$V : function (suppressKeyEvents) {
		javaRoot.$javax.$microedition.$lcdui.$Canvas.prototype._init$$V.apply(this);
	},
	$getGraphics$$Ljavax_microedition_lcdui_Graphics_: function () {
		return this.graphics;
	},
	$flushGraphics$$V: function () {
		//TODO: later...
	},
	$getKeyStates$$I: function () {
		return 0;
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Canvas'
});

