js2me.createClass({
	_init__V: function () {
		this.array = [];
	},
	$get_Ljava_lang_Object__Ljava_lang_Object_: function (key) {
		return this.array[key.$hashCode__I()];
	},
	$put_Ljava_lang_Object_Ljava_lang_Object__Ljava_lang_Object_: function (key, obj) {
		this.array[key.$hashCode__I()] = obj;
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
	require: ['javaRoot.$java.$util.$ArrayEnumeration'],
	package: 'javaRoot.$java.$util',
	name: '$Hashtable'
});

