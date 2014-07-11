js2me.createClass({
	/*
	 * public Hashtable()
	 */
	_init$$V: function () {
		this.array = [];
		this.keys = [];
	},
	/*
	 * public Hashtable(int initialCapacity)
	 */
	_init$I$V: function () {
		this.array = [];
		this.keys = [];
	},
	/*
	 * public Object get(Object key)
	 */
	$get$Ljava_lang_Object_$Ljava_lang_Object_: function (key) {
		return this.array[key.$hashCode$$I()];
	},
	/*
	 * public Object put(Object key, Object value)
	 */
	$put$Ljava_lang_Object_Ljava_lang_Object_$Ljava_lang_Object_: function (key, obj) {
		if (key == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		var value = this.array[key.$hashCode$$I()];
		this.array[key.$hashCode$$I()] = obj;
		this.keys.push(key);
		return value;
	},
	/*
	 * public void clear()
	 */
	$clear$$V: function () {
		this.array = [];
		this.keys = [];
	},
	/*
	 * public boolean contains(Object value)
	 */
	$contains$Ljava_lang_Object_$Z: function (obj) {
		for (var i in this.array) {
			if (this.array[i] == obj) {
				return 1;
			}
		}
		return 0;
	},
	/*
	 * public boolean containsKey(Object key)
	 */
	$containsKey$Ljava_lang_Object_$Z: function (key) {
		for (var i in this.array) {
			if (i == key.$hashCode$$I()) {
				return 1;
			}
		}
		return 0;
	},
	/*
	 * public Enumeration elements()
	 */
	$elements$$Ljava_util_Enumeration_: function () {
		var enumeration = new javaRoot.$java.$util.$ArrayEnumeration(this.array);
		return enumeration;
	},
	/*
	 * public boolean isEmpty()
	 */
	$isEmpty$$Z: function () {
		if (this.keys === 0) {
			return 0;
		} else {
			return 1;
		}
	},
	/*
	 * public int size()
	 */
	$size$$I: function () {
		return this.keys.length;
	},
	/*
	 * public Enumeration keys()
	 */
	$keys$$Ljava_util_Enumeration_: function () {
		var enumeration = new javaRoot.$java.$util.$ArrayEnumeration(this.keys);
		return enumeration;
	},
	/*
	 * public Object remove(Object key)
	 */
	$remove$Ljava_lang_Object_$Ljava_lang_Object_: function (key) {
		delete this.array[key.$hashCode$$I()];
		this.keys.splice(this.keys.indexOf(key), 1);
	},
	require: ['javaRoot.$java.$util.$ArrayEnumeration']
});

