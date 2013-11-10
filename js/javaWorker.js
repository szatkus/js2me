var console = {
	log: function (message) {
		postMessage(['log', message]);
	},
	error: function (message) {
		postMessage(['log', message, 'error']);
	},
	debug: function (message) {
		postMessage(['log', message, 'debug']);
	}
}

var js2me = {
	resources: {},
	sharedId: 0,
	// for counting... things
	stat: 0,
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
		js2me.config = config;
	}
};

var javaRoot = {};
var window = this;

importScripts('bufferStream.js', 'classes.js', 'convert.js', 'execute.js',
	'launcher.js', 'manifest.js', 'methodStub.js', 'numbers.js', 
	'program.js', 'remote.js', 'threads.js', 'utils.js');

js2me.setupJVM(function () {});

addEventListener('message', function (event) {
	try {
		var command = event.data.shift();
		js2me[command].apply(js2me, event.data);
	} catch (e) {
		console.error(command + ': ' + e.message + '\n' + e.stack);
	}
});

js2me.setFullscreen = function (enabled) {
};

postMessage(['log', 'Worker is ready!']);
