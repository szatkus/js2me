js2me.createClass({
	/*
	 * public static TextEditor createTextEditor(int maxSize, int constraints, int width, int rows)
	 */
	$createTextEditor$IIII$Lcom_nokia_mid_ui_TextEditor_: function (maxSize, constraints, width, rows) {
		var editor = new javaRoot.$com.$nokia.$mid.$ui.$TextEditor();
		editor.maxSize = maxSize;
		editor.constraints = constraints;
		editor.width = width;
		editor.rows = rows;
		return editor;
	},
	$getContent$$Ljava_lang_String_: function () {
		return new javaRoot.$java.$lang.$String('test');
	},
	$getContentHeight$$I: function () {
		return 10;
	},
	$hasFocus$$Z: function () {
		this.isFocused;
	},
	$getFont$$Ljavax_microedition_lcdui_Font_: function () {
		return javaRoot.$javax.$microedition.$lcdui.$Font.prototype.$getDefaultFont$$Ljavax_microedition_lcdui_Font_();
	},
	$getForegroundColor$$I: function () {
		return this.fgColor;
	},
	$getLineMarginHeight$$I: function () {
		return 10;
	},
	$getVisibleContentPosition$$I: function () {
		return 0;
	},
	$isMultiline$$Z: function () {
		return this.isMultiline;
	},
	$isVisible$$Z: function () {
		return this.isVisible;
	},
	$setBackgroundColor$I$V: function (color) {
		this.fgColor = color;
		//TODO
	},
	$setFocus$Z$V: function (value) {
		this.isFocused = value;
	},
	$setForegroundColor$I$V: function () {
		//TODO
	},
	$setMultiline$Z$V: function (value) {
		this.isMultiline = value;
		//TODO
	},
	/*
	 * public void setParent(java.lang.Object theParent)
	 */
	$setParent$Ljava_lang_Object_$V: function (parent) {
		//TODO
	},
	$setPosition$II$V: function () {
		//TODO
	},
	$setSize$II$V: function () {
		//TODO
	},
	$setTextEditorListener$Lcom_nokia_mid_ui_TextEditorListener_$V: function (listener) {
		this.listener = listener;
	},
	$setVisible$Z$V: function (value) {
		this.isVisible = value;
		//TODO
	},
	superClass: 'javaRoot.$com.$nokia.$mid.$ui.$CanvasItem'
});

