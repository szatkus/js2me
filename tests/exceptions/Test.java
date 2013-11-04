import javax.microedition.lcdui.*;
import javax.microedition.lcdui.game.*;
import java.io.*;

public class Test extends TestMidlet {
	
	public void startApp() {
		int i = 8;
		try {
			i /= 0;
		} catch (Exception e) {
			i++;
		}
		check(i == 9);
		finish();
	}
	
}
