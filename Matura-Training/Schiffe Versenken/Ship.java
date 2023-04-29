import java.util.ArrayList;

public class Ship {
    private int x, y;
    private ArrayList<Position> positions;

    public Ship() {
    }

    public Ship(Ship s){
        this.x = s.x;
        this.y = s.y;
        this.positions = s.positions;
    }

    public Ship(int x, int y, ArrayList<Position> pos){
        this.x = x;
        this.y = y;
        this.positions = pos;
    }

    public ArrayList<Position> getPositions(){
        return this.positions;
    }

    @Override
    public String toString(){
        return "\nx: " + this.x + "\ny: " + this.y + "\nPositions: " + this.positions.toString();
    }
}
