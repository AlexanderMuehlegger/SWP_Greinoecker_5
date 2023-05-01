package Strategy;

public class main {
    public static void main(String[] args) {
        IStrategy strat = new PayPalStrat("hallo@gmail.com", "hello");
        IStrategy strat2 = new CreditStrat(1324156786);

        CheckOut checkout = new CheckOut(1233456);

        checkout.pay(strat);
        checkout.pay(strat2);
    }
}
