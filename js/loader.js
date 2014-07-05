/**
 * Loads classes and resources from a given JAR file. This function purges state of JVM.
 * @param {string} filename Path to JAR file.
 * @param {function} callback Function to execute when loading is over.
 */
js2me.loadJAR = function (file, callback) {
	function loadReader(reader) {
		zip.useWebWorkers = false;
		zip.workerScriptsPath = 'js/zip/';
		zip.createReader(reader, function(zipReader) {
			zipReader.getEntries(function (entries) {
				js2me.addResources(entries)
				js2me.loadResource('META-INF/MANIFEST.MF', function (data) {
					var content = js2me.UTF8ToString(data);
					js2me.manifest = js2me.parseManifest(content);
					js2me.storageName = js2me.manifest['midlet-vendor'] + '/' +js2me.manifest['midlet-name'] + '//' + file.size + '/';
					callback();
				});
			});
		}, function (message) {
			js2me.showError(message);
		});
	}
	
	js2me.setupJVM(function () {
		loadReader(new zip.BlobReader(file));
	});
}
js2me.loadScript = function (filename, successCallback, errorCallback) {
	var element = document.createElement('script');
	element.src = filename;
	element.onload = function () {
		document.head.removeChild(element);
		//delete element.onload;
		//delete element.onerror;
		//element = undefined;
		successCallback();
	};
	element.onerror = function () {
		document.head.removeChild(element);
		//delete element.onload;
		//delete element.onerror;
		//element = undefined;
		errorCallback();
	};
	document.head.appendChild(element);
};
