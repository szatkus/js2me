import javax.microedition.lcdui.*;

public class Test extends TestMidlet {
	static class Stat2 {
		static Image img;
		static {
			try {
				img = Image.createImage("test.png");
			} catch (Exception e) {
				e.printStackTrace();
			}
			System.out.println("First");
		}
		static public String getSmt() {
			return "test.png";
		}
	}
	static class Stat1 {
		static Image img;
		static {
			try {
				img = Image.createImage(Stat2.getSmt());
			} catch (Exception e) {
				e.printStackTrace();
			}
			System.out.println("Second");
		}
		static public int getSmt() {
			return 99;
		}
	}
	public void startApp() {
		System.out.println(Stat1.getSmt());
		System.out.println("Third");
		finish();
	}
}
