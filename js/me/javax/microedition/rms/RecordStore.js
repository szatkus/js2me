js2me.createClass({
	construct: function(storageName) {
		this.storageName = storageName;
	},
	/*
	 * 
	 */
	$openRecordStore$Ljava_lang_String_Z$Ljavax_microedition_rms_RecordStore_: function (recordStoreName, createIfNecessary) {
		var storageName = this.getStorageName(recordStoreName);
		if (localStorage.getItem(storageName)) {
			return new javaRoot.$javax.$microedition.$rms.$RecordStore(storageName);
		} else {
			if (createIfNecessary) {
				localStorage.setItem(storageName, '0');
				localStorage.setItem(storageName + 'size', 0);
				localStorage.setItem(storageName + 'version', 0)
				localStorage.setItem(storageName + 'lastModified', 0);
				return new javaRoot.$javax.$microedition.$rms.$RecordStore(storageName);
			} else {
				throw new javaRoot.$javax.$microedition.$rms.$RecordStoreNotFoundException();
			}
		}
		
	},
	/*
	 * 
	 */
	$deleteRecord$I$V: function () {
		console.warn('delete record');
		this.increaseVersion();
	},
	/*
	 * 
	 */
	$getNumRecords$$I : function () {
		return parseInt(localStorage.getItem(this.storageName + 'size'));
	},
	/*
	 * 
	 */
	$getLastModified$$J: function () {
		var time = parseInt(localStorage.getItem(this.storageName + 'lastModified'));
		return  {hi: Math.floor(time / 0x100000000), lo: time % 0x100000000};
	},
	/*
	 * public int getVersion() throws RecordStoreNotOpenException
	 */
	$getVersion$$I: function () {
		return parseInt(localStorage.getItem(this.storageName + 'version'));
	},
	/*
	 * public int addRecord(byte[] data, int offset, int numBytes) throws RecordStoreNotOpenException, RecordStoreException, RecordStoreFullException
	 */
	$addRecord$_BII$I: function (data, offset, numBytes) {
		var id = parseInt(localStorage.getItem(this.storageName + 'size')) + 1;
		localStorage.setItem(this.storageName + 'size', id);
		this.$setRecord$I_BII$V(id, data, offset, numBytes);
		return id;
	},
	/*
	 * 
	 */
	$getNextRecordID$$I: function () {
		return parseInt(localStorage.getItem(this.storageName + 'size')) + 1;
	},
	/*
	 * public byte[] getRecord(int recordId) throws RecordStoreNotOpenException, InvalidRecordIDException, RecordStoreException
	 */
	$getRecord$I$_B: function (id) {
		try {
			var array = localStorage.getItem(this.storageName + id).split(',');
		} catch (e) {
			throw new javaRoot.$javax.$microedition.$rms.$InvalidRecordIDException();
		}
		var result = [];
		if (array[0] === '') {
			return result;
		}
		for (var i = 0; i < array.length; i++) {
			result[i] = parseInt(array[i]);
		}
		return result;
	},
	/*
	 * public int getRecord(int recordId, byte[] buffer, int offset) throws RecordStoreNotOpenException, InvalidRecordIDException, RecordStoreException
	 */
	$getRecord$I_BI$I: function (id, buffer, offset) {
		var array = this.$getRecord$I$_B(id);
		if (array.length > buffer.length - offset) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		for (var i = 0; i < array.length; i++) {
			buffer[offset + i] = array[i];
		}
		return array.length;
	},
	/*
	 * public int getRecordSize(int recordId) throws RecordStoreNotOpenException, InvalidRecordIDException, RecordStoreException
	 */
	$getRecordSize$I$I: function (id) {
		return this.$getRecord$I$_B(id).length;
	},
	/*
	 * 
	 */
	$enumerateRecords$Ljavax_microedition_rms_RecordFilter_Ljavax_microedition_rms_RecordComparator_Z$Ljavax_microedition_rms_RecordEnumeration_: function(filter, comparator, keepUpdated) {
		if (filter || comparator || keepUpdated) {
			throw new Error('RecordStore: filter and comparator not supported');
		}
		var enumeration = new javaRoot.$javax.$microedition.$rms.$RecordEnumerationImpl(this);
		return enumeration;
	},
	/*
	 * public int getSizeAvailable() throws RecordStoreNotOpenException
	 */
	$getSizeAvailable$$I: function () {
		if (this.isClosed) {
			throw new javaRoot.$javax.$microedition.$rms.$RecordStoreNotOpenException();
		}
		return this.updateSize(0);
	},
	/*
	 * 
	 */
	$closeRecordStore$$V: function () {
		this.isClosed = true;
	},
	/*
	 * public static String[] listRecordStores()
	 */
	$listRecordStores$$_Ljava_lang_String_: function () {
		var vendorName = js2me.manifest['midlet-vendor'];
		var suiteName = js2me.manifest['midlet-name'];
		var storagePrefix = vendorName + '/' + suiteName + '/';
		var result = [];
		for (var recordName in localStorage) {
			if (recordName.indexOf(storagePrefix) != -1 && recordName.indexOf('/size') != -1) {
				var storageName = recordName.replace(storagePrefix, '').replace('/size', '');
				result.push(new javaRoot.$java.$lang.$String(storageName));
			}
		}
	},
	/*
	 * 
	 */
	$deleteRecordStore$Ljava_lang_String_$V: function (recordStoreName) {
		var storageName = this.getStorageName(recordStoreName);
		var size = localStorage.getItem(storageName + 'size')
		localStorage.removeItem(storageName);
		localStorage.removeItem(storageName + 'size');
		localStorage.removeItem(storageName + 'lastModified');
		localStorage.removeItem(storageName + 'version');
		for (var i = 1; i <= size; i++) {
			localStorage.removeItem(storageName + i);
		}
	},
	/*
	 * public void setRecord(int recordId, byte[] newData, int offset, int numBytes) throws RecordStoreNotOpenException, InvalidRecordIDException, RecordStoreException, RecordStoreFullException
	 */
	$setRecord$I_BII$V: function (id, data, offset, numBytes) {
		if (this.isClosed) {
			throw new javaRoot.$javax.$microedition.$rms.$RecordStoreNotOpenException();
		}
		if (id > parseInt(localStorage.getItem(this.storageName + 'size'))) {
			throw new javaRoot.$javax.$microedition.$rms.$InvalidRecordIDException();
		}
		var str = '';
		if (data) {
			str = data.slice(offset, offset + numBytes).toString();
		}
		var change = str.length;
		if (localStorage[this.storageName + id]) {
			change -= localStorage[this.storageName + id].length;
		}
		if (this.updateSize(change) < 0) {
			throw new javaRoot.$javax.$microedition.$rms.$RecordStoreFullException();
		}
		localStorage.setItem(this.storageName + id, str);
		localStorage.setItem(this.storageName + 'lastModified', Date.now());
		this.increaseVersion();
		
	},
	getStorageName: function (recordStoreName) {
		var vendorName = js2me.manifest['midlet-vendor'];
		var suiteName = js2me.manifest['midlet-name'];
		return vendorName + '/' + suiteName + '/' + recordStoreName.text + '/';
	},
	increaseVersion: function () {
		var version = parseInt(localStorage.getItem(this.storageName + 'version')) + 1;
		localStorage.setItem(this.storageName + 'version', version);
	},
	updateSize: function (change) {
		if (localStorage['freeSpace'] === undefined) {
			localStorage['freeSpace'] = 1024 * 1024 * 1024;
		}
		return localStorage['freeSpace'] = parseInt(localStorage['freeSpace']) + change;
	},
	require: ['javaRoot.$javax.$microedition.$rms.$InvalidRecordIDException', 'javaRoot.$javax.$microedition.$rms.$RecordStoreNotFoundException', 
		'javaRoot.$javax.$microedition.$rms.$RecordEnumerationImpl']
});
