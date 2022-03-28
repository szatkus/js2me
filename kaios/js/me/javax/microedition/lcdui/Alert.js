js2me.createClass({
	construct: function () {
		var alert = this;
		this.commandListener = {
			$commandAction$Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable_$V: function () {
				alert.display.$setCurrent$Ljavax_microedition_lcdui_Displayable_$V(alert.display.lastDisplayable);
			}
		};
	},
	/*
	 * public Alert(String title)
	 */
	_init$Ljava_lang_String_$V: function (str) {
		this.$setTitle$Ljava_lang_String_$V(str);
		this.init();
	},
	/*
	 * public Alert(String title)
	 */
	_init$Ljava_lang_String_Ljava_lang_String_Ljavax_microedition_lcdui_Image_Ljavax_microedition_lcdui_AlertType_$V: function (title, text, image, type) {
		this.$setTitle$Ljava_lang_String_$V(title);
		this.text = text;
		this.image = image;
		this.type = type;
		this.element = document.createElement('div');
		this.element.innerHTML = text.text;
		this.init();
	},
	/*
	 * public String getString()
	 */
	$getString$$Ljava_lang_String_: function () {
		return this.text;
	},
	/*
	 * public void setString(String str)
	 */
	$setString$Ljava_lang_String_$V: function (text) {
		this.text = text;
		this.element.innerHTML = text.text;
	},
	/*
	 * public void setTimeout(int time)
	 */
	$setTimeout$I$V: function (time) {
		setTimeout(function () {
			console.log('show?');
		}, time);
	},
	refreshCommands: function () {
		if (this.commands.length === 0) {
			var dismissCommand = new javaRoot.$javax.$microedition.$lcdui.$Command();
			dismissCommand._init$Ljava_lang_String_II$V(new javaRoot.$java.$lang.$String('OK'), javaRoot.$javax.$microedition.$lcdui.$Command.prototype.$OKI, 0);
			this.commands = [dismissCommand];
			javaRoot.$javax.$microedition.$lcdui.$Screen.prototype.refreshCommands.apply(this, arguments);
			this.commands = [];
		} else {
			javaRoot.$javax.$microedition.$lcdui.$Screen.prototype.refreshCommands.apply(this, arguments);
		}
	},
	superClass: 'javaRoot.$javax.$microedition.$lcdui.$Screen',
	require: ['javaRoot.$javax.$microedition.$lcdui.$Command']
});
	

