/**
 * Loads classes and resources from a given JAR file. This function purges state of JVM.
 * @param {string} filename Path to JAR file.
 * @param {function} callback Function to execute when loading is over.
 */
js2me.loadJAR = function (filename, callback) {
	console.log('Opening ' + filename);
	document.getElementById('screen').innerHTML = 'Loading ' + filename;
	function loadReader(reader) {
		zip.useWebWorkers = false;
		zip.workerScriptsPath = 'js/zip/';
		zip.createReader(reader, function(zipReader) {
			zipReader.getEntries(function (entries) {
				js2me.loadResources(entries, function () {
					js2me.transferResources();
					js2me.worker.postMessage(['run']);
					callback();
				});
			});
		});
	}
	
	if (navigator.getDeviceStorage && navigator.getDeviceStorage('sdcard')) {
		navigator.getDeviceStorage('sdcard').get(filename).onsuccess = function () {
			loadReader(new zip.BlobReader(this.result));
		};
	} else {
		loadReader(new zip.HttpReader(filename));
	}
	
};
