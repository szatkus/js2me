import javax.microedition.lcdui.*;
import javax.microedition.lcdui.game.*;
import java.io.*;
class T1 extends Thread{
	public Object obj;
	public void run() {
		synchronized (this.obj) {
			System.out.println("It's mine!");
			try {
				Thread.sleep(1500);
				this.obj.wait();
				System.out.println("All right");
			} catch (Exception e) {}
		}
	}
}

class T2 extends Thread{
	public Object obj;
	public void run() {
		synchronized (this.obj) {
			System.out.println("No, mine!");
			try {
				Thread.sleep(500);
			} catch (Exception e) {}
		}
	}
}

class T3 extends Thread{
	public Object obj;
	public void run() {
		try {
			Thread.sleep(100);
			synchronized (this.obj) {
				System.out.println("Mine!");
				synchronized (this.obj) {
					Thread.sleep(2500);
					this.obj.notify();
				}
			}
		} catch (Exception e) {}
	}
}

public class Test extends TestMidlet {
	
	public void startApp() {
		Object obj = new Object();
		T1 t1 = new T1();
		t1.obj = obj;
		T2 t2 = new T2();
		t2.obj = obj;
		T3 t3 = new T3();
		t3.obj = obj;
		t1.start();
		try {
			Thread.sleep(100);
		} catch (Exception e) {}
		t2.start();
		t3.start();
		finish();
	}
	
}
