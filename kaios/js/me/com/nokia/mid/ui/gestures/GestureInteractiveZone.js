js2me.createClass({
	$GESTURE_TAPI: 0x1,
	/*
	 * public GestureInteractiveZone(int gestures)
	 */
	_init$I$V: function (gestures) {
		this.gestures = gestures;
	},
	/*
	 * public static boolean isSupported(int gestureEventIdentity)
	 */
	$isSupported$I$Z: function () {
		// everything is supported! (liar)
		return 1;
	}
});

