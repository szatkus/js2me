public class Test extends TestMidlet {
	public void startApp() {
		
		String[] args = new String[]{"500"};
		for (int i = 0; i < 10; i++) {
			nbody.main(args);
		}
		finish();
	}
}
