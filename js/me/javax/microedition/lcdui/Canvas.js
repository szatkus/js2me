(function () {
	function Canvas() {
		
	}
	Canvas.prototype = {
		$UPI: 1,
		$DOWNI: 6,
		$LEFTI: 2,
		$RIGHTI: 5,
		$FIREI: 8,
		$GAME_AI: 9,
		$GAME_BI: 10,
		$GAME_CI: 11,
		$GAME_DI: 12,
		$KEY_NUM0I: 48,
		$KEY_NUM1I: 49,
		$KEY_NUM2I: 50,
		$KEY_NUM3I: 51,
		$KEY_NUM4I: 52,
		$KEY_NUM5I: 53,
		$KEY_NUM6I: 54,
		$KEY_NUM7I: 55,
		$KEY_NUM8I: 56,
		$KEY_NUM9I: 57,
		$KEY_STARI: 42,
		$KEY_POUNDI: 35,
		_init__V: function () {
			this.element = document.createElement('canvas');
			this.element.width = js2me.width;
			this.element.height = js2me.height;
			this.graphics = new javaRoot.$javax.$microedition.$lcdui.$Graphics(this.element);
			var canvas = this;
			this.element.addEventListener('DOMNodeInserted', function () {
				canvas.$showNotify__V();
			});
			this.element.addEventListener('DOMNodeRemoved', function () {
				canvas.$showNotify__V();
			});
			this.keys = document.getElementsByClassName('key');
			var keyMapping = {
				'up': -1,
				'down': -2,
				'left': -3,
				'right': -4,
				'ok': -5,
				'fire': this.$FIREI,
				'gameA': this.$GAME_AI,
				'gameB': this.$GAME_BI,
				'gameC': this.$GAME_CI,
				'gameD': this.$GAME_DI,
				'num0': this.$KEY_NUM0I,
				'num1': this.$KEY_NUM1I,
				'num2': this.$KEY_NUM2I,
				'num3': this.$KEY_NUM3I,
				'num4': this.$KEY_NUM4I,
				'num5': this.$KEY_NUM5I,
				'num6': this.$KEY_NUM6I,
				'num7': this.$KEY_NUM7I,
				'num8': this.$KEY_NUM8I,
				'num9': this.$KEY_NUM9I,
				'star': this.$KEY_STARI,
				'pound': this.$KEY_POUNDI
			};
			this.keyListener = function (event) {
				var id = event.currentTarget.id;
				var keyCode = keyMapping[id];
				canvas.$keyPressed_I_V(keyCode);
			};
			this.init();
		},
		$repaint__V: function () {
			this.$paint_Ljavax_microedition_lcdui_Graphics__V(this.graphics);
		},
		$showNotify__V: function () {
			for (var i = 0; i < this.keys.length; i++) {
				this.keys[i].addEventListener('mousedown', this.keyListener);
			}
			this.$repaint__V();
		},
		$hideNotify__V: function () {
			for (var i = 0; i < this.keys.length; i++) {
				this.keys[i].removeEventListener('mousedown', this.keyListener);
			}
		},
		$setFullScreenMode_Z_V: function () {
			//TODO
		},
		superClass: 'javaRoot.$javax.$microedition.$lcdui.$Displayable'
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Canvas'] = Canvas;
})();
