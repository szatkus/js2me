js2me.createClass({
	construct: function (array) {
		this.className = '[' + array.className;
		this.monitorQueue = array.monitorQueue;
		if (!array.waiting) {
			array.waiting = [];
		}
		this.waiting = array.waiting;
		this.array = array;
		if (this.className == null) {
			throw new Error('unknown array');
		}
	},
	$length$$I: function () {
		return this.array.length;
	}
});
