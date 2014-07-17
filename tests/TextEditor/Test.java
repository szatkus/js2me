import java.io.IOException;
import com.nokia.mid.ui.TextEditor;

import javax.microedition.io.Connection;
import javax.microedition.io.Connector;
import javax.microedition.lcdui.Canvas;
import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.Font;
import javax.microedition.lcdui.Graphics;
import javax.microedition.midlet.MIDlet;
import javax.microedition.midlet.MIDletStateChangeException;


public class Test extends TestMidlet {

	protected void startApp() throws MIDletStateChangeException {
		Canvas c = new Canvas() {
			
			protected void paint(Graphics g) {
				g.setColor(0xFFFFFF);
				g.fillRect(0, 0, 300, 300);
				
			}
		};
		TextEditor editor = TextEditor.createTextEditor(10, 0, 100, 1);
		editor.setParent(c);
		Display d = Display.getDisplay(this);
		d.setCurrent(c);
		editor.setFocus(true);
		editor.setPosition(10, 10);
		editor.setSize(100, 30);
		editor.setFont(Font.getDefaultFont());
		editor.setBackgroundColor(0xff);
		editor.setForegroundColor(0);
		editor.setVisible(true);
		editor.setContent("test");
		editor.insert("a", 2);
		editor.setCaret(2);
		System.out.println(editor.getLineMarginHeight());
	}

}
