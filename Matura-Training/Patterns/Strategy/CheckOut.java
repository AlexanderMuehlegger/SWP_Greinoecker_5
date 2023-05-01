package Strategy;

public class CheckOut {
    int amount; 


    public CheckOut(int amount) {
        this.amount = amount;
    }

    public void pay(IStrategy strat){
        strat.pay();
    }
}
