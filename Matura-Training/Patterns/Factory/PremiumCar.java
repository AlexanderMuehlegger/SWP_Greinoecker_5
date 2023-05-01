package Factory;

public class PremiumCar implements ICar{

    @Override
    public void makeSound() {
        System.out.println("WUUmmbrmrmmmmmm BRumdf premium");
    }

    @Override
    public void drive() {
        System.out.println("wuiiiimmmmmmmm weg");
    }
    
}
