(function () {
	function Thread() {
	}
	Thread.prototype = {
		$start__V: function () {
			var worker = new Worker('js/threadWorker.js');
			 worker.postMessage(4);
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$java.$lang')['$Thread'] = Thread;
})();

