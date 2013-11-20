/**
 * Loads classes and resources from a given JAR file. This function purges state of JVM.
 * @param {string} filename Path to JAR file.
 * @param {function} callback Function to execute when loading is over.
 */
js2me.loadJAR = function (file, callback) {
	document.getElementById('screen').innerHTML = 'Loading file...';
	function loadReader(reader) {
		zip.useWebWorkers = false;
		zip.workerScriptsPath = 'js/zip/';
		zip.createReader(reader, function(zipReader) {
			zipReader.getEntries(function (entries) {
				js2me.loadResources(entries, function () {
					var content = js2me.UTF8ToString(js2me.resources['META-INF/MANIFEST.MF']);
					js2me.manifest = js2me.parseManifest(content);
					js2me.storageName = js2me.manifest['midlet-vendor'] + '/' +js2me.manifest['midlet-name'] + '//' + file.size + '/';
					for (var name in js2me.resources) {
						if (name.lastIndexOf('class') >= 0 && name.lastIndexOf('class') == name.length - 5) {
							js2me.loadJavaClass(new js2me.BufferStream(js2me.resources[name]));
						}
						
					}
					js2me.checkClasses(callback);
				});
			});
		}, function (message) {
			js2me.showError(message);
		});
	}
	
	js2me.setupJVM(function () {
		console.log(file);
		loadReader(new zip.BlobReader(file));
	});
}
