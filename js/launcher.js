/**
 * Launches a midlet with given id.
 * @param {number} id Midlet's id.
 */
js2me.launchMidlet = function (id) {
	var mainMidlet = js2me.manifest['midlet-' + id];
	js2me['statics' + id] = {};
	var mainClassName = 'javaRoot.$' + mainMidlet.split(',')[2].trim().replace(/\./g, '.$');
	js2me.currentVM = id;
	var mainThread = new javaRoot.$java.$lang.$Thread(function () {
		js2me.loadClass(mainClassName, function (mainClass) {
			var midlet = new mainClass();
			midlet._init$$V(function () {
				midlet.$startApp$$V();
			});
		});
	});
	setTimeout(function () {
		js2me.currentVM = id;
		mainThread.$start$$V();
	}, 100);
};
js2me.launchJAR = function (blob) {
	if (js2me.config.workers) {
		js2me.worker.postMessage(['launchJAR', blob]);
	} else {
		js2me.loadScript(js2me.engine, function () {
			js2me.loadJAR(blob, function () {
				js2me.launchMidlet(js2me.config.midlet);
				if (js2me.manifest['nokia-midlet-bg-server']) {
					setTimeout(function () {
						js2me.launchMidlet(js2me.manifest['nokia-midlet-bg-server']);
					}, 0);
				}
			});
		});
	}
};
