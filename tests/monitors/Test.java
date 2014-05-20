import javax.microedition.lcdui.*;
import javax.microedition.lcdui.game.*;
import java.io.*;

class t extends Thread {
	public synchronized void a() {
		try {
			notify();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void run() {
		try {
			wait();
		} catch (InterruptedException e) {
			System.out.println(e.getMessage());
		}
		synchronized (this) {
			try {
				wait();
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
			Thread.sleep(1000);
		} catch (Exception e) {
			check(false);
		}
		try {
			o.notify();
			check(false);
		} catch (IllegalMonitorStateException e) {
			check(true);
		}
		o.a();
		System.out.println("end");
		finish();
	}
	
}
