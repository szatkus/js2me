public class TestBG extends TestMidlet {
	public void startApp() {
		try {
			System.out.println(Common.shared);
			Thread.sleep(100);
			Common.shared = "Second";
			Thread.sleep(1000);
			System.out.println("Second is " + Common.shared);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
