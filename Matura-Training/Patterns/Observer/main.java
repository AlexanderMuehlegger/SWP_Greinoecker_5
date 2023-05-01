package Observer;

public class main {
    public static void main(String[] args) {
        IAbonnent müller = new Müller();
        IAbonnent schmidt = new Schmidt();

        Zeitung zeitung = new Zeitung();

        zeitung.register(schmidt);
        zeitung.register(müller);

        zeitung.publish();

        zeitung.unregister(müller);

        zeitung.publish();
    }
}
