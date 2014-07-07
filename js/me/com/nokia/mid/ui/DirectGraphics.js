js2me.createClass({
	construct: function (graphics) {
		this.graphics = graphics;
	},
	/*
	 * int getAlphaComponent()
	 */
	$getAlphaComponent$$I: function () {
		return this.alpha;
	},
	/*
	 * void setARGBColor(int argbColor)
	 */
	$setARGBColor$I$V: function (color) {
		if (color < 0) {
			color += 0x80000000;
		}
		this.alpha = Math.round(color / Math.pow(2, 24));
		var alpha = Math.floor(this.alpha / 25.6) / 10;
		var red = (color & 0xff0000) >> 16;
		var green = (color & 0x00ff00) >> 8;
		var blue = (color & 0x0000ff);
		this.graphics.color = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
		this.graphics.colorValue = color;
	}
});

