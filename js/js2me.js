var js2me = {
	// obsolete
	JAVA_ROOT: 'javaRoot',
	debug: false,
	worker: new Worker('js/javaWorker.js'),
	config: {
		width: 240,
		height: 266,
		fullHeight: 320,
		src: 'jars/asteroids.jar'
	}
};

js2me.log = function (message, type) {
	type =  type || 'log';
	console[type](message);
}

js2me.worker.addEventListener('message',  function(event) {
	if (event.data.constructor !== Array) {
		return;
	}
	var command = event.data.shift();
	js2me[command].apply(js2me, event.data);
});
