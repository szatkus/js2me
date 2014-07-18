js2me.createClass({
	construct: function (store) {
		this.store = store;
		this.result = [];
		for (var i = 1; i <= this.store.$getNumRecords$$I(); i++) {
			try {
				this.result.push({
					id: i,
					data: this.store.$getRecord$I$_B(i)
				});
			} catch (e) {
			}
		}
		this.position = 0;
	},
	/*
	 * 
	 */
	$destroy$$V: function () {
		this.destroyed = true;
	},
	/*
	 * 
	 */
	$hasNextElement$$Z: function () {
		if (this.destroyed) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		if (this.position < this.result.length) {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * 
	 */
	$nextRecord$$_B: function () {
		if (this.destroyed) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		if (this.position >= this.result.length) {
			throw new javaRoot.$javax.$microedition.$rms.InvalidRecordIDException();
		}
		return this.result[this.position++].data;
	},
	/*
	 * 
	 */
	$nextRecordId$$I: function () {
		if (this.destroyed) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		if (this.position >= this.result.length) {
			throw new javaRoot.$javax.$microedition.$rms.InvalidRecordIDException();
		}
		return this.result[this.position++].id;
	},
	/*
	 * 
	 */
	$numRecords$$I: function () {
		if (this.destroyed) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		return this.result.length;
	},
	/*
	 * 
	 */
	$reset$$V: function () {
		if (this.destroyed) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		this.position = 0;
	},
	interfaces: ['javaRoot.$javax.$microedition.$rms.$RecordEnumeration']
});
