js2me.execute = function (stream, locals) {
	var executors = [];
	var stack = [];
	var result = null;
	var self = locals[0];
	var constantPool = self.pool;
	
	// aconst_null
	executors[0x01] = function () {
		stack.push(null);
	}
	// aload
	executors[0x19] = function () {
		var ref = locals[stream.readUint8()];
		stack.push(ref);
	}
	// aload_0
	executors[0x2a] = function () {
		stack.push(locals[0]);
	}
	// aload_1
	executors[0x2b] = function () {
		stack.push(locals[1]);
	}
	// aload_2
	executors[0x2c] = function () {
		stack.push(locals[2]);
	}
	// aload_3
	executors[0x2d] = function () {
		stack.push(locals[3]);
	}
	// areturn
	executors[0xb0] = function () {
		result = stack.pop();
	}
	// astore
	executors[0x3a] = function () {
		var index = stream.readUint8();
		locals[index] = stack.pop();
	}
	// astore_0
	executors[0x4b] = function () {
		locals[0] = stack.pop();
	}
	// astore_1
	executors[0x4c] = function () {
		locals[1] = stack.pop();	}
	// astore_2
	executors[0x4d] = function () {
		locals[2] = stack.pop();
	}
	// astore_3
	executors[0x4e] = function () {
		locals[3] = stack.pop();
	}
	// bipush
	executors[0x10] = function () {
		var value = stream.readInt8();
		stack.push(value);
	}
	// dup
	executors[0x59] = function () {
		var tmp = stack.pop();
		stack.push(tmp);
		stack.push(tmp);
	}
	// dup_x1
	executors[0x5a] = function () {
		var a = stack.pop();
		var b = stack.pop();
		stack.push(a);
		stack.push(b);
		stack.push(a);
	}
	// dup_x2
	executors[0x5b] = function () {
		var a = stack.pop();
		var b = stack.pop();
		var c = stack.pop();
		stack.push(a);
		stack.push(c);
		stack.push(b);
		stack.push(a);
	}
	// getfield
	executors[0xb4] = function () {
		var field = constantPool[stream.readUint16()];
		var obj = stack.pop();
		stack.push(obj[field.name]);
	};
	// goto
	executors[0xa7] = function () {
		var index = stream.readInt16();
		stream.skip(index - 3);
	};
	// iadd
	executors[0x60] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a + b);
	};
	// iaload
	executors[0x2e] = function () {
		var index = stack.pop();
		var array = stack.pop();
		stack.push(array[index]);
	};
	// iastore
	executors[0x4f] = function () {
		var value = stack.pop();
		var index = stack.pop();
		var array = stack.pop();
		array[index] = value;
	};
	// iconst_m1
	executors[0x02] = function () {
		stack.push(-1);
	};
	// iconst_0
	executors[0x03] = function () {
		stack.push(0);
	}
	// iconst_1
	executors[0x04] = function () {
		stack.push(1);
	}
	// iconst_2
	executors[0x05] = function () {
		stack.push(2);
	}
	// iconst_3
	executors[0x06] = function () {
		stack.push(3);
	};
	// iconst_4
	executors[0x07] = function () {
		stack.push(4);
	};
	// iconst_5
	executors[0x08] = function () {
		stack.push(5);
	};
	// idiv
	executors[0x6c] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(Math.floor(a / b));
	};
	// if_acmpeq
	executors[0xa5] = function () {
		var index = stream.readInt16();
		var b = stack.pop();
		var a = stack.pop();
		if (a === b) {
			stream.skip(index - 3);
		}
	};
	// if_acmpne
	executors[0xa6] = function () {
		var index = stream.readInt16();
		var b = stack.pop();
		var a = stack.pop();
		if (a !== b) {
			stream.skip(index - 3);
		}
	};
	// if_icmpeq
	executors[0x9f] = function () {
		var index = stream.readInt16();
		var b = stack.pop();
		var a = stack.pop();
		if (a == b) {
			stream.skip(index - 3);
		}
	};
	
	// if_icmpne
	executors[0xa0] = function () {
		var index = stream.readInt16();
		var b = stack.pop();
		var a = stack.pop();
		if (a != b) {
			stream.skip(index - 3);
		}
	};
	// if_icmplt
	executors[0xa1] = function () {
		var index = stream.readInt16();
		var b = stack.pop();
		var a = stack.pop();
		if (a < b) {
			stream.skip(index - 3);
		}
	};
	// if_icmpge
	executors[0xa2] = function () {
		var index = stream.readInt16();
		var b = stack.pop();
		var a = stack.pop();
		if (a >= b) {
			stream.skip(index - 3);
		}
	};
	// if_icmpgt
	executors[0xa3] = function () {
		var index = stream.readInt16();
		var b = stack.pop();
		var a = stack.pop();
		if (a > b) {
			stream.skip(index - 3);
		}
	};
	// if_icmple
	executors[0xa4] = function () {
		var index = stream.readInt16();
		var b = stack.pop();
		var a = stack.pop();
		if (a <= b) {
			stream.skip(index - 3);
		}
	};
	// ifeq
	executors[0x99] = function () {
		var index = stream.readInt16();
		var value = stack.pop();
		if (value == 0) {
			stream.skip(index - 3);
		}
	};
	// ifne
	executors[0x9a] = function () {
		var index = stream.readInt16();
		var value = stack.pop();
		if (value != 0) {
			stream.skip(index - 3);
		}
	};
	// iflt
	executors[0x9b] = function () {
		var index = stream.readInt16();
		var value = stack.pop();
		if (value < 0) {
			stream.skip(index - 3);
		}
	};
	// ifge
	executors[0x9c] = function () {
		var index = stream.readInt16();
		var value = stack.pop();
		if (value >= 0) {
			stream.skip(index - 3);
		}
	};
	// ifgt
	executors[0x9d] = function () {
		var index = stream.readInt16();
		var value = stack.pop();
		if (value > 0) {
			stream.skip(index - 3);
		}
	};
	// ifle
	executors[0x9e] = function () {
		var index = stream.readInt16();
		var value = stack.pop();
		if (value <= 0) {
			stream.skip(index - 3);
		}
	};
	// ifnonnull
	executors[0xc7] = function () {
		var index = stream.readInt16();
		var value = stack.pop();
		if (value != null) {
			stream.skip(index - 3);
		}
	};
	// ifnull
	executors[0xc6] = function () {
		var index = stream.readInt16();
		var value = stack.pop();
		if (value == null) {
			stream.skip(index - 3);
		}
	};
	// iinc
	executors[0x84] = function () {
		var index = stream.readUint8();
		var value = stream.readInt8();
		locals[index] += value;
	};
	// iload
	executors[0x15] = function () {
		var index = stream.readUint8();
		stack.push(locals[index]);
	};
	// iload_0
	executors[0x1a] = function () {
		stack.push(locals[0]);
	};
	// iload_1
	executors[0x1b] = function () {
		stack.push(locals[1]);
	}
	// iload_2
	executors[0x1c] = function () {
		stack.push(locals[2]);
	}
	// iload_3
	executors[0x1d] = function () {
		stack.push(locals[3]);
	}
	// imul
	executors[0x68] = function () {
		var a = stack.pop();
		var b = stack.pop();
		stack.push(a * b);
	}
	function findMethod(className, methodName) {
		var classObj = js2me.findClass(className);
		var method = classObj.prototype[methodName];
		if (!method) {
			if (classObj.prototype.superClass) {
				method = findMethod(classObj.prototype.superClass.className, methodName);
			}
		}
		return method
	}
	function invoke(static) {
		//TODO: I think that there's some differences...
		var methodInfo = constantPool[stream.readUint16()];
		var count = methodInfo.type.argumentsTypes.length;
		var args = [];
		for (var i = 0; i < count; i++) {
			args.push(stack.pop());
		}
		args.reverse();
		var classObj = js2me.findClass(methodInfo.className);
		var obj = static ? classObj : stack.pop();
		//console.log('START: ' + method.className + '->' + method.name);
		var method = findMethod(methodInfo.className, methodInfo.name)
		if (!method) {
			throw new Error('Not implemented ' + methodInfo.className + '->' + methodInfo.name);
		}
		var result = method.apply(obj, args);
		//console.log('END: ' + method.className + '->' + method.name);
		if (methodInfo.type.returnType != 'V') {
			stack.push(result);
		}
	}
	// invokespecial
	executors[0xb7] = function () {
		invoke(false);
	}
	// invokestatic
	executors[0xb8] = function () {
		invoke(true);
	}
	// invokevirtual
	executors[0xb6] = function () {
		invoke(false);
	}
	// istore
	executors[0x36] = function () {
		var index = stream.readUint8();
		locals[index] = stack.pop();
	}
	// istore_0
	executors[0x3b] = function () {
		locals[0] = stack.pop();
	}
	// istore_1
	executors[0x3c] = function () {
		locals[1] = stack.pop();
	};
	// istore_2
	executors[0x3d] = function () {
		locals[2] = stack.pop();
	};
	// istore_3
	executors[0x3e] = function () {
		locals[3] = stack.pop();
	};
	// isub
	executors[0x64] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a - b);
	};
	// land
	executors[0x7f] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a & b);
	};
	// lconst_0
	executors[0x09] = function () {
		stack.push(0);
	};
	// lconst_1
	executors[0x0a] = function () {
		stack.push(1);
	};
	// ldc
	executors[0x12] = function () {
		var value = constantPool[stream.readUint8()];
		stack.push(value);
	};
	// lload
	executors[0x16] = function () {
		var index = stream.readUint8();
		stack.push(locals[index]);
	};
	// lload_0
	executors[0x1e] = function () {
		stack.push(locals[0]);
	};
	// lload_1
	executors[0x1f] = function () {
		stack.push(locals[1]);
	};
	// lload_2
	executors[0x20] = function () {
		stack.push(locals[2]);
	};
	// lload_3
	executors[0x21] = function () {
		stack.push(locals[3]);
	};
	// new
	executors[0xbb] = function () {
		var classInfo = constantPool[stream.readUint16()];
		//TODO: arguments
		var constructor = js2me.findClass(classInfo.className);
		if (!constructor) {
			console.error('Not implemented: ' + classInfo.className);
		}
		var instance = new constructor();
		stack.push(instance);
	};
	// newarray
	executors[0xbc] = function () {
		var type = constantPool[stream.readUint8()];
		var length = stack.pop();
		var array = new Array(length);
		stack.push(array);
	}
	// noop
	executors[0x00] = function () {};
	// pop
	executors[0x57] = function () {
		stack.pop();
	}
	// pop2
	executors[0x58] = function () {
		stack.pop();
		stack.pop();
	}
	// putfield
	executors[0xb5] = function () {
		var field = constantPool[stream.readUint16()];
		var value = stack.pop();
		var obj = stack.pop();
		obj[field.name] = value;
	}
	// return
	executors[0xb1] = function () {};
	// sipush
	executors[0x11] = function () {
		var value = stream.readUint16();
		stack.push(value);
	}
	stream.reset();
	while (stream.isEnd()) {
		//console.log(stream.index);
		var op = stream.readUint8();
		if (executors[op]) {
			executors[op]();
		} else {
			throw new Error('Op ' + op.toString(16) + ' not supported');
		}
	}
	
	
	return result;
};
