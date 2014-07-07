js2me.createClass({
	/*
	 * public Vector()
	 */
	_init$$V: function () {
		this.array = [];
	},
	/*
	 * public Vector(int initialCapacity)
	 */
	_init$I$V: function () {
		this._init$$V();
	},
	/*
	 * public Vector(int initialCapacity, int capacityIncrement)
	 */
	_init$II$V: function () {
		this._init$$V();
	},
	/*
	 * public void addElement(Object obj)
	 */
	$addElement$Ljava_lang_Object_$V: function (obj) {
		this.array.push(obj);
	},
	/*
	 * public boolean contains(Object elem)
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
	 * public void copyInto(Object[] anArray)
	 */
	$copyInto$_Ljava_lang_Object_$V: function (array) {
		var index = 0;
		for (var i in this.array) {
			array[index] = this.array[i];
			index++;
		}
	},
	/*
	 * public Object elementAt(int index)
	 */
	$elementAt$I$Ljava_lang_Object_: function (index) {
		if (index >= this.array.length) {
			throw new javaRoot.$java.$util.$NoSuchElementException();
		}
		return this.array[index];
	},
	/*
	 * public Enumeration elements()
	 */
	$elements$$Ljava_util_Enumeration_: function () {
		var enumeration = new javaRoot.$java.$util.$ArrayEnumeration(this.array);
		return enumeration;
	},
	/*
	 * public Object firstElement()
	 */
	$firstElement$$Ljava_lang_Object_: function () {
		return this.$elementAt$I$Ljava_lang_Object_(0);
	},
	/*
	 * public void insertElementAt(Object obj, int index)
	 */
	$insertElementAt$Ljava_lang_Object_I$V: function (obj, index) {
		if (index < 0 || index > this.array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		for (var i = this.array.length - 1; i >= index; i--) {
			this.array[i + 1] = this.array[i];
		}
		this.array[index] = obj;
	},
	/*
	 * public int indexOf(Object elem)
	 */
	$indexOf$Ljava_lang_Object_$I: function (obj) {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i] === obj) {
				return i;
			}
		}
		return -1;
	},
	/*
	 * public boolean isEmpty()
	 */
	$isEmpty$$Z: function () {
		if (this.array.length > 0) {
			return 0;
		} else {
			return 1;
		}
	},
	/*
	 * public Object lastElement()
	 */
	$lastElement$$Ljava_lang_Object_: function () {
		if (this.array.length == 0) {
			throw new javaRoot.$java.$util.$NoSuchElementException();
		}
		return this.array[this.array.length - 1];
	},
	/*
	 * public void removeAllElements()
	 */
	$removeAllElements$$V: function () {
		this.array = [];
	},
	/*
	 * public boolean removeElement(Object obj)
	 */
	$removeElement$Ljava_lang_Object_$Z: function (obj) {
		for (var i = 0; i < this.array.length; i++) {
			if (this.array[i] === obj) {
				this.$removeElementAt$I$V(i);
				return 1;
			}
		}
		return 0;
	},
	/*
	 * public void removeElementAt(int index)
	 */
	$removeElementAt$I$V: function (index) {
		if (index < 0 || index >= this.array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		for (var i = index; i < this.array.length; i++) {
			this.array[i] = this.array[i + 1];
		}
		this.array.pop();
	},
	/*
	 * public void setElementAt(Object obj, int index)
	 */
	$setElementAt$Ljava_lang_Object_I$V: function (obj, index) {
		if (index < 0 || index >= this.array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		this.array[index] = obj;
	},
	$setSize$I$V: function () {
	},
	/*
	 * public int size()
	 */
	$size$$I: function () {
		return this.array.length;
	},
	require: ['javaRoot.$java.$util.$NoSuchElementException']
});

