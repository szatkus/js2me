1. Setting up
=============
JS2ME is intended to run also in normal desktop browser (because you know, debugging). You just need to start a HTTP server in folder with js2me (my favourite: python3 -m http.server). Then open index.html (for example: http://127.0.0.1:8000/index.html) with parameters.

Parameters
----------
src - path to jar file. JS2ME uses XHR, so this file should be in JS2ME directory.

app - this flag default is true. You need to set app=0, because some things are disabled in application mode (for example System.out).

midlet - default is 1. ID of midlet which should be launched (you can see midlet list in MANIFEST.MF file).

selector - when true it uses web activities to select files. Otherwise device storage. It only make sense for Firefox OS app.

width, height - virtual size of "screen". Real size of canvas is set in CSS.

fullHeight - screen size in fullscreen mode.

workers - experimental support of web workers. It's just a prototype, it's inefficient as hell and better don't run if you have epilepsy.

engine - name of the engine used in JS2ME. Actual options:
* pumba - old engine
* zazu - default engine. Slightly faster than pumba and much more memory efficient. It's just few days old at this moment, so be careful.
* timon - 10-15 faster than zazu. Also its insane JIT breaks Firefox OS's CSP for privileged apps.
* simba - TBD in future. Timon is complete mess, Simba will at least as fast as Timon and written properly to reduce compilation time.
