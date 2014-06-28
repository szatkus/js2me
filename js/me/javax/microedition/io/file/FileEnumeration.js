js2me.createClass({
	construct: function (list) {
		this.list = list;
	},
	/*
	 * boolean	hasMoreElements()
	 */
	$hasMoreElements$$Z: function () {
		if (this.list.length > 0) {
			return 1;
		} else {
			return 0;
		}
	},
	interfaces: ['javaRoot.$java.$util.$Enumeration']
});
