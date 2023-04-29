import java.awt.RenderingHints.Key;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

import javax.swing.JButton;

public class SVController extends KeyAdapter implements ActionListener {

	SVModel model;

	public SVController(SVModel model) {
		this.model = model;
	}

	public void keyPressed(KeyEvent e) {
		switch (e.getKeyCode()) {
            case KeyEvent.VK_SPACE:
				model.shoot();
                break;
            case KeyEvent.VK_UP:
            case KeyEvent.VK_W:
                model.up();
				break;
			case KeyEvent.VK_DOWN:
			case KeyEvent.VK_S:
				model.down();
				break;
			case KeyEvent.VK_LEFT:
			case KeyEvent.VK_A:
				model.left();
				break;
			case KeyEvent.VK_RIGHT:
			case KeyEvent.VK_D:
				model.right();
				break;
            default:
                return;
            }
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		JButton b = (JButton) e.getSource();
		if (b.getName().equals("START"))
			model.start();

	}

}