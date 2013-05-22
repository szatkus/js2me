(function () {
	function Canvas() {
	}
	Canvas.prototype = {
		_init__V: function () {
			this.element = document.createElement('canvas');
		},
		$getWidth__I: function () {
			return this.element.width;
		},
		$getHeight__I: function () {
			return this.element.height;
		},
		$addCommand_Ljavax_microedition_lcdui_Command__V: function (command) {
			//TODO
		},
		$setCommandListener_Ljavax_microedition_lcdui_CommandListener__V: function (commandListener) {
			//TODO
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Canvas'] = Canvas;
})();
