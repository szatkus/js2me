public class Test extends TestMidlet {
	public void startApp() {
		long l = -2L;
		long l2 = 9999999999L;
		check(l < 0L);
		check(l > -l2);
		compare(l >> 8, -1L);
		compare(l << 8, -512L);
		compare(l >>> 8, 72057594037927935L);
		compare(l2 >> 8, 39062499L);
		compare(l2 << 8, 2559999999744L);
		compare(l2 >>> 8, 39062499L);
		compare(l ^ (-5L), 5);
		compare(54795397543579L ^ l2, 54788083373412L);
		l2 = 1209600000L;
		compare(7181719286742488885L / l2, 5937267928L);
		l2 = -86400000L;
		compare(-840964434L / l2, 9);
		finish();
	}
}
