import java.awt.Color;
import java.util.Random;

public class Utils {
    private static Random rand = new Random();
    
    public static Color RandColor(){
        int green = rand.nextInt(256);
        int red = rand.nextInt(256);
        int blue = rand.nextInt(256);

        return new Color(red, green, blue, 100);
    }
}
