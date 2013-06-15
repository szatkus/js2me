/**
 * Converts Java class definition into JavaScript.
 * @param {BufferStream} stream The class file format compliant with JVM specifications.
 * @return {constructor} JavaScript constructor of class.
 */
js2me.convertClass = function (stream) {
	var newClass = function () {
		
	};
	var constantPool = [];
	newClass.prototype.pool = constantPool;
	newClass.prototype.require = [];
	var TAG_UTF8 = 1;
	var TAG_INTEGER = 3;
	var TAG_FLOAT = 4;
	var TAG_LONG = 5;
	var TAG_DOUBLE = 6;
	var TAG_CLASS_INFO = 7;
	var TAG_STRING = 8;
	var TAG_FIELDREF = 9;
	var TAG_METHODREF = 10;
	var TAG_INTERFACEREF = 11;
	var TAG_NAME_AND_TYPE = 12;
	function checkHeader() {
		if (stream.readUint32() != 0xCAFEBABE) {
			throw new Error('Incorrect header');
		}
	}
	function checkVersion() {
		// Who cares...
		stream.readUint32();
	}
	function readConstantPool() {
		var count = stream.readUint16() - 1;
		for (var i = 1; i <= count; i++) {
			var tag = stream.readUint8();
			var constant = {
				tag: tag,
				implemented: false
			};
			if (tag == TAG_UTF8) {
				constant.implemented = true;
				var length = stream.readUint16();
				var bytes = [];
				for (var j = 0; j < length; j++) {
					bytes.push(stream.readUint8());
				}
				constant.value = js2me.UTF8ToString(bytes);
			}
			if (tag == TAG_INTEGER) {
				constant.implemented = true;
				constant.value = stream.readInt32();
			}
			if (tag == TAG_FLOAT) {
				constant.implemented = true;
				var value = stream.readUint32();
				constant.value = js2me.dataToFloat(value);
			}
			if (tag == TAG_LONG) {
				constant.implemented = true;
				constant.value = new js2me.Long(stream.readUint32(), stream.readUint32());
			}
			if (tag == TAG_DOUBLE) {
				constant.implemented = true;
				var hiData = stream.readUint32();
				var loData = stream.readUint32();
				constant.value = js2me.dataToDouble(hiData, loData);
			}
			if (tag == TAG_CLASS_INFO) {
				constant.implemented = true;
				constant.nameIndex = stream.readUint16();
			}
			if (tag == TAG_STRING) {
				constant.implemented = true;
				constant.stringIndex = stream.readUint16();
			}
			if (tag == TAG_FIELDREF || tag == TAG_METHODREF || tag == TAG_INTERFACEREF) {
				constant.implemented = true;
				constant.classIndex = stream.readUint16();
				constant.nameAndTypeIndex = stream.readUint16();
			}
			if (tag == TAG_NAME_AND_TYPE) {
				constant.implemented = true;
				constant.nameIndex = stream.readUint16();
				constant.descriptorIndex = stream.readUint16();
			}
			if (!constant.implemented) {
				throw new Error('Unimplemented tag ' + tag + ' at position ' + i);
			}
			constantPool[i] = constant;
			if (tag == TAG_LONG || tag == TAG_DOUBLE) {
				i++;
			}
		}
	}
	function escapeName(name) {
		name = '$' + name;
		if (name == '$<init>') {
			name = '_init';
		}
		if (name == '$<clinit>') {
			name = '_clinit';
		}
		return name;
	}
	function escapeType(typeName) {
		typeName = typeName.replace(new RegExp('[\\[;/]', 'g'), '_').replace(new RegExp('[\\(\\)]', 'g'), '$');
		return typeName;
	}
	function resolveConstants() {
		function resolveConstant(index) {
			var constant = constantPool[index];
			var tag = constant.tag;
			if (tag == TAG_UTF8 || tag == TAG_INTEGER || tag == TAG_LONG || tag == TAG_FLOAT || tag == TAG_DOUBLE) {
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
				className = js2me.JAVA_ROOT + '.' + className;
				
				if (className.indexOf('[') == -1 ) {
					newClass.prototype.require.push(className);
				}
				constantPool[index] = {
					className: className
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
				if (tag == TAG_METHODREF || tag == TAG_INTERFACEREF) {
					var constant = constantPool[index];
					var methodPath = constant.className + '->' + constant.name;
					js2me.usedMethods[methodPath] = true;
				}
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
				var part = '';
				for (var i = 0; i < args.length; i++) {
					part += args[i];
					if (state == FIELD_TYPE || state == ARRAY_TYPE) {
						if (args[i] == 'L') {
							state = OBJECT_TYPE;
						} else if (args[i] == '[') {
							state = ARRAY_TYPE;
						} else {
							argumentsTypes.push(part);
							part = '';
						}
					} else if (state == OBJECT_TYPE) {
						if (args[i] == ';') {
							state = FIELD_TYPE;
							argumentsTypes.push(part);
							part = '';
						}
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
		return stream.readUint16();
	}
	function readSuperClass() {
		newClass.prototype.superClass = constantPool[stream.readUint16()].className;
	}
	function readInterfaces() {
		newClass.prototype.interfaces = [];
		var count = stream.readUint16();
		for (var i = 0; i < count; i++) {
			newClass.prototype.interfaces.push(constantPool[stream.readUint16()].className);
		}
	}
	function readFields() {
		//TODO
		var count = stream.readUint16();
		for (var i = 0; i < count; i++) {
			var accessFlags = stream.readUint16();
			var name = constantPool[stream.readUint16()];
			var type = constantPool[stream.readUint16()];
			var attributes = readAttributes();
			var fieldName = escapeName(name) + escapeType(type);
			if (type == 'B' || type == 'S' || type == 'F' || type == 'I') {
				newClass.prototype[fieldName] = 0;
			}
			if (type == 'D') {
				newClass.prototype[fieldName] = new js2me.Double(0);
			}
			if (type == 'J') {
				newClass.prototype[fieldName] = new js2me.Long(0, 0);
			}
			if (type == 'C') {
				newClass.prototype[fieldName] = 0;
			}
			if (type == 'Z') {
				newClass.prototype[fieldName] = 0;
			}
			if (attributes['ConstantValue']) {
				newClass.prototype[fieldName] = attributes['ConstantValue'];
			}
		}
	}
	function readAttributes(name) {
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
				var exceptions = [];
				var exceptionTableLength = stream.readUint16();
				for (var j = 0; j < exceptionTableLength; j++) {
					exceptions[j] = {
						startPc: stream.readUint16(),
						endPc: stream.readUint16(),
						handler: stream.readUint16(),
						catchType: constantPool[stream.readUint16()]
					};
				}
				readAttributes();
				var program = js2me.generateProgram(new js2me.BufferStream(codeStream), constantPool);
				program.name = thisClass.className + '->' + name;
				value = function () {
					var locals = [];
					if (this != window) {
						locals.push(this);
					}
					for (var i = 0; i < arguments.length; i++) {
						locals.push(arguments[i]);
					}
					var callback = null;
					if (arguments.length > 0 && typeof arguments[arguments.length - 1] == 'function') {
						callback = arguments[arguments.length - 1];
					}
					var result = js2me.execute(program, locals, constantPool, exceptions, null, callback);
					return result;
				};
				value.data = program;
			}
			if (attributeName == 'Synthetic') {
				value = true;
			}
			if (attributeName == 'ConstantValue') {
				value = constantPool[stream.readUint16()];
			}
			if (attributeName == 'InnerClasses') {
				var classCount = stream.readUint16();
				value = [];
				for (var j = 0; j < classCount; j++) {
					var classInfo = {
						innerClass: constantPool[stream.readUint16()],
						outerClass: constantPool[stream.readUint16()],
						innerName: constantPool[stream.readUint16()],
						accessFlags: stream.readUint16()
					};
					value.push(classInfo);
				}
			}
			if (attributeName == 'Exceptions') {
				var exceptionsCount = stream.readUint16();
				value = [];
				for (var j = 0; j < exceptionsCount; j++) {
					value.push(constantPool[stream.readUint16()]);
				}
			}
			if (attributeName == 'StackMap' || attributeName == 'LineNumberTable' || attributeName == 'SourceFile' ||
				attributeName == 'LocalVariableTable') {
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
			var attributes = readAttributes(escapeName(name) + escapeType(type));
			newClass.prototype[escapeName(name) + escapeType(type)] = attributes['Code'];
		}
	}
	
	checkHeader();
	checkVersion();
	readConstantPool();
	resolveConstants();
	var accessFlags = readAccessFlags();
	if ((accessFlags & 0x0200) == 0) {
		newClass.prototype.type = 'class';
	} else {
		newClass.prototype.type = 'interface';
	}
	var thisClass = constantPool[stream.readUint16()];
	newClass.prototype.className = thisClass.className;
	readSuperClass();
	readInterfaces();
	readFields();
	readMethods();
	readAttributes();
	return newClass;
};
