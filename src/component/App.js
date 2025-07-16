import "../style.css";
import Input from "./input";
import Button from "./Button";
import Head from "./Head";
import { useState } from "react";

function App() {
    const [task,setTask] = useState("");
    const [items,setItem] = useState([]);
    
    function AddTask() {
      if (!task.trim() ) return;

      // create object for  new task
        const newTask = {
          text: task.trim(),
          completed:false,
        };
        setItem([...items, newTask]);//new task to the old tasks
        setTask("");
      }
      // this function changes the task (complete - not complete)
      function switchTask(i){
        const copy = [...items]; //copy the items
        copy[i].completed = !copy[i].completed;//change th case
        setItem(copy);
      }
  return (
    <div className="App">
      <div className="background" />

      <div className="head-div">
          <Head/>
      </div>
      <div  style={{
      position:"relative",
      zIndex:1,
      display: "flex",
      flexDirection:"column",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "20px",
      }}>
          <div
          style={{
            display:"flex",
            flexDirection:"row",
            gap:"10px"
          }}>
            <Input task={task} setTask={setTask}/>
            
            <Button onAdd={AddTask} />
          </div >
          <div className="task-item">
          <ul>
            {items.map((item, id)=>(
              <li key={id}  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    flex: 1,   // This element (the text) takes all the remaining space in the row
                    textDecoration: item.completed ? "line-through" : "none",   // Strike-through if task is completed
                    opacity: item.completed ? 0.6 : 1,  // Faded (60%) if completed, fully visible if not
                    wordBreak: "break-word",   // Break long words to a new line if they don’t fit
    }}
  >
                  {item.text}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}> 
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => switchTask(id)}
                />
                </div>
              <button
                onClick={()=> {
                  setItem(items.filter((_,i)=>i !== id))
          }}
          >
            Delete
            </button>
            
            </li>
            ))}
            </ul>
    </div>
  </div>
</div>
  );
}

export default App;
