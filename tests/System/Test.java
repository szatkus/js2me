public class Test extends TestMidlet {
	public void startApp() {
		int[] a = new int[] {1,2,3,4,5,6,7,8, 8, 10, 11, 12, 13, 14, 15, 16, 17};
		System.arraycopy(a, 0, a, 3, 7);
		System.out.println(a[0]);
		System.out.println(a[1]);
		System.out.println(a[2]);
		System.out.println(a[3]);
		System.out.println(a[4]);
		System.out.println(a[5]);
		System.out.println(a[6]);
		System.out.println(a[7]);
		System.out.println(a[8]);
		System.out.println(a[9]);
		finish();
	}
}
