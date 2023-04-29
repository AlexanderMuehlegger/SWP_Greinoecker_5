import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.GridBagLayout;
import java.io.FileNotFoundException;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class SVGUI extends JFrame {

	private SVPanel game;

	public SVGUI(String title, SVController control, SVModel model) throws FileNotFoundException {
		super(title);
		setLayout(new BorderLayout());

		game = new SVPanel(control, model);
		// use this to center the play field
		JPanel centerPanel = new JPanel(new GridBagLayout());
		centerPanel.add(game);
		centerPanel.setBackground(Color.BLACK);
		add(centerPanel, BorderLayout.CENTER);

		JButton start = new JButton("Start");
		start.setName("START");
		start.addActionListener(control);
		add(start, BorderLayout.SOUTH);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setLocationRelativeTo(null);

	}

	public static void main(String[] args) throws FileNotFoundException {
		SVModel model = new SVModel();
		SVController control = new SVController(model);
		SVGUI gui = new SVGUI("Tetris", control, model);
		gui.setSize(1024, 1024);
		gui.setVisible(true);
	}
}