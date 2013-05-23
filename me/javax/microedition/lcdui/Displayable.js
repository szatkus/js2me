(function () {
	function Displayable() {
		
	}
	Displayable.prototype = {
		init: function () {
			this.choiceButton = document.getElementById('choice');
			this.backButton = document.getElementById('back');
			this.commands = [];
			this.commandListener = null;
			var displayable = this;
			this.choiceButton.addEventListener('mousedown', function () {
				if (displayable.choiceCommand) {
					displayable.commandListener.$commandAction_Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable__V(displayable.choiceCommand, displayable);
				}
			});
			this.backButton.addEventListener('mousedown', function () {
				if (displayable.backCommand) {
					displayable.commandListener.$commandAction_Ljavax_microedition_lcdui_Command_Ljavax_microedition_lcdui_Displayable__V(displayable.backCommand, displayable);
				}
			});
		},
		$setTitle_Ljava_lang_String__I: function (s) {
			this.title = s;
			document.getElementById('title').innerHTML = s.text;
		},
		$getWidth__I: function () {
			return js2me.width;
		},
		$getHeight__I: function () {
			return js2me.height;
		},
		$addCommand_Ljavax_microedition_lcdui_Command__V: function (command) {
			if (this.commands.indexOf(command) == -1) {
				this.commands.push(command);
				this.refreshCommands();
			}
		},
		$setCommandListener_Ljavax_microedition_lcdui_CommandListener__V: function (commandListener) {
			this.commandListener = commandListener;
		},
		refreshCommands: function () {
			//TODO: no multicommands
			
			this.choiceCommand = null;
			this.backCommand = null;
			this.choiceButton.innerHTML = '';
			this.backButton.innerHTML = '';
			for (var i in this.commands) {
				var command = this.commands[i];
				if (command.commandType == command.$BACKI || command.commandType == command.$EXITI ||
					command.commandType == command.$CANCELI || command.commandType == command.$STOPI) {
					if (this.backCommand == null || this.backCommand.priority > command.priority) {
						this.backCommand = command;
					}
				} else {
					if (this.choiceCommand == null || this.choiceCommand.priority > command.priority) {
						this.choiceCommand = command;
					}
				}
				
			}
			if (this.choiceCommand) {
				this.choiceButton.innerHTML = this.choiceCommand.label.text;
			}
			if (this.backCommand) {
				this.backButton.innerHTML = this.backCommand.label.text;
			}
		}
	};
	js2me.findPackage(js2me.JAVA_ROOT + '.$javax.$microedition.$lcdui')['$Displayable'] = Displayable;
})();
