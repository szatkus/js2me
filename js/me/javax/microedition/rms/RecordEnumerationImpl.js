js2me.createClass({
	construct: function (store) {
		this.store = store;
		this.result = [];
		for (var i = 0; i < this.store.$getNumRecords__I(); i++) {
			try {
				this.result.push(this.store.$getRecord_I__B(i));
			} catch (e) {
			}
		}
	},
	$numRecords__I: function () {
		return this.result.length;
	},
	interfaces: ['javaRoot.$javax.$microedition.$rms.$RecordEnumeration'],
	package: 'javaRoot.$javax.$microedition.$rms',
	name: '$RecordEnumerationImpl'
});
