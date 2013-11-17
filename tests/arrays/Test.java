public class Test extends TestMidlet {
	public void startApp() {
		Object[] a = new Object[5];
		a[3] = "smt";
		check(a[3].equals("smt"));
		Object[][] b = new Object[6][];
		b[1] = new String[3];
		check(b[1][0] == null);
		check(b[0] == null);
		finish();
	}
}
