(function () {
	function tmp(text) {
		this.text = text
	}
	js2me.touchPackage(js2me.JAVA_ROOT + '.$java.$lang')['$String'] = tmp;
})();

