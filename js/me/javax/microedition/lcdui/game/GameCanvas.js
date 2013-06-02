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
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Canvas',
	package: 'javaRoot.$javax.$microedition.$lcdui.$game',
	name: '$GameCanvas'
});

