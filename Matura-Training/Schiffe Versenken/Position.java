import java.awt.Color;

public class Position {
    private int absX = 0;
    private int absY = 0;
    private Color color = Color.RED;

    public Position() {}

    public Position(int x, int y, Color color){
        this.absX = x;
        this.absY = y;
        this.color = color;
    }

    public void add(int x, int y){
        this.absX += x;
        this.absY += y;
    }

    public int getX(){
        return this.absX;
    }

    public int getY(){
        return this.absY;
    }

    public Color getColor() {
        return this.color;
    }

    @Override
    public String toString() {
        return "\nx: " + this.absX + " y: " + this.absY;
    }

    public boolean equals(Object obj){
        Position pos = (Position) obj;
        return this.absX == pos.getX() && this.absY == pos.getY(); 
    }
}
