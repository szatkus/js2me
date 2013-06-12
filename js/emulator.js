document.onkeydown = function (e) {
	var mapping = [];
	mapping[38] = 'up';
	mapping[37] = 'left';
	mapping[39] = 'right';
	mapping[40] = 'down';
	mapping[32] = 'ok';
	mapping[48] = 'num0';
	mapping[49] = 'num1';
	mapping[50] = 'num2';
	mapping[51] = 'num3';
	mapping[52] = 'num4';
	mapping[53] = 'num5';
	mapping[54] = 'num6';
	mapping[55] = 'num7';
	mapping[56] = 'num8';
	mapping[57] = 'num9';
	//console.log(e.keyCode);
	if (mapping[e.which]) {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("mousedown", true, true, window);
		var element = document.getElementById(mapping[e.which]);
		element.dispatchEvent(evt);
	}
};

window.onload = function () {
	var parts = location.search.substr(1).split('&');
	for (var i = 0; i < parts.length; i++) {
		var value = parts[i].split('=')[1];
		if (!isNaN(parseInt(value))) {
			value = parseInt(value);
		}
		js2me.config[parts[i].split('=')[0].toLowerCase()] = value;
	}
	var screen = document.getElementById('screen');
	//screen.style.width = js2me.config.width + 'px';
	//screen.style.height = js2me.config.height + 'px';
	js2me.loadJAR(js2me.config['src'], function () {
		js2me.launchMidlet(1);
	});
};
