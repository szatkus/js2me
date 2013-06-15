js2me.createClass({
	gameActionMapping: {
		'-1': 1,
		'-2': 6,
		'-3': 2,
		'-4': 5,
		'-5': 8,
		'49': 9,
		'50': 1,
		'51': 10,
		'52': 2,
		'53': 8,
		'54': 5,
		'55': 11,
		'56': 6,
		'57': 12
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
		this.element.width = js2me.config.width;
		this.element.height = js2me.config.height;
		this.graphics = new javaRoot.$javax.$microedition.$lcdui.$Graphics(this.element);
		var canvas = this;
		this.element.addEventListener('DOMNodeInserted', function () {
			js2me.addEventListener('keypress', canvas.keyPressListener);
			js2me.addEventListener('keyreleased', canvas.keyReleasedListener);
			canvas.$repaint$$V();
			canvas.$showNotify$$V();
		});
		this.element.addEventListener('DOMNodeRemoved', function () {
			js2me.removeEventListener('keypress', canvas.keyPressListener);
			js2me.removeEventListener('keyreleased', canvas.keyReleasedListener);
			canvas.$hideNotify$$V();
		});
		this.keyPressListener = function (keyCode) {
			var gameCode = canvas.gameActionMapping[keyCode];
			if (gameCode == null) {
				canvas.gameState = canvas.gameState | (1 << gameCode);
			}
			canvas.keysState[keyCode] = true;
			canvas.$keyPressed$I$V(keyCode);
		};
		this.keyReleasedListener = function (keyCode) {
			if (keyCode != null) {
				canvas.keysState[keyCode] = false;
				canvas.$keyReleased$I$V(keyCode);
			} else {
				for (var i in canvas.keysState) {
					if (canvas.keysState[i]) {
						canvas.keysState[i] = false;
						(function (j) {
							setTimeout(function () {
								canvas.$keyReleased$I$V(j);
							}, 1);
						})(i);
					}
				}
			}
		};
		this.keysState = [];
		this.gameState = 0;
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
	$setFullScreenMode$Z$V: function (mode) {
		if (mode == 0) {
			this.element.height = js2me.config.height;
		} else {
			this.element.height = js2me.config.fullHeight;
		}
	},
	$getWidth$$I: function () {
		return this.element.width;
	},
	$getHeight$$I: function () {
		return this.element.height;
	},
	$isDoubleBuffered$$Z: function () {
		//TODO: let's think about this...
		return 0;
	},
	$hasPointerEvents$$Z: function () {
		return 1;
	},
	$hasPointerMotionEvents$$Z: function () {
		return 1;
	},
	$getKeyName$I$Ljava_lang_String_: function () {
		//TODO
		return new javaRoot.$java.$lang.$String('pomidor');
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Displayable'
});
