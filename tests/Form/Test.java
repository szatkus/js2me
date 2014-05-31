import javax.microedition.lcdui.*;
import java.io.*;
public class Test extends TestMidlet {
	public void startApp() {
		try {
			Image image = Image.createImage("/test.png");
			StringItem string = new StringItem("test string item", "string text");
			Gauge gauge = new Gauge("test gauge", true, 4, 18);
			TextField field = new TextField("test text field", "text", 4, 0);
			Form form = new Form("test form");
			form.append(image);
			form.append(string);
			form.append(gauge);
			form.append(field);
			Display display = Display.getDisplay(this);
			display.setCurrent(form);
		} catch (IOException e) {
		}
		finish();
	}
}
