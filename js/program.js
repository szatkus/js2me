"use strict";
js2me.generateProgram = function (data) {
	var generators = [];
	var stream = data.stream;
	var methodName = data.methodName;
	var constantPool = data.constantPool;
	var exceptions = data.exceptions;
	
	data.regenerate = false;
	
	if (data.content == null) {
		console.log('Generating method ' + methodName);
	} else {
		console.log('Regenerating method ' + methodName);
	}
	
	function checkOverflow(value, bits) {
		var base = 1;
		for (var i = 0; i < bits - 1; i++) {
			base *= 2;
		}
		while (value >= base) {
			value -= (base * 2);
		}
		while (value < -base) {
			value += (base * 2);
		}
		return value;
	};
	
	function generateArrayLoad() {
		return function (context) {
			var index = context.stack.pop();
			var array = context.stack.pop();
			if (array == null) {
				throw new javaRoot.$java.$lang.$NullPointerException();
			}
			if (index < 0 || index >= array.length) {
				throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException(index + "/" + array.length);
			}
			context.stack.push(array[index]);
		};
	}
	function generateArrayStore(isObject) {
		return function (context) {
			var value = context.stack.pop();
			var index = context.stack.pop();
			var array = context.stack.pop();
			if (array == null) {
				throw new javaRoot.$java.$lang.$NullPointerException();
			}
			if (index < 0 || index >= array.length) {
				throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException(index + "/" + array.length);
			}
			if (isObject && value && value.constructor !== Array && !value.isImplement(array.className)) {
				throw new javaRoot.$java.$lang.$ArrayStoreException();
			}
			array[index] = value;
		};
	}
	function generateReturn() {
		return function (context) {
			var functionResult = context.stack.pop();
			context.result = functionResult;
			context.finish = true;
			return functionResult;
		};
	}
	// aaload
	generators[0x32] = function (context) {
		return generateArrayLoad();
	}
	// aastore
	generators[0x53] = function () {
		return generateArrayStore(true);
	}
	// aconst_null
	generators[0x01] = function (context) {
		context.stack.push(null);
	}
	function generateLoad(index) {
		return function (context) {
			context.stack.push(context.locals[index]);
		};
	}
	// aload
	generators[0x19] = function () {
		var index = stream.readUint8();
		return generateLoad(index);
	}
	// aload_0
	generators[0x2a] = function () {
		return generateLoad(0);
	}
	// aload_1
	generators[0x2b] = function () {
		return generateLoad(1);
	}
	// aload_2
	generators[0x2c] = function () {
		return generateLoad(2);
	}
	// aload_3
	generators[0x2d] = function () {
		return generateLoad(3);
	};
	// anewarray
	generators[0xbd] = function () {
		var type = constantPool[stream.readUint16()];
		return function (context) {
			var length = context.stack.pop();
			if (length < 0) {
				throw new javaRoot.$java.$lang.$NegativeArraySizeException();
			}
			var array = new Array(length);
			array.className = type.className;
			for (var i = 0; i < array.length; i++) array[i] = null;
			context.stack.push(array);
		}
	};
	// areturn
	generators[0xb0] = generateReturn;
	// arraylength
	generators[0xbe] = function () {
		return function (context) {
			var array = context.stack.pop();
			if (array == null) {
				throw new javaRoot.$java.$lang.$NullPointerException();
			}
			context.stack.push(array.length);
		};
	};
	// astore
	generators[0x3a] = function () {
		var index = stream.readUint8();
		return generateStore(index);
	};
	// astore_0
	generators[0x4b] = function () {
		return generateStore(0);
	};
	// astore_1
	generators[0x4c] = function () {
		return generateStore(1);
	};
	// astore_2
	generators[0x4d] = function () {
		return generateStore(2);
	};
	// astore_3
	generators[0x4e] = function () {
		return generateStore(3);
	};
	// athrow
	generators[0xbf] = function (context) {
		throw context.stack.pop();
	};
	// baload
	generators[0x33] = function (context) {
		return generateArrayLoad();
	};
	// bastore
	generators[0x54] = function (context) {
		return generateArrayStore();
	};
	// bipush
	generators[0x10] = function () {
		var value = stream.readInt8();
		return function (context) {
			context.stack.push(value);
		};
	};
	// caload
	generators[0x34] = function (context) {
		return generateArrayLoad();
	};
	// castore
	generators[0x55] = function (context) {
		return generateArrayStore();
	};
	// checkcast
	generators[0xc0] = function () {
		var type = constantPool[stream.readUint16()];
		return function (context) {
			var ref = context.stack.pop();
			if (ref != null) {
				if (ref.constructor == Array) {
					context.stack.push(ref);
					return;
				}
				var refClass = js2me.findClass(ref.className).prototype;
				var cmpClass = js2me.findClass(type.className).prototype;
				if (refClass.isImplement(cmpClass.className)) {
					context.stack.push(ref);
				} else {
					throw new javaRoot.$java.$lang.$ClassCastException();
				}
			} else {
				context.stack.push(ref);
			}
		}
	};
	// d2i
	generators[0x8e] = function (context) {
		var value = context.stack.pop();
		if (isNaN(value)) {
			context.stack.push(0);
			return;
		}
		if (value < -0x80000000) {
			context.stack.push(-0x80000000);
			return;
		}
		if (value > 0x7fffffff) {
			context.stack.push(0x7fffffff);
			return;
		}
		context.stack.push(value);
	};
	// d2l
	generators[0x8f] = function (context) {
		var value = context.stack.pop();
		if (isNaN(value)) {
			context.stack.push(new js2me.Long(0, 0));
			return;
		}
		if (value < -0x8000000000000000) {
			context.stack.push(new js2me.Long(0x80000000, 0));
			return;
		}
		if (value >= 0x8000000000000000) {
			context.stack.push(new js2me.Long(0x7fffffff, 0xffffffff));
			return;
		}
		if (value < 0) {
			value = Math.abs(value);
			var result = new js2me.Long(Math.floor(value / 0x100000000), Math.floor(value % 0x100000000));
			context.stack.push(result.neg());
		} else {
			value = Math.abs(value);
			var result = new js2me.Long(Math.floor(value / 0x100000000), Math.floor(value % 0x100000000));
			context.stack.push(result);
		}
	};
	// dadd
	generators[0x63] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({double: a.double + b.double});
	};
	// daload
	generators[0x31] = function () {
		return generateArrayLoad();
	};
	// dastore
	generators[0x52] = function () {
		return generateArrayStore();
	};
	function generateCompareFloats(isDouble, onNaN) {
		return function (context) {
			var b = context.stack.pop();
			if (isDouble) {
				b = b.double;
			}
			var a = context.stack.pop();
			if (isDouble) {
				a = a.double;
			}
			var result;
			if (isNaN(a) || isNaN(b)) {
				result = onNaN;
			}
			if (a > b) {
				result = 1;
			}
			if (a === b) {
				result = 0;
			}
			if (a < b) {
				result = -1;
			}
			context.stack.push(result);
		};
	}
	// dcmpg
	generators[0x98] = function (context) {
		return generateCompareFloats(true, 1);
	};
	// dcmpl
	generators[0x97] = function (context) {
		return generateCompareFloats(true, -1);
	};
	// dconst_0
	generators[0x0e] = function (context) {
		context.stack.push(js2me.dconst0);
	};
	// dconst_1
	generators[0x0f] =  function (context) {
		context.stack.push(js2me.dconst1);
	};
	// ddiv
	generators[0x6f] = function () {
		return function (context) {
			var b = context.stack.pop();
			var a = context.stack.pop();
			context.stack.push({double: a.double / b.double});
		}
	};
	// dload
	generators[0x18] = function () {
		var index = stream.readUint8();
		return generateLoad(index);
	}
	// dload_0
	generators[0x26] = function () {
		return generateLoad(0);
	}
	// dload_1
	generators[0x27] = function () {
		return generateLoad(1);
	}
	// dload_2
	generators[0x28] = function () {
		return generateLoad(2);
	}
	// dload_3
	generators[0x29] = function () {
		return generateLoad(3);
	};
	// dmul
	generators[0x6b] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({double: a.double * b.double});
	};
	// dneg
	generators[0x77] = function (context) {
		var value = context.stack.pop();
		context.stack.push({double: -value.double});
	};
	// drem
	generators[0x73] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({double: a.double % b.double});
	};
	// dreturn
	generators[0xaf] = generateReturn;
	// dstore
	generators[0x39] = function () {
		var index = stream.readUint8();
		return generateStore(index);
	};
	// dstore_0
	generators[0x47] = function () {
		return generateStore(0);
	};
	// dstore_1
	generators[0x48] = function () {
		return generateStore(1);
	};
	// dstore_2
	generators[0x49] = function () {
		return generateStore(2);
	};
	// dstore_3
	generators[0x4a] = function () {
		return generateStore(3);
	};
	// dsub
	generators[0x67] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({double: a.double - b.double});
	};
	// dup
	generators[0x59] = function (context) {
		var tmp = context.stack.pop();
		context.stack.push(tmp);
		context.stack.push(tmp);
	};
	// dup_x1
	generators[0x5a] = function (context) {
		var a = context.stack.pop();
		var b = context.stack.pop();
		context.stack.push(a);
		context.stack.push(b);
		context.stack.push(a);
	};
	// dup_x2
	generators[0x5b] = function (context) {
		var a = context.stack.pop();
		var b = context.stack.pop();
		var c = context.stack.pop();
		if (a.hi == null && a.double == null) {
			var stack0 = a;
			var stack1 = c;
			var stack2 = b;
			var stack3 = a;
		} else {
			var stack0 = c;
			var stack1 = a;
			var stack2 = b;
			var stack3 = a;
		}
		context.stack.push(stack0);
		context.stack.push(stack1);
		context.stack.push(stack2);
		context.stack.push(stack3);
	};
	// dup2
	generators[0x5c] = function (context) {
		var a = context.stack.pop();
		if (a.hi == null && a.double == null) {
			var b = context.stack.pop();
			context.stack.push(b);
			context.stack.push(a);
			context.stack.push(b);
			context.stack.push(a);
		} else {
			context.stack.push(a);
			context.stack.push(a);
		}
	};
	// dup2_x1
	generators[0x5d] = function (context) {
		var a = context.stack.pop();
		var b = context.stack.pop();
		if (a.hi == null && a.double == null) {
			var c = context.stack.pop();
			context.stack.push(b);
			context.stack.push(a);
			context.stack.push(c);
			context.stack.push(b);
			context.stack.push(a);
		} else {
			context.stack.push(a);
			context.stack.push(b);
			context.stack.push(a);
		}
	};
	// dup2_x2
	// who the hell came up with this op!?
	generators[0x5e] = function (context) {
		var a = context.stack.pop();
		var b = context.stack.pop();
		if (a.hi == null && a.double == null) {
			if (b.hi == null && b.double == null) {
				context.stack.push(a);
				context.stack.push(b);
				context.stack.push(a);
			} else {
				var c = context.stack.pop();
				context.stack.push(a);
				context.stack.push(c);
				context.stack.push(b);
				context.stack.push(a);
			}
		} else {
			var c = context.stack.pop();
			if (c.hi == null && c.double == null) {
				context.stack.push(b);
				context.stack.push(a);
				context.stack.push(c);
				context.stack.push(b);
				context.stack.push(a);
			} else {
				var d = context.stack.pop();
				context.stack.push(b);
				context.stack.push(a);
				context.stack.push(d);
				context.stack.push(c);
				context.stack.push(b);
				context.stack.push(a);
			}
		}
	};
	// fadd
	generators[0x62] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a + b);
	};
	// faload
	generators[0x30] = function (context) {
		return generateArrayLoad();
	};
	// fastore
	generators[0x51] = function (context) {
		return generateArrayStore();
	};
	// fcmpg
	generators[0x96] = function (context) {
		return generateCompareFloats(false, 1);
	};
	// fcmpl
	generators[0x95] = function (context) {
		return generateCompareFloats(false, -1);
	};
	// fconst_0
	generators[0x0b] = function (context) {
		context.stack.push(0);
	};
	// fconst_1
	generators[0x0c] = function (context) {
		context.stack.push(1);
	};
	// fconst_2
	generators[0x0d] = function (context) {
		context.stack.push(2);
	};
	// fdiv
	generators[0x6e] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a / b);
	};
	// fload
	generators[0x17] = function () {
		var index = stream.readUint8();
		return generateLoad(index);
	}
	// fload_0
	generators[0x22] = function () {
		return generateLoad(0);
	}
	// fload_1
	generators[0x23] = function () {
		return generateLoad(1);
	}
	// fload_2
	generators[0x24] = function () {
		return generateLoad(2);
	}
	// fload_3
	generators[0x25] = function () {
		return generateLoad(3);
	};
	// fmul
	generators[0x6a] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a * b);
	};
	// fneg
	generators[0x76] = function (context) {
		var value = context.stack.pop();
		context.stack.push(-value);
	};
	// frem
	generators[0x72] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a % b);
	};
	// freturn
	generators[0xae] = generateReturn;
	// fstore
	generators[0x38] = function () {
		var index = stream.readUint8();
		return generateStore(index);
	};
	// fstore_0
	generators[0x43] = function () {
		return generateStore(0);
	};
	// fstore_1
	generators[0x44] = function () {
		return generateStore(1);
	};
	// fstore_2
	generators[0x45] = function () {
		return generateStore(2);
	};
	// fstore_3
	generators[0x46] = function () {
		return generateStore(3);
	};
	// fsub
	generators[0x66] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a - b);
	};
	// getfield
	generators[0xb4] = function () {
		var field = constantPool[stream.readUint16()];
		var classObj = js2me.findClass(field.className);
		var fieldId = classObj.prototype[field.name];
		return function (context) {
			var obj = context.stack.pop();
			if (obj == null) {
				throw new javaRoot.$java.$lang.$NullPointerException();
			}
			context.stack.push(obj['$' + fieldId]);
		};
	};
	// getstatic
	generators[0xb2] = function () {
		var field = constantPool[stream.readUint16()];
		var classObj = js2me.findClass(field.className);
		var fieldId = classObj.prototype[field.name];
		return function (context) {
			var obj = js2me.findClass(field.className);
			js2me.initializeClass(obj, function () {
				context.stack.push(obj.prototype['$' + fieldId]);
			});
		};
	};
	function generateGoto(func) {
		return function () {
			var index = stream.index + stream.readInt16() - 1;
			return function (context) {
				if (func(context)) {
					context.position = positionMapping[index];
				}
			}
		}
	}/*
	function goto(context, index) {
		context.position = positionMapping[index];
		var now = +new Date;
		if (!(now - js2me.lastStop < 1000)) {
			js2me.lastStop = now;
			context.saveResult = false;
			var threadID = js2me.currentThread;
			js2me.suspendThread = true;
			setTimeout(function () {
				js2me.restoreThread(threadID);
			}, 1);
		}
	}*/
	// goto
	generators[0xa7] = generateGoto(function () {return true});
	// i2l
	generators[0x85] = function (context) {
		var value = context.stack.pop();
		var result;
		if (value >= 0) {
			result = {hi: 0, lo: value};
		} else {
			result = {hi: 0xffffffff, lo: value + 4294967296};
		}
		context.stack.push(result);
	};
	// i2f
	generators[0x86] = function () {};
	// i2d
	generators[0x87] = function (context) {
		var value = context.stack.pop();
		context.stack.push({double: value});
	};
	// f2i
	generators[0x8b] = function (context) {
		var value = context.stack.pop();
		context.stack.push(~~value);
	};
	// f2d
	generators[0x8d] = function (context) {
		var value = context.stack.pop();
		context.stack.push({double: value});
	};
	// i2b
	generators[0x91] = function (context) {
		var value = context.stack.pop();
		value = (value + 2147483648) % 256;
		var result;
		if (value > 127) {
			result = value - 256;
		} else {
			result = value;
		}
		context.stack.push(result);
	};
	// i2c
	generators[0x92] = function (context) {
		var value = context.stack.pop();
		context.stack.push(value);
	};
	// i2s
	generators[0x93] = function (context) {
		var value = context.stack.pop();
		value = (value + 2147483648) % 65536;
		var result;
		if (value > 32767) {
			result = value - 65536;
		} else {
			result = value;
		}
		context.stack.push(result)
	};
	// iadd
	generators[0x60] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		var value = a + b;
		value = checkOverflow(value, 32);
		context.stack.push(value);
	};
	// iand
	generators[0x7e] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a & b);
	};
	// iaload
	generators[0x2e] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a[b]);
	};
	// iastore
	generators[0x4f] = function (context) {
		var value = context.stack.pop();
		var index = context.stack.pop();
		var array = context.stack.pop();
		array[index] = value;
	};
	function generateConst(constant) {
		return function (context) {
			context.stack.push(constant);
		};
	}
	// iconst_m1
	generators[0x02] = generateConst(-1);
	// iconst_0
	generators[0x03] = generateConst(0);
	// iconst_1
	generators[0x04] = generateConst(1);
	// iconst_2
	generators[0x05] = generateConst(2);
	// iconst_3
	generators[0x06] = generateConst(3);
	// iconst_4
	generators[0x07] = generateConst(4);
	// iconst_5
	generators[0x08] = generateConst(5);
	// idiv
	generators[0x6c] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		if (b === 0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");
		var value = ~~(a / b);
		value = checkOverflow(value, 32);
		context.stack.push(value);
	};
	// if_acmpeq
	generators[0xa5] = generateGoto(function (context) {
		return context.stack.pop() === context.stack.pop();
	});
	// if_acmpne
	generators[0xa6] = generateGoto(function (context) {
		return context.stack.pop() !== context.stack.pop();
	});
	// if_icmpeq
	generators[0x9f] = generateGoto(function (context) {
		return context.stack.pop() === context.stack.pop();
	});
	// if_icmpne
	generators[0xa0] = generators[0xc7] = generateGoto(function (context) {
		return context.stack.pop() !== context.stack.pop();
	});
	// if_icmplt
	generators[0xa1] = generateGoto(function (context) {
		return context.stack.pop() > context.stack.pop();
	});
	// if_icmpge
	generators[0xa2] = generateGoto(function (context) {
		return context.stack.pop() <= context.stack.pop();
	});
	// if_icmpgt
	generators[0xa3] = generateGoto(function (context) {
		return context.stack.pop() < context.stack.pop();
	});
	// if_icmple
	generators[0xa4] = generateGoto(function (context) {
		return context.stack.pop() >= context.stack.pop();
	});
	// ifeq
	generators[0x99] = generateGoto(function (context) {
		return context.stack.pop() === 0;
	});
	// ifne
	generators[0x9a] = generators[0xc7] = generateGoto(function (context) {
		return context.stack.pop() !== 0;
	});
	// iflt
	generators[0x9b] = generateGoto(function (context) {
		return context.stack.pop() < 0;
	});
	// ifge
	generators[0x9c] = generateGoto(function (context) {
		return context.stack.pop() >= 0;
	});
	// ifgt
	generators[0x9d] = generateGoto(function (context) {
		return context.stack.pop() > 0;
	});
	// ifle
	generators[0x9e] = generateGoto(function (context) {
		return context.stack.pop() <= 0;
	});
	// ifnonnull
	generators[0xc7] = generateGoto(function (context) {
		return context.stack.pop() != null;
	});
	// ifnull
	generators[0xc6] = generateGoto(function (context) {
		return context.stack.pop() == null;
	});
	// iinc
	generators[0x84] = function () {
		var index = stream.readUint8();
		var inc = stream.readInt8();
		return function (context) {
			var value = context.locals[index] + inc;
			value = checkOverflow(value, 32);
			context.locals[index] = value;
		};
	};
	// iload
	generators[0x15] = function () {
		var index = stream.readUint8();
		return generateLoad(index);
	};
	// iload_0
	generators[0x1a] = function () {
		return generateLoad(0);
	};
	// iload_1
	generators[0x1b] = function () {
		return generateLoad(1);
	}
	// iload_2
	generators[0x1c] = function () {
		return generateLoad(2);
	}
	// iload_3
	generators[0x1d] = function () {
		return generateLoad(3);
	}
	// imul
	generators[0x68] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		var value = a * b;
		value = checkOverflow(value, 32);
		context.stack.push(value);
	};
	// ineg
	generators[0x74] = function (context) {
		var value = -context.stack.pop();
		value = checkOverflow(value, 32);
		context.stack.push(value);
	};
	// instanceof
	generators[0xc1] = function () {
		var type = constantPool[stream.readUint16()];
		return function (context) {
			var ref = context.stack.pop();
			
			if (ref != null) {
				if (ref.constructor == Array) {
					context.stack.push(ref);
					return;
				}
				var refClass = js2me.findClass(ref.className).prototype;
				var cmpClass = js2me.findClass(type.className).prototype;
				if (refClass.isImplement(cmpClass.className)) {
					context.stack.push(1);
				} else {
					context.stack.push(0);
				}
			} else {
				context.stack.push(0);
			}
		};
	}
	function generateInvoke(isStatic, isVirtual, isGarbage) {
		try {
			var methodInfo = constantPool[stream.readUint16()];
			if (isGarbage) {
				stream.readUint16();
			}
			var argumentsCount = methodInfo.type.argumentsTypes.length;
			return function (context) {
				var args = [];
				for (var i = argumentsCount - 1; i >= 0; i--) {
					args[i] = context.stack.pop();
				}
			
				if (!isStatic) {
					var obj = context.stack.pop();
					if (obj == null) {
						throw new javaRoot.$java.$lang.$NullPointerException();
					}
					if (obj.constructor == Array) {
						obj = new javaRoot.$java.$lang.$ArrayObject(obj);
					}
				}
			
				context.saveResult = (methodInfo.type.returnType != 'V');
				var result;
				if (isVirtual) {
					result = obj[methodInfo.name].apply(obj, args);
				} else {
					var classObj = js2me.findClass(methodInfo.className);
					if (isStatic) {
						result = classObj.prototype[methodInfo.name].apply(classObj.prototype, args);
					} else {
						result = classObj.prototype[methodInfo.name].apply(obj, args);
					}
				}
				
				if (context.saveResult && !js2me.suspendThread) {
					context.stack.push(result);
				}
			};
		}  catch (e) {
			console.error(e.message);
		}
	}
	// invokeinterface
	generators[0xb9] = function () {
		return generateInvoke(false, true, true);
	};
	// invokespecial
	generators[0xb7] = function () {
		return generateInvoke(false, false);
	};
	// invokestatic
	generators[0xb8] = function () {
		return generateInvoke(true, false);
	};
	// invokevirtual
	generators[0xb6] = function () {
		return generateInvoke(false, true);
	};
	// ior
	generators[0x80] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a | b);
	};
	// irem
	generators[0x70] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		if (b === 0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");
		context.stack.push(a % b);
	};
	// ireturn
	generators[0xac] = generateReturn;
	// ishl
	generators[0x78] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a << (b % 32));
	};
	// ishr
	generators[0x7a] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a >> (b % 32));
	};
	function generateStore(index) {
		return function (context) {
			context.locals[index] = context.stack.pop();
		};
	}
	// istore
	generators[0x36] = function () {
		var index = stream.readUint8();
		return generateStore(index);
	}
	// istore_0
	generators[0x3b] = function () {
		return generateStore(0);
	}
	// istore_1
	generators[0x3c] = function () {
		return generateStore(1);
	};
	// istore_2
	generators[0x3d] = function () {
		return generateStore(2);
	};
	// istore_3
	generators[0x3e] = function () {
		return generateStore(3);
	};
	// isub
	generators[0x64] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a - b);
	};
	// iushr
	generators[0x7c] = function (context) {
		var shift = context.stack.pop() % 32;
		var value = context.stack.pop();
		var result;
		if (value >= 0) {
			result = value >> shift;
		} else {
			result = (value >> shift) + (2 << ~shift);
		}
		context.stack.push(result);
	};
	// ixor
	generators[0x82] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a ^ b);
	};
	// l2d
	generators[0x8a] = function (context) {
		var value = context.stack.pop();
		var double = value.hi;
		if (double >= 0x80000000) {
			double -= 0x100000000;
		}
		double *= 0x100000000;
		double += value.lo;
		context.stack.push({double: double});
	};
	// l2i
	generators[0x88] = function (context) {
		var value = context.stack.pop();
		var int = value.lo;
		if (int >= 0x80000000) {
			int -= 0x100000000;
		}
		context.stack.push(int);
	};
	// ladd
	generators[0x61] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(js2me.ladd(a, b));
	};
	// laload
	generators[0x2f] = function (context) {
		var index = context.stack.pop();
		var array = context.stack.pop();
		context.stack.push(array[index]);
	};
	// land
	generators[0x7f] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({hi: a.hi & b.hi, lo: a.lo & b.lo});
	};
	// lastore
	generators[0x50] = function (context) {
		var value = context.stack.pop();
		var index = context.stack.pop();
		var array = context.stack.pop();
		array[index] = value;
	};
	// lcmp
	generators[0x94] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(js2me.lcmp(a, b));
	};
	// lconst_0
	generators[0x09] = function (context) {
		context.stack.push({hi: 0, lo: 0});
	};
	// lconst_1
	generators[0x0a] = function (context) {
		context.stack.push({hi: 0, lo: 1});
	};
	// ldc
	generators[0x12] = function () {
		var index = stream.readUint8();
		return function (context) {
			context.stack.push(context.constantPool[index]);
		};
	};
	// ldc_w, ldc2_w
	generators[0x14] = generators[0x13] = function () {
		var index = stream.readUint16();
		return function (context) {
			context.stack.push(context.constantPool[index]);
		};
	};
	// ldiv
	generators[0x6d] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		if (b.hi === 0 && b.lo ===0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");
		context.stack.push(js2me.ldiv(a, b).div);
	};
	// lload
	generators[0x16] = function () {
		var index = stream.readUint8();
		return generateLoad(index);
	};
	// lload_0
	generators[0x1e] = function () {
		return generateLoad(0);
	};
	// lload_1
	generators[0x1f] = function () {
		return generateLoad(1);
	};
	// lload_2
	generators[0x20] = function () {
		return generateLoad(2);
	};
	// lload_3
	generators[0x21] = function () {
		return generateLoad(3);
	};
	// lmul
	generators[0x69] = function (context)  {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(js2me.lmul(a, b));
	};
	// lneg
	generators[0x75] = function (context) {
		var a = context.stack.pop();
		context.stack.push(js2me.lneg(a));
	};
	// lookupswitch
	generators[0xab] = function () {
		var start = stream.index - 1;
		while (stream.index % 4 != 0) {
			stream.readUint8();
		}
		var def = start + stream.readInt32();
		jumpTo[def]++;
		var count = stream.readInt32();
		var table = [];
		for (var i = 0; i < count; i++) {
			var match = stream.readInt32();
			var value = start + stream.readInt32();
			table[match] = value;
			jumpTo[value]++;
		}
		
		return function (context) {
			var index = context.stack.pop();
			var position = table[index];
			if (position === undefined) {
				position = def;
			}
			context.position = positionMapping[position];
		};
	}
	// lor
	generators[0x81] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({hi: a.hi | b.hi, lo: a.lo | b.lo});
	};
	// lrem
	generators[0x71] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		if (b.hi === 0 && b.lo ===0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");
		context.stack.push(js2me.ldiv(a, b).rem);
	};
	// lreturn
	generators[0xad] = generateReturn;
	// lshl
	generators[0x79] = function (context) {
		var shift = context.stack.pop() % 64;
		var value = context.stack.pop();
		context.stack.push(js2me.lshl(value, shift));
	};
	// lshr
	generators[0x7b] = function (context) {
		var shift = context.stack.pop() % 64;
		var value = context.stack.pop();
		var sign = value.hi >= 2147483648;
		if (sign) {
			value = js2me.lneg(value);
		}
		var result = js2me.lshr(value, shift);
		if (sign) {
			result = js2me.lneg(result);
		}
		context.stack.push(result);
	};
	// lstore
	generators[0x37] = function () {
		var index = stream.readUint8();
		return generateStore(index);
	};
	// lstore_0
	generators[0x3f] = generateStore(0);
	// lstore_1
	generators[0x40] = generateStore(1);
	// lstore_2
	generators[0x41] = generateStore(2);
	// lstore_3
	generators[0x42] = generateStore(3);
	// lsub
	generators[0x65] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(js2me.lsub(a, b));
	};/*
	// lushr
	generators[0x7d] = function (context) {
		var shift = context.stack.pop() % 64;
		var value = context.stack.pop();
		var result = value.shr(shift);
		context.stack.push(result);
	};
	// monitoenter
	generators[0xc2] = function () {
		isSubfunctionSafe = false;
		return function (context) {
			var obj = context.stack.pop();
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
				context.finish = true;
				context.saveResult = false;
			}
		};
	};
	// monitoexit
	generators[0xc3] = function (context) {
		var obj = context.stack.pop();
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
	};*/
	// multinewarray
	generators[0xc5] = function () {
		var type = constantPool[stream.readUint16()].className;
		var dimensions = stream.readUint8();
		return function (context) {
			var counts = [];
			var className = type;
			for (var i = 0; i < dimensions; i++) {
				counts[i] = context.stack.pop();
			}
			className = className.substr(1);
			counts.reverse();
			function setLength(element, depth, className) {
				className = className.substr(1);
				if (depth + 1 == dimensions) {
					for (var i = 0; i < counts[depth]; i++) {
						if (type.indexOf('L') == -1) {
							if (type.indexOf('J') != -1) {
								element[i] = {hi: 0, lo: 0};
							} else if (type.indexOf('D') != -1) {
								element[i] = js2me.dconst0;
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
					element[i].className = className;
					setLength(element[i], depth + 1, className);
				}
			}
			var array = [];
			array.className = className;
			setLength(array, 0, className);
			context.stack.push(array);
		};
	};
	// new
	generators[0xbb] = function () {
		var classInfo = constantPool[stream.readUint16()];
		var constructor = js2me.findClass(classInfo.className);
		// probably useless...
		require.push(classInfo.className);
		return function (context) {
			var constructor = js2me.findClass(classInfo.className);
			
			if (!constructor) {
				console.error('Not implemented: ' + classInfo.className);
			}
			js2me.initializeClass(constructor, function () {});
			var instance = new constructor();
			context.stack.push(instance);
		};
	};
	// newarray
	generators[0xbc] = function () {
		var type = stream.readUint8();
		var def;
		if (type == 7) {
			def = js2me.dconst0;
		} else if (type == 11) {
			def = {hi: 0, lo: 0};
		} else {
			def = 0;
		}
		return function (context) {
			var length = context.stack.pop();
			var array = new Array(length);
			for (var i = 0; i < length; i++) {
				array[i] = def;
			}
			context.stack.push(array);
		};
	}
	// noop
	generators[0x00] = function () {};
	// pop
	generators[0x57] = function (context) {
		context.stack.pop();
	};
	// pop2
	generators[0x58] = function (context) {
		context.stack.pop();
		context.stack.pop();
	};
	// putfield
	generators[0xb5] = function () {
		var field = constantPool[stream.readUint16()];
		var classObj = js2me.findClass(field.className);
		var fieldId = classObj.prototype[field.name];
		return function (context) {
			var value = context.stack.pop();
			var obj = context.stack.pop();
			obj['$' + fieldId] = value;
		};
	};
	// putstatic
	generators[0xb3] = function () {
		var field = constantPool[stream.readUint16()];
		var classObj = js2me.findClass(field.className);
		var fieldId = classObj.prototype[field.name];
		return function (context) {
			var value = context.stack.pop();
			var obj = js2me.findClass(field.className);
			
			js2me.initializeClass(obj, function () {
				obj.prototype['$' + fieldId] = value;
			});
		};
	};
	// return
	generators[0xb1] = function (context) {
		context.finish = true;
	};
	// saload
	generators[0x35] = function (context) {
		var index = context.stack.pop();
		var array = context.stack.pop();
		if (array == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (index > array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException();
		}
		context.stack.push(array[index]);
	};
	// sastore
	generators[0x56] = function (context) {
		var value = context.stack.pop();
		var index = context.stack.pop();
		var array = context.stack.pop();
		array[index] = value;
	};
	// sipush
	generators[0x11] = function () {
		var value = stream.readInt16();
		return function (context) {
			context.stack.push(value);
		};
	};
	// swap
	generators[0x5f] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a);
		context.stack.push(b);
	}
	// tableswitch
	generators[0xaa] = function () {
		var start = stream.index - 1;
		while (stream.index % 4 != 0) {
			stream.readUint8();
		}
		var def = start + stream.readInt32();
		jumpTo[def]++;
		var low = stream.readInt32();
		var high = stream.readInt32();
		var count = high - low + 1;
		var table = [];
		for (var i = 0; i < count; i++) {
			table[low + i] = start + stream.readInt32();
			jumpTo[table[low + i]]++;
		}
		return function (context) {
			var index = context.stack.pop();
			var position = table[index]
			if (position === undefined) {
				position = def;
			}
			context.position = positionMapping[position];
		};
	}/*
	// wide
	generators[0xc4] = function (context) {
		var op = stream.readUint8();
		var index = stream.readUint16();
		if (op >= 21 && op <= 25) {
			return new Function('context', 'context.push(context.locals[' + index + ']);'); 
		}
		if (op >= 54 && op <= 58) {
			return new Function('context', 'context.locals[' + index + '] = context.pop();'); 
		}
		if (op == 0x84) {
			var value = stream.readInt16();
			return new Function('context', 'context.locals[' + index + '] += ' + value + ';'); 
		}
		throw new Error('wide: unkown op ' + index);
	}*/
	var program = [];
	var calls = [];
	var positionMapping = new Array(stream.getRemaining());
	var reversedMapping = [];
	var require = [];
	var jumpTo = new Int32Array(stream.getRemaining());
	var jumpFrom = new Int32Array(stream.getRemaining());
	var jumpTarget = [];
	var isSafe = true;
	var currentOpIndex = 0;
	
	for (var i = 0; i < exceptions.length; i++) {
		jumpTo[exceptions[i].startPc]++;
		jumpFrom[exceptions[i].endPc]++;
		jumpTo[exceptions[i].handler]++;
	}
	
	var isSubfunctionSafe;
	var onlyCode = true;
	while (!stream.isEnd()) {
		reversedMapping[program.length] = stream.index;
		currentOpIndex = stream.index;
		var op = stream.readUint8();
		if (!js2me.usedByteCodes[op]) {
			js2me.usedByteCodes[op] = 0;
		}
		js2me.usedByteCodes[op]++;
		if (generators[op]) {
			isSubfunctionSafe = true;
			var func = null;
			try {
				func = generators[op]();
			} catch (e) {
				var wannaBreakpoint = true;
			}
			if (func != null) {
				program.push(func);
			} else {
				program.push(generators[op]);
			}
			isSafe = isSafe && isSubfunctionSafe;
		} else {
			throw new Error('Op ' + op.toString(16) + ' not supported');
		}
	}
	
	for (var i = 0; i < reversedMapping.length; i++) {
		positionMapping[reversedMapping[i]] = i;
	}
	for (var i = 1; i < positionMapping.length; i++) {
		if (positionMapping[i] == null) {
			positionMapping[i] = positionMapping[i - 1];
		}
	}
	
	/*for (var i = 0; i < program.length; i++) {
		console.log(reversedMapping[i] + ': ' + program[i].toString());
		console.error('************');
	}*/
	stream.reset();
	data.content =  program;
	data.mapping = positionMapping;
	data.require = require;
	data.isSafe = isSafe;
	data.parent.prototype[data.name].data = data;
	
};

// what I have done...
