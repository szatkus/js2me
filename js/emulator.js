(function () {
	// from http://stackoverflow.com/questions/1517924/javascript-mapping-touch-events-to-mouse-events
	function touchHandler(event)
	{
		var touches = event.changedTouches,
			first = touches[0],
			type = "";
			 switch(event.type)
		{
			case "touchstart": type = "mousedown"; break;
			case "touchmove":  type="mousemove"; break;        
			case "touchend":   type="mouseup"; break;
			default: return;
		}

		var simulatedEvent = document.createEvent("MouseEvent");
		simulatedEvent.initMouseEvent(type, true, true, window, 1, 
								  first.screenX, first.screenY, 
								  first.clientX, first.clientY, false, 
								  false, false, false, 0/*left*/, null);

																					 first.target.dispatchEvent(simulatedEvent);
		event.preventDefault();
	}
	document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);   
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
		document.getElementById('top').style.display = 'none';
		var parts = location.search.substr(1).split('&');
		for (var i = 0; i < parts.length; i++) {
			var value = parts[i].split('=')[1];
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
