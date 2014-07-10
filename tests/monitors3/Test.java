import javax.microedition.lcdui.*;
import javax.microedition.lcdui.game.*;
import java.io.*;

class t extends Thread {
	public synchronized void a() {
		System.out.println("buum");
	}
	
	public void run() {

		synchronized (this) {
			try {
				Thread.sleep(1000);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		System.out.println("enddd");
	}
}

public class Test extends TestMidlet {
	
	public void startApp() {
		t o = new t();
		o.start();
		try {
			Thread.sleep(400);
		} catch (Exception e) {
			e.printStackTrace();
		}
		o.a();
		System.out.println("end");
		finish();
	}
	
}
