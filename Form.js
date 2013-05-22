(function () {
	function Form() {
	}
	Form.prototype = {
		_init_Ljava_lang_String__V: function (title) {
			this.element = document.createElement('div');
			this.element.className = 'form';
			this.title = document.createElement('div');
			var node = document.createTextNode(title.text);
			this.title.appendChild(node);
			this.title.className = 'title';
			this.element.appendChild(this.title);
		},
		$append_Ljava_lang_String__I: function (str) {
			var node = document.createTextNode(str.text);
			this.element.appendChild(node);
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Form'] = Form;
})();
