js2me.createClass({
	construct: function (graphics) {
		this.graphics = graphics;
	},
	/*
	 * int getAlphaComponent()
	 */
	$getAlphaComponent$$I: function () {
		return this.graphics.alpha;
	},
	/*
	 * void setARGBColor(int argbColor)
	 */
	$setARGBColor$I$V: function (color) {
		if (color < 0) {
			color += 0x100000000;
		}
		this.graphics.alpha = Math.floor(color / Math.pow(2, 24));
		var alpha = Math.floor(this.graphics.alpha / 255 * 255) / 100;
		var red = (color & 0xff0000) >> 16;
		var green = (color & 0x00ff00) >> 8;
		var blue = (color & 0x0000ff);
		this.graphics.color = 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
		this.graphics.colorValue = color;
	}
});

