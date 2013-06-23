js2me.createClass({
	_init$$V: function () {
		this.array = [];
	},
	_init$I$V: function () {
		this._init$$V();
	},
	_init$II$V: function () {
		this._init$$V();
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
	$isEmpty$$Z: function () {
		if (this.array.length > 0) {
			return 0;
		} else {
			return 1;
		}
	},
	$lastElement$$Ljava_lang_Object_: function () {
		if (this.array.length == 0) {
			throw new javaRoot.$java.$util.$NoSuchElementException();
		}
		return this.array[this.array.length - 1];
	},
	$removeAllElements$$V: function () {
		this.array = [];
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
	$setElementAt$Ljava_lang_Object_I$V: function (obj, index) {
		if (index < 0 || index >= this.array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		this.array[index] = obj;
	},
	$copyInto$_Ljava_lang_Object_$V: function (array) {
		var index = 0;
		for (var i in this.array) {
			array[index] = this.array[i];
			index++;
		}
	}
});

