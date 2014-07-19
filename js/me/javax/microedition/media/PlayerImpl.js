js2me.createClass({
	construct: function (stream, mime) {
		this.listeners = [];
		this.state = this.$UNREALIZEDI;
		this.countLoop = 1;
		this.repeated = 0;
		var data = stream.getBytes();
		this.element = document.createElement('audio');
		//this.element.style.display = 'none';
		document.body.appendChild(this.element);
		this.control = new javaRoot.$javax.$microedition.$media.$control.$VolumeControlImpl(this);
		var player = this;
		if (mime == 'audio/x-wav') {
			this.element.addEventListener('canplaythrough', function () {
				js2me.restoreThread(threadId);
			});
			this.element.addEventListener('ended', function() { 
			   player.repeated++;
			   if (player.repeated < player.countLoop) {
				   player.element.play();
			   }
			});
			this.element.src = js2me.bytesToDataURI(data, 0, data.length, mime);
			//console.log(dataURI);
			js2me.isThreadSuspended = true;
			var threadId = js2me.currentThread;
			
			js2me.restoreStack[threadId] = [function () {
				return player;
			}];
		} else {
			console.log('Unsupported sound format: ' + mime);
		}
	},
	$CLOSEDI: 0,
	$UNREALIZEDI: 100,
	$REALIZEDI: 100,
	$PREFETCHEDI: 300,
	$STARTEDI: 400,
	/*
	 * 
	 */
	$addPlayerListener$Ljavax_microedition_media_PlayerListener_$V: function (listener) {
		this.listeners.push(listener);
		console.log('Player listener: ' + listener.className);
	},
	/*
	 * 
	 */
	$prefetch$$V: function () {
		if (this.state == this.$CLOSEDI) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		this.state = this.$PREFETCHEDI;
	},
	/*
	 * 
	 */
	$realize$$V: function () {
		if (this.state == this.$CLOSEDI) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		if (this.state == this.$UNREALIZEDI) {
			this.state = this.$PREFETCHEDI;
		}
	},
	/*
	 * 
	 */
	$setLoopCount$I$V: function (countLoop) {
		if (this.state == this.$CLOSEDI || this.state == this.$STAREDI) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		if (countLoop == 0) {
			throw new javaRoot.$java.$lang.$IllegalArgumentException();
		}
		this.countLoop = countLoop;
		this.element.loop = countLoop == -1;
	},
	/*
	 * 
	 */
	$getControl$Ljava_lang_String_$Ljavax_microedition_media_Control_: function () {
		return this.control;
	},
	/*
	 * 
	 */
	$start$$V: function () {
		if (this.state == this.$CLOSEDI) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		this.state = this.$STARTEDI;
		this.repeated = 0;
		this.element.play();
	},
	/*
	 * 
	 */
	$getState$$I: function () {
		return this.state;
	},
	/*
	 * 
	 */
	$stop$$V: function () {
		if (this.state == this.$CLOSEDI) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		this.state = this.$PREFETCHEDI;
		this.element.pause();
	},
	sendEvent: function () {
		//TODO
	},
	/*
	 * 
	 */
	$setMediaTime$J$J: function (time) {
		//TODO
		return time;
	},
	/*
	 * 
	 */
	$close$$V: function () {
		this.state = this.$CLOSEDI;
	},
	/*
	 * 
	 */
	$deallocate$$V: function () {
		if (this.state == this.$CLOSEDI) {
			throw new javaRoot.$java.$lang.$IllegalStateException();
		}
		this.element.pause();
	},
	interfaces: ['javaRoot.$javax.$microedition.$media.$Player'],
	require: ['javaRoot.$javax.$microedition.$media.$control.$VolumeControlImpl']
});
	

