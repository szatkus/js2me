js2me.createClass({
	_init$Ljava_lang_String_$V: function (title) {
		this.element = document.createElement('div');
		this.element.className = 'form';
		this.$setTitle$Ljava_lang_String_$V(title);
		this.init();
	},
	$append$Ljava_lang_String_$I: function (str) {
		var node = document.createTextNode(str.text);
		this.element.appendChild(node);
	},
	$append$Ljavax_microedition_lcdui_Item_$I: function (item) {
		//TODO: later...
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Screen',
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$Form'
});
