js2me.convertClass = function (stream) {
	var newClass = function () {
		//TODO: not good...
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
			if (tag == TAG_INTEGER) {
				constant.implemented = true;
				constant.value = stream.readInt32();
			}
			if (tag == TAG_FLOAT) {
				constant.implemented = true;
				var value = stream.readUint32();
				var sign = (value & 0x80000000) != 0;
				var exponent = ((value & 0x7f800000) >> 23) - 127;
				var fraction = (value & 0x007fffff);
				for (var j = 0; j < 23; j++) {
					fraction /= 2;
				}
				fraction += 1;
				while (exponent != 0) {
					if (exponent > 0) {
						fraction *= 2;
						exponent--;
					} else {
						fraction /= 2;
						exponent++;
					}
				}
				if (sign) {
					fraction *= -1;
				}
				constant.value = fraction;
			}
			if (tag == TAG_LONG) {
				constant.implemented = true;
				constant.value = new js2me.Long(stream.readUint32(), stream.readUint32());
			}
			if (tag == TAG_DOUBLE) {
				constant.implemented = true;
				var hiData = stream.readUint32();
				var loData = stream.readUint32();
				var sign = (hiData & 0x80000000) != 0;
				var exponent = ((hiData & 0x7ff00000) >> 20) - 1023;
				hiData = (hiData & 0x000fffff) * 0x100000000;
				var fraction = 1;
				for (var j = 0; j < 52; j++) {
					hiData /= 2;
					loData /= 2;
				}
				fraction += hiData;
				fraction += loData;
				while (exponent != 0) {
					if (exponent > 0) {
						fraction *= 2;
						exponent--;
					} else {
						fraction /= 2;
						exponent++;
					}
				}
				if (sign) {
					fraction *= -1;
				}
				constant.value = new js2me.Double(fraction);
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
		typeName = typeName.replace(new RegExp('[\\[\\(\\);/]', 'g'), '_');
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
			var name = constantPool[stream.readUint16()];
			var type = constantPool[stream.readUint16()];
			var attributes = readAttributes();
			newClass.prototype[escapeName(name) + escapeType(type)] = attributes['ConstantValue'];
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
				value = function () {
					var locals = [this];
					for (var i = 0; i < arguments.length; i++) {
						locals.push(arguments[i]);
					}
					return js2me.execute(new js2me.BufferStream(codeStream), locals, constantPool, exceptions);
				};
			}
			if (attributeName == 'Synthetic') {
				value = true;
			}
			if (attributeName == 'ConstantValue') {
				value = constantPool[stream.readUint16()];
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
			if (attributeName == 'Exceptions') {
				var count = stream.readUint16();
				value = [];
				for (var j = 0; j < count; j++) {
					
					
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
	try {
	var package = this.findPackage(path.substr(0, path.lastIndexOf('.')));
} catch (e) {
	a = 0;
}
	var classObj = package[path.substr(path.lastIndexOf('.') + 1)];
	if (!classObj) {
		throw new Error('Uninmplemented class ' + path);
	}
	return classObj;
};
js2me.Long = function (hi, lo) {
	this.hi = hi;
	if (lo < 0) {
		lo += 4294967296;
	}
	this.lo = lo;
	this.shl = function (shift) {
		var lo = this.lo << shift;
		var rest = Math.floor(lo / 0xffffffff);
		lo = lo % 0xffffffff;
		var hi = this.hi << shift;
		hi = hi % 0xffffffff + rest;
		return new js2me.Long(hi, lo);
	};
	this.shr = function (shift) {
		var lo = this.lo >> shift;
		lo += (this.hi % (0xffffffff >> (32 - shift))) << (32 - shift);
		var hi = this.hi >> shift;
		return new js2me.Long(hi, lo);
	};
	this.div = function (b) {
		throw new Error('ldviv sucks');
		var v = (this.hi * 0xffffffff + this.lo) / (b.hi * 0xffffffff + b.lo);
		return new js2me.Long(Math.floor(v / 0xffffffff), v % 0xffffffff);
	};
	this.toString = function () {
		var digits = [];
		for (var i = 0; i < 22; i++) {
			digits[i] = 0;
		}
		if (this.hi < 2147483648) {

			var hi = this.hi;
			var i = 0;
			while (hi > 0) {
				digits[i] = hi % 10;
				hi = Math.floor(hi / 10);
				i++;
			}
			for (var i = 0; i < 32; i++) {
				var rest = 0;
				for (var j = 0; j < digits.length; j++) {
					digits[j] *= 2;
					digits[j] += rest;
					rest = Math.floor(digits[j] / 10);
					digits[j] = digits[j] % 10;
				}
			}
			var lo = this.lo;
			var rest = 0;
			for (var i = 0; i < digits.length; i++) {
				digits[i] += lo % 10 + rest;
				rest = Math.floor(digits[i] / 10);
				digits[i] = digits[i] % 10;
				lo = Math.floor(lo / 10);
			}
		} else {
			this.output.$write_B_V('-');
			var hi = -(this.hi - 4294967296);
			var i = 0;
			while (hi > 0) {
				digits[i] = hi % 10;
				hi = Math.floor(hi / 10);
				i++;
			}
			for (var i = 0; i < 32; i++) {
				var rest = 0;
				for (var j = 0; j < digits.length; j++) {
					digits[j] *= 2;
					digits[j] += rest;
					rest = Math.floor(digits[j] / 10);
					digits[j] = digits[j] % 10;
				}
			}
			var lo = this.lo;
			var rest = 0;
			for (var i = 0; i < digits.length; i++) {
				digits[i] -= lo % 10 + rest;
				rest = 0
				while (digits[i] < 0) {
					digits[i] += 10;
					rest++;
				}
				lo = Math.floor(lo / 10);
			}
		}
		var last = 0;
		for (var i = 0; i < digits.length; i++) {
			if (digits[i] > 0) {
				last = i;
			}
			digits[i] += 48;
		}
		return digits.slice(0, last + 1).reverse()
	};
};
js2me.Double = function (double) {
	this.double = double;
};
