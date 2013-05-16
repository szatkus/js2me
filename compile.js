js2me.compileBytecode = function (stream, constantPool, length) {
	var maxStack = stream.nextWord();
	var maxLocals = stream.nextWord();
	var codeLength = stream.nextInt();
	var lastIndex = stream.index + codeLength;
	var STACK_VAR = 'stack';
	var LOCALS_VAR = 'locals';
	var code = 'var ' + STACK_VAR + ' = [];\n';
	code += 'var ' + LOCALS_VAR + ' = [this];\n';
	while (stream.index < lastIndex) {
		var op = stream.nextByte();
		// aload_0
		if (op == 0x2a) {
			code += STACK_VAR + '.push(' + LOCALS_VAR + '[0]);\n';
		}
		// dup
		if (op == 0x12) {
			var index = stream.nextWord();
			code += STACK_VAR + '.push(pool[' + index + ']);\n';
		}
		// invokespecial
		if (op == 0x59) {
			code += 'var tmp = ' + STACK_VAR + '.pop();\n' + STACK_VAR + '.push(tmp);\n' + STACK_VAR + '.push(tmp);\n';
		}
		// ldc
		if (op == 0x12) {
			var index = stream.nextWord();
			code += STACK_VAR + '.push(pool[' + index + ']);\n';
		}
		// new
		if (op == 0xbb) {
			var classInfo = constantPool[stream.nextWord()];
			//TODO: arguments
			code += STACK_VAR + '.pop(new ' + classInfo.className + '());\n';
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
