js2me.createClass({
	construct: function () {
		this.element = document.createElement('div');
		this.element.className = 'list';
		this.items = [];
		this.init();
	},
	_init$Ljava_lang_String_I$V: function (title, listType) {
		this.$setTitle$Ljava_lang_String_$V(title);
		if (listType != 3) {
			throw new Error('List: only IMPLICIT type');
		}
	},
	_init$Ljava_lang_String_I_Ljava_lang_String__Ljavax_microedition_lcdui_Image_$V: function (title, listType, strings, images) {
		if (strings == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (images != null && images.length != strings.length) {
			throw new javaRoot.$java.$lang.$IllegalArgumentException();
		}
		for (var i = 0; i < strings.length; i++) {
			var image = null;
			if (images != null) {
				image = images[i];
			}
			this.$append$Ljava_lang_String_Ljavax_microedition_lcdui_Image_$I(strings[i], image);
		}
	},
	$append$Ljava_lang_String_Ljavax_microedition_lcdui_Image_$I: function (stringPart, imagePart) {
		if (stringPart == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		var newItem = { 
			element: document.createElement('div'),
			stringPart: stringPart,
			imagePart: imagePart
		}
		newItem.element.className = 'item';
		this.element.appendChild(newItem.element);
		var list = this;
		newItem.element.addEventListener('mousedown', function () {
			for (var i = 0; i < list.element.childNodes.length; i++) {
				if (list.element.childNodes[i] == newItem.element) {
					list.selectedItem = i;
				}
			}
			list.commandListener.$commandAction$Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable_$V(list.command, list);
		});
		this.refreshItem(newItem);
		this.items.push(newItem);
	},
	$deleteAll$$V: function () {
		this.element.innerHTML = '';
	},
	$getSelectedIndex$$I: function () {
		return this.selectedItem;
	},
	$getString$I$Ljava_lang_String_: function (index) {
		if (index < 0 || index >= this.items.length) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		return this.items[index].stringPart;
	},
	$set$ILjava_lang_String_Ljavax_microedition_lcdui_Image_$V: function (index, stringPart, imagePart) {
		if (stringPart == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (index < 0 || index >= this.items.length) {
			throw new javaRoot.$java.$lang.$IndexOutOfBoundsException();
		}
		var item = this.items[index];
		item.stringPart = stringPart;
		item.imagePart = imagePart;
		this.refreshItem(item);
	},
	$setSelectCommand$Ljavax_microedition_lcdui_Command_$V: function (command) {
		this.command = command;
	},
	$setFitPolicy$I$V: function () {
		//TODO
	},
	$size$$I: function () {
		return this.items.length;
	},
	refreshItem: function (item) {
		item.element.innerHTML = item.stringPart.text;
		if (item.imagePart) {
			item.element.appendChild(item.imagePart.element);
		}
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Displayable'
});
