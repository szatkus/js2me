js2me.createClass({
	construct: function (array) {
		this.className = '[' + array.className;
		if (this.className == null) {
			throw new Error('unknown array');
		}
	}
});
