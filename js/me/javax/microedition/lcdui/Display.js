js2me.createClass({
	$getDisplay_Ljavax_microedition_midlet_MIDlet__Ljavax_microedition_lcdui_Display_: function (midlet) {
		if (!midlet.display) {
			midlet.display = new javaRoot.$javax.$microedition.$lcdui.$Display();
			var element = document.getElementById('screen');
			midlet.display.element = element;
		}
		return midlet.display;
	},
	$setCurrent_Ljavax_microedition_lcdui_Displayable__V: function (displayable) {
		clearTimeout(this.timeout);
		var screen = this.element;
		if (this.current) {
			this.current.active = false;
		}
		this.current = displayable;
		this.timeout = setTimeout(function () {
			if (displayable.title) {
				document.getElementById('title').innerHTML = displayable.title.text;
			}
			screen.innerHTML = '';
			screen.appendChild(displayable.element);
			displayable.active = true;
			displayable.refreshCommands();
		}, 1);
	},
	$callSerially_Ljava_lang_Runnable__V: function (r) {
		a = 1;
		setTimeout(function () {
			r.$run__V();
		}, 1);
	},
	$getCurrent__Ljavax_microedition_lcdui_Displayable_: function () {
		return this.current;
	},
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$Display'
});
