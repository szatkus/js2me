public class Test extends TestMidlet {
	public void startApp() {
		try {
			System.out.println(Common.shared);
			Common.shared = "First";
			Thread.sleep(1000);
			System.out.println("First is " + Common.shared);
		} catch (Exception e) {
			e.printStackTrace();
		}
		finish();
	}
}
