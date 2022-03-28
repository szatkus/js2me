/**
 * Converts given array into string.
 * @param {array} array Array of bytes which is correct UTF8 content.
 */
js2me.UTF8ToString = function (sourceArray, offset, length) {
	if (offset == null) {
		offset = 0;
	}
	var i = 0;
	if (length == null) {
		length = sourceArray.length;
	}
	var array = [];
	for (var j = 0; j < length; j++) {
		var code = sourceArray[offset + j];
		if (code < 0) {
			code += 256;
		}
		array[j] = code;
	}
	var result = [];
	while(i < length) {
		if (array[i] < 0x80) {
			var code = array[i];
			i++;
		} else if ((array[i] & 0xE0) == 0xC0) {
			var code = ((array[i] & 0x1F) << 6) | (array[i + 1] & 0x3F);
			i += 2;
		} else if ((array[i] & 0xF0) == 0xE0) {
			var code = (((array[i] & 0x0F) << 12) | ((array[i + 1] & 0x3F) << 6) | (array[i + 2] & 0x3F));
			i += 3;
		} else {
			return null;
		}
		
		var char = String.fromCharCode(code);
		if (char != '') {
			result.push(char);
		} else {
			return null;
		}
	}
	return result.join('');
};
js2me.stringToUTF8 = function (text) {
	var result = [];
	for (var i = 0; i < text.length; i++) {
		var char = text.charCodeAt(i);
		if (char >= 0x01 && char <= 0x007F) {
			result.push(char);
		}
		if (char == 0 || (char >= 0x0080 && char <= 0x07FF)) {
			result.push(0xC0 | (0x1F & (char >> 6)));
			result.push(0x80 | (0x3F & char));
		}
		if (char >= 0x0800 && char <= 0xFFFF) {
			result.push(0xE0 | (0x0F & (char >> 12)));
			result.push(0x80 | (0x3F & (char >>  6)));
			result.push(0x80 | (0x3F & char));
		}
	}
	return result;
};
js2me.bytesToDataURI = function (bytes, offset, length, mime) {
	var dataURI = 'data:' + mime + ',';
	for (var j = offset; j < offset + length; j++) {
		dataURI += '%';
		var code = bytes[j];
		if (code < 0) {
			code += 256;
		}
		code = code.toString(16)
		if (code.length == 1) {
			dataURI += '0';
		}
		dataURI += code;
	}
	return dataURI;
};

js2me.markUnsafe = function (func) {
	func.isUnsafe = true;
	return func;
};

// setZeroTimeout - L. David Baron <dbaron@dbaron.org>
var setZeroTimeout = (function() {
	var timeouts = [];
	var messageName = "zero-timeout-message";

	// Like setTimeout, but only takes a function argument.  There's
	// no time argument (always zero) and no arguments (you have to
	// use a closure).
	function setZeroTimeout(fn) {
	  timeouts.push(fn);
	  window.postMessage(messageName, "*");
	}

	function handleMessage(event) {
	  if (event.source == window && event.data == messageName) {
		event.stopPropagation();
		if (timeouts.length > 0) {
		  var fn = timeouts.shift();
		  fn();
		}
	  }
	}

	window.addEventListener("message", handleMessage, true);

	setZeroTimeout.removeListener = function () {
	  window.removeEventListener('message', handleMessage, true);  
	}

	// Add the one thing we want added to the window object.
	return setZeroTimeout;
})();
