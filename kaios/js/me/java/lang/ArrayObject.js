js2me.createClass({
	construct: function (array) {
		this.className = '[' + array.className;
		this.monitorQueue = array.monitorQueue;
		if (!array.waitingThreads) {
			array.waitingThreads = [];
		}
		this.waitingThreads = array.waitingThreads;
		this.array = array;
		if (this.className == null) {
			throw new Error('unknown array');
		}
	},
	$length$$I: function () {
		return this.array.length;
	}
});
