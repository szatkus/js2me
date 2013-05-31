js2me.createClass({
	construct: function () {
		this.element = document.createElement('div');
		this.element.className = 'list';
		this.init();
	},
	_init_Ljava_lang_String_I_V: function (title, listType) {
		
		this.$setTitle_Ljava_lang_String__I(title);
		if (listType != 3) {
			throw new Error('List: only IMPLICIT type');
		}
	},
	$append_Ljava_lang_String_Ljavax_microedition_lcdui_Image__I: function (stringPart, imagePart) {
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
			list.commandListener.$commandAction_Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable__V(list.command, list);
		});
	},
	$deleteAll__V: function () {
		this.element.innerHTML = '';
	},
	$setSelectCommand_Ljavax_microedition_lcdui_Command__V: function (command) {
		this.command = command;
	},
	$getSelectedIndex__I : function () {
		return this.selectedItem;
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Displayable',
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$List'
});
