var console = {
	log: function (message) {
		postMessage(['console', 'log', -1, message]);
	},
	error: function (message) {
		postMessage(['console', 'error', -1, message]);
	},
	debug: function (message) {
		postMessage(['console', 'debug', -1, message]);
	}
}

var js2me = {
	resources: {},
	stat: 0,
	libraryPath: 'me',
	addResource: function (name, content) {
		js2me.resources[name] = new Uint8Array(content);
	},
	run: function () {
		for (var name in js2me.resources) {
			if (name.lastIndexOf('class') >= 0 && name.lastIndexOf('class') == name.length - 5) {
				js2me.loadJavaClass(new js2me.BufferStream(js2me.resources[name]));
			}
			if (name == 'META-INF/MANIFEST.MF') {
				var content = js2me.UTF8ToString(js2me.resources[name]);
				js2me.manifest = js2me.parseManifest(content);
			}
		}
		js2me.checkClasses(function() {
			postMessage('ready');
		}, 100);
	},
	setConfig: function (config) {
		config.workers = false;
		js2me.config = config;
		js2me.engine = 'js/program_' + js2me.config.engine + '.js';
	}
};

var javaRoot = {};
var window = this;

console.debug('hello!');

importScripts('zip/zip.js', 'zip/inflate.js', 'zip/zip-ext.js', 'bufferStream.js', 'classes.js', 'convert.js', 
	'execute.js', 'events.js', 'launcher.js', 'loader.js', 'manifest.js', 'methodStub.js', 'numbers.js', 
	'remote.js', 'resources.js', 'threads.js', 'utils.js');

var FileReader = function () {
	var reader = new FileReaderSync();
	this.readAsArrayBuffer = function (blob) {
		reader.result = reader.readAsArrayBuffer(blob);
		this.onload({target: reader});
	}
};

js2me.loadScript = function (filename, successCallback, errorCallback) {
	setTimeout(function () {
		try {
			importScripts(filename);
		} catch (e) {
			if (errorCallback) {
				errorCallback();
			}
			return;
		}
		if (successCallback) {
			successCallback();
		}
	}, 1);
};

addEventListener('message', function (event) {
	try {
		var command = event.data.shift();
		js2me[command].apply(js2me, event.data);
	} catch (e) {
		console.error(command + ': ' + e.message + '\n' + e.stack);
	}
});
js2me.setFullscreen = function (enabled) {};
