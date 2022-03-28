js2me.createClass({
	/*
	 * public TiledLayer(int columns, int rows, Image image, int tileWidth, int tileHeight)
	 */
	_init$IILjavax_microedition_lcdui_Image_II$V: function (columns, rows, image, tileWidth, tileHeight) {
		if (image == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (columns < 1 || rows < 1 || tileWidth < 1 || tileHeight < 1 || (image.element.width / tileWidth) % 1 != 0 ||
			(image.element.height / tileHeight) % 1 != 0) {
			throw new javaRoot.$java.$lang.$IllegalArgumentException();
		}
		this.columns = columns;
		this.rows = rows;
		this.image = image;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.tileColumns = (image.element.width / tileWidth);
		this.tilesCount = (image.element.width / tileWidth) * (image.element.height / tileHeight);
		this.map = [];
		for (var i = 0; i < columns; i++) {
			this.map[i] = [];
			for (var j = 0; j < rows; j++) {
				this.map[i][j] = 0;
			}
		}
	},
	/*
	 * public void setCell(int col, int row, int tileIndex)
	 */
	$setCell$III$V: function (column, row, index) {
		if (column >= this.columns || row >= this.rows || index > this.tilesCount) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		this.map[column][row] = index;
	},
	/*
	 * public final void paint(Graphics g)
	 */
	$paint$Ljavax_microedition_lcdui_Graphics_$V: function (graphics) {
		for (var i = 0; i < this.columns; i++) {
			for (var j = 0; j < this.rows; j++) {
				var index = this.map[i][j];
				if (index > 0) {
					index--;
					var sx = (index % this.tileColumns) * this.tileWidth;
					var sy = Math.floor(index / this.tileColumns) * this.tileHeight;
					var dx = this.x + i * this.tileWidth;
					var dy = this.y + j * this.tileHeight;
					graphics.$drawRegion$Ljavax_microedition_lcdui_Image_IIIIIIII$V(this.image, sx, sy, this.tileWidth,
						this.tileHeight, 0, dx, dy, 0);
				}
			}
		}
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$game.$Layer'
});

