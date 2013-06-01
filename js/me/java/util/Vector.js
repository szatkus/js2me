js2me.createClass({
	construct: function () {
		this.array = [];
	},
	_init__V: function () {
	},
	_init_II_V: function () {
	},
	$addElement_Ljava_lang_Object__V: function (obj) {
		this.array.push(obj);
	},
	$size__I: function () {
		return this.array.length;
	},
	$elementAt_I_Ljava_lang_Object_: function (index) {
		if (index >= this.array.length) {
			throw new javaRoot.$java.$util.$NoSuchElementException();
		}
		return this.array[index];
	},
	$contains_Ljava_lang_Object__Z: function (obj) {
		for (var i in this.array) {
			if (this.array[i] == obj) {
				return 1;
			}
		}
		return 0;
	},
	$elements__Ljava_util_Enumeration_: function () {
		var enumeration = new javaRoot.$java.$util.$ArrayEnumeration(this.array);
		return enumeration;
	},
	require: ['javaRoot.$java.$util.$NoSuchElementException', 'javaRoot.$java.$util.$ArrayEnumeration'],
	package: 'javaRoot.$java.$util',
	name: '$Vector'
});

