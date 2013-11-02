import javax.microedition.media.*;
public class Test extends TestMidlet implements PlayerListener {
	public void startApp() {
		try {
			Player player = Manager.createPlayer(getClass().getResourceAsStream("jump.wav"), "audio/x-wav");
			player.addPlayerListener(this);
			System.out.println(1);
			player.setLoopCount(7);
			System.out.println(2);
			player.prefetch();
			System.out.println(3);
			player.realize();
			System.out.println(4);
			player.start();
			System.out.println(5);
		} catch (Exception e) {
			e.printStackTrace();
		}
		finish();
	}
	public void playerUpdate(Player player, String event, Object eventData) {
		System.out.println(event);
		System.out.println(eventData.getClass().getName());
	}
}
