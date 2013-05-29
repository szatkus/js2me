(function () {
	function Throwable () {
	}
	Throwable.prototype = {
		_init__V: function () {
			
		},
		$printStackTrace__V: function () {
			//TODO
			console.log('[stacktrace]');
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$Throwable'] = Throwable ;
})();

