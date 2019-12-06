"use strict";
(function () {
	var generators = [];
	var executors = [];
	/*function checkOverflow(value, bits) {
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
	};*/
	
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
	function doReturn(context) {
		var functionResult = context.stack.pop();
		context.result = functionResult;
		context.finish = true;
		return functionResult;
	}
	function generateLoad(index) {
		return function (context) {
			context.stack.push(context.locals[index]);
		};
	}
	// aaload
	executors[0x32] = function (context) {
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
	// aastore
	executors[0x53] = function (context) {
		var value = context.stack.pop();
		var index = context.stack.pop();
		var array = context.stack.pop();
		if (array == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (index < 0 || index >= array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException(index + "/" + array.length);
		}
		if (value && value.constructor !== Array && !value.isImplement(array.className)) {
			throw new javaRoot.$java.$lang.$ArrayStoreException();
		}
		array[index] = value;
	};
	// aconst_null
	executors[0x01] = function (context) {
		context.stack.push(null);
	}
	// aload
	generators[0x19] = function (stream) {
		return stream.readUint8();
	};
	executors[0x19] = function (context) {
		context.stack.push(context.locals[context.parameters[context.position - 1]]);
	};
	// aload_0
	executors[0x2a] = function (context) {
		context.stack.push(context.locals[0]);
	}
	// aload_1
	executors[0x2b] = function (context) {
		context.stack.push(context.locals[1]);
	}
	// aload_2
	executors[0x2c] = generateLoad(2);
	// aload_3
	executors[0x2d] = generateLoad(3);
	// anewarray
	generators[0xbd] = function (stream, data) {
		return {
			className: data.constantPool[stream.readUint16()].className
		};
	};
	executors[0xbd] = function (context) {
		var length = context.stack.pop();
		if (length < 0) {
			throw new javaRoot.$java.$lang.$NegativeArraySizeException();
		}
		var array = new Array(length);
		array.className = context.parameters[context.position - 1].className;
		for (var i = 0; i < array.length; i++) array[i] = null;
		context.stack.push(array);
	};
	// areturn
	executors[0xb0] = doReturn;
	// arraylength
	executors[0xbe] = function (context) {
		var array = context.stack.pop();
		if (array == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		context.stack.push(array.length);
	};
	// astore
	generators[0x3a] = function (stream) {
		return stream.readUint8();
	};
	executors[0x3a] = function (context) {
		context.locals[context.parameters[context.position - 1]] = context.stack.pop();
	};
	// astore_0
	executors[0x4b] = generateStore(0);
	// astore_1
	executors[0x4c] = function (context) {
		context.locals[1] = context.stack.pop();
	};
	// astore_2
	executors[0x4d] = function (context) {
		context.locals[2] = context.stack.pop();
	};
	// astore_3
	executors[0x4e] = generateStore(3);
	// athrow
	executors[0xbf] = function (context) {
		throw context.stack.pop();
	};
	// baload
	executors[0x33] = generateArrayLoad();
	// bastore
	executors[0x54] = generateArrayStore();
	// bipush
	generators[0x10] = function (stream) {
		return stream.readInt8();
	};
	executors[0x10] = function (context) {
		context.stack.push(context.parameters[context.position - 1]);
	};
	// caload
	executors[0x34] = generateArrayLoad();
	// castore
	executors[0x55] = generateArrayStore();
	// checkcast
	generators[0xc0] = function (stream, data) {
		return data.constantPool[stream.readUint16()].className;
	};
	executors[0xc0] = function (context) {
		var className = context.parameters[context.position - 1]
		var ref = context.stack.pop();
		if (ref != null) {
			if (ref.constructor == Array) {
				context.stack.push(ref);
				return;
			}
			var refClass = js2me.findClass(ref.className).prototype;
			var cmpClass = js2me.findClass(className).prototype;
			if (refClass.isImplement(cmpClass.className)) {
				context.stack.push(ref);
			} else {
				throw new javaRoot.$java.$lang.$ClassCastException();
			}
		} else {
			context.stack.push(ref);
		}
	};
	// d2f
	executors[0x90] = function (context) {
		var value = context.stack.pop();
		context.stack.push(value.double);
	};
	// d2i
	executors[0x8e] = function (context) {
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
	executors[0x8f] = function (context) {
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
	executors[0x63] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({double: a.double + b.double});
	};
	// daload
	executors[0x31] = generateArrayLoad();
	// dastore
	executors[0x52] = function (context) {
		var value = context.stack.pop();
		var index = context.stack.pop();
		var array = context.stack.pop();
		if (array == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		if (index < 0 || index >= array.length) {
			throw new javaRoot.$java.$lang.$ArrayIndexOutOfBoundsException(index + "/" + array.length);
		}
		array[index] = value;
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
	executors[0x98] = generateCompareFloats(true, 1);
	// dcmpl
	executors[0x97] = generateCompareFloats(true, -1);
	// dconst_0
	executors[0x0e] = function (context) {
		context.stack.push(js2me.dconst0);
	};
	// dconst_1
	executors[0x0f] =  function (context) {
		context.stack.push(js2me.dconst1);
	};
	// ddiv
	executors[0x6f] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({double: a.double / b.double});
	};
	// dload
	generators[0x18] = function (stream) {
		return stream.readUint8();
	};
	executors[0x18] = function (context) {
		context.stack.push(context.locals[context.parameters[context.position - 1]]);
	};
	// dload_0
	executors[0x26] = generateLoad(0);
	// dload_1
	executors[0x27] = generateLoad(1);
	// dload_2
	executors[0x28] = generateLoad(2);
	// dload_3
	executors[0x29] = generateLoad(3);
	// dmul
	executors[0x6b] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({double: a.double * b.double});
	};
	// dneg
	executors[0x77] = function (context) {
		var value = context.stack.pop();
		context.stack.push({double: -value.double});
	};
	// drem
	executors[0x73] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({double: a.double % b.double});
	};
	// dreturn
	executors[0xaf] = doReturn;
	// dstore
	generators[0x39] = function (stream) {
		return stream.readUint8();
	};
	executors[0x39] = function (context) {
		context.locals[context.parameters[context.position - 1]] = context.stack.pop();
	};
	// dstore_0
	executors[0x47] = generateStore(0);
	// dstore_1
	executors[0x48] = generateStore(1);
	// dstore_2
	executors[0x49] = generateStore(2);
	// dstore_3
	executors[0x4a] = generateStore(3);
	// dsub
	executors[0x67] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({double: a.double - b.double});
	};
	// dup
	executors[0x59] = function (context) {
		var tmp = context.stack.pop();
		context.stack.push(tmp);
		context.stack.push(tmp);
	};
	// dup_x1
	executors[0x5a] = function (context) {
		var a = context.stack.pop();
		var b = context.stack.pop();
		context.stack.push(a);
		context.stack.push(b);
		context.stack.push(a);
	};
	// dup_x2
	executors[0x5b] = function (context) {
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
	executors[0x5c] = function (context) {
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
	executors[0x5d] = function (context) {
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
	executors[0x5e] = function (context) {
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
	executors[0x62] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a + b);
	};
	// faload
	executors[0x30] = generateArrayLoad();
	// fastore
	executors[0x51] = generateArrayStore();
	// fcmpg
	executors[0x96] = generateCompareFloats(false, 1);
	// fcmpl
	executors[0x95] = generateCompareFloats(false, -1);
	// fconst_0
	executors[0x0b] = function (context) {
		context.stack.push(0);
	};
	// fconst_1
	executors[0x0c] = function (context) {
		context.stack.push(1);
	};
	// fconst_2
	executors[0x0d] = function (context) {
		context.stack.push(2);
	};
	// fdiv
	executors[0x6e] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a / b);
	};
	// fload
	generators[0x17] = function (stream) {
		return stream.readUint8();
	};
	executors[0x17] = function (context) {
		context.stack.push(context.locals[context.parameters[context.position - 1]]);
	};
	// fload_0
	executors[0x22] = generateLoad(0);
	// fload_1
	executors[0x23] = generateLoad(1)
	// fload_2
	executors[0x24] = generateLoad(2)
	// fload_3
	executors[0x25] = generateLoad(3);
	// fmul
	executors[0x6a] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a * b);
	};
	// fneg
	executors[0x76] = function (context) {
		var value = context.stack.pop();
		context.stack.push(-value);
	};
	// frem
	executors[0x72] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a % b);
	};
	// freturn
	executors[0xae] = doReturn;
	// fstore
	generators[0x38] = function (stream) {
		return stream.readUint8();
	};
	executors[0x38] = function (context) {
		context.locals[context.parameters[context.position - 1]] = context.stack.pop();
	};
	// fstore_0
	executors[0x43] = generateStore(0);
	// fstore_1
	executors[0x44] = generateStore(1);
	// fstore_2
	executors[0x45] = generateStore(2);
	// fstore_3
	executors[0x46] = generateStore(3);
	// fsub
	executors[0x66] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a - b);
	};
	// getfield
	generators[0xb4] = function (stream, data) {
		return data.constantPool[stream.readUint16()];
	};
	executors[0xb4] = function (context) {
		var obj = context.stack.pop();
		if (obj == null) {
			throw new javaRoot.$java.$lang.$NullPointerException();
		}
		var field = context.parameters[context.position - 1];
		if (field.constructor === String) {
			context.stack.push(obj[field]);
		} else {
			var classObj = js2me.findClass(field.className);
			var fieldId = classObj.prototype[field.name];
			context.stack.push(obj['$' + fieldId]);
			context.parameters[context.position - 1] = '$' + fieldId;
		}
	};
	// getstatic
	generators[0xb2] = function (stream, data) {
		return data.constantPool[stream.readUint16()];
	};
	executors[0xb2] = function (context) {
		var position = context.position - 1;
		var field = context.parameters[position];
		if (field.constructor === String) {
			context.stack.push(js2me.statics[field]);
		} else {
			loadClass(field.className, function (classObj) {
				var fieldId = '$' + classObj.prototype[field.name];
				//context.parameters[position] = fieldId;
				context.stack.push(js2me.statics[fieldId]);
			}, function () {
			});
		}
	};/*
	function generateGoto(func) {
		return function () {
			var index = stream.index + stream.readInt16() - 1;
			return function (context) {
				if (func(context)) {
					context.position = positionMapping[index];
				}
			}
		}
	}*/
	// goto
	for (var i = 0x99; i <= 0xa7; i++) {
		generators[i] = function (stream) {
			return {
				index: stream.index + stream.readInt16() - 1
			};
		};
	}
	executors[0xa7] = function (context) {
		var index = context.parameters[context.position - 1].index;
		context.position = index;
	}
	// i2l
	executors[0x85] = function (context) {
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
	executors[0x86] = function () {};
	// i2d
	executors[0x87] = function (context) {
		var value = context.stack.pop();
		context.stack.push({double: value});
	};
	// f2i
	executors[0x8b] = function (context) {
		var value = context.stack.pop();
		context.stack.push(~~value);
	};
	// f2d
	executors[0x8d] = function (context) {
		var value = context.stack.pop();
		context.stack.push({double: value});
	};
	// i2b
	executors[0x91] = function (context) {
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
	executors[0x92] = function (context) {
		var value = context.stack.pop();
		while (value < 0) {
			value += 0x100000000;
		}
		context.stack.push(value % 65536);
	};
	// i2s
	executors[0x93] = function (context) {
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
	executors[0x60] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push((a + b) | 0);
	};
	// iand
	executors[0x7e] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a & b);
	};
	// iaload
	executors[0x2e] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a[b]);
	};
	// iastore
	executors[0x4f] = function (context) {
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
	executors[0x02] = generateConst(-1);
	// iconst_0
	executors[0x03] = function (context) {
		context.stack.push(0);
	};
	// iconst_1
	executors[0x04] = function (context) {
		context.stack.push(1);
	};
	// iconst_2
	executors[0x05] = function (context) {
		context.stack.push(2);
	};
	// iconst_3
	executors[0x06] = function (context) {
		context.stack.push(3);
	};
	// iconst_4
	executors[0x07] = function (context) {
		context.stack.push(4);
	};
	// iconst_5
	executors[0x08] = function (context) {
		context.stack.push(5);
	};
	// idiv
	executors[0x6c] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		if (b === 0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");
		var value = (~~(a / b)) | 0;
		context.stack.push(value);
	};
	// if_acmpeq
	executors[0xa5] = function (context) {
		if (context.stack.pop() === context.stack.pop()) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// if_acmpne
	executors[0xa6] = function (context) {
		if (context.stack.pop() !== context.stack.pop()) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// if_icmpeq
	executors[0x9f] = function (context) {
		if (context.stack.pop() === context.stack.pop()) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// if_icmpne
	executors[0xa0] = function (context) {
		if (context.stack.pop() !== context.stack.pop()) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// if_icmplt
	executors[0xa1] = function (context) {
		if (context.stack.pop() > context.stack.pop()) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// if_icmpge
	executors[0xa2] = function (context) {
		if (context.stack.pop() <= context.stack.pop()) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// if_icmpgt
	executors[0xa3] = function (context) {
		if (context.stack.pop() < context.stack.pop()) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// if_icmple
	executors[0xa4] = function (context) {
		if (context.stack.pop() >= context.stack.pop()) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// ifeq
	executors[0x99] = function (context) {
		if (context.stack.pop() === 0) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// ifne
	executors[0x9a] = function (context) {
		if (context.stack.pop() !== 0) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// iflt
	executors[0x9b] = function (context) {
		if (context.stack.pop() < 0) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// ifge
	executors[0x9c] = function (context) {
		if (context.stack.pop() >= 0) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// ifgt
	executors[0x9d] = function (context) {
		if (context.stack.pop() > 0) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// ifle
	executors[0x9e] = function (context) {
		if (context.stack.pop() <= 0) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// ifnonnull
	executors[0xc7] = function (context) {
		if (context.stack.pop() != null) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// ifnull
	generators[0xc7] = generators[0xc6] = function (stream) {
		return {
			index: stream.index + stream.readInt16() - 1
		};
	};
	executors[0xc6] = function (context) {
		if (context.stack.pop() == null) {
			var index = context.parameters[context.position - 1].index;
			context.position = index;
		}
	};
	// iinc
	generators[0x84] = function (stream) {
		return {
			local: stream.readUint8(),
			value: stream.readInt8()
		};
	};
	executors[0x84] = function (context) {
		var parameters = context.parameters[context.position - 1];
		context.locals[parameters.local] = (context.locals[parameters.local] + parameters.value) | 0;
	};
	// iload
	generators[0x15] = function (stream) {
		return stream.readUint8();
	};
	executors[0x15] = function (context) {
		context.stack.push(context.locals[context.parameters[context.position - 1]]);
	};
	// iload_0
	executors[0x1a] = function (context) {
		context.stack.push(context.locals[0]);
	};
	// iload_1
	executors[0x1b] = function (context) {
		context.stack.push(context.locals[1]);
	};
	// iload_2
	executors[0x1c] = function (context) {
		context.stack.push(context.locals[2]);
	};
	// iload_3
	executors[0x1d] = function (context) {
		context.stack.push(context.locals[3]);
	};
	// imul
	executors[0x68] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		var value = (a * b) | 0;
		context.stack.push(value);
	};
	// ineg
	executors[0x74] = function (context) {
		var value = (-context.stack.pop()) | 0;
		context.stack.push(value);
	};
	// instanceof
	generators[0xc1] = function (stream, data) {
		return data.constantPool[stream.readUint16()].className;
	};
	executors[0xc1] = function (context) {
		try {
			var ref = context.stack.pop();
			var className = context.parameters[context.position - 1];
			if (ref != null) {
				if (ref.constructor == Array) {
					context.stack.push(ref);
					return;
				}
				var refClass = js2me.findClass(ref.className).prototype;
				if (refClass.isImplement(className)) {
					context.stack.push(1);
				} else {
					context.stack.push(0);
				}
			} else {
				context.stack.push(0);
			}
		} catch (e) {
			debugger;
		}
	};
	function loadClass(className, callback, afterCallback) {
		var threadId = js2me.currentThread;
		var loaded = false;
		js2me.loadClass(className, function (classObj) {
			loaded = true;
			callback(classObj);
			if (!js2me.restoreStack[threadId]) {
				js2me.restoreStack[threadId] = [];
			}
			js2me.restoreStack[threadId].unshift(afterCallback);
			js2me.restoreThread(threadId);
		});
		if (!loaded) {
			js2me.isThreadSuspended = true;
		}
	}
	function generateInvocationGenerator(isGarbage) {
		return function (stream, data) {
			var methodInfo = data.constantPool[stream.readUint16()];
			if (isGarbage) {
				stream.readUint16();
			}
			var cache;/* = js2me.findClass(methodInfo.className);
			if (cache && !cache.prototype.initialized) {
				cache = undefined;
			}*/
			if (methodInfo.className === data.parent.prototype.className) {
				cache = data.parent;
			}
			return {
				methodInfo: methodInfo,
				cache: cache
			};
		}
	}
	function generateInvocationExecutor(isStatic, isVirtual) {
		function invoke (context, methodInfo, classObj) {
			var argumentsCount = methodInfo.type.argumentsTypes.length;
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
				if (isStatic) {
					result = classObj.prototype[methodInfo.name].apply(classObj.prototype, args);
				} else {
					result = classObj.prototype[methodInfo.name].apply(obj, args);
				}
			}
			
			if (context.saveResult && !js2me.isThreadSuspended) {
				context.stack.push(result);
				context.saveResult = false;
			}
		}
		return function (context) {
			var parameters = context.parameters[context.position - 1];
			var methodInfo = parameters.methodInfo;
			if (parameters.cache) {
				invoke(context, methodInfo, parameters.cache)
			} else {
				var cache;
				loadClass(methodInfo.className, function (classObj) {
					//parameters.cache = classObj;
					cache = classObj;
				}, function () {
					invoke(context, methodInfo, cache);
				});
				}
			};
		
	}
	// invokeinterface
	generators[0xb9] = generateInvocationGenerator(true);
	executors[0xb9] = generateInvocationExecutor(false, true);
	// invokespecial
	generators[0xb7] = generateInvocationGenerator(false);
	executors[0xb7] = generateInvocationExecutor(false, false);
	// invokestatic
	generators[0xb8] = generateInvocationGenerator(false);
	executors[0xb8] = generateInvocationExecutor(true, false);
	// invokevirtual
	generators[0xb6] = generateInvocationGenerator(false);
	executors[0xb6] = generateInvocationExecutor(false, true);
	// ior
	executors[0x80] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a | b);
	};
	// irem
	executors[0x70] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		if (b === 0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");
		context.stack.push(a % b);
	};
	// ireturn
	executors[0xac] = doReturn;
	// ishl
	executors[0x78] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a << (b % 32));
	};
	// ishr
	executors[0x7a] = function (context) {
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
	generators[0x36] = function (stream) {
		return stream.readUint8();
	};
	executors[0x36] = function (context) {
		context.locals[context.parameters[context.position - 1]] = context.stack.pop();
	};
	// istore_0
	executors[0x3b] = generateStore(0);
	// istore_1
	executors[0x3c] = generateStore(1);
	// istore_2
	executors[0x3d] = function (context) {
		context.locals[2] = context.stack.pop();
	};
	// istore_3
	executors[0x3e] = function (context) {
		context.locals[3] = context.stack.pop();
	};
	// isub
	executors[0x64] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a - b);
	};
	// iushr
	executors[0x7c] = function (context) {
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
	executors[0x82] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a ^ b);
	};
	// l2d
	executors[0x8a] = function (context) {
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
	executors[0x88] = function (context) {
		var value = context.stack.pop();
		var int = value.lo;
		if (int >= 0x80000000) {
			int -= 0x100000000;
		}
		context.stack.push(int);
	};
	// ladd
	executors[0x61] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(js2me.ladd(a, b));
	};
	// laload
	executors[0x2f] = function (context) {
		var index = context.stack.pop();
		var array = context.stack.pop();
		context.stack.push(array[index]);
	};
	// land
	executors[0x7f] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({hi: a.hi & b.hi, lo: a.lo & b.lo});
	};
	// lastore
	executors[0x50] = function (context) {
		var value = context.stack.pop();
		var index = context.stack.pop();
		var array = context.stack.pop();
		array[index] = value;
	};
	// lcmp
	executors[0x94] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(js2me.lcmp(a, b));
	};
	// lconst_0
	executors[0x09] = function (context) {
		context.stack.push({hi: 0, lo: 0});
	};
	// lconst_1
	executors[0x0a] = function (context) {
		context.stack.push({hi: 0, lo: 1});
	};
	// ldc
	generators[0x12] = function (stream, data) {
		return data.constantPool[stream.readUint8()];
	};
	executors[0x12] = function (context) {
		context.stack.push(context.parameters[context.position - 1]);
	};
	// ldc_w, ldc2_w
	generators[0x14] = generators[0x13] = function (stream, data) {
		return data.constantPool[stream.readUint16()];
	};
	executors[0x14] = executors[0x13] = function (context) {
		context.stack.push(context.parameters[context.position - 1]);
	};
	// ldiv
	executors[0x6d] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		if (b.hi === 0 && b.lo ===0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");
		context.stack.push(js2me.ldiv(a, b).div);
	};
	// lload
	generators[0x16] = function (stream) {
		return stream.readUint8();
	};
	executors[0x16] = function (context) {
		context.stack.push(context.locals[context.parameters[context.position - 1]]);
	};
	// lload_0
	executors[0x1e] = function (context) {
		context.stack.push(context.locals[0]);
	};
	// lload_1
	executors[0x1f] = function (context) {
		context.stack.push(context.locals[1]);
	};
	// lload_2
	executors[0x20] = function (context) {
		context.stack.push(context.locals[2]);
	};
	// lload_3
	executors[0x21] = function (context) {
		context.stack.push(context.locals[3]);
	};
	// lmul
	executors[0x69] = function (context)  {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(js2me.lmul(a, b));
	};
	// lneg
	executors[0x75] = function (context) {
		var a = context.stack.pop();
		context.stack.push(js2me.lneg(a));
	};
	// lookupswitch
	generators[0xab] = function (stream) {
		var start = stream.index - 1;
		while (stream.index % 4 != 0) {
			stream.readUint8();
		}
		var def = start + stream.readInt32();
		var count = stream.readInt32();
		var table = [];
		for (var i = 0; i < count; i++) {
			var match = stream.readInt32();
			var value = start + stream.readInt32();
			table[match] = value;
		}
		return {
			table: table,
			index: def
		};
	};	
	executors[0xab] = function (context) {
		var parameters = context.parameters[context.position - 1];
		var index = context.stack.pop();
		var position = parameters.table[index];
		if (position === undefined) {
			position = parameters.index;
		}
		context.position = position;
	}
	// lor
	executors[0x81] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push({hi: a.hi | b.hi, lo: a.lo | b.lo});
	};
	// lrem
	executors[0x71] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		if (b.hi === 0 && b.lo ===0) throw new javaRoot.$java.$lang.$ArithmeticException("/ by zero");
		context.stack.push(js2me.ldiv(a, b).rem);
	};
	// lreturn
	executors[0xad] = doReturn;
	// lshl
	executors[0x79] = function (context) {
		var shift = context.stack.pop() % 64;
		var value = context.stack.pop();
		context.stack.push(js2me.lshl(value, shift));
	};
	// lshr
	executors[0x7b] = function (context) {
		var shift = context.stack.pop() % 64;
		var value = context.stack.pop();
		var result = js2me.lshr(value, shift, true);
		context.stack.push(result);
	};
	// lstore
	generators[0x37] = function (stream) {
		return stream.readUint8();
	};
	executors[0x37] = function (context) {
		context.locals[context.parameters[context.position - 1]] = context.stack.pop();
	};
	// lstore_0
	executors[0x3f] = generateStore(0);
	// lstore_1
	executors[0x40] = function (context) {
		context.locals[1] = context.stack.pop();
	};
	// lstore_2
	executors[0x41] = function (context) {
		context.locals[2] = context.stack.pop();
	};
	// lstore_3
	executors[0x42] = function (context) {
		context.locals[3] = context.stack.pop();
	};
	// lsub
	executors[0x65] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(js2me.lsub(a, b));
	};
	// lxor
	executors[0x83] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(js2me.lxor(a, b));
	};
	// lushr
	executors[0x7d] = function (context) {
		var shift = context.stack.pop() % 64;
		var value = context.stack.pop();
		var result = js2me.lshr(value, shift, false);
		context.stack.push(result);
	};
	// monitorenter
	executors[0xc2] = function (context) {
		var obj = context.stack.pop();
		js2me.enterMonitor(obj, context);
	};
	// monitorexit
	executors[0xc3] = function (context) {
		var obj = context.stack.pop();
		js2me.exitMonitor(obj);
	};
	// multinewarray
	generators[0xc5] = function (stream, data) {
		return {
			className: data.constantPool[stream.readUint16()].className,
			dimensions: stream.readUint8()
		};
	};
	executors[0xc5] = function (context) {
		var counts = [];
		var parameters = context.parameters[context.position - 1];
		var dimensions = parameters.dimensions;
		for (var i = 0; i < dimensions; i++) {
			counts[i] = context.stack.pop();
		}
		var type = parameters.className;
		var className = type.substr(1);
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
	// new
	generators[0xbb] = function (stream, data) {
		return data.constantPool[stream.readUint16()].className
	};
	executors[0xbb] = function (context) {
		var position = context.position - 1;
		var className = context.parameters[position];
		if (className.constructor !== String) {
			var instance = new className();
			context.stack.push(instance);
		} else {
			loadClass(className, function (classObj) {
				//context.parameters[position] = classObj;
				var instance = new classObj();
				context.stack.push(instance);
			}, function () {
			});
		}
	};
	// newarray
	generators[0xbc] = function (stream) {
		var type = stream.readUint8();
		var def;
		if (type == 7) {
			def = js2me.dconst0;
		} else if (type == 11) {
			def = {hi: 0, lo: 0};
		} else {
			def = 0;
		}
		return def;
	};
	executors[0xbc] = function (context) {
		var length = context.stack.pop();
		var array = [];
		while (length--) {
			array.push(context.parameters[context.position - 1]);
		}
		context.stack.push(array);
	}
	// noop
	executors[0x00] = function () {};
	// pop
	executors[0x57] = function (context) {
		context.stack.pop();
	};
	// pop2
	executors[0x58] = function (context) {
		context.stack.pop();
		context.stack.pop();
	};
	// putfield
	generators[0xb5] = function (stream, data) {
		return data.constantPool[stream.readUint16()];
	};
	executors[0xb5] = function (context) {
		var field = context.parameters[context.position - 1];
		var value = context.stack.pop();
		var obj = context.stack.pop();
		if (field.constructor === String) {
			obj[field] = value;
		} else {
			var classObj = js2me.findClass(field.className);
			var fieldId = classObj.prototype[field.name];
			obj['$' + fieldId] = value;
			context.parameters[context.position - 1] = '$' + fieldId;
		}
	};
	js2me.statics = {};
	// putstatic
	generators[0xb3] = function (stream, data) {
		return data.constantPool[stream.readUint16()];
	};
	executors[0xb3] = function (context) {
		var position = context.position - 1;
		var field = context.parameters[position];
		var value = context.stack.pop();
		if (field.constructor === String) {
			js2me.statics[field] = value;
		} else {
			loadClass(field.className, function (classObj) {
				var fieldId = '$' + classObj.prototype[field.name];
				js2me.statics[fieldId] = value;
				//context.parameters[position] = fieldId;
			}, function () {
			});
		}
	};
	// return
	executors[0xb1] = function (context) {
		context.finish = true;
	};
	// saload
	executors[0x35] = function (context) {
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
	executors[0x56] = function (context) {
		var value = context.stack.pop();
		var index = context.stack.pop();
		var array = context.stack.pop();
		array[index] = value;
	};
	// sipush
	generators[0x11] = function (stream) {
		return stream.readInt16();
	};
	executors[0x11] = function (context) {
		context.stack.push(context.parameters[context.position - 1]);
	};
	// swap
	executors[0x5f] = function (context) {
		var b = context.stack.pop();
		var a = context.stack.pop();
		context.stack.push(a);
		context.stack.push(b);
	};
	// tableswitch
	generators[0xaa] = function (stream) {
		var start = stream.index - 1;
		while (stream.index % 4 != 0) {
			stream.readUint8();
		}
		var def = start + stream.readInt32();
		var low = stream.readInt32();
		var high = stream.readInt32();
		var count = high - low + 1;
		var table = {};
		for (var i = 0; i < count; i++) {
			table[low + i] = start + stream.readInt32();
		}
		return {
			table: table,
			index: def
		};
	};
	executors[0xaa] = function (context) {
		var parameters = context.parameters[context.position - 1];
		var index = context.stack.pop();
		var position = parameters.table[index];
		if (position === undefined) {
			position = parameters.index;
		}
		context.position = position;
	};
	// wide
	generators[0xc4] = function (stream) {
		var op = stream.readUint8();
		var pointer = stream.readUint16();
		if (op == 0x84) {
			var value = stream.readInt16();
		}
		return {
			op: op,
			pointer: pointer,
			value: value
		};
	};
	executors[0xc4] = function () {
		var parameters = context.parameters[context.position - 1];
		var op = parameters.op;
		var index = parameters.pointer;
		if (op >= 21 && op <= 25) {
			context.push(context.locals[index]); 
		}
		if (op >= 54 && op <= 58) {
			context.locals[index] = context.pop();
		}
		if (op == 0x84) {
			context.locals[index] += parameters.value;
		}
		throw new Error('wide: unkown op ' + index);
	}
	
	
	js2me.generateProgram = function (data) {
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
		var program = [];
		var positionMapping = new Array(stream.getRemaining());
		var reversedMapping = [];
		var parameters = {};
		
		/*for (var i = 0; i < exceptions.length; i++) {
			jumpTo[exceptions[i].startPc]++;
			jumpFrom[exceptions[i].endPc]++;
			jumpTo[exceptions[i].handler]++;
		}*/
		
		var isSubfunctionSafe;
		var onlyCode = true;
		while (!stream.isEnd()) {
			reversedMapping[program.length] = stream.index;
			var op = stream.readUint8();
			if (executors[op]) {
				isSubfunctionSafe = true;
				var func = null;
				if (generators[op]) {
					parameters[program.length] = generators[op](stream, data);
				}
				program.push(executors[op]);
			} else {
				throw new Error('Op ' + op.toString(16) + ' not supported');
			}
		}
		
		for (var i = 0; i < reversedMapping.length; i++) {
			positionMapping[reversedMapping[i]] = i;
		}
		
		for (var i = 0; i < exceptions.length; i++) {
			exceptions[i].startPc = positionMapping[exceptions[i].startPc];
			exceptions[i].endPc = positionMapping[exceptions[i].endPc];
			exceptions[i].handler = positionMapping[exceptions[i].handler];
		}
		
		for (var i in parameters) {
			if (parameters[i] && parameters[i].index) {
				parameters[i].index = positionMapping[parameters[i].index];
			}
			if (parameters[i] && parameters[i].table) {
				for (var j in parameters[i].table) {
					parameters[i].table[j] = positionMapping[parameters[i].table[j]];
				}
			}
		}
		
		delete data.stream;
		delete data.constantPool;
		data.content = program;
		data.parameters = parameters;
		data.parent.prototype[data.name].data = data;
		
	};
})();
