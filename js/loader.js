/**
 * Loads classes and resources from a given JAR file. This function purges state of JVM.
 * @param {string} filename Path to JAR file.
 * @param {function} callback Function to execute when loading is over.
 */
js2me.loadJAR = function (filename, callback) {
	js2me.setupJVM(function () {
		zip.useWebWorkers = false;
		zip.workerScriptsPath = 'js/zip/';
		var reader = new zip.HttpReader(filename);
		zip.createReader(reader, function(zipReader) {
			zipReader.getEntries(function (entries) {
				js2me.loadResources(entries, function () {
					for (var name in js2me.resources) {
						if (name.lastIndexOf('class') >= 0 && name.lastIndexOf('class') == name.length - 5) {
							js2me.loadJavaClass(new js2me.BufferStream(js2me.resources[name]));
						}
						if (name == 'META-INF/MANIFEST.MF') {
							var content = js2me.UTF8ToString(js2me.resources[name]);
							js2me.manifest = js2me.parseManifest(content);
						}
					}
					js2me.checkClasses(callback);
				});
			});
		});
	});
}
