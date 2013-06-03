import javax.microedition.midlet.MIDlet;

public abstract class TestMidlet extends MIDlet {
	int tests = 0;
	int passed = 0;
	public void check(boolean result) {
		tests++;
		if (result) {
			System.out.println("Test " + tests + " passed");
			passed++;
		} else {
			System.out.println("Test " + tests + " failed");
		}
	}
	public void finish() {
		System.out.println(passed + "/" + tests);
	}
	public void pauseApp() {
	}
	public void destroyApp(boolean b) {
	}
}
