/**
 * Converts given array into string.
 * @param {array} array Array of bytes which is correct UTF8 content.
 */
js2me.UTF8ToString = function (sourceArray, offset, length) {
	if (offset == null) {
		offset = 0;
	}
	var i = offset;
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
	var result = '';
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
			result += char;
		} else {
			return null;
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
