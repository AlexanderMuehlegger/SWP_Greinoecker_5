package Factory;

public class Factory {
    
    public static ICar createCar(int type) {
        switch(type){
            case 0:
                return new PremiumCar();
            case 1:
                return new LowendCar();
            default: 
                return new ICar() {

                    @Override
                    public void makeSound() {
                        // TODO Auto-generated method stub
                        System.out.println("Unimplemented method 'makeSound'");
                    }

                    @Override
                    public void drive() {
                        // TODO Auto-generated method stub
                        System.out.println("Unimplemented method 'drive'");
                    }
                    
                };
            
        }
    }

}
