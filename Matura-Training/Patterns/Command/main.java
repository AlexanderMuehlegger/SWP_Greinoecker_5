package Command;

public class main {
    public static void main(String[] args){
        ICommand cmd = new AddCommand(0, 5);
        CommandExecutor executor = new CommandExecutor();

        System.out.println(executor.execute(cmd));
        System.out.println(executor.undo());
        System.out.println(executor.redo());
    }
}