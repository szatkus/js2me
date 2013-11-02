public class Test extends TestMidlet {
	public void startApp() {
		Runtime r = Runtime.getRuntime();
		System.out.println(r.freeMemory());
		System.out.println(r.totalMemory());
		r.gc();
		r.exit(99);
		finish();
	}
}
