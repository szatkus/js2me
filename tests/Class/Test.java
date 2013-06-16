import java.io.*;
import java.util.Date;
public class Test extends TestMidlet {
	public void startApp() {
		try {
			Class c = Class.forName("java.util.Date");
			compare(c.getName(), "java.util.Date");
			System.out.println(c.toString());
			Object o = new Object();
			check(!c.isArray());
			check(o.getClass().isAssignableFrom(c));
			check(!c.isAssignableFrom(o.getClass()));
			check(!c.isAssignableFrom("test".getClass()));
			check(!c.isInstance("test"));
			check(o.getClass().isInstance("test"));
			check(!c.isInterface());
			Date d = (Date)c.newInstance();
			compare("test".getClass().getName(), "java.lang.String");
			c = this.getClass();
			InputStream s = c.getResourceAsStream("test.png");
			compare(s.available(), 291);
			compare(s.read(), 137);
		} catch (Exception e) {
			e.printStackTrace();
			check(false);
		}
		finish();
	}
}
