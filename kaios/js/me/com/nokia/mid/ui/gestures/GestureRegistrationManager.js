js2me.createClass({
	/*
	 * public static boolean register(java.lang.Object container, GestureInteractiveZone gestureInteractiveZone)
	 */
	$register$Ljava_lang_Object_Lcom_nokia_mid_ui_gestures_GestureInteractiveZone_$Z: function (container, zone) {
		if (!container.gestureZone) {
			container.gestureZone = zone;
			return 1;
		} else {
			console.debug('No more zones');
			return 0;
		}
	},
	/*
	 * public static void setListener(java.lang.Object container, GestureListener listener)
	 */
	$setListener$Ljava_lang_Object_Lcom_nokia_mid_ui_gestures_GestureListener_$V: function (container, listener) {
		var zone = javaRoot.$com.$nokia.$mid.$ui.$gestures.$GestureInteractiveZone.prototype;
		if (!container.gestureListener) {
			container.gestureListener = listener;
			container.element.addEventListener('click', function (event) {
				if (container.gestureZone.gestures & zone.$GESTURE_TAPI) {
					var gestureEvent = new javaRoot.$com.$nokia.$mid.$ui.$gestures.$GestureEvent();
					gestureEvent.x = Math.floor((event.layerX / container.element.clientWidth) * container.element.width);
					gestureEvent.y = Math.floor((event.layerY / container.element.clientHeight) * container.element.height);
					gestureEvent.type = zone.$GESTURE_TAPI;
					listener.$gestureAction$Ljava_lang_Object_Lcom_nokia_mid_ui_gestures_GestureInteractiveZone_Lcom_nokia_mid_ui_gestures_GestureEvent_$V(container, container.gestureZone, gestureEvent);
				}
			});
		}
	},
	$unregister$Ljava_lang_Object_Lcom_nokia_mid_ui_gestures_GestureInteractiveZone_$V: function (container, zone) {
		if (container.gestureZone === zone) {
			delete container.gestureZone;
		}
	},
	require: ['javaRoot.$com.$nokia.$mid.$ui.$gestures.$GestureInteractiveZone', 'javaRoot.$com.$nokia.$mid.$ui.$gestures.$GestureEvent']
});

