js2me.createClass({
	construct: function () {
		this.array = [];
	},
	_init$$V: function () {
	},
	_init$II$V: function () {
	},
	$addElement$Ljava_lang_Object_$V: function (obj) {
		this.array.push(obj);
	},
	$size$$I: function () {
		return this.array.length;
	},
	$elementAt$I$Ljava_lang_Object_: function (index) {
		if (index >= this.array.length) {
			throw new javaRoot.$java.$util.$NoSuchElementException();
		}
		return this.array[index];
	},
	$contains$Ljava_lang_Object_$Z: function (obj) {
		for (var i in this.array) {
			if (this.array[i] == obj) {
				return 1;
			}
		}
		return 0;
	},
	$elements$$Ljava_util_Enumeration_: function () {
		var enumeration = new javaRoot.$java.$util.$ArrayEnumeration(this.array);
		return enumeration;
	},
	$insertElementAt$Ljava_lang_Object_I$V: function (obj, index) {
		if (index < 0 || index > this.array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		for (var i = this.array.length - 1; i >= index; i--) {
			this.array[i + 1] = this.array[i];
		}
		this.array[index] = obj;
	},
	$removeElementAt$I$V: function (index) {
		if (index < 0 || index >= this.array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		for (var i = index; i < this.array.length; i++) {
			this.array[i] = this.array[i + 1];
		}
		this.array.pop();
	},
	$copyInto$_Ljava_lang_Object_$V: function (array) {
		var index = 0;
		for (var i in this.array) {
			array[index] = this.array[i];
			index++;
		}
	},
	require: ['javaRoot.$java.$util.$NoSuchElementException', 'javaRoot.$java.$util.$ArrayEnumeration'],
	package: 'javaRoot.$java.$util',
	name: '$Vector'
});

