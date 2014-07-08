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

workers - experimental support of web workers. It's just a prototype, it's inefficient as hell and better don't run if you have a epilepsy. Also it's not 1 thread = 1 worker, just one worker with Java world and proxy for manipulating DOM.

engine - name of the engine used in JS2ME. Actual options:
* pumba - old engine
* zazu - default engine. Slightly faster than pumba and much more memory efficient. It's just few days old at this moment, so be careful.
* timon - 10-15 faster than zazu. Also its insane JIT breaks Firefox OS's CSP for privileged apps.
* simba - TBD in future. Timon is complete mess, Simba will at least as fast as Timon and written properly to reduce compilation time.

All parameters are accessible in jsme.config object.

2. Structure of JS2ME
=====================
All shared functions and flags are in js2me namespace. Most functions are documented so I'll just briefly describe core files in js.

Files
-----
[bufferStream](https://github.com/szatkus/js2me/blob/master/js/bufferStream.js) - just a wrapper on JS array to easily read things like Int64/32/16/8.

[classes](https://github.com/szatkus/js2me/blob/master/js/classes.js) - everything related to loading, finding and adding classes.

[convert](https://github.com/szatkus/js2me/blob/master/js/convert.js) - module converting stream of .class file to JavaScript constructor.

[emulator](https://github.com/szatkus/js2me/blob/master/js/emulator.js) - glue for UI and JS2ME.

[events](https://github.com/szatkus/js2me/blob/master/js/events.js) - simple events bus. 

[execute](https://github.com/szatkus/js2me/blob/master/js/execute.js) - core logic for execution. Shared by every engine (although Timon sometimes removes this).

[js2me](https://github.com/szatkus/js2me/blob/master/js/js2me.js) - definition of js2me namespace with default values for flags and parameters.

[launcher](https://github.com/szatkus/js2me/blob/master/js/launcher.js) - logic responsible for launching a JAR.

[loader](https://github.com/szatkus/js2me/blob/master/js/loader.js) - loading JARs and scripts.

[manifest](https://github.com/szatkus/js2me/blob/master/js/manifest.js) - parsing manifest. Every field in manifest are written to js2me.manifest object.

[methodStub](https://github.com/szatkus/js2me/blob/master/js/methodStub.js) - stub for methods generated from .class files.

[numbers](https://github.com/szatkus/js2me/blob/master/js/numbers.js) - everything related to more complex numbers (i. e. longs).

program_* - engines. Every engine must define js2me.generateProgram function.

[remote](https://github.com/szatkus/js2me/blob/master/js/remote.js) - helper for web workers.

[resources](https://github.com/szatkus/js2me/blob/master/js/resources.js) - adding and loading resources. By resource I mean every file in JAR.

[threads](https://github.com/szatkus/js2me/blob/master/js/threads.js) - logic for threading. More about this later.

[utils](https://github.com/szatkus/js2me/blob/master/js/utils.js) - just utils :)

[worker](https://github.com/szatkus/js2me/blob/master/js/worker.js) - code of web worker.

[workers](https://github.com/szatkus/js2me/blob/master/js/workers.js) - launching the web worker.

zip - zip.js library created by [Gildas Lormeau](https://github.com/gildas-lormeau)

[me](https://github.com/szatkus/js2me/tree/master/js/me) - native classes for Java Mobile Edition. There's the guide how to implement them.

For the rest of this text I'll assume that you read it.

Lifecycle
---------
1. JS2ME gets blob with JAR file from somewhere (XHR, web activities or device storage).

2. File is unpacked by zip.js.

3. Every entry in JAR is put in js2me.resources object (they are still compressed chunks until something calls js2me.loadResource).

4. JS2ME asks for META-INF/MANIFEST.MF file and parse it.

5. Midlet 1's (or else if change midlet parameter) name is taken from manifest and loaded by js2me.loadClass.

6. Lanuncher creates a new thread (i. e. java.lang.Thread object).

7. Main thread construct midlet's instance and calls $startApp$$V.

3. Classes
==========
All Javaish classes (native or created from .class file) are in javaRoot namespaces. Every class is proper JavaScript constructor and could be used in JS in same way as in Java (just remember about escaped names). Like in Java every class inherits from javaRoot.$java.$lang.$Object.

Fields
------
Except fields mentioned in [class writing guide](https://github.com/szatkus/js2me/tree/master/js/me) there's some more:
* className - path to class (for example "javaRoot.$java.$lang.$String").
* initialized - if class was initialized or not. It's false only between first and second stage of class loading.
* isImplement - helper method inherited from Object class.
* type - "class" or "interface".

Also there is strange convention for fields (only this accessible from Java code). For example if class has field "smt" of type long there's 2 fields in object:
* $smtJ with id (for example 42).
* $42 with actual value.
Exception is static field. Then value is stored in js2me.statics.$42.

Methods
-------
There is data object in method prototype (only methods generated from .class file):
* argumentsTypes - array of types of arguments named in Java convention (for example "Ljava/lang/String;").
* constantPool - JavaScript representation of constant pool defined by class pool.
* isStatic - true if method is defined as static.
* maxLocals - maximum number of local variables.
* methodName - path to method.
* name - just name, not full path.
* parent - reference to class which defines this method.
* stream - js2me.BufferStream object with pure bytecode.
* regenerate - you can set it to true if you want to recomple the method.

These values exist at least before compilation (i. e. first call) by engine. An engine could modify data object (for example Timon removes it sometimes).
Fields for Zazu engine:
* content - list of executors (functions).
* parameters - values for executors.
* exceptions - list of try/catches in method.

Class loading
-------------
Classes are loaded by js2me.loadClass or js2me.loadClasses. It works in two stages:

1. Load given classes and every classes defined superClass, interfaces and require fields (from .js or .class file). Remember that it calls js2me.loadClasses so all of them will be intialized in second stage.

2. Initialize class. That means resolving a super class and calling <clinit> method.

4. Methods execution
====================
1. Stub methodStub is called.

2. If it is the first call method is compiled by current engine.

3. js2me.execute is called with method data.

4. Execution context is prepared (check [execute.js](https://github.com/szatkus/js2me/blob/master/js/execute.js) for current context structure).

5. Executors from data.content are called one by one and context.position is incemented.

6. If exception is thrown data.exceptions is searched for suitable handler (handler is value for context.position). Remember that exceptions are Javaish objects so fortunately it won't catch any JS native errors.

Exception is Timon. Sometimes it generates native JS functions and removes this chain.

5. Threading
============
Java supports threads, JS not (90% of developers at this point say "Hey, did you tried workers?", of course I did, they aren't powerful enough). Also there are a lot of asynchronous things in JS which isn't in Java (for example loading images). In Java Mobile GUI is separated from Java logic so doing synchonous things doesn't hurt (that's why I started some works on moving JS2ME to web worker).

Threads mainly use setTimeout(..., 1) to get effect of threading. To give you an overall idea I give you flow of loading images:

1. After resolving the url, image element is created.

2. js2me.suspendThread is set to true and js2me.currentThread is saved to threadId variable.

3. One function is added to js2me.restoreStack and two as callbacks to onload and onerror.

4. After this the whole Java stack is saved to js2me.restoreStack.

5. Image is loaded, callback calls js2me.restoreStack(threadId).

6. The whole stack is restored.

7. Helper function is called at top of the stack and returns loaded image.

As you can see there's some time during loading a image to execute callbacks for other suspended threads (by setTimeout or JS events). And yes, infinite loops in Java code kills threading, there was solution to this problem in past (counting execution time), but it was serious performance hit.

6. Debugging
============
Debugging Java applications in JS2ME was literally the worst programming experience I ever had (read it with Chris Traeger's voice!). I'm glad that you're eager to learn how to do it.

If there's any problem and you're lucky some exception would be thrown. If not prepare for the nightmare.

Ok, but be an optimist. You have an exception in JS console and what to do next? Exceptions are usually wrapped in java.lang.Throwable class, so root cause is usually the third (not always) position on the stack. Place there a breakpoint and restart JS2ME. Sometimes exceptions are catched and rethrown so may need few runs to find the exact place.

If you're lucky again the problem would obvious (wrong implementation of particular method). But what if arguments are incorrect (for example undefined or wrong type)? Well, now you have to retrace WHY.

Prepare [JBE](http://set.ee/jbe/) and [JD-GUI](http://jd.benow.ca/). Set a conditional breakpoint in execute.js (using program.methodName and context.position). Observe what happens, check arguments, variables, maybe write some tests, whatever, all is fair in love, war and debugging.

Most common problem is "undefined is not a function" which usually means that some method from standard library isn't implemented yet. Just set there a conditional breakpoint, check the name and implement.

Also using Timon is less painful than other engines, because you can inspect fragments of generated code in WebInspector (last time I checked Firefox didn't support source maps in functions created by Function constructor).

Ok, but what if there are no exceptions and the app isn't work correctly? Well, it's the hardest kind of problems. You can compare with [microemulator](https://code.google.com/p/microemu/) (microemu doesn't support all J2ME APIs, so it's not always possible) and JDB, even -XX:+TraceBytecodes with [fastdebug JDK](http://download.java.net/jdk6/6u25/promoted/b03/index.html). Usually you must be really creative to deal with these problems.

7. Testing
==========
Beforce you create any tests, create "config" file with following content:

```J2ME_JARS=<path to jar with MIDP>.jar
HOST=http://localhost:8000/```

You can get MIDP from Microemulator (microemulator.jar) or any J2ME SDK, doesn't matter, it just needed for compilation.

To test something just create a new directory in tests with Test.java file extending [TestMidlet](https://github.com/szatkus/js2me/blob/master/tests/TestMidlet.java). There are few methods to check if evething is correct and finish() method should be called in the end to print a summary. After that run ```$ ./generateTests.sh MyTestName```. Resulting JAR is placed in out directory. It's a good idea to check it first in microemu. There's also runTests.sh script, but it sometimes hangs because of bug in phantom.js.

8. Running on device
====================
In theory it's possible just select JS2ME directory in app-manager, but it also sends .git directory which is quite large at this time. Better run ```$ ./buildApp.sh``` and app will be created as jayme directory and jayme.zip.
