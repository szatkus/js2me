import javax.microedition.lcdui.*;
import javax.microedition.lcdui.game.*;
import java.io.*;
class Game extends GameCanvas {
	public Game() {
		super(true);
	}
	public void keyPressed(int a) {
		System.out.println(getKeyStates());
	}
}
public class Test extends TestMidlet {
	
	public void startApp() {
		Display d = Display.getDisplay(this);
		Game g = new Game();
		d.setCurrent(g);
		finish();
	}
	
}
