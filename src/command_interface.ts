interface CommandInterface{
   execute(): Promise<void> 
   undo(): Promise<void>
}

export default CommandInterface