(function () {
	function Display() {
	}
	Display.prototype = {
		$getDisplay_Ljavax_microedition_midlet_MIDlet__Ljavax_microedition_lcdui_Display_: function (midlet) {
			if (!midlet.display) {
				midlet.display = new Display();
				var element = document.createElement('div');
				document.body.appendChild(element);
				midlet.display.element = element;
			}
			return midlet.display;
		},
		$setCurrent_Ljavax_microedition_lcdui_Displayable__V: function (displayable) {
			this.element.appendChild(displayable.element);
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Display'] = Display;
})();
