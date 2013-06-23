js2me.createClass({
	_init$$V: function () {
		this.array = [];
		this.keys = [];
	},
	$get$Ljava_lang_Object_$Ljava_lang_Object_: function (key) {
		return this.array[key.$hashCode$$I()];
	},
	$put$Ljava_lang_Object_Ljava_lang_Object_$Ljava_lang_Object_: function (key, obj) {
		if (key == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		var value = this.array[key.$hashCode$$I()];
		this.array[key.$hashCode$$I()] = obj;
		this.keys.push(key);
		return value;
	},
	$contains$Ljava_lang_Object_$Z: function (obj) {
		for (var i in this.array) {
			if (this.array[i] == obj) {
				return 1;
			}
		}
		return 0;
	},
	$containsKey$Ljava_lang_Object_$Z: function (key) {
		for (var i in this.array) {
			if (i == key.$hashCode$$I()) {
				return 1;
			}
		}
		return 0;
	},
	$elements$$Ljava_util_Enumeration_: function () {
		var enumeration = new javaRoot.$java.$util.$ArrayEnumeration(this.array);
		return enumeration;
	},
	$clear$$V: function () {
		this.array = [];
	},
	$keys$$Ljava_util_Enumeration_: function () {
		var enumeration = new javaRoot.$java.$util.$ArrayEnumeration(this.keys);
		return enumeration;
	},
	$remove$Ljava_lang_Object_$Ljava_lang_Object_: function (key) {
		delete this.array[key.$hashCode$$I()];
		this.keys.splice(this.keys.indexOf(key), 1);
	}
});

