js2me.createClass({
	construct: function (filename) {
		filename = filename.replace(/\/+/g, '/').replace(/\/$|^\//g, '');
		var request = indexedDB.open('files');
		var connection = this;
		request.onsuccess = function () {
			connection.db = request.result;
			js2me.restoreThread(threadId);
		};
		js2me.suspendThread = true;
		var threadId = js2me.currentThread;
		js2me.restoreStack[threadId] = [function () {
			return connection;
		}];
	},
	interfaces: ['javaRoot.$javax.$microedition.$io.$file.$FileConnection']
});

