public class Common {
	public static String shared = "";
	static {
		System.out.println("You should see this 2 times");
		System.out.println(Thread.currentThread());
	}
}
