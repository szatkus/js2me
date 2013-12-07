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
	/*
	 * protected Canvas()
	 */
	_init$$V: function () {
		this.element = document.createElement('canvas');
		this.element.width = js2me.config.width;
		this.element.height = js2me.config.height;
		//this.element.setAttribute('moz-opaque', '');
		var canvas = this;
		this.element.addEventListener('DOMNodeInserted', function () {
			js2me.addEventListener('keypress', canvas.keyPressListener);
			js2me.addEventListener('keyreleased', canvas.keyReleasedListener);
			js2me.launchThread(function () {
				canvas.$repaint$$V();
				canvas.$showNotify$$V();
			});
		});
		this.element.addEventListener('DOMNodeRemoved', function () {
			js2me.removeEventListener('keypress', canvas.keyPressListener);
			js2me.removeEventListener('keyreleased', canvas.keyReleasedListener);
			js2me.launchThread(function () {
				canvas.$hideNotify$$V();
			});
		});
		this.keyPressListener = function (keyCode) {
			var gameCode = canvas.gameActionMapping[keyCode];
			if (gameCode != null) {
				canvas.gameState = canvas.gameState | (1 << gameCode);
			}
			canvas.keysState[keyCode] = true;
			js2me.launchThread(function () {
				canvas.$keyPressed$I$V(keyCode);
			});
		};
		this.keyReleasedListener = function (keyCode) {
			if (keyCode != null) {
				canvas.keysState[keyCode] = false;
				js2me.launchThread(function () {
					canvas.$keyReleased$I$V(keyCode);
				});
			} else {
				for (var i in canvas.keysState) {
					if (canvas.keysState[i]) {
						canvas.keysState[i] = false;
						(function (j) {
							js2me.launchThread(function () {
								canvas.$keyReleased$I$V(j);
							});
						})(i);
					}
				}
			}
		};
		this.keysState = [];
		this.gameState = 0;
		this.init();
	},
	/*
	 * protected void keyPressed(int keyCode)
	 */
	$keyPressed$I$V: function () {
	},
	/*
	 * protected void keyReleased(int keyCode)
	 */
	$keyReleased$I$V: function () {
	},
	/*
	 * public final void repaint(int x, int y, int width, int height)
	 */
	$paint$Ljavax_microedition_lcdui_Graphics_$V: function () {
	},
	time: 0,
	/*
	 * public final void repaint(t)
	 */
	$repaint$$V: function () {
		if (js2me.profile) {
			this.calls++;
			var time = +new Date;
			if (time - this.time > 1000) {
				document.getElementById('title').innerHTML = this.calls;
				this.time = time;
				this.calls = 0;
			}
		}
		var graphics = new javaRoot.$javax.$microedition.$lcdui.$Graphics(this.element);
		var canvas = this;
		js2me.launchThread(function () {
			canvas.$paint$Ljavax_microedition_lcdui_Graphics_$V(graphics);
		});
	},
	/*
	 * public final void repaint(int x, int y, int width, int height)
	 */
	$repaint$IIII$V: function () {
		//TODO: there's some constraints...
		this.$repaint$$V();
	},
	/*
	 * public int getKeyCode(int gameAction)
	 */
	$getKeyCode$I$I: function (gameAction) {
		for (var i in this.gameActionMapping) {
			if (this.gameActionMapping[i] == gameAction) {
				return parseInt(i);
			}
		}
	},
	/*
	 * public int getGameAction(int keyCode)
	 */
	$getGameAction$I$I: function (keyCode) {
		var gameAction = this.gameActionMapping[keyCode];
		if (gameAction != null) {
			return gameAction;
		} else {
			return keyCode;
		}
	},
	/*
	 * public final void serviceRepaints()
	 */
	$serviceRepaints$$V: function () {
		//TODO: is it ok?
		//this.$repaint__V();
	},
	/*
	 * protected void showNotify()
	 */
	$showNotify$$V: function () {
		
	},
	/*
	 * protected void hideNotify()
	 */
	$hideNotify$$V: function () {
		
	},
	/*
	 * public void setFullScreenMode(boolean mode)
	 */
	$setFullScreenMode$Z$V: function (mode) {
		if (mode == 0) {
			this.element.height = js2me.config.height;
		} else {
			this.element.height = js2me.config.fullHeight;
		}
		this.fullscreen = (mode != 0);
		if (this.active) {
			js2me.setFullscreen(this.fullscreen);
		}
	},
	/*
	 * 
	 */
	$getWidth$$I: function () {
		return this.element.width;
	},
	/*
	 * 
	 */
	$getHeight$$I: function () {
		return this.element.height;
	},
	/*
	 * public boolean isDoubleBuffered()
	 */
	$isDoubleBuffered$$Z: function () {
		//TODO: let's think about this...
		return 0;
	},
	/*
	 * public boolean hasPointerEvents()
	 */
	$hasPointerEvents$$Z: function () {
		return 1;
	},
	/*
	 * public boolean hasPointerMotionEvents()
	 */
	$hasPointerMotionEvents$$Z: function () {
		return 1;
	},
	/*
	 * public String getKeyName(int keyCode)
	 */
	$getKeyName$I$Ljava_lang_String_: function () {
		//TODO
		return new javaRoot.$java.$lang.$String('pomidor');
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Displayable'
});
