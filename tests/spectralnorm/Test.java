public class Test extends TestMidlet {
	public void startApp() {
		
		String[] args = new String[]{"100"};
		for (int i = 0; i < 10; i++) {
			spectralnorm.main(args);
		}
		finish();
	}
}
