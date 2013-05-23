js2me.convertClass = function (stream) {
	var newClass = function () {
		if (this.superClass) {
			var superClass = js2me.findClass(this.superClass.className);
			this.__proto__.__proto__ = new superClass();
		}
	};
	var constantPool = [];
	newClass.prototype.pool = constantPool;
	function checkHeader() {
		if (stream.readUint32() != 0xCAFEBABE) {
			throw new Error('Incorrect header');
		}
	}
	function checkVersion() {
		// Who cares...
		stream.readUint32();
	}
	var TAG_UTF8 = 1;
	var TAG_CLASS_INFO = 7;
	var TAG_STRING = 8;
	var TAG_FIELDREF = 9;
	var TAG_METHODREF = 10;
	var TAG_INTERFACEREF = 11;
	var TAG_NAME_AND_TYPE = 12;
	function readConstantPool() {
		var count = stream.readUint16() - 1;
		for (var i = 1; i <= count; i++) {
			var tag = stream.readUint8();
			var constant = {
				tag: tag,
				implemented: false
			};
			if (tag == TAG_UTF8) {
				//TODO: only ASCII :/
				constant.implemented = true;
				var length = stream.readUint16();
				var value = '';
				for (var j = 0; j < length; j++) {
					value += String.fromCharCode(stream.readUint8());
				}
				constant.value = value;
			}
			// ClassInfo
			if (tag == TAG_CLASS_INFO) {
				constant.implemented = true;
				constant.nameIndex = stream.readUint16();
			}
			// String
			if (tag == TAG_STRING) {
				constant.implemented = true;
				constant.stringIndex = stream.readUint16();
			}
			// Fieldref || Methodref || Interfaceref
			if (tag == TAG_FIELDREF || tag == TAG_METHODREF || tag == TAG_INTERFACEREF) {
				constant.implemented = true;
				constant.classIndex = stream.readUint16();
				constant.nameAndTypeIndex = stream.readUint16();
			}
			// NameAndType
			if (tag == TAG_NAME_AND_TYPE) {
				constant.implemented = true;
				constant.nameIndex = stream.readUint16();
				constant.descriptorIndex = stream.readUint16();
			}
			if (!constant.implemented) {
				throw new Error('Unimplemented tag ' + tag + ' at position ' + i);
			}
			constantPool[i] = constant;
		}
	}
	function escapeName(name) {
		name = '$' + name;
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
				var name = resolveConstant(constant.nameIndex);
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
		stream.readUint16();
	}
	function readSuperClass() {
		newClass.prototype.superClass = constantPool[stream.readUint16()];
	}
	function readInterfaces() {
		var count = stream.readUint16();
		for (var i = 0; i < count; i++) {
			//TODO
			stream.readUint16();
		}
	}
	function readFields() {
		//TODO
		var count = stream.readUint16();
		for (var i = 0; i < count; i++) {
			var accessFlags = stream.readUint16();
			var nameIndex = stream.readUint16();
			var descriptorIndex = stream.readUint16();
			readAttributes();
		}
	}
	function readAttributes() {
		var count = stream.readUint16();
		var attributes = {};
		for (var i = 0; i < count; i++) {
			var attributeName = constantPool[stream.readUint16()];
			var attributeLength = stream.readUint32();
			var value = null;
			if (attributeName == 'Code') {
				var maxStack = stream.readUint16();
				var maxLocals = stream.readUint16();
				var codeLength = stream.readUint32();
				var codeStream = stream.getSubstream(codeLength);
				stream.skip(codeLength);
				value = function () {
					var locals = [this];
					for (var i = 0; i < arguments.length; i++) {
						locals.push(arguments[i]);
					}
					return js2me.execute(codeStream, locals);
				};
				var exceptionTableLength = stream.readUint16();
				if (exceptionTableLength > 0) {
					throw new Error('Exceptions not supported!');
				}
				readAttributes();
			}
			if (attributeName == 'Synthetic') {
				value = true;
			}
			if (attributeName == 'InnerClasses') {
				var count = stream.readUint16();
				value = [];
				for (var j = 0; j < count; j++) {
					var classInfo = {
						innerClass: constantPool[stream.readUint16()],
						outerClass: constantPool[stream.readUint16()],
						innerName: constantPool[stream.readUint16()],
						accessFlags: stream.readUint16()
					};
					value.push(classInfo);
				}
			}
			if (attributeName == 'StackMap') {
				//TODO: maybe it's needed by something?
				stream.skip(attributeLength);
				value = true;
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
		var count = stream.readUint16();
		for (var i = 0; i < count; i++) {
			var accessFlags = stream.readUint16();
			var name = constantPool[stream.readUint16()];
			var type = constantPool[stream.readUint16()];
			var attributes = readAttributes();
			newClass.prototype[escapeName(name) + escapeType(type)] = attributes['Code'];
		}
	}
	
	checkHeader();
	checkVersion();
	readConstantPool();
	resolveConstants();
	readAccessFlags();
	var thisClass = constantPool[stream.readUint16()];
	readSuperClass();
	readInterfaces();
	readFields();
	readMethods();
	readAttributes();
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
