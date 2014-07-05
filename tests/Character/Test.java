import java.io.*;
import java.util.Date;
public class Test extends TestMidlet {
	public void startApp() {
		try {
			int d = 65537;
			char c = (char)d;
			compare(c, 1);
			d = -3;
			c = (char)d;
			compare(c, 65533);
			Character cc = new Character(c);
			compare(cc.charValue(), 65533);
		} catch (Exception e) {
			e.printStackTrace();
			check(false);
		}
		finish();
	}
}
