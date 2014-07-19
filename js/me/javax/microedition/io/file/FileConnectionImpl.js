js2me.createClass({
	construct: function (filename) {
		this.filename = filename.replace(/\/+/g, '/').replace(/\/$|^\//g, '');
		var request = indexedDB.open('js2me', 13);
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
		js2me.isThreadSuspended = true;
		var threadId = js2me.currentThread;
		js2me.restoreStack[threadId] = [function () {
			return connection;
		}];
	},
	$close$$V: function () {
		var store = this.getStore();
		var request = store.put(this.file, this.filename);
		js2me.isThreadSuspended = true;
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
	 * public java.io.DataOutputStream openDataOutputStream() throws java.io.IOException
	 */
	$openDataOutputStream$$Ljava_io_DataOutputStream_: function () {
		var stream = new javaRoot.$java.$io.DataOutputStream();
		stream._init$Ljava_io_OutputStream_$V(this.$openOutputStream$$Ljava_io_OutputStream_());
		return stream;
	},
	/*
	 * public java.io.OutputStream openOutputStream() throws java.io.IOException
	 */
	$openOutputStream$$Ljava_io_OutputStream_: function () {
		return this.$openOutputStream$J$Ljava_io_OutputStream_({hi: 0, lo: 0});
	},
	/*
	 * public java.io.OutputStream openOutputStream(long byteOffset) throws java.io.IOException
	 */
	$openOutputStream$J$Ljava_io_OutputStream_: function (offset) {
		//FIXME
		if (offset < 0) {
			throw new javaRoot.$java.$lang.$IllegalArgumentException();
		}
		if (!this.file || !this.file.data) {
			throw new javaRoot.$java.$lang.$IOException();
		}
		return new javaRoot.$java.$io.$DynamicOutputStream(this.file.data, offset.lo);
	},
	/*
	 * public void truncate(long byteOffset) throws java.io.IOException
	 */
	$truncate$J$V: function (offset) {
		//FIXME
		if (offset < 0) {
			throw new javaRoot.$java.$lang.$IllegalArgumentException();
		}
		if (!this.file || !this.file.data) {
			throw new javaRoot.$java.$lang.$IOException();
		}
		this.file.data = this.file.data.slice(offset.lo);
	},
	create: function (pattern) {
		var parentName = '';
		console.debug('Create ' + this.filename);
		if (this.filename.lastIndexOf('/') !== -1) {
			parentName = this.filename.substring(0, this.filename.lastIndexOf('/'));
		}
		var connection = this;
		var store = connection.getStore();
		var request = store.get(parentName);
		js2me.isThreadSuspended = true;
		var threadId = js2me.currentThread;
		request.onsuccess = function () {
			console.debug('Created ' + connection.filename);
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
	interfaces: ['javaRoot.$javax.$microedition.$io.$file.$FileConnection'],
	require: ['javaRoot.$java.$io.$DynamicOutputStream', 'javaRoot.$javax.$microedition.$io.$file.$FileEnumeration', 'javaRoot.$java.$io.DataOutputStream']
});

