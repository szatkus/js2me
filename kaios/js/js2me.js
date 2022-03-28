var js2me = {
	debug: false,
	stat: 0,
	calledMethods: {},
	profile: false,
	storageName: '',
	libraryPath: 'js/me',
	constantPools: [], //only for memory profiling
	config: {
		app: true,
		engine: 'zazu',
		selector: false,
		workers: false,
		midlet: 1,
		width: 240,
		height: 266,
		fullHeight: 320
	}
};
