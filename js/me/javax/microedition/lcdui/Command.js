(function () {
	function Command() {
	}
	Command.prototype = {
		$SCREENI: 1,
		$BACKI: 2,
		$CANCELI: 3,
		$OKI: 4,
		$HELPI: 5,
		$STOPI: 6,
		$EXITI: 7,
		$ITEMI: 8,
		_init_Ljava_lang_String_II_V: function (label, commandType, priority) {
			this.label = label;
			this.commandType = commandType;
			this.priority = priority;
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Command'] = Command;
})();

