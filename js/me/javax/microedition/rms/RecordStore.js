js2me.createClass({
	construct: function(storageName) {
		this.storageName = storageName;
		this.storage = js2me.storages[storageName];
	},
	/*
	 * public static RecordStore openRecordStore(String recordStoreName,  boolean createIfNecessary)
	 */
	$openRecordStore$Ljava_lang_String_Z$Ljavax_microedition_rms_RecordStore_: function (recordStoreName, createIfNecessary) {
		var vendorName = js2me.manifest['midlet-vendor'];
		var suiteName = js2me.manifest['midlet-name'];
		var storages = js2me.storages;
		var storageName = vendorName + '/' + suiteName + '/' + recordStoreName.text + '/';
		if (storages[storageName]) {
			return new javaRoot.$javax.$microedition.$rms.$RecordStore(storageName);
		} else {
			if (createIfNecessary) {
				storages[storageName] = {};
				storages[storageName].size = 0;
				storages[storageName].lastModified = 0;
				return new javaRoot.$javax.$microedition.$rms.$RecordStore(storageName);
			} else {
				throw new javaRoot.$javax.$microedition.$rms.$RecordStoreNotFoundException();
			}
		}
		
	},
	/*
	 * 
	 */
	$getNumRecords$$I : function () {
		console.log(this.storage.size);
		return parseInt(this.storage.size);
	},
	/*
	 * 
	 */
	$getLastModified$$J: function () {
		var time = parseInt(localStorage.getItem(this.storageName + 'lastModified'));
		return new js2me.Long(0, time);
	},
	/*
	 * public void addRecordListener(RecordListener listener)
	 */
	$addRecord$_BII$I: function (data, offset, numBytes) {
		var id = parseInt(this.storage.size) + 1;
		this.storage.size = id;
		js2me.storages.refresh = true;
		this.$setRecord$I_BII$V(id, data, offset, numBytes);
		return id;
	},
	/*
	 * 
	 */
	$getNextRecordID$$I: function () {
		return parseInt(this.storage.size) + 1;
	},
	/*
	 * 
	 */
	$getRecord$I$_B: function (id) {
		try {
			var array = this.storage[id].split();
		} catch (e) {
			throw new javaRoot.$javax.$microedition.$rms.$InvalidRecordIDException();
		}
		return array;
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
	 * 
	 */
	$closeRecordStore$$V: function () {
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
	$deleteRecordStore$Ljava_lang_String_$V: function (storageName) {
		var size = localStorage.getItem(storageName + 'size')
		localStorage.removeItem(storageName + 'size');
		localStorage.removeItem(storageName + 'lastModified');
		for (var i = 0; i < size; i++) {
			localStorage.removeItem(storageName + i);
		}
	},
	/*
	 * 
	 */
	$setRecord$I_BII$V: function (id, data, offset, numBytes) {
		var str = '';
		if (data) {
			str = data.slice(offset, offset + numBytes);
		}
		this.storage[id] = str;
		this.storage.lastModified = +new Date;
	},
	require: [
		'javaRoot.$javax.$microedition.$rms.$RecordEnumerationImpl', 
		'javaRoot.$javax.$microedition.$rms.$RecordStoreNotFoundException',
		'javaRoot.$javax.$microedition.$rms.$InvalidRecordIDException'
	]
});
