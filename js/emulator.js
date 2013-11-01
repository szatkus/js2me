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
		window.addEventListener('keyup', function () {
			js2me.sendKeyReleasedEvent();
		});
		var buttonsMapping = {
			choice: -6,
			back: -1,
			num1: 49,
			num2: 50,
			num3: 51,
			num4: 52,
			num5: 53,
			num6: 54,
			num7: 55,
			num8: 56,
			num9: 57,
			num0: 48,
		};
		var keypad = document.getElementById('keypad');
		for (var i in buttonsMapping) {
			(function (key) {
				var button = keypad.querySelector('#' + i);
				button.addEventListener('mousedown', function() {
					js2me.sendKeyPressEvent(key);
				});
				button.addEventListener('touchstart', function() {
					js2me.sendKeyPressEvent(key);
				});
				button.addEventListener('touchend', function() {
					js2me.sendKeyReleasedEvent(key);
				});
			})(buttonsMapping[i]);
		}
		document.getElementById('top').style.display = 'none';
		document.querySelector('#show.topbutton').addEventListener('touchstart', function () {
			document.getElementById('top').style.display = '';
		});
		document.querySelector('#hide.topbutton').addEventListener('touchstart', function () {
			document.getElementById('top').style.display = 'none';
		});
		document.querySelector('#exit.topbutton').addEventListener('touchstart', function () {
			location.href='index.html';
		});
		var parts = location.search.substr(1).split('&');
		for (var i = 0; i < parts.length; i++) {
			var value = decodeURIComponent(parts[i].split('=')[1]);
			if (!isNaN(parseInt(value))) {
				value = parseInt(value);
			}
			js2me.config[parts[i].split('=')[0]] = value;
		}
		var buttons = document.getElementsByTagName('a');
		js2me.loadJAR(js2me.config['src'], function () {
			js2me.launchMidlet(1);
		});
	};
	js2me.setFullscreen = function (enabled) {
		//TODO
		var screen = document.getElementById('screen');
	};
})();
