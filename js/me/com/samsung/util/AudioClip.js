js2me.createClass({
	/*
	 * 
	 */
	_init$ILjava_lang_String_$V: function(type, name) {
		console.log('Samsung: you want to play a ' + name.text +'?');
	},
	/*
	 * 
	 */
	$play$II$V: function (loop, volume) {
		console.log('Samsung: sure, play :>');
	},
	/*
	 * 
	 */
	$stop$$V: function () {
		console.log('Samsung: stahp');
	},
	package: 'javaRoot.$com.$samsung.$util',
	name: '$AudioClip'
});
