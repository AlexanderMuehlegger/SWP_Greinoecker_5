package Command;

import java.util.Stack;

public class CommandExecutor {
    private Stack<ICommand> redo = new Stack<>();
    private Stack<ICommand> undo = new Stack<>();

    public Object execute(ICommand command){
        undo.add(command);
        return command.ausführen();
    }
    
    public Object redo(){
        ICommand cmd = redo.pop();
        undo.add(cmd);
        return cmd.ausführen();
    }

    public Object undo(){
        ICommand cmd = undo.pop();
        redo.add(cmd);
        return cmd.rückgängig();
    }


}
