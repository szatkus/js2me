public class Test extends TestMidlet {
	public void startApp() {
		
		String[] args = new String[]{"50"};
		try {
			for (int i = 0; i < 10; i++) {
				mandelbrot.main(args);
			}
		} catch (Exception e) {
		}
		finish();
	}
}
