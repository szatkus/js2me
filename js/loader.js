js2me.loadEntries = function (entries, callback) {
	var remain = entries.length;
	function finish() {
		remain--;
		if (remain == 0) {
			callback();
		}
	}
	for (var i in entries) {
		if (entries[i].filename.lastIndexOf('class') == entries[i].filename.length - 5) {
			console.log(entries[i].filename);
			entries[i].getData(new zip.ArrayBufferWriter(), function (b) {
				js2me.convertClass(new js2me.BufferStream(b));
				finish();
			});
		} else if (entries[i].filename == 'META-INF/MANIFEST.MF') {
			entries[i].getData(new zip.TextWriter(), function (content) {
				js2me.manifest = js2me.parseManifest(content);
				finish();
			});
		} else {
			finish();
		}
	}
}
