package Command;

public class MultiplyCommand implements ICommand {

    private int toMultiply, multiplyWith;

    public MultiplyCommand() {
        this.toMultiply = 0;
    }
    
    public MultiplyCommand(int toMultiply, int multiplyWith){
        this.toMultiply = toMultiply;
        this.multiplyWith = multiplyWith;
    }

    @Override
    public Object ausführen() {
        this.toMultiply *= this.multiplyWith;
        return this.toMultiply;
    }

    @Override
    public Object rückgängig() {
        this.toMultiply /= this.multiplyWith;
        return this.toMultiply;
    }
    
}
