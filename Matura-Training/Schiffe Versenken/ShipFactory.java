import java.awt.Color;
import java.util.ArrayList;
import java.util.Random;

public class ShipFactory {
    public static Ship createShip(int length, ArrayList<Ship> ships){
        ArrayList<Position> pos = new ArrayList<>();
        Random rand = new Random();

        Orientation orientation = (rand.nextDouble() > .5)? Orientation.vertical : Orientation.horizontal;

        if(orientation == Orientation.horizontal){
            int x, y;
            ArrayList<Position> positions = new ArrayList<>();
            Color color = Utils.RandColor();
            boolean isDup;
            do{
                isDup = false;
                x = rand.nextInt(SVModel.BOARD_WIDTH-length);
                y = rand.nextInt(SVModel.BOARD_HEIGHT);

                for(int i = 0; i < length; i++){
                    positions.add(new Position(x+i, y, color));
                }

                Ship ship = new Ship(x, y, positions);

                for(Ship _ship : ships){
                    for(Position _pos : _ship.getPositions()){
                        if(positions.contains(_pos)){
                            isDup = true;
                            positions.clear();
                        }
                            
                    }
                }
                if(!isDup)
                    return ship;
                else
                    System.out.println("is duplicated");
            }while(true);
        }else if(orientation == Orientation.vertical){
            int x, y;
            ArrayList<Position> positions = new ArrayList<>();
            Color color = Utils.RandColor();
            boolean isDup;
            do{
                isDup = false;
                x = rand.nextInt(SVModel.BOARD_WIDTH);
                y = rand.nextInt(SVModel.BOARD_HEIGHT-length);

                for(int i = 0; i < length; i++){
                    positions.add(new Position(x, y+i, color));
                }

                Ship ship = new Ship(x, y, positions);

                for(Ship _ship : ships){
                    for(Position _pos : _ship.getPositions()){
                        if(positions.contains(_pos)){
                            isDup = true;
                            positions.clear();
                        }
                    }
                }
                if(!isDup)
                    return ship;
            }while(true);
        }

        return null;
    }
}
