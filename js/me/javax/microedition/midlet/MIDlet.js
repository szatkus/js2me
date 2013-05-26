(function () {
	function MIDlet() {
	}
	MIDlet.prototype = {
		$notifyDestroyed__V: function () {
			//TODO
			console.log('EXIT');
		},
		_init__V: function () {
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$midlet')['$MIDlet'] = MIDlet;
})();

