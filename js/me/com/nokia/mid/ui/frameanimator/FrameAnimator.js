js2me.createClass({
	/*
	 * public boolean isRegistered()
	 */
	$isRegistered$$Z: function () {
		if (this.listener) {
			return 1;
		}
		return 0;
	},
	/*
	 * public boolean register(int x, int y, short maxFps, short maxPps, FrameAnimatorListener listener)
	 */
	$register$IISSLcom_nokia_mid_ui_frameanimator_FrameAnimatorListener_$Z: function (x, y, maxFPS, maxPPS, listener) {
		if (this.listener) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		this.listener = listener;
		return 1;
	},
	$stop$$V: function () {
	},
	$unregister$$V: function () {
	},
	require: ['javaRoot.$java.$lang.$IllegalStateException']
});

