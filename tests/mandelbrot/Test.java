public class Test extends TestMidlet {
	public void startApp() {
		
		String[] args = new String[]{"50"};
		try {
		mandelbrot.main(args);
		mandelbrot.main(args);
		mandelbrot.main(args);
		} catch (Exception e) {
		}
		finish();
	}
}
