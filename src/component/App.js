import "../style.css";
import Input from "./input";
import Button from "./Button";
import Head from "./Head";
import { useState, useEffect } from "react";

function App() {
  const [editItem, setEditItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [task, setTask] = useState("");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("MyData");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("MyData", JSON.stringify(items));
  }, [items]);

  function AddTask() {
    if (!task.trim()) return;
    const newTask = {
      text: task.trim(),
      completed: false,
    };
    setItems([...items, newTask]);
    setTask("");
  }

  function switchTask(i) {
    const copy = [...items];
    copy[i].completed = !copy[i].completed;
    setItems(copy);
  }

  function saveEdit() {
    if (editIndex === null || editItem.trim() === "") return;
    const updatedItem = [...items];
    updatedItem[editIndex].text = editItem.trim();
    setItems(updatedItem);
    setEditIndex(null);
    setEditItem("");
  }
  /*function cancelOption() {
    if
      
    
  }*/

  return (
    <div className="App">
      <div className="background" />

      <div className="head-div">
        <Head />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Input task={task} setTask={setTask} />
          <Button onAdd={AddTask} />
        </div>

        <div className="task-item">
          <ul>
            {items.map((item, id) => (
              <li
                key={id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {editIndex === id ? (
                  <input
                    value={editItem}
                    onChange={(e) => setEditItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit();
                    }}
                    
                  />
                ) : (
                  <span
                    style={{
                      flex: 1,
                      textDecoration: item.completed ? "line-through" : "none",
                      opacity: item.completed ? 0.6 : 1,
                      wordBreak: "break-word",
                    }}
                  >
                    {item.text}
                  </span>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => switchTask(id)}
                  />
                  {editIndex === id ? (
                    <button onClick={saveEdit}>Save</button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditIndex(id);
                        setEditItem(item.text);
                      }}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setItems(items.filter((_, i) => i !== id));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
