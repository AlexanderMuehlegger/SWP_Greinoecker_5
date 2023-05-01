package Command;

public class AddCommand implements ICommand {

    private int toAdd, addWith;

    public AddCommand() {
        this.toAdd = 0;
        this.addWith = 0;
    }

    public AddCommand(int toAdd, int addWith){
        this.toAdd = toAdd;
        this.addWith = addWith;
    }

    @Override
    public Object ausführen() {
        this.toAdd += this.addWith;
        return this.toAdd;
    }

    @Override
    public Object rückgängig() {
        this.toAdd -= this.addWith;
        return this.toAdd;
    }
    
}
