js2me.createClass({
	construct: function(storageName) {
		this.storageName = storageName;
	},
	$openRecordStore_Ljava_lang_String_Z_Ljavax_microedition_rms_RecordStore_: function (recordStoreName, createIfNecessary) {
		var vendorName = js2me.manifest['midlet-vendor'];
		var suiteName = js2me.manifest['midlet-name'];
		var storageName = vendorName + '/' + suiteName + '/';
		if (localStorage.getItem(storageName)) {
			return new javaRoot.$javax.$microedition.$rms.$RecordStore(storageName);
		} else {
			if (createIfNecessary) {
				localStorage.setItem(storageName, 0)
				localStorage.setItem(storageName + 'lastModified', 0);
				return new javaRoot.$javax.$microedition.$rms.$RecordStore(storageName);
			} else {
				throw new javaRoot.$javax.$microedition.$rms.$RecordStoreNotFoundException();
			}
		}
		
	}, 
	$getNumRecords__I : function () {
		return localStorage.getItem(this.storageName);
	},
	$getLastModified__J: function () {
		var time = parseInt(localStorage.getItem(this.storageName + 'lastModified'));
		return new js2me.Long(0, time);
	},
	$addRecord__BII_I: function (data, offset, numBytes) {
		var id = parseInt(localStorage.getItem(this.storageName)) + 1;
		localStorage.setItem(this.storageName, id);
		localStorage.setItem(this.storageName + id, data.slice(offset, offset + numBytes).toString());
		localStorage.setItem(this.storageName + 'lastModified', (new Date()).getTime());
	},
	$getRecord_I__B: function (id) {
		try {
			var array = localStorage.getItem(this.storageName + id).split(',');
		} catch (e) {
			throw new javaRoot.$javax.$microedition.$rms.$InvalidRecordIDException();
		}
		var result = [];
		for (var i = 0; i < array.length; i++) {
			result[i] = parseInt(array[i]);
		}
		return result;
	},
	$enumerateRecords_Ljavax_microedition_rms_RecordFilter_Ljavax_microedition_rms_RecordComparator_Z_Ljavax_microedition_rms_RecordEnumeration_: function(filter, comparator, keepUpdated) {
		if (filter || comparator || keepUpdated) {
			throw new Error('RecordStore: filter and comparator not supported');
		}
		var enumeration = new javaRoot.$javax.$microedition.$rms.$RecordEnumerationImpl(this);
		return enumeration;
	},
	$closeRecordStore__V: function () {
	},
	require: [
		'javaRoot.$javax.$microedition.$rms.$RecordEnumerationImpl', 
		'javaRoot.$javax.$microedition.$rms.$RecordStoreNotFoundException',
		'javaRoot.$javax.$microedition.$rms.$InvalidRecordIDException'
	],
	package: 'javaRoot.$javax.$microedition.$rms',
	name: '$RecordStore'
});
