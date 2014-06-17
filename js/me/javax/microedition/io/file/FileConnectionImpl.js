js2me.createClass({
	construct: function (filename) {
		this.filename = filename.replace(/\/+/g, '/').replace(/\/$|^\//g, '');
		var request = indexedDB.open('js2me', 6);
		var connection = this;
		request.onsuccess = function () {
			connection.db = request.result;
			var fileRequest = connection.getStore().get(connection.filename);
			fileRequest.onsuccess = function () {
				if (fileRequest.result) {
					connection.file = fileRequest.result;
				}
				js2me.restoreThread(threadId);
			};
			fileRequest.onerror = function () {
				console.debug('Error opening "file" ' + connection.filename);
			};
		};
		request.onupgradeneeded = function () {
			var store;
			if (request.result.objectStoreNames.contains('files')) {
				request.result.deleteObjectStore('files');
			}
			store = request.result.createObjectStore('files');
			store.add({
				files: [],
				size: 4096,
				isDirectory: true
			}, 'sdcard');
			store.add({
				files: ['sdcard'],
				size: 4096,
				isDirectory: true
			}, '');
		};
		js2me.suspendThread = true;
		var threadId = js2me.currentThread;
		js2me.restoreStack[threadId] = [function () {
			return connection;
		}];
	},
	$create$$V: js2me.markUnsafe(function () {
		var parentName = '';
		if (this.filename.indexOf('/') !== -1) {
			parentName = this.filename.substring(0, this.filename.indexOf('/'));
		}
		var connection = this;
		var store = connection.getStore();
		var request = store.get(parentName);
		js2me.suspendThread = true;
		var threadId = js2me.currentThread;
		request.onsuccess = function () {
			request.result.files.push(connection.filename);
			var store = connection.getStore();
			store.put(request.result, parentName);
			connection.file = {
				data: [],
				size: 0
			};
			store.add(connection.file, connection.filename);
			js2me.restoreThread(threadId);
		};
		
	}),
	/*
	 * public long fileSize() throws java.io.IOException
	 */
	$fileSize$$J: js2me.markUnsafe(function () {
		if (this.file) {
			return {hi: 0, lo: this.file.size};
		} else {
			return js2me.lneg({hi: 0, lo: 1});
		}
	}),
	getStore: function () {
		return this.db.transaction(['files'], 'readwrite').objectStore('files');
	},
	interfaces: ['javaRoot.$javax.$microedition.$io.$file.$FileConnection']
});

