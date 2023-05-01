package Strategy;

public class CreditStrat implements IStrategy {
    
    private int number;

    public CreditStrat(int number){
        this.number = number;
    }

    @Override
    public void pay() {
        System.out.println("Payed with CreditCard: " + number);
    }
}
