js2me.createClass({
	construct: function () {
		this.element = document.createElement('div');
		this.element.className = 'list';
		this.init();
	},
	_init$Ljava_lang_String_I$V: function (title, listType) {
		
		this.$setTitle$Ljava_lang_String_$I(title);
		if (listType != 3) {
			throw new Error('List: only IMPLICIT type');
		}
	},
	$append$Ljava_lang_String_Ljavax_microedition_lcdui_Image_$I: function (stringPart, imagePart) {
		var newItem = document.createElement('div');
		newItem.className = 'item';
		newItem.innerHTML = stringPart.text;
		if (imagePart) {
			throw new Error('List: imagePart not supported');
		}
		this.element.appendChild(newItem);
		var list = this;
		newItem.addEventListener('mousedown', function () {
			for (var i = 0; i < list.element.childNodes.length; i++) {
				if (list.element.childNodes[i] == newItem) {
					list.selectedItem = i;
				}
			}
			list.commandListener.$commandAction$Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable_$V(list.command, list);
		});
	},
	$deleteAll$$V: function () {
		this.element.innerHTML = '';
	},
	$setSelectCommand$Ljavax_microedition_lcdui_Command_$V: function (command) {
		this.command = command;
	},
	$getSelectedIndex$$I : function () {
		return this.selectedItem;
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Displayable',
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$List'
});
