js2me.createClass({
	construct: function () {
		try {
			throw new Error();
		} catch (e) {
			this.stack = e.stack;
		}
	},
	toString: function () {
		return this.className + '\n' + this.stack;
	},
	_init$$V: function () {
		
	},
	superClass: 'javaRoot.$java.$lang.$Throwable',
	package: 'javaRoot.$java.$lang',
	name: '$Exception'
});

