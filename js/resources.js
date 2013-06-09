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
	function addResource(entry) {
		entry.getData(new zip.ArrayBufferWriter(), function (content) {
			js2me.resources[entry.filename] = new Uint8Array(content);
			finish();
		});
	}
	js2me.resources = {};
	for (var i in entries) {
		addResource(entries[i]);
	}
};
