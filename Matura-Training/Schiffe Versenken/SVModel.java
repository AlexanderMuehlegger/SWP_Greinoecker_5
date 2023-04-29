import java.awt.Color;
import java.util.ArrayList;
import java.util.Observable;
import java.util.TimerTask;




public class SVModel extends Observable {
    
    public static int BOARD_WIDTH = 10;
    public static int BOARD_HEIGHT = 10;
    public static int[] length_ship = new int[10];
    private int max_missed = 5; 

    private ArrayList<Ship> ships = new ArrayList<>();
    private ArrayList<Ship> shootedShips = new ArrayList<>();
    private Position cursor;
    
    static {
        length_ship[0] = 1;
        length_ship[1] = 1;
        length_ship[2] = 1;
        length_ship[3] = 1;
        length_ship[4] = 2;
        length_ship[5] = 2;
        length_ship[6] = 2;
        length_ship[7] = 3;
        length_ship[8] = 3;
        length_ship[9] = 4;
    }

    public SVModel() {
        this.init();
    }

    private void init() {
        this.cursor = new Position(0, 0, Color.BLUE);
        for(int length : length_ship){
            System.out.println("generating for length: " + length);
            this.ships.add(ShipFactory.createShip(length, this.ships));
        }

        for(Ship ship : this.ships){
            System.out.println(ship);
        }
    }

    public void start() {
        notify(SVMessage.ACTION.REDRAW);
    }

    public void shoot() {
        for(Ship ship : this.ships){
            if(ship.getPositions().contains(cursor)){
                this.shootedShips.add(ship);
                this.ships.remove(ship);
                notify(SVMessage.ACTION.REDRAW);
                return;
            }
        }

        this.max_missed--;
        this.checkGameOver();
    }

    public void down() {
        if(cursor.getY() >= BOARD_HEIGHT-1)
            return;
        
        cursor.add(0, 1);
        notify(SVMessage.ACTION.REDRAW);
    }


    public void left() {
        if(cursor.getX() <= 0)
            return;

        cursor.add(-1, 0);
        notify(SVMessage.ACTION.REDRAW);
    }

    public void right() {
        if(cursor.getX() >= BOARD_WIDTH-1)
            return;
            
        cursor.add(1, 0);        
        notify(SVMessage.ACTION.REDRAW);
    }

    public void up() {
        if(cursor.getY() <= 0)
            return;
        
        cursor.add(0, -1);
        notify(SVMessage.ACTION.REDRAW);
    }

    public void checkGameOver() {
        if(this.max_missed <= 0)
            notify(SVMessage.ACTION.GAMEOVER);
    }


    public void notify(SVMessage.ACTION action){
        setChanged();
        notifyObservers(new SVMessage(action, this.cursor, this.shootedShips));
    }
}
