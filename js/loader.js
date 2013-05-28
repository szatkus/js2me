js2me.loadEntries = function (entries, callback) {
	var remain = entries.length * 2;
	function finish() {
		remain--;
		if (remain == 0) {
			callback();
		}
	}
	function addResource(entry) {
		entry.getData(new zip.ArrayBufferWriter(), function (content) {
			js2me.resources[entry.filename] = content;
			finish();
		});
	}
	for (var i in entries) {
		if (entries[i].filename.lastIndexOf('class') >= 0 &&
			entries[i].filename.lastIndexOf('class') == entries[i].filename.length - 5) {
			entries[i].getData(new zip.ArrayBufferWriter(), function (content) {
				js2me.convertClass(new js2me.BufferStream(content));
				finish();
			});
		} else if (entries[i].filename == 'META-INF/MANIFEST.MF') {
			entries[i].getData(new zip.TextWriter('utf-8'), function (content) {
				js2me.manifest = js2me.parseManifest(content);
				finish();
			});
		} else {
			finish();
		}
		addResource(entries[i]);
	}
}
