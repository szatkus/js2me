js2me.createClass({
	construct: function () {
		this.gameActionMapping = [];
		this.gameActionMapping[-1] = this.$UPI;
		this.gameActionMapping[-2] = this.$DOWNI;
		this.gameActionMapping[-3] = this.$LEFTI;
		this.gameActionMapping[-4] = this.$RIGHTI;
		this.gameActionMapping[-5] = this.$FIREI;
	},
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
	_init$$V: function () {
		this.element = document.createElement('canvas');
		this.element.width = js2me.width;
		this.element.height = js2me.height;
		this.graphics = new javaRoot.$javax.$microedition.$lcdui.$Graphics(this.element);
		var canvas = this;
		this.element.addEventListener('DOMNodeInserted', function () {
			for (var i = 0; i < canvas.keys.length; i++) {
				canvas.keys[i].addEventListener('mousedown', canvas.keyListener);
			}
			canvas.$repaint$$V();
			canvas.$showNotify$$V();
		});
		this.element.addEventListener('DOMNodeRemoved', function () {
			for (var i = 0; i < canvas.keys.length; i++) {
				canvas.keys[i].removeEventListener('mousedown', canvas.keyListener);
			}
			canvas.$hideNotify$$V();
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
			canvas.$keyPressed$I$V(keyCode);
		};
		this.init();
	},
	$paint$Ljavax_microedition_lcdui_Graphics_$V: function () {
	},
	$repaint$$V: function () {
		this.$paint$Ljavax_microedition_lcdui_Graphics_$V(this.graphics);
	},
	$getGameAction$I$I: function (keyCode) {
		var gameAction = this.gameActionMapping[keyCode];
		if (gameAction != null) {
			return gameAction;
		} else {
			return keyCode;
		}
	},
	$serviceRepaints$$V: function () {
		//TODO: is it ok?
		//this.$repaint__V();
	},
	$showNotify$$V: function () {
		
	},
	$hideNotify$$V: function () {
		
	},
	$setFullScreenMode$Z$V: function () {
		//TODO
	},
	$isDoubleBuffered$$Z: function () {
		//TODO: let's think about this...
		return 0;
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Displayable',
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$Canvas'
});
