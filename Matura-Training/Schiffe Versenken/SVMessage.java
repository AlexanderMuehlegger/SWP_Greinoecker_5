import java.util.ArrayList;


public class SVMessage {
    enum ACTION {
        REDRAW, GAMEOVER
    }

    private ACTION Action;
    private Position Cursor;
    private ArrayList<Ship> ships;

    public SVMessage() {}

    public SVMessage(ACTION action, Position cursor, ArrayList<Ship> ships){
        this.Action = action;
        this.Cursor = cursor;
        this.ships = ships;
    }

    public Position getCursor(){
        return this.Cursor;
    }

    public ACTION getAction(){
        return this.Action;
    }

    public ArrayList<Ship> getPiece(){
        return this.ships;
    }

}
