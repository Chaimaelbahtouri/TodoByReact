

export default function Input({task, setTask}){
    
    return(
        <input 
            className= "input"
            placeholder="Add a task ..."
            value={task}
            onChange={(event)=> setTask(event.target.value)}
        />
    );
}