JS2ME
=============

It's implementation of Java ME in JavaScript for Firefox OS.

Compatibility
---------------
Hard to say. There's a lot of different classes in J2ME ecosystem, not only MIDP. Currently it supports most of Java bytecode, part of MIDP and it's able to run few JS2ME games and application.

Performance
---------------
Performance is great. It's intended to run smoothly on Firefox OS crapphones like Keon so must work as fast as possible. Thanks to aggressive JIT optimizations it's much faster than any other JVM written in JavaScript.

App
-------
It exists. You only have to clone this repository and push to your phone. If you don't want any superfluous files you can use `$ ./buildApp.sh`.

Contribution
--------------
Feel free to submit a pull requests. There's also [short guide](tree/js/me) how to write your own pseudo-Java classes.

Milestones
--------------
Milestone 0.1 - Hello world (test.jar) works (done)

Milestone 0.2 - Picross (picross.jar) works (done)

Milestone 0.2.5 - Play around... (done)

Milestone 0.3 - Run [FPC benchmark](http://www.dpsoftware.org/) (done)

Milestone 0.4 - Optimizations (done)

Milestone 0.5 - Firefox OS application (**rejected**)

Milestone 0.6 (done)

 * performance (done, much better than expected!)
 * tests (done)
 * loading screen (done)
 * scroll (done)

Milestone 0.7

 * more performance (done)
 * more tests (done)
 * repair canvas (done)
 * method generating (done)
 * file input (done)
 * settings (done)
 * error popup (done)
 * orientation (done)
 * remove hover (done)
 * bug with doubles (done)
 * method stub (done)

Milestone 0.8

 * Run Tomb Raider (done)
 * Run Courage the Coward Dog (done)
 * App (**rejected**)

Milestone 1.0
 * Run Ginger (done)
 * Run JaduGadu (no, this doesn't work anyway)
 * Priviliged app (fuck!, looks like we need two versions of app) (done)
 * Rewrite the compiler... two times, with JIT (master branch) and as interpreter (privileged branch) (1/2)
 * Make forms work perfectly, with nice tests and candies (naaahh, too lazy)

Milestone X

 * MIDI support
 * M3G
 * JavaWorker
 * pass Microemu unit tests

Thanks
-----------
[Zip.js](https://github.com/gildas-lormeau/zip.js)

[Asteroids.jar](http://jfdoue.free.fr/index.html)
