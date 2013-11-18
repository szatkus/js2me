js2me.createClass({
	construct: function(storageName) {
		this.storageName = storageName;
	},
	/*
	 * 
	 */
	$openRecordStore$Ljava_lang_String_Z$Ljavax_microedition_rms_RecordStore_: function (recordStoreName, createIfNecessary) {
		var vendorName = js2me.manifest['midlet-vendor'];
		var suiteName = js2me.manifest['midlet-name'];
		var storageName = vendorName + '/' + suiteName + '/' + recordStoreName.text + '/';
		if (localStorage.getItem(storageName)) {
			return new javaRoot.$javax.$microedition.$rms.$RecordStore(storageName);
		} else {
			if (createIfNecessary) {
				localStorage.setItem(storageName, '0');
				localStorage.setItem(storageName + 'size', 0)
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
	 * public void addRecordListener(RecordListener listener)
	 */
	$addRecord$_BII$I: function (data, offset, numBytes) {
		var id = parseInt(localStorage.getItem(this.storageName + 'size')) + 1;
		localStorage.setItem(this.storageName + 'size', id);
		this.$setRecord$I_BII$V(id - 1, data, offset, numBytes);
	},
	/*
	 * 
	 */
	$getNextRecordID$$I: function () {
		return parseInt(localStorage.getItem(this.storageName + 'size')) + 1;
	},
	/*
	 * 
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
			str = data.slice(offset, offset + numBytes).toString();
		}
		localStorage.setItem(this.storageName + id, str);
		localStorage.setItem(this.storageName + 'lastModified', (new Date()).getTime());
	},
	require: [
		'javaRoot.$javax.$microedition.$rms.$RecordEnumerationImpl', 
		'javaRoot.$javax.$microedition.$rms.$RecordStoreNotFoundException',
		'javaRoot.$javax.$microedition.$rms.$InvalidRecordIDException'
	]
});
