/**
 * Launches a midlet with given id.
 * @param {number} id Midlet's id.
 */
js2me.launchMidlet = function (id) {
	var mainMidlet = js2me.manifest['midlet-1'];
	var mainClassName = 'javaRoot.$' + mainMidlet.split(',')[2].trim().replace(/\./g, '.$');
	js2me.loadClass(mainClassName, function (mainClass) {
		js2me.mainThread = new javaRoot.$java.$lang.$Thread(function () {
			var midlet = new mainClass();
			midlet._init$$V(function () {
				midlet.$startApp$$V();
			});
		});
		setTimeout(function () {
			js2me.mainThread.$start$$V();
		}, 100);
	});
};
js2me.launchJAR = function (blob) {
	if (js2me.config.workers) {
		js2me.worker.postMessage(['launchJAR', blob]);
	} else {
		js2me.loadScript(js2me.engine, function () {
			js2me.loadJAR(blob, function () {
				js2me.launchMidlet(1);
			});
		});
	}
};
