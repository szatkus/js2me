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
