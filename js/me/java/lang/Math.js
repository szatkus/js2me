(function () {
	function JavaMath () {
	}
	JavaMath.prototype = {
		$abs_I_I: Math.abs
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$Math'] = JavaMath ;
})();

