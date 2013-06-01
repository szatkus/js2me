js2me.createClass({
	_init_Ljava_lang_String__V: function (title) {
		this.element = document.createElement('div');
		this.element.className = 'form';
		this.$setTitle_Ljava_lang_String__V(title);
		this.init();
	},
	$append_Ljava_lang_String__I: function (str) {
		var node = document.createTextNode(str.text);
		this.element.appendChild(node);
	},
	$append_Ljavax_microedition_lcdui_Item__I: function (item) {
		//TODO: later...
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Screen',
	package: 'javaRoot.$javax.$microedition.$lcdui',
	name: '$Form'
});
