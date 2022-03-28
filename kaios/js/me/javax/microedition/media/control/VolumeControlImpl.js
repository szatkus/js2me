js2me.createClass({
	construct: function (player) {
		this.player = player;
	},
	/*
	 * 
	 */
	$setLevel$I$I: function (volume) {
		if (volume < 0) {
			volume = 0;
		}
		if (volume > 100) {
			volume = 100;
		}
		this.player.element.volume = volume / 100;
		this.player.sendEvent('VOLUME_CHANGED', volume);
		return volume;
	},
	interfaces: ['javaRoot.$javax.$microedition.$media.$control.$VolumeControl']
});

