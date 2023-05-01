package Factory;

public class LowendCar implements ICar {

    @Override
    public void makeSound() {
        System.out.println("BRRRRRUm... abgsuffn");
    }

    @Override
    public void drive() {
        System.out.println("MEEEEEEEEEEe... waart bin glei weg!");
    }
    
}
