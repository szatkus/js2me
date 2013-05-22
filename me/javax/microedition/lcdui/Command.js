(function () {
	function Command() {
	}
	Command.prototype = {
		_init_Ljava_lang_String_II_V: function (label, commandType, priority) {
			this.label = label.text;
			this.commandType = commandType;
			this.priority = priority;
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Command'] = Command;
})();

