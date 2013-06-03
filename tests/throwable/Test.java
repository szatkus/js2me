public class Test extends TestMidlet {
	public void startApp() {
		Throwable t = new NullPointerException();
		String s = t.getClass().getName();
		check(t.toString().equals(s));
		check(t.getMessage() == null);
		t = new OutOfMemoryError("test");
		s = t.getClass().getName() + ": " + t.getMessage();
		check(t.getMessage().equals("test"));
		check(t.toString().equals(s));
		finish();
	}
}
