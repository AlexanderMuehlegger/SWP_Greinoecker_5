package Singelton;

public class MySingelton {
    
    private static MySingelton instance;

    private MySingelton(){}

    public static MySingelton getInstance() {
        if(instance == null){
            instance = new MySingelton();
            System.out.println("created isntance");
        }else {
            System.out.println("instance already exists");
        }
        return instance;
    } 

}
