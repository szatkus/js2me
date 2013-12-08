import java.util.Date;

public class Test extends TestMidlet {
	public void startApp() {
		Date d = new Date();
		compare(d.getTime(), System.currentTimeMillis());
		Date d2 = new Date(4873984739798L);
		compare(d2.getTime(), 4873984739798L);
		check(!d.equals(d2));
		compare(d2.hashCode(), -803140168);
		check(d2.toString().indexOf("2124") != -1);
		d.setTime(4873984739798L);
		check(d.equals(d2));
		finish();
	}
}
