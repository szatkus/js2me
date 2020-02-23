js2me.createClass({
	/*
	 * public Form(String title)
	 */
	_init$Ljava_lang_String_$V: function (title) {
		this.element = document.createElement('div');
		this.element.className = 'form';
		this.$setTitle$Ljava_lang_String_$V(title);
		this.items = [];
		this.init();
	},
	/*
	 * public Form(String title, Item[] items)
	 */
	_init$Ljava_lang_String__Ljavax_microedition_lcdui_Item_$V: function(title, items) {
		this._init$Ljava_lang_String_$V(title);
		if (items == null) {
			return;
		}
		try {
			for (var i = 0; i < items.length; i++) {
				if (items[i] == null) {
					throw new javaRoot.$java.$lang.$NullPointerException();
				}
				this.$append$Ljavax_microedition_lcdui_Item_$I(items[i]);
			}
		} catch (e) {
			throw new javaRoot.$java.$lang.$IllegalStateException ();
		}
	},
	/*
	 * public int append(Item item)
	 */
	$append$Ljava_lang_String_$I: function (str) {
		var item = new javaRoot.$javax.$microedition.$lcdui.$StringItem();
		item._init$Ljava_lang_String_Ljava_lang_String_$V(null, str);
	},
	/*
	 * public int append(Item item)
	 */
	$append$Ljavax_microedition_lcdui_Item_$I: function (item) {
		this.element.appendChild(item.element);
		this.items.push(item);
	},
	/*
	 * public int append(Item item)
	 */
	$append$Ljavax_microedition_lcdui_Image_$I: function (image) {
		var item = new javaRoot.$javax.$microedition.$lcdui.$ImageItem();
		item._init$Ljava_lang_String_Ljavax_microedition_lcdui_Image_ILjava_lang_String_$V(null, image, 0, null);
		this.$append$Ljavax_microedition_lcdui_Item_$I(item);
	},
	/*
	 * public int size()
	 */
	$size$$I: function () {
		return this.items.length;
	},
	/*
	 * public void delete(int itemNum)
	 */
	$delete$I$V: function (index) {
		if (index < 0 || index >= this.items.length) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		this.element.removeChild(this.items[index].element);
		for (var i = index; i < this.items.length - 1; i++) {
			this.items[i] = this.items[i + 1];
		}
		this.items.pop();
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Screen',
	require: ['javaRoot.$javax.$microedition.$lcdui.$StringItem']
});
