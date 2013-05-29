js2me.createClass({
	_init_Ljava_lang_Runnable__V: function (runnable) {
		this.runnable = runnable;
	},
	$start__V: function () {
		var runnable = this.runnable || this;
		setTimeout(function () {
			runnable.$run__V();
		}, 1);
	},
	package: 'javaRoot.$java.$lang',
	name: '$Thread'
});

