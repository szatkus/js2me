js2me.createClass({
	/*
	 * public static Display getDisplay(MIDlet m)
	 */
	$getDisplay$Ljavax_microedition_midlet_MIDlet_$Ljavax_microedition_lcdui_Display_: function (midlet) {
		if (!midlet.display) {
			midlet.display = new javaRoot.$javax.$microedition.$lcdui.$Display();
			var element = document.getElementById('screen');
			midlet.display.element = element;
			this.choiceButton = document.getElementById('choice');
			this.backButton = document.getElementById('back');
			this.choiceButton.addEventListener('mousedown', function () {
				var displayable = midlet.display.current;
				function getItem(i) {
					var item = document.createElement('div');
					item.innerHTML = displayable.currentCommands[i].label.text;
					item.className = 'item';
					item.onclick = function () {
						var command = displayable.currentCommands[i];
						displayable.display.$setCurrent$Ljavax_microedition_lcdui_Displayable_$V(displayable);
						displayable.commandListener.$commandAction$Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable_$V(command, displayable);
					}
					return item;
				};
				if (displayable && displayable.commandListener) {
					displayable.currentCommands = displayable.choiceCommands;
					if (displayable.choiceCommands.length == 1) {
						displayable.commandListener.$commandAction$Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable_$V(displayable.choiceCommands[0], displayable);
					}
					if (displayable.choiceCommands.length > 1) {
						element.innerHTML = '';
						for (var i = 0; i < displayable.currentCommands.length; i++) {
							element.appendChild(getItem(i));
						}
					}
				}
			});
			this.backButton.addEventListener('mousedown', function () {
				var displayable = midlet.display.current;
				if (displayable && displayable.backCommands.length == 1 && displayable.commandListener) {
					displayable.commandListener.$commandAction$Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable_$V(displayable.backCommands[0], displayable);
				}
			});
		}
		return midlet.display;
	},
	/*
	 * public int numAlphaLevels()
	 */
	$numAlphaLevels$$I: function () {
		return 256;
	},
	/*
	 * public int numColors()
	 */
	$numColors$$I: function () {
		return 65536;
	},
	/*
	 * public void setCurrent(Displayable nextDisplayable)
	 */
	$setCurrent$Ljavax_microedition_lcdui_Displayable_$V: function (displayable) {
		clearTimeout(this.timeout);
		var screen = this.element;
		if (this.current) {
			this.current.active = false;
		}
		this.lastDisplayable = this.current;
		this.current = displayable;
		if (displayable != null) {
			displayable.display = this;
		}
		this.timeout = setTimeout(function () {
			document.getElementById('title').innerHTML = '';
			screen.innerHTML = '';
			if (displayable != null) {
				if (displayable.title) {
					document.getElementById('title').innerHTML = displayable.title.text;
				}
				screen.appendChild(displayable.element);
				displayable.active = true;
				displayable.refreshCommands();
				js2me.setFullscreen(displayable.fullscreen);
			}
		}, 1);
	},
	/*
	 * public void callSerially(Runnable r)
	 */
	$callSerially$Ljava_lang_Runnable_$V: function (r) {
		a = 1;
		js2me.launchThread(function () {
			r.$run$$V();
		});
	},
	/*
	 * public Displayable getCurrent()
	 */
	$getCurrent$$Ljavax_microedition_lcdui_Displayable_: function () {
		return this.current;
	},
	/*
	 * public boolean isColor()
	 */
	$isColor$$Z: function () {
		return 1;
	},
	/*
	 * public boolean vibrate(int duration)
	 */
	$vibrate$I$Z: function () {
		console.log('*vibration*');
		return 0;
	}
});
