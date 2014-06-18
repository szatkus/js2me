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
				isDirectory: true
			}, 'sdcard');
			store.add({
				files: ['sdcard'],
				isDirectory: true
			}, '');
		};
		js2me.suspendThread = true;
		var threadId = js2me.currentThread;
		js2me.restoreStack[threadId] = [function () {
			return connection;
		}];
	},
	$close$$V: function () {
		var store = this.getStore();
		var request = store.put(this.file, this.filename);
		js2me.suspendThread = true;
		var threadId = js2me.currentThread;
		request.onsuccess = function () {
			js2me.restoreThread(threadId);
		};
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
				data: []
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
			if (this.file.data) {
				return {hi: 0, lo: this.file.data.length};
			} else {
				return {hi: 0, lo: 4096};
			}
		} else {
			return js2me.lneg({hi: 0, lo: 1});
		}
	}),
	/*
	 * public java.io.OutputStream openOutputStream(long byteOffset) throws java.io.IOException
	 */
	$openOutputStream$J$Ljava_io_OutputStream_: function (offset) {
		if (offset < 0) {
			throw new javaRoot.$java.$lang.$IllegalArgumentException();
		}
		if (!this.file || !this.file.data) {
			throw new javaRoot.$java.$lang.$IOException();
		}
		return new javaRoot.$java.$io.$DynamicOutputStream(this.file.data, offset);
	},
	getStore: function () {
		return this.db.transaction(['files'], 'readwrite').objectStore('files');
	},
	interfaces: ['javaRoot.$javax.$microedition.$io.$file.$FileConnection']
});

