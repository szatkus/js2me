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
	$getFont$$Ljavax_microedition_lcdui_Font_: function () {
		return javaRoot.$javax.$microedition.$lcdui.$Font.prototype.$getDefaultFont$$Ljavax_microedition_lcdui_Font_();
	},
	$getLineMarginHeight$$I: function () {
		return 10;
	},
	$isMultiline$$Z: function () {
		return this.isMultiline;
	},
	$isVisible$$Z: function () {
		return this.isVisible;
	},
	$setBackgroundColor$I$V: function () {
		//TODO
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
	$setTextEditorListener$Lcom_nokia_mid_ui_TextEditorListener_$V: function (listener) {
		this.listener = listener;
	},
	$setVisible$Z$V: function (value) {
		this.isVisible = value;
		//TODO
	},
	superClass: 'javaRoot.$com.$nokia.$mid.$ui.$CanvasItem'
});

