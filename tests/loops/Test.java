import javax.microedition.lcdui.*;
import javax.microedition.lcdui.game.*;
import java.io.*;

public class Test extends TestMidlet {
	
	public void startApp() {
		int a = (new Integer(8)).intValue();
		int b = a + (new Integer(7)).intValue();
		int sum = 3;
		for (int i = 1; i < 9; i++) {
			sum *= i;
		}
		check(a == 8);
		System.out.println(a);
		check(b == 15);
		System.out.println(b);
		check(sum == 120960);
		System.out.println(sum);
		int i = 10;
		while (i > 0) {
			sum += i;
			i--;
		}
		check(sum == 121015);
		System.out.println(sum);
		finish();
	}
	
}
