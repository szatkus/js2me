js2me.execute = function (stream, locals, constantPool, exceptions, restoreInfo) {
	var executors = [];
	var stack = [];
	var result = null;
	var self = locals[0];
	var position = stream.index;
	var finish = false;
	js2me.suspendThread = false;
	if (restoreInfo) {
		stack = restoreInfo.stack;
		positon = restoreInfo.position;
		try {
			executeFunction(function () {
				return js2me.restoreThread(js2me.currentThread);
			}, restoreInfo.saveResult);
		} catch (exception) {
			tryCatchException(exception);
		}
		
	}
	
	function suspendCall(saveResult) {
		if (js2me.restoreStack[js2me.currentThread] == null) {
			js2me.restoreStack[js2me.currentThread] = [];
		}
		var restoreStack = js2me.restoreStack[js2me.currentThread];
		restoreStack.push([stream, locals, constantPool, exceptions, { 
			stack: stack,
			position: position,
			saveResult: saveResult
		}]);
		finish = true;
	}
	function findMethod(className, methodName) {
		var classObj = js2me.findClass(className);
		var method = classObj.prototype[methodName];
		if (!method) {
			if (classObj.prototype.superClass) {
				method = findMethod(classObj.prototype.superClass, methodName);
			}
		}
		return method
	}
	function tryCatchException(exception) {
		var handler = -1;
		for (var i = 0; i < exceptions.length && handler == -1; i++) {
			if (exceptions[i].startPc <= position && exceptions[i].endPc >= position) {
				var obj = {__proto__: exception};
				while (obj.__proto__.className) {
					obj = obj.__proto__;
					if (exceptions[i].catchType.className == obj.className) {
						handler = exceptions[i].handler;
					}
				}
			}
		}
		if (handler >= 0) {
			stack.push(exception);
			stream.index = handler;
		} else {
			throw exception;
		}
	}
	function executeFunction(func, saveResult) {
		var result = func();
		if (js2me.suspendThread) {
			suspendCall(saveResult);
			return;
		}
		if (saveResult) {
			stack.push(result);
		}
		//console.log('END: ' + method.className + '->' + method.name);
		
	}
	function invoke(static, virtual, garbage) {
		var methodInfo = constantPool[stream.readUint16()];
		if (garbage) {
			stream.readUint16();
		}
		var count = methodInfo.type.argumentsTypes.length;
		var args = [];
		for (var i = 0; i < count; i++) {
			args.push(stack.pop());
		}
		args.reverse();
		var obj = static ? window : stack.pop();
		if (obj == null) {
			executeFunction(function () {
				throw new javaRoot.$java.$lang.$NullPointerException();
			}, false);
			return;
		}
		//console.log('START: ' + methodInfo.className + '->' + methodInfo.name);
		var method = findMethod(virtual ? obj.className : methodInfo.className, methodInfo.name)
		if (!method) {
			throw new Error('Not implemented ' + methodInfo.className + '->' + methodInfo.name);
		}
		executeFunction(function () {
			return method.apply(obj, args);
		}, methodInfo.type.returnType != 'V');
	}
	
	// aaload
	executors[0x32] = function () {
		var index = stack.pop();
		var array = stack.pop();
		if (array == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (index < 0 || index >= array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		stack.push(array[index]);
	}
	// aastore
	executors[0x53] = function () {
		var value = stack.pop();
		var index = stack.pop();
		var array = stack.pop();
		if (array == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (index < 0 || index >= array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		array[index] = value;
	}
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
	};
	// anewarray
	executors[0xbd] = function () {
		stream.readUint16();
		var length = stack.pop();
		stack.push(new Array(length));
	};
	// areturn
	executors[0xb0] = function () {
		result = stack.pop();
		finish = true;
	};
	// arraylength
	executors[0xbe] = function () {
		var array = stack.pop();
		if (array == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		stack.push(array.length);
	};
	// astore
	executors[0x3a] = function () {
		var index = stream.readUint8();
		locals[index] = stack.pop();
	};
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
	// baload
	executors[0x33] = function () {
		var index = stack.pop();
		var array = stack.pop();
		stack.push(array[index]);
	};
	// bastore
	executors[0x54] = function () {
		var value = stack.pop();
		var index = stack.pop();
		var array = stack.pop();
		array[index] = value;
	};
	// bipush
	executors[0x10] = function () {
		var value = stream.readInt8();
		stack.push(value);
	};
	// caload
	executors[0x34] = function () {
		var index = stack.pop();
		var array = stack.pop();
		stack.push(array[index]);
	};
	// castore
	executors[0x55] = function () {
		var value = stack.pop();
		var index = stack.pop();
		var array = stack.pop();
		array[index] = value;
	};
	// checkcast
	executors[0xc0] = function () {
		var ref = stack.pop();
		var type = constantPool[stream.readUint16()];
		
		
		if (ref != null) {
			if (ref.constructor == Array) {
				stack.push(ref);
				return;
			}
			var refClass = js2me.findClass(ref.className).prototype;
			var cmpClass = js2me.findClass(type.className).prototype;
			if (refClass.type == 'class') {
				if (cmpClass.type == 'class') {
					while (refClass.className != cmpClass.className && refClass.superClass) {
						refClass = js2me.findClass(refClass.superClass).prototype;
					}
					if (refClass.className == cmpClass.className) {
						stack.push(ref);
					} else {
						throw new javaRoot.$java.$lang.ClassCastException();
					}
				} else {
					if (refClass.interfaces.indexOf(cmpClass.className) != -1) {
						stack.push(ref);
					} else {
						throw new javaRoot.$java.$lang.ClassCastException();
					}
				}
			} else {
				throw new Error('checkcast');
			}
		} else {
			stack.push(ref);
		}
	}
	// dup
	executors[0x59] = function () {
		var tmp = stack.pop();
		stack.push(tmp);
		stack.push(tmp);
	};
	// dup_x1
	executors[0x5a] = function () {
		var a = stack.pop();
		var b = stack.pop();
		stack.push(a);
		stack.push(b);
		stack.push(a);
	};
	// dup_x2
	executors[0x5b] = function () {
		var b = stack.pop();
		var a = stack.pop();
		if (b.constructor != js2me.Long && b.constructor != js2me.Double) {
			var c = stack.pop();
			stack.push(c);
			stack.push(b);
			stack.push(a);
			stack.push(c);
		} else {
			stack.push(a);
			stack.push(b);
			stack.push(a);
		}
	};
	// dup2
	executors[0x5c] = function () {
		var a = stack.pop();
		if (a.constructor != js2me.Long && a.constructor != js2me.Double) {
			var b = stack.pop();
			stack.push(b);
			stack.push(a);
			stack.push(b);
			stack.push(a);
		} else {
			stack.push(a);
			stack.push(a);
		}
	};
	// fadd
	executors[0x62] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a + b);
	};
	// getfield
	executors[0xb4] = function () {
		var field = constantPool[stream.readUint16()];
		var obj = stack.pop();
		if (obj == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		stack.push(obj[field.name]);
	};
	// getstatic
	executors[0xb2] = function () {
		var field = constantPool[stream.readUint16()];
		var obj = js2me.findClass(field.className);
		js2me.initializeClass(obj);
		stack.push(obj.prototype[field.name]);
	};
	// goto
	executors[0xa7] = function () {
		var index = stream.readInt16();
		stream.skip(index - 3);
	};
	// i2l
	executors[0x85] = function () {
		var value = stack.pop();
		if (value >= 0) {
			stack.push(new js2me.Long(0, value));
		} else {
			stack.push(new js2me.Long(0xffffffff, value + 4294967296));
		}
	};
	// i2f
	executors[0x86] = function () {
	};
	// i2d
	executors[0x87] = function () {
	};
	// f2i
	executors[0x8b] = function () {
		var value = stack.pop();
		stack.push(Math.floor(value));
	};
	// l2i
	executors[0x88] = function () {
		var value = stack.pop();
		var int = value.lo;
		if (int >= 0x80000000) {
			int -= 0xffffffff;
		} 
		stack.push(int);
	};
	// i2b
	executors[0x91] = function () {
		var value = stack.pop();
		value = (value + 2147483648) % 256;
		if (value > 127) {
			stack.push(value - 256);
		} else {
			stack.push(value);
		}
	};
	// i2c
	executors[0x92] = function () {
		var value = stack.pop();
		stack.push(value);
	};
	// i2s
	executors[0x93] = function () {
		var value = stack.pop();
		value = (value + 2147483648) % 65536;
		if (value > 32767) {
			stack.push(value - 65536);
		} else {
			stack.push(value);
		}
	};
	// iadd
	executors[0x60] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a + b);
	};
	// iand
	executors[0x7e] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a & b);
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
	// ineg
	executors[0x74] = function () {
		var value = stack.pop();
		stack.push(-value);
	}
	// invokeinterface
	executors[0xb9] = function () {
		invoke(false, true, true);
	};
	// invokespecial
	executors[0xb7] = function () {
		invoke(false, false);
	};
	// invokestatic
	executors[0xb8] = function () {
		invoke(true, false);
	};
	// invokevirtual
	executors[0xb6] = function () {
		invoke(false, true);
	};
	// ior
	executors[0x80] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a & b);
	};
	// irem
	executors[0x70] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a % b);
	};
	// ireturn
	executors[0xac] = function () {
		var value = stack.pop();
		result = value;
		finish = true;
	};
	// ishl
	executors[0x78] = function () {
		var shift = stack.pop() % 32;
		var value = stack.pop();
		stack.push(value << shift);
	};
	// ishr
	executors[0x7a] = function () {
		var shift = stack.pop() % 32;
		var value = stack.pop();
		stack.push(value >> shift);
	};
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
	// iushr
	executors[0x7c] = function () {
		var shift = stack.pop() % 32;
		var value = stack.pop();
		if (value >= 0) {
			stack.push(value >> shift);
		} else {
			stack.push((value >> shift) + (2 << ~shift));
		}
	};
	// ixor
	executors[0x82] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a ^ b);
	};
	// land
	executors[0x61] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a.add(b));
	};
	// laload
	executors[0x2f] = function () {
		var index = stack.pop();
		var array = stack.pop();
		stack.push(array[index]);
	};
	// land
	executors[0x7f] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(new js2me.Long(a.hi & b.hi, a.lo & b.lo));
	};
	// lastore
	executors[0x50] = function () {
		var value = stack.pop();
		var index = stack.pop();
		var array = stack.pop();
		array[index] = value;
	};
	// lcmp
	executors[0x94] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a.cmp(b));
	};
	// lconst_0
	executors[0x09] = function () {
		stack.push(new js2me.Long(0, 0));
	};
	// lconst_1
	executors[0x0a] = function () {
		stack.push(new js2me.Long(0, 1));
	};
	// ldc
	executors[0x12] = function () {
		var value = constantPool[stream.readUint8()];
		stack.push(value);
	};
	// ldc_w
	executors[0x13] = function () {
		var value = constantPool[stream.readUint16()];
		stack.push(value);
	};
	// ldc2_w
	executors[0x14] = function () {
		var index = stream.readUint16();
		var value = constantPool[index];
		stack.push(value);
	};
	// ldiv
	executors[0x6d] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a.div(b).div);
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
	// lmul
	executors[0x69] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a.mul(b));
	};
	// lneg
	executors[0x75] = function () {
		var a = stack.pop();
		stack.push(a.neg());
	};
	// lookupswitch
	executors[0xab] = function () {
		while (stream.index % 4 != 0) {
			stream.readUint8();
		}
		var def = stream.readInt32();
		var count = stream.readInt32();
		var key = stack.pop();
		var offset = def;
		for (var i = 0; i < count; i++) {
			var match = stream.readInt32();
			var value = stream.readInt32();
			if (key == match) {
				offset = value;
			}
		}
		stream.seek(position + offset);
	}
	// lor
	executors[0x79] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(new js2me.Long(a.hi | b.hi, a.lo | b.lo));
	};
	// lrem
	executors[0x71] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a.div(b).rem);
	};
	// lreturn
	executors[0xad] = function () {
		var value = stack.pop();
		result = value;
		finish = true;
	};
	// lshl
	executors[0x79] = function () {
		var shift = stack.pop() % 64;
		var value = stack.pop();
		stack.push(value.shl(shift));
	};
	// lshr
	executors[0x7b] = function () {
		var shift = stack.pop() % 64;
		var value = stack.pop();
		stack.push(value.shr(shift));
	};
	// lstore
	executors[0x37] = function () {
		var index = stream.readUint8();
		locals[index] = stack.pop();
	};
	// lstore_0
	executors[0x3f] = function () {
		locals[0] = stack.pop();
	};
	// lstore_1
	executors[0x40] = function () {
		locals[1] = stack.pop();
	};
	// lstore_2
	executors[0x41] = function () {
		locals[2] = stack.pop();
	};
	// lstore_3
	executors[0x42] = function () {
		locals[3] = stack.pop();
	};
	// lsub
	executors[0x65] = function () {
		var b = stack.pop();
		var a = stack.pop();
		stack.push(a.sub(b));
	};
	// monitoenter
	executors[0xc2] = function () {
		var obj = stack.pop();
		if (obj.monitorCount == null) {
			obj.monitorCount = [];
		}
		if (obj.monitorQueue == null) {
			obj.monitorQueue = [];
		}
		if (obj.monitorCount.length == 0 || obj.monitorCount[0] == js2me.currentThread) {
			obj.monitorCount.push(js2me.currentThread)
		} else {
			obj.monitorQueue.push(js2me.currentThread)
			js2me.suspendThread = true;
			finish = true;
			stream.index -= 2;
			suspendCall(false);
		}
	};
	// monitoexit
	executors[0xc3] = function () {
		var obj = stack.pop();
		if (obj.monitorCount == null) {
			obj.monitorCount = [];
		}
		if (obj.monitorQueue == null) {
			obj.monitorQueue = [];
		}
		obj.monitorCount.pop();
		if (obj.monitorCount.length == 0) {
			var threadId = obj.monitorQueue.pop();
			if (threadId != null) {
				setTimeout(function () {
					js2me.restoreThread(threadId);
				}, 1);
			}
		}
	};
	// multinewarray
	executors[0xc5] = function () {
		var type = constantPool[stream.readUint16()].className;
		var dimensions = stream.readUint8();
		var counts = [];
		for (var i = 0; i < dimensions; i++) {
			counts[i] = stack.pop();
		}
		counts.reverse();
		function setLength(element, depth) {
			if (depth + 1 == dimensions) {
				for (var i = 0; i < counts[depth]; i++) {
					if (type.indexOf('L') != -1) {
						if (type.indexOf('J') != -1) {
							element[i] = new js2me.Long(0, 0);
						} else if (type.indexOf('D') != -1) {
							element[i] = new js2me.Double(0, 0);
						} else {
							element[i] = 0;
						}
					} else {
						element[i] = null;
					}
						
				}
				return;
			}
			for (var i = 0; i < counts[depth]; i++) {
				element[i] = [];
				setLength(element[i], depth + 1);
			}
		}
		var array = [];
		setLength(array, 0);
		stack.push(array);
	};
	// new
	executors[0xbb] = function () {
		var classInfo = constantPool[stream.readUint16()];
		//TODO: arguments
		var constructor = js2me.findClass(classInfo.className);
		if (!constructor) {
			console.error('Not implemented: ' + classInfo.className);
		}
		js2me.initializeClass(constructor);
		var instance = new constructor();
		stack.push(instance);
	};
	// newarray
	executors[0xbc] = function () {
		var type = stream.readUint8();
		var length = stack.pop();
		var array = new Array(length);
		for (var i = 0; i < length; i++) {
			if (type == 7) {
				array[i] = new js2me.Double(0);
			} else if (type == 11) {
				array[i] = new js2me.Long(0, 0);
			} else {
				array[i] = 0;
			}
		}
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
	// putstatic
	executors[0xb3] = function () {
		var field = constantPool[stream.readUint16()];
		var value = stack.pop();
		var obj = js2me.findClass(field.className).prototype;
		obj[field.name] = value;
	}
	// return
	executors[0xb1] = function () {
		finish = true;
	};
	// saload
	executors[0x35] = function () {
		var index = stack.pop();
		var array = stack.pop();
		if (array == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (index > array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		stack.push(array[index]);
	}
	// sastore
	executors[0x56] = function () {
		var value = stack.pop();
		var index = stack.pop();
		var array = stack.pop();
		array[index] = value;
	}
	// sipush
	executors[0x11] = function () {
		var value = stream.readUint16();
		stack.push(value);
	}
	// tableswitch
	executors[0xaa] = function () {
		while (stream.index % 4 != 0) {
			stream.readUint8();
		}
		var def = stream.readInt32();
		var low = stream.readInt32();
		var high = stream.readInt32();
		var count = high - low + 1;
		var table = [];
		for (var i = 0; i < count; i++) {
			table[low + i] = stream.readInt32();
		}
		var index = stack.pop();
		var offset = table[index] || def;
		stream.seek(position + offset);
	}
	while (!stream.isEnd() && !finish) {
		//console.log(stream.index);
		position = stream.index;
		var op = stream.readUint8();
		if (executors[op]) {
			try {
				executors[op]();
			} catch (exception) {
				tryCatchException(exception);
			}
		} else {
			throw new Error('Op ' + op.toString(16) + ' not supported');
		}
	}
	
	
	return result;
};
js2me.restoreThread = function (threadId) {
	if (js2me.kill) {
		return;
	}
	if (threadId == null) {
		threadId = js2me.currentThread;
	}
	if (js2me.restoreStack[threadId] == undefined) {
		return;
	}
	var restoreStack = js2me.restoreStack[threadId].pop();
	if (restoreStack) {
		js2me.currentThread = threadId;
		if (typeof restoreStack == 'function') {
			return restoreStack();
		} else {
			return js2me.execute.apply(js2me, restoreStack);
		}
	}
};
js2me.initializeClass = function(classObj) {
	if (classObj.prototype) {
		if (classObj.prototype.superClass) {
			var superClassObj = js2me.findClass(classObj.prototype.superClass);
			js2me.initializeClass(superClassObj);
		}
		if (classObj.prototype._clinit$$V) {
			//console.log(classObj.prototype.className);
			var clinit = classObj.prototype._clinit$$V;
			classObj.prototype._clinit$$V = null;
			clinit();
		}
	}
};
