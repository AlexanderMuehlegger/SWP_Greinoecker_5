package Observer;

import java.util.ArrayList;

public class Zeitung {
    private ArrayList<IAbonnent> observers = new ArrayList<>();


    public void publish() {
        for(IAbonnent abonnent : observers){
            abonnent.read();
        }
    }

    public void register(IAbonnent abonnent) {
        this.observers.add(abonnent);
    }

    public void unregister(IAbonnent abonnent){
        this.observers.remove(abonnent);
    }
}
