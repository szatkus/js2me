public class Test extends TestMidlet {
	public void startApp() {
		long l = -2L;
		check(l < 0L);
		check(l > -9999999999L);
		finish();
	}
}
