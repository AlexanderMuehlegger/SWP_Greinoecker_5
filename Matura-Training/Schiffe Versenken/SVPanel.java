import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Observable;
import java.util.Observer;

import javax.swing.BorderFactory;
import javax.swing.BoxLayout;
import javax.swing.JPanel;

public class SVPanel extends JPanel implements Observer {

	private final int CELL_SIZE = 40;
	private final int PIXEL_WIDTH = CELL_SIZE * SVModel.BOARD_WIDTH;
	private final int PIXEL_HEIGHT = CELL_SIZE * SVModel.BOARD_HEIGHT;

	public SVPanel(SVController controller, SVModel model) throws FileNotFoundException {
		model.addObserver(this); // no need to store the model here

		setBorder(BorderFactory.createMatteBorder(0, 0, 0, 1, Color.BLACK));
		setPreferredSize(new Dimension(PIXEL_WIDTH, PIXEL_HEIGHT));
		setMaximumSize(new Dimension(PIXEL_WIDTH, PIXEL_HEIGHT));
		setBackground(Color.RED);
		setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
		setBorder(BorderFactory.createLineBorder(Color.BLUE));
		addKeyListener(controller);
	}

	@Override
	public void update(Observable o, Object arg) {
		setFocusable(true); // otherwise key listener will not work
		requestFocusInWindow();

		SVMessage msg = (SVMessage) arg;

		switch (msg.getAction()) {
		case GAMEOVER:

			System.out.println("Game over");
			System.exit(0);
			break;
		case REDRAW:
			Graphics g = this.getGraphics();
			Graphics2D g2d = (Graphics2D) g;

			g.clearRect(0, 0, getWidth(), getHeight());

			ArrayList<Ship> ships = msg.getPiece();
			Position cursor = msg.getCursor();

			for(Ship ship : ships){
                for (Position pos : ship.getPositions()) {
					g2d.setStroke(new BasicStroke(1));
                    g.setColor(pos.getColor());
                    g.fillRect(CELL_SIZE * pos.getX(), CELL_SIZE * pos.getY(), CELL_SIZE, CELL_SIZE);
                    g.setColor(Color.black);
                    g.drawRect(CELL_SIZE * pos.getX(), CELL_SIZE * pos.getY(), CELL_SIZE, CELL_SIZE);
				}
            }

			g2d.setStroke(new BasicStroke(3));
			g2d.drawRect(CELL_SIZE * cursor.getX(), CELL_SIZE * cursor.getY(), CELL_SIZE, CELL_SIZE);
		}
	}

}