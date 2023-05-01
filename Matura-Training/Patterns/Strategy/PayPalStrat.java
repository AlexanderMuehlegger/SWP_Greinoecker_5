package Strategy;

public class PayPalStrat implements IStrategy {

    private String email, pw;

    public PayPalStrat(String email, String pw) {
        this.email = email;
        this.pw = pw;
    }

    @Override
    public void pay() {
        System.out.println("Payed with PayPal-Account: " + this.email);
    }
    
}
