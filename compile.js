js2me.compileBytecode = function (stream, constantPool, length) {
	var maxStack = stream.nextWord();
	var maxLocals = stream.nextWord();
	var codeLength = stream.nextInt();
	var lastIndex = stream.index + codeLength;
	var STACK_VAR = 'stack';
	var LOCALS_VAR = 'locals';
	var code = 'var ' + STACK_VAR + ' = [];\n';
	code += 'var ' + LOCALS_VAR + ' = [this];\n';
	var translator = [];
	
	function generatePushStack(element) {
		code += STACK_VAR + '.push(' + element + ');\n';
	}
	// aaload
	translator[0x32] = function () {
		//TODO
	}
	// aconst_null
	translator[0x01] = function () {
		generatePushStack('null');
	}
	// aload
	translator[0x19] = function () {
		generatePushStack(LOCALS_VAR + '[' + STACK_VAR + '.pop()]');
	}
	// aload_0
	translator[0x2a] = function () {
		generatePushStack(LOCALS_VAR + '[0]');
	}
	// aload_1
	translator[0x2b] = function () {
		generatePushStack(LOCALS_VAR + '[1]');
	}
	// aload_2
	translator[0x2c] = function () {
		generatePushStack(LOCALS_VAR + '[2]');
	}
	// aload_3
	translator[0x2d] = function () {
		generatePushStack(LOCALS_VAR + '[3]');
	}
	// areturn
	translator[0xb0] = function () {
		code += 'return ' + STACK_VAR + '.pop();\n';
	}
	// astore
	translator[0x3a] = function () {
		var index = stream.nextByte();
		code += LOCALS_VAR + '[' + index + '] = ' + STACK_VAR + '.pop()';
	}
	// astore_0
	translator[0x4b] = function () {
		code += LOCALS_VAR + '[0] = ' + STACK_VAR + '.pop()';
	}
	// astore_1
	translator[0x4c] = function () {
		code += LOCALS_VAR + '[1] = ' + STACK_VAR + '.pop()';
	}
	// astore_2
	translator[0x4d] = function () {
		code += LOCALS_VAR + '[2] = ' + STACK_VAR + '.pop()';
	}
	// astore_3
	translator[0x4e] = function () {
		code += LOCALS_VAR + '[3] = ' + STACK_VAR + '.pop()';
	}
	// dup
	translator[0x59] = function () {
		code += 'var tmp = ' + STACK_VAR + '.pop();\n' + STACK_VAR + '.push(tmp);\n' + STACK_VAR + '.push(tmp);\n';
	}
	// getfield
	translator[0xb4] = function () {
		var field = constantPool[stream.nextWord()];
		generatePushStack(STACK_VAR + '.pop().' + field.name);
	}
	// invokespecial
	translator[0xb7] = function () {
		var method = constantPool[stream.nextWord()];
		var count = method.type.argumentsTypes.length;
		code += 'var tmp = ' + STACK_VAR + '.slice(' + STACK_VAR + '.length - ' + count + ');\n';
		code += STACK_VAR + ' = ' + STACK_VAR + '.slice(0, ' + STACK_VAR + '.length - ' + count + ');\n';
		if (method.type.returnType != 'V') {
			code += STACK_VAR + '.push';
		}
		code += '(' + method.className + '.prototype.' + method.name + '.apply(' + STACK_VAR + '.pop(), tmp));\n';
	}
	// invokestatic
	translator[0xb8] = function () {
		var method = constantPool[stream.nextWord()];
		var count = method.type.argumentsTypes.length;
		code += 'var tmp = ' + STACK_VAR + '.slice(' + STACK_VAR + '.length - ' + count + ');\n';
		code += STACK_VAR + ' = ' + STACK_VAR + '.slice(0, ' + STACK_VAR + '.length - ' + count + ');\n';
		if (method.type.returnType != 'V') {
			code += STACK_VAR + '.push';
		}
		code += '(' + method.className + '.prototype.' + method.name + '.apply(' + method.className + ', tmp));\n';
	}
	// invokevirtual
	translator[0xb6] = function () {
		var method = constantPool[stream.nextWord()];
		var count = method.type.argumentsTypes.length;
		code += 'var tmp = ' + STACK_VAR + '.slice(' + STACK_VAR + '.length - ' + count + ');\n';
		code += STACK_VAR + ' = ' + STACK_VAR + '.slice(0, ' + STACK_VAR + '.length - ' + count + ');\n';
		if (method.type.returnType != 'V') {
			code += STACK_VAR + '.push';
		}
		code += '(' + method.className + '.prototype.' + method.name + '.apply(' + STACK_VAR + '.pop(), tmp));\n';
	}
	// ldc
	translator[0x12] = function () {
		var index = stream.nextByte();
		code += STACK_VAR + '.push(this.pool[' + index + ']);\n';
	}
	// new
	translator[0xbb] = function () {
		var classInfo = constantPool[stream.nextWord()];
		//TODO: arguments
		code += STACK_VAR + '.push(new ' + classInfo.className + '());\n';
	}
	// noop
	translator[0x00] = function () {};
	// pop
	translator[0x57] = function () {
		code += STACK_VAR + '.pop();\n';
	}
	// pop2
	translator[0x58] = function () {
		code += STACK_VAR + '.pop();\n';
		code += STACK_VAR + '.pop();\n';
	}
	// putfield
	translator[0xb5] = function () {
		var field = constantPool[stream.nextWord()];
		code += 'var tmp = ' + STACK_VAR + '.pop();\n';
		code += STACK_VAR + '.pop().' + field.name + ' = tmp;\n';
	}
	// return
	translator[0xb1] = function () {};
	while (stream.index < lastIndex) {
		var op = stream.nextByte();
		if (translator[op]) {
			code += '//' + op.toString(16) + '\n';
			translator[op]();
		} else {
			throw new Error('Op ' + op.toString(16) + ' not supported');
		}
	}
	var exceptionTableLength = stream.nextWord();
	if (exceptionTableLength > 0) {
		throw new Error('Exceptions not supported!');
	}
	var attributesCount = stream.nextWord();
	if (attributesCount > 0) {
		throw new Error('Code attributes not supported!');
	}
	var args = [];
	console.log(code);
	return new Function(args, code);
};
