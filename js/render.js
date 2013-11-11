(function () {
	js2me.renderer = {
		drawImage: function (canvas, image, dx, dy, dw, dh, sx, sy, sw, sh, tranform) {
			if (this.currentCanvas !== canvas) {
				this.setCanvas(canvas);
			}
			if (image.texture == null) {
				image.texture = gl.createTexture();
				gl.bindTexture(gl.TEXTURE_2D, image.texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			} else {
				gl.bindTexture(gl.TEXTURE_2D, image.texture);
			}
			gl.uniform1i(textureUniform, 0);
			var buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 4 * 4, 0);
			gl.vertexAttribPointer(uvAttribute, 2, gl.FLOAT, false, 4 * 4, 2 * 4);
			rectArray[0] = sx / image.width;
			rectArray[1] = sy / image.height;
			rectArray[2] = (sx + sw) / image.width;
			rectArray[3] = sy / image.height;
			rectArray[4] = (sx + sw) / image.width;
			rectArray[5] = (sy + sh) / image.height;
			rectArray[6] = sx / image.width;
			rectArray[7] = (sy + sh) / image.height;
			textureArray[0] = dx;
			textureArray[1] = dy;
			textureArray[2] = rectArray[tranform[0] * 2];
			textureArray[3] = rectArray[tranform[0] * 2 + 1];
			textureArray[4] = dx + dw;
			textureArray[5] = dy;
			textureArray[6] = rectArray[tranform[1] * 2];
			textureArray[7] = rectArray[tranform[1] * 2 + 1];
			textureArray[8] = dx;
			textureArray[9] = dy + sh;
			textureArray[10] = rectArray[tranform[3] * 2];
			textureArray[11] = rectArray[tranform[3] * 2 + 1];
			textureArray[12] = dx + sw;
			textureArray[13] = dy + sh;
			textureArray[14] = rectArray[tranform[2] * 2];
			textureArray[15] = rectArray[tranform[2] * 2 + 1];
			gl.bufferData(gl.ARRAY_BUFFER, textureArray, gl.STREAM_DRAW);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			gl.flush();
		},
		drawLine: function (canvas, x1, y1, x2, y2) {
			if (this.currentCanvas !== canvas) {
				this.setCanvas(canvas);
			}
			gl.uniform1i(textureUniform, -1);
			var buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 4 * 2, 0);
			lineArray[0] = x1;
			lineArray[1] = y1;
			lineArray[2] = x2;
			lineArray[3] = y2;
			gl.bufferData(gl.ARRAY_BUFFER, lineArray, gl.STREAM_DRAW);
			gl.drawArrays(gl.LINES, 0, 2);
			gl.flush();
		},
		drawRect: function (canvas, x, y, width, height) {
			if (this.currentCanvas !== canvas) {
				this.setCanvas(canvas);
			}
			gl.uniform1i(textureUniform, -1);
			var buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 4 * 2, 0);
			rectArray[0] = x;
			rectArray[1] = y
			rectArray[2] = x + width;
			rectArray[3] = y;
			rectArray[4] = x + width;
			rectArray[5] = y + height;
			rectArray[6] = x;
			rectArray[7] = y + height;
			rectArray[8] = x;
			rectArray[9] = y;
			gl.bufferData(gl.ARRAY_BUFFER, rectArray, gl.STREAM_DRAW);
			gl.drawArrays(gl.LINE_STRIP, 0, 5);
			gl.flush();
		},
		fillRect: function (canvas, x, y, width, height) {
			if (this.currentCanvas !== canvas) {
				this.setCanvas(canvas);
			}
			gl.uniform1i(textureUniform, -1);
			var buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.vertexAttribPointer(positionAttribute, 2, gl.FLOAT, false, 4 * 2, 0);
			gl.vertexAttribPointer(uvAttribute, 2, gl.FLOAT, false, 4 * 2, 0);
			rectArray[0] = x;
			rectArray[1] = y
			rectArray[2] = x + width;
			rectArray[3] = y;
			rectArray[4] = x;
			rectArray[5] = y + height;
			rectArray[6] = x + width;
			rectArray[7] = y + height;
			gl.bufferData(gl.ARRAY_BUFFER, rectArray, gl.STREAM_DRAW);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			gl.flush();
		},
		refresh: function () {
			gl.finish();
			if (this.currentCanvas) {
				this.currentCanvas.getContext('2d').drawImage(this.glCanvas, 0, 0);
			}
		},
		setCanvas: function (canvas) {
			this.refresh();
			this.currentCanvas = canvas;
			this.glCanvas.width = canvas.width;
			this.glCanvas.height = canvas.height;
			gl.viewport(0, 0, canvas.width, canvas.height);
			if (canvas.clip == null) {
				canvas.clip = [0, 0, canvas.width, canvas.height];
			}
			gl.scissor.apply(gl, canvas.clip);
			gl.uniform2f(scaleUniform, 2 / canvas.width, 2 / canvas.height);
			canvas.texture = null;
		},
		setClip: function (canvas, x, y, width, height) {
			if (this.currentCanvas !== canvas) {
				this.setCanvas(canvas);
			}
			canvas.clip = [x, canvas.height - y - height, width, height];
			gl.scissor.apply(gl, canvas.clip);
		},
		setColor: function (r, g, b) {
			gl.uniform4f(colorUniform, r / 255, g / 255, b / 255, 1);
		}
	};
	js2me.renderer.glCanvas = document.createElement('canvas');
	var gl = js2me.renderer.glCanvas.getContext('experimental-webgl');
	gl.enable(gl.SCISSOR_TEST);
	var lineArray = new Float32Array(4);
	var rectArray = new Float32Array(10);
	var textureArray = new Float32Array(20);
	var shader = gl.createShader(gl.VERTEX_SHADER);
	var program = gl.createProgram();
	var vertexShader = 
		'precision mediump float;' +
		'attribute vec2 position;' +
		'attribute vec2 uv;' +
		'uniform vec2 scale;' +
		'varying vec2 vUv;' +
		'void main(void) {' +
		'	vUv = uv;' +
		'	gl_Position = vec4(position[0] * scale[0] - 1.0, -position[1] * scale[1] + 1.0, 0, 1);' +
		'}';
	var fragmentShader = 'precision mediump float;' +
		'uniform vec4 color;' +
		'uniform sampler2D sampler;' +
		'uniform int texture;' +
		'varying vec2 vUv;' +
		'void main(void) {' +
		'	if (texture == -1) {' +
		'		gl_FragColor = vec4(color[0], color[1], color[2], 1.);' +
		'	} else {' +
		'		gl_FragColor = texture2D(sampler, vUv);' +
		'	}' +
		'}';
	gl.shaderSource(shader, vertexShader);
	gl.compileShader(shader);
	gl.attachShader(program, shader);
	var shader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(shader, fragmentShader);
	gl.compileShader(shader);
	gl.attachShader(program, shader);
	gl.linkProgram(program);
	gl.useProgram(program);
	var positionAttribute = gl.getAttribLocation(program, 'position');
	gl.enableVertexAttribArray(positionAttribute);
	var uvAttribute = gl.getAttribLocation(program, 'uv');
	gl.enableVertexAttribArray(uvAttribute);
	var colorUniform = gl.getUniformLocation(program, 'color');
	var scaleUniform = gl.getUniformLocation(program, 'scale');
	var textureUniform = gl.getUniformLocation(program, 'texture');
	gl.uniform1i(textureUniform, -1);
	gl.uniform1i(gl.getUniformLocation(program, 'samples'), 0);
})()
