js2me.createClass({
	/*
	 * public boolean empty()
	 */
	$empty$$Z: function () {
		return this.$isEmpty$$Z();
	},
	/*
	 * public Object peek()
	 */
	$peek$$Ljava_lang_Object_: function () {
		return this.$lastElement$$Ljava_lang_Object_();
	},
	/*
	 * public Object pop()
	 */
	$pop$$Ljava_lang_Object_: function () {
		var obj = this.$lastElement$$Ljava_lang_Object_();
		this.$removeElement$Ljava_lang_Object_$Z(obj);
		return obj;
	},
	/*
	 * public Object push(Object item)
	 */
	$push$Ljava_lang_Object_$Ljava_lang_Object_: function (obj) {
		this.$addElement$Ljava_lang_Object_$V(obj);
		return obj;
	},
	superClass: 'javaRoot.$java.$util.$Vector'
});
