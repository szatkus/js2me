(function () {
	function Throwable () {
	}
	Throwable.prototype = {
		_init$$V: function () {
			
		},
		$printStackTrace$$V: function () {
			//TODO
			console.log('[stacktrace]');
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$Throwable'] = Throwable ;
})();

