js2me.createClass({
	construct: function (array) {
		this.keys = [];
		for (var i in array) {
			this.keys.push(i);
		}
		this.array = array;
		this.index = 0;
	},
	/*
	 * 
	 */
	$hasMoreElements$$Z: function () {
		if (this.index < this.keys.length) {
			return 1;
		} else {
			return 0;
		}
	},
	/*
	 * 
	 */
	$nextElement$$Ljava_lang_Object_: function () {
		var key = this.keys[this.index++];
		return this.array[key];
	},
	interfaces: ['javaRoot.$java.$util.$Enumeration']
});
