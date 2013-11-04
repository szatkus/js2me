public class Test extends TestMidlet {
	public void startApp() {
		Runtime r = Runtime.getRuntime();
		System.out.println(r.freeMemory());
		System.out.println(r.totalMemory());
		r.gc();
		finish();
		r.exit(99);
	}
}
