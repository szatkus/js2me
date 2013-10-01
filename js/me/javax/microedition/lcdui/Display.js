js2me.createClass({
	/*
	 * public static Display getDisplay(MIDlet m)
	 */
	$getDisplay$Ljavax_microedition_midlet_MIDlet_$Ljavax_microedition_lcdui_Display_: function (midlet) {
		if (!midlet.display) {
			midlet.display = new javaRoot.$javax.$microedition.$lcdui.$Display();
			var element = document.getElementById('screen');
			midlet.display.element = element;
		}
		return midlet.display;
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
		setTimeout(function () {
			r.$run$$V();
		}, 1);
	},
	/*
	 * public Displayable getCurrent()
	 */
	$getCurrent$$Ljavax_microedition_lcdui_Displayable_: function () {
		return this.current;
	},
	/*
	 * public boolean vibrate(int duration)
	 */
	$vibrate$I$Z: function () {
		console.log('*vibration*');
		return 0;
	}
});
