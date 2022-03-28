Quick tutorial how to implement Java classes in JS2ME project.

Let's say we want to implement String class. It's full path is java.lang.String, so we have to create java/lang/String.js file. The minimal implementation looks like this:

```javascript
js2me.createClass({
});
```

It's the empty class with no methods which superclass is java.lang.Object. It will be loaded if running application needs it and will be visible in JS as javaRoot.$java.$lang.$String. You can also use createInterface for interfaces.

Let's implement some method. Frankly it's the most weird thing in that project. For example let's take method defined in javadoc as:

`int	indexOf(String str, int fromIndex)`

Internaly in JVM it's described as struct. I generate method's name from two fields, methodName (here: "indexOf") and type (here: "(Ljava.lang.String;I)I"). In first step I do concatenation of these two. Also use $ prefix.

`$indexOf(Ljava.lang.String;I)I`

And do some replacements to make correct JavaScript function name.

```
() -> $
[.; -> _
```

Here it is:

`$indexOf$Ljava_lang_String_I$I`

Yes, that little, freaky monster is the name of our method. Here is a sample implementation:

```javascript
$indexOf$Ljava_lang_String_I$I: function (str, start) {
	if (str == null) {
		throw new javaRoot.$java.$lang.$NullPointerException();
	}
	return this.text.indexOf(str.text, start);
}
```

There are three types of special methods.
1. _initXXX (where XXX is type part which is different for different methods), it's just <init> method. For people who never read JVM specification: a constructor.

2. _clinit$$V (<clinit> in JVM terms). This method is called when class is initialized.

3. construct (yes, no dollars in name). It's called during creating new object (<init> is called much later). It's only useful if you want to create instance of your class from JS and don't call <init> method manually. Remember that JVM could call this method without arguments. Sample implementation from String class:

```javascript
construct: function (text) {
	this.text = text
}
```

I deliberately chose this class, because String is the most used class and it's good to know how it's wrapping JS string.

Also there are some special fields.
1. superclass. Just name of superclass, you have to use my internal dollar convention.
superClass: 'javaRoot.$javax.$microedition.$lcdui.$Item'

2. interfaces. An array of names of some interfaces.
interfaces: ['javaRoot.$java.$util.$Enumeration']

2. require. An array of names with all classes needed to execute the methods (for example if create SomethingHappenedException in one of the methods you should add its name here). You don't have to add basic classes like javaRoot.$java.$lang.$NullPointerException or javaRoot.$java.$lang.$String.
