

import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

async function checkBackend() {
  try {
    const response = await fetch(`${API_URL}/`);
    const message = await response.text();
    console.log(message);
  } catch (error) {
    console.error("Backend connection failed:", error);
  }
}


function App() {
  useEffect(() => {
   checkBackend();
}, []);
  const [task, setTask] = useState("");
  checkBackend();
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  function addTask() {
    if (task.trim() === "") return;

    setTasks([...tasks, task]);
    setCompletedTasks([...completedTasks, false]);
    setTask("");
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
    setCompletedTasks(completedTasks.filter((_, i) => i !== index));
  }

  function toggleTask(index) {
    const updatedTasks = [...completedTasks];
    updatedTasks[index] = !updatedTasks[index];
    setCompletedTasks(updatedTasks);
  }

  return (
    <div className="app">
      
     <div className="doodle doodle-1" aria-hidden="true">📚</div>
     <div className="doodle doodle-2" aria-hidden="true">✏️</div>
    <div className="doodle doodle-3" aria-hidden="true">📖</div>
    <div className="doodle doodle-4" aria-hidden="true">✏️</div>
    <div className="doodle doodle-5" aria-hidden="true">📚</div>
    <div className="doodle doodle-6" aria-hidden="true">✏️</div>

       <div className="doodle doodle-book" aria-hidden="true">📚</div>
       <div className="doodle doodle-pencil" aria-hidden="true">✏️</div>
      <div className="task-card">
        <h1>Student Task Manager</h1>
        <p className="subtitle">
          Organize your assignments, one task at a time.
        </p>

        <div className="task-input">
          <input
            type="text"
            placeholder="Enter your assignment..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button className="add-button" onClick={addTask}>
            + Add Task
          </button>
        </div>

        <h2>My Tasks ({tasks.length})</h2>

        {tasks.length === 0 ? (
          <p className="empty-message">
            No tasks yet. Add your first assignment!
          </p>
        ) : (
          <ul className="task-list">
            {tasks.map((item, index) => (
              <li className="task-item" key={index}>
                <input
                  type="checkbox"
                  checked={completedTasks[index]}
                  onChange={() => toggleTask(index)}
                />

                <span className={completedTasks[index] ? "completed" : ""}>
                  {item}
                </span>

                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
