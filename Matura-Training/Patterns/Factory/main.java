package Factory;

public class main {
    public static void main(String[] args){

        ICar myCar = Factory.createCar(0);
        
        myCar.makeSound();
        myCar.drive();
        
        ICar myCar2 = Factory.createCar(1);
        myCar2.makeSound();
        myCar2.drive();
        

    }
}
