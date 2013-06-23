(function () {
	var mapping = [];
	mapping[38] = -1;
	mapping[37] = -3;
	mapping[39] = -4;
	mapping[40] = -2;
	mapping[32] = -5;
	mapping[48] = 48;
	mapping[49] = 49;
	mapping[50] = 50;
	mapping[51] = 51;
	mapping[52] = 52;
	mapping[53] = 53;
	mapping[54] = 54;
	mapping[55] = 55;
	mapping[56] = 56;
	mapping[57] = 57;
	document.onkeydown = function (e) {
		//console.log(e.which);
		if (mapping[e.which]) {
			js2me.sendKeyPressEvent(mapping[e.which]);
		}
	};
	document.onkeyup = function (e) {
		if (mapping[e.which]) {
			js2me.sendKeyReleasedEvent(mapping[e.which]);
		}
	};
	window.onload = function () {
		var parts = location.search.substr(1).split('&');
		for (var i = 0; i < parts.length; i++) {
			var value = parts[i].split('=')[1];
			if (!isNaN(parseInt(value))) {
				value = parseInt(value);
			}
			js2me.config[parts[i].split('=')[0]] = value;
		}
		var screen = document.getElementById('screen');
		screen.style.width = js2me.config.width + 'px';
		screen.style.height = js2me.config.height + 'px';
		js2me.loadJAR(js2me.config['src'], function () {
			js2me.launchMidlet(1);
		});
	};
	js2me.setFullscreen = function (enabled) {
		var screen = document.getElementById('screen');
		if (enabled) {
			screen.style.height = js2me.config.fullHeight + 'px';
		} else {
			screen.style.height = js2me.config.height + 'px';
		}
	};
})();
