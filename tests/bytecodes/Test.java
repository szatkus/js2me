public class Test extends TestMidlet {
	public void startApp() {
		String s = null;
		check(s == null);
		int i = (new Integer(-1)).intValue();
		check(i == -1);
		i = 0;
		check(i == 0);
		i = 1;
		check(i == 1);
		i = 2;
		check(i == 2);
		i = 3;
		check(i == 3);
		i = 4;
		check(i == 4);
		i = 5;
		check(i == 5);
		long l = 0;
		check(l == 0);
		l = 1;
		check(l == 1);
		byte b = -113;
		check(b == -113);
		b = 113;
		check(b == 113);
		short q = -424;
		check(q == -424);
		q = 1424;
		check(q == 1424);
		s = "test";
		check(s.equals("test"));
		//16
		l = 542434;
		check(l == 542434);
		l = l + 566;
		check(l == 543000);
		String s2 = s;
		check(s2.equals(s));
		check(s2.equals("test"));
		byte[] bb = new byte[9];
		for (byte j = 0; j < bb.length; j++) {
			bb[j] = j;
		}
		for (byte j = 0; j < bb.length; j++) {
			check(bb[j] == j);
		}
		String[] ss = new String[4];
		ss[0] = "s";
		for (byte j = 1; j < ss.length; j++) {
			ss[j] = ss[j-1] + 's';
		}
		for (byte j = 0; j < ss.length; j++) {
			check(ss[j].length() == j + 1);
			check(ss[j].length() - 1 == ss[j].lastIndexOf("s"));
		}
		//37
		check(i >> 2 == 1);
		check(i << 2 == 20);
		finish();
	}
}
