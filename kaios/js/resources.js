/**
 * Loads resources from given list of zip entries to local cache.
 * @param {array} entries Array of zip.Entry elements.
 * @param {function} callback Function to execute when all resources are loaded.
 */
js2me.loadResources = function (entries, callback) {
	var remain = entries.length;
	function finish() {
		remain--;
		if (remain == 0) {
			callback();
		}
	}
	var i = 0;
	function addResource(entry) {
		entry.getData(new zip.ArrayBufferWriter(), function (content) {
			document.getElementById('screen').innerHTML = 'Loading ' + entry.filename + ' (' + (i + 1) + '/' + entries.length + ')';
			js2me.resources[entry.filename] = new Uint8Array(content);
			finish();
			if (remain > 0) {
				addResource(entries[i]);
			}
		});
	}
	js2me.resources = {};
	addResource(entries[i]);
};
js2me.addResources = function (entries) {
	js2me.resources = {};
	for (var i in entries) {
		js2me.resources[entries[i].filename] = entries[i];
	}
};
js2me.loadResource = function (name, callback) {
	if (name.indexOf('/') === 0) {
		name = name.substring(1);
	}
	if (js2me.resources[name] instanceof Uint8Array) {
		callback(js2me.resources[name]);
	} else {
		if (js2me.resources[name] == null) {
			callback(null);
		} else {
			js2me.resources[name].getData(new zip.ArrayBufferWriter(), function (content) {
				js2me.resources[name] = new Uint8Array(content);
				callback(js2me.resources[name]);
			});
		}
	}
};
