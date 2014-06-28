js2me.createClass({
	construct: function (filename) {
		this.filename = filename.replace(/\/+/g, '/').replace(/\/$|^\//g, '');
		var request = indexedDB.open('js2me', 9);
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
			var privateDir = 'dirs/' + js2me.manifest['midlet-name'];
			var privateDirRequest = connection.getStore().get(privateDir);
			privateDirRequest.onsuccess = function () {
				if (!privateDirRequest.result) {
					connection.getStore().add({
						files: [],
						isDirectory: true
					}, privateDir);
				}	
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
				files: [],
				isDirectory: true
			}, 'dirs');
			store.add({
				files: ['sdcard', 'dirs'],
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
	/*
	 * public void create() throws java.io.IOException
	 */
	$create$$V: js2me.markUnsafe(function () {
		this.create({
			data: []
		});		
	}),
	/*
	 * public boolean exists()
	 */
	$exists$$Z: function () {
		if (this.file) {
			return 1;
		} else {
			return 0;
		}
	},
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
	 * public java.util.Enumeration list() throws java.io.IOException
	 */
	$list$$Ljava_util_Enumeration_: function () {
		return this.$list$Ljava_lang_String_Z$Ljava_util_Enumeration_('*', false);
	},
	/*
	 * public java.util.Enumeration list(java.lang.String filter, boolean includeHidden) throws java.io.IOException
	 */
	$list$Ljava_lang_String_Z$Ljava_util_Enumeration_: function (filter, includeHidden) {
		//TODO: support for includeHidden
		if (filter.text) {
			filter = filter.text;
		}
		filter = new RegExp('^' + filter.replace(/\\/g, '\\\\').replace('*', '.*') + '$');
		var list = [];
		for (var i in this.file.files) {
			var filename = this.file.files[i];
			if (filter.test(filename)) {
				list.push(new javaRoot.$java.$lang.$String(filename));
			}
		}
		return new javaRoot.$javax.$microedition.$io.$file.$FileEnumeration(list);
	},
	/*
	 * public void mkdir() throws java.io.IOException
	 */
	$mkdir$$V: js2me.markUnsafe(function () {
		this.create({
			files: [],
			isDirectory: true
		});	
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
	create: function (pattern) {
		var parentName = '';
		if (this.filename.lastIndexOf('/') !== -1) {
			parentName = this.filename.substring(0, this.filename.lastIndexOf('/'));
		}
		var connection = this;
		var store = connection.getStore();
		var request = store.get(parentName);
		js2me.suspendThread = true;
		var threadId = js2me.currentThread;
		request.onsuccess = function () {
			connection.file = pattern;
			var filename = connection.filename;
			if (connection.file.isDirectory) {
				filename += '/';
			}
			request.result.files.push(filename);
			var store = connection.getStore();
			store.put(request.result, parentName);
			store.add(connection.file, connection.filename);
			js2me.restoreThread(threadId);
		};
	},
	getStore: function () {
		return this.db.transaction(['files'], 'readwrite').objectStore('files');
	},
	interfaces: ['javaRoot.$javax.$microedition.$io.$file.$FileConnection']
});

