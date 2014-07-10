import javax.microedition.lcdui.*;
import javax.microedition.lcdui.game.*;
import java.io.*;
class T1 extends Thread{
	public Object obj;
	public void run() {
		Test.smt("side");
	}
}

public class Test extends TestMidlet {
	synchronized static public void smt(String s) {
		System.out.println("Hey " + s);
		try {
			Thread.sleep(3000);
		} catch (Exception e) {}
	}
	
	public void startApp() {
		T1 t1 = new T1();
		t1.start();
		Test.smt("main");
		finish();
	}
	
}
