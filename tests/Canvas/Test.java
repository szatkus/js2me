import javax.microedition.lcdui.*;
import javax.microedition.lcdui.game.*;
import java.io.*;
class Game extends Canvas {
	public void paint(Graphics g) {
		g.drawLine(0, 0, 100, 100);
		g.drawLine(20, 20, 20, 150);
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
