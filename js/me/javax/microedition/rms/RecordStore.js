(function () {
	function RecordStore(storageName) {
		this.storageName = storageName;
	}
	RecordStore.prototype = {
		$openRecordStore_Ljava_lang_String_Z_Ljavax_microedition_rms_RecordStore_: function (recordStoreName, createIfNecessary) {
			var vendorName = js2me.manifest['midlet-vendor'];
			var suiteName = js2me.manifest['midlet-name'];
			var storageName = vendorName + '/' + suiteName + '/';
			if (localStorage.getItem(storageName)) {
				return new RecordStore(storageName);
			} else {
				if (createIfNecessary) {
					localStorage.setItem(storageName, 0)
					return new RecordStore(storageName);
				} else {
					throw new javaRoot.$javax.$microedition.$rms.$RecordStoreNotFoundException();
				}
			}
			
		}, 
		$getNumRecords__I : function () {
			return localStorage.getItem(this.storageName);
		},
		$addRecord__BII_I: function (data, offset, numBytes) {
			var id = parseInt(localStorage.getItem(this.storageName)) + 1;
			localStorage.setItem(this.storageName, id);
			localStorage.setItem(this.storageName + id, data.slice(offset, offset + numBytes).toString());
		},
		$getRecord_I__B: function (id) {
			var array = localStorage.getItem(this.storageName + id).split(',');
			var result = [];
			for (var i = 0; i < array.length; i++) {
				result[i] = parseInt(array[i]);
			}
			return result;
		},
		$closeRecordStore__V: function () {
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$rms')['$RecordStore'] = RecordStore;
})();
