js2me.convertClass = function (stream) {
	var newClass = function () {};
	var constantPool = [];
	newClass.prototype.pool = constantPool;
	function checkHeader() {
		if (stream.nextInt() != 0xCAFEBABE) {
			throw new Error('Incorrect header');
		}
	}
	function checkVersion() {
		// Who cares...
		stream.nextInt();
	}
	var TAG_UTF8 = 1;
	var TAG_CLASS_INFO = 7;
	var TAG_STRING = 8;
	var TAG_FIELDREF = 9;
	var TAG_METHODREF = 10;
	var TAG_INTERFACEREF = 11;
	var TAG_NAME_AND_TYPE = 12;
	function readConstantPool() {
		var count = stream.nextWord() - 1;
		for (var i = 1; i <= count; i++) {
			var tag = stream.nextByte();
			var constant = {
				tag: tag,
				implemented: false
			};
			if (tag == TAG_UTF8) {
				//TODO: only ASCII :/
				constant.implemented = true;
				var length = stream.nextWord();
				var value = '';
				for (var j = 0; j < length; j++) {
					value += String.fromCharCode(stream.nextByte());
				}
				constant.value = value;
			}
			// ClassInfo
			if (tag == TAG_CLASS_INFO) {
				constant.implemented = true;
				constant.nameIndex = stream.nextWord();
			}
			// String
			if (tag == TAG_STRING) {
				constant.implemented = true;
				constant.stringIndex = stream.nextWord();
			}
			// Fieldref || Methodref || Interfaceref
			if (tag == TAG_FIELDREF || tag == TAG_METHODREF || tag == TAG_INTERFACEREF) {
				constant.implemented = true;
				constant.classIndex = stream.nextWord();
				constant.nameAndTypeIndex = stream.nextWord();
			}
			// NameAndType
			if (tag == TAG_NAME_AND_TYPE) {
				constant.implemented = true;
				constant.nameIndex = stream.nextWord();
				constant.descriptorIndex = stream.nextWord();
			}
			if (!constant.implemented) {
				throw new Error('Unimplemented tag ' + tag + ' at position ' + i);
			}
			constantPool[i] = constant;
		}
	}
	function escapeName(name) {
		if (name == '$<init>') {
			name = '_init';
		}
		return name;
	}
	function escapeType(typeName) {
		typeName = typeName.replace(new RegExp('[\\(\\);/]', 'g'), '_');
		return typeName;
	}
	function resolveConstants() {
		function resolveConstant(index) {
			var constant = constantPool[index];
			var tag = constant.tag;
			if (tag == TAG_UTF8) {
				constantPool[index] = constant.value;
			}
			if (tag == TAG_CLASS_INFO) {
				var name = resolveConstant(constant.nameIndex)
				var nameElements = name.split('/');
				var className = '';
				for (var i in nameElements) {
					if (i > 0) {
						className += '.';
					}
					className += '$' + nameElements[i];
				}
				constantPool[index] = {
					className: js2me.JAVA_ROOT + '.' + className
				};
			}
			if (tag == TAG_STRING) {
				var text = resolveConstant(constant.stringIndex);
				constantPool[index] = new window[js2me.JAVA_ROOT].$java.$lang.$String(text);
			}
			if (tag == TAG_FIELDREF || tag == TAG_METHODREF || tag == TAG_INTERFACEREF) {
				constantPool[index] = {
					className: resolveConstant(constant.classIndex).className,
					name: resolveConstant(constant.nameAndTypeIndex).name,
					type: resolveConstant(constant.nameAndTypeIndex).type
				};
			}
			if (tag == TAG_NAME_AND_TYPE) {
				var name = '$' + resolveConstant(constant.nameIndex);
				name = escapeName(name);
				var typeName = resolveConstant(constant.descriptorIndex);
				name += escapeType(typeName);
				var args = typeName.slice(typeName.indexOf('(') + 1, typeName.indexOf(')'));
				var FIELD_TYPE = 0;
				var OBJECT_TYPE = 1;
				var ARRAY_TYPE = 2;
				var state = FIELD_TYPE;
				var argumentsTypes = [];
				for (var i = 0; i < args.length; i++) {
					if (state == FIELD_TYPE) {
						if (args[i] == 'L') {
							state = OBJECT_TYPE;
						} else if (args[i] == '[') {
							state = ARRAY_TYPE;
						} else {
							argumentsTypes.push(args[i]);
						}
					} else if (state == OBJECT_TYPE) {
						if (args[i] == ';') {
							state = FIELD_TYPE;
							argumentsTypes.push('L');
						}
					} else if (state == ARRAY_TYPE) {
						throw new Error('Arrays are not supported');
					}
					
				}
				constantPool[index] = {
					name: name,
					type: {
						argumentsTypes: argumentsTypes,
						returnType: typeName.slice(typeName.indexOf(')') + 1)
					}
				};
			}
			return constantPool[index];
		}
		for (var i in constantPool) {
			resolveConstant(i);
		}
	}
	function readAccessFlags() {
		//TODO
		stream.nextWord();
	}
	function readSuperClass() {
		//TODO
		stream.nextWord();
	}
	function readInterfaces() {
		var count = stream.nextWord();
		for (var i = 0; i < count; i++) {
			//TODO
			stream.nextWord();
		}
	}
	function readFields() {
		//TODO
		var count = stream.nextWord();
		for (var i = 0; i < count; i++) {
			var accessFlags = stream.nextWord();
			var nameIndex = stream.nextWord();
			var descriptorIndex = stream.nextWord();
			var attributesCount = stream.nextWord();
			if (attributesCount > 0) {
				throw new Error('Oh no! There are field attributes :(');
			}
		}
	}
	function readAttributes() {
		var count = stream.nextWord();
		var attributes = {};
		for (var i = 0; i < count; i++) {
			var attributeName = constantPool[stream.nextWord()];
			var attributeLength = stream.nextInt();
			var value = null;
			if (attributeName == 'Code') {
				var maxStack = stream.nextWord();
				var maxLocals = stream.nextWord();
				var codeLength = stream.nextInt();
				var codeStream = stream.getSubstream(codeLength);
				stream.skip(codeLength);
				value = function () {
					return js2me.execute(codeStream, [this]);
				};
				var exceptionTableLength = stream.nextWord();
				if (exceptionTableLength > 0) {
					throw new Error('Exceptions not supported!');
				}
				var attributesCount = stream.nextWord();
				if (attributesCount > 0) {
					throw new Error('Code attributes not supported!');
				}
			}
			if (value == null) {
				throw new Error('Unimplemented attribute ' + attributeName);
			}
			attributes[attributeName] = value;
		}
		return attributes;
	}
	function readMethods() {
		//TODO
		var count = stream.nextWord();
		for (var i = 0; i < count; i++) {
			var accessFlags = stream.nextWord();
			var name = constantPool[stream.nextWord()];
			var type = constantPool[stream.nextWord()];
			var attributes = readAttributes();
			newClass.prototype[escapeName(name) + escapeType(type)] = attributes['Code'];
		}
	}
	
	checkHeader();
	checkVersion();
	readConstantPool();
	resolveConstants();
	readAccessFlags();
	var thisClass = constantPool[stream.nextWord()];
	readSuperClass();
	readInterfaces();
	readFields();
	readMethods();
	// TODO: class attributes
	var package = js2me.findPackage(thisClass.className.substr(0, thisClass.className.lastIndexOf('.')));
	package[thisClass.className.substr(thisClass.className.lastIndexOf('.') + 1)] = newClass;
}
js2me.findPackage = function (path, current) {
	if (!current) {
		current = window;
	}
	if (!path) {
		return current;
	}
	var name = path.substr(0, path.indexOf('.')) || path;
	if (!current[name]) {
		current[name] = {};
	}
	if (path.indexOf('.') > 0) {
		return js2me.findPackage(path.substr(path.indexOf('.') + 1), current[name]);
	} else {
		return current[name];
	}
}
js2me.findClass = function (path) {
	var package = this.findPackage(path.substr(0, path.lastIndexOf('.')));
	return package[path.substr(path.lastIndexOf('.') + 1)];
}
