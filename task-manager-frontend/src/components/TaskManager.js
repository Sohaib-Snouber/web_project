import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:5001/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!taskText.trim()) return;
    try {
      const response = await axios.post("http://localhost:5001/tasks", { text: taskText });
      setTasks([...tasks, response.data]);
      setTaskText("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5001/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Task Manager</h1>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <div style={{ marginTop: "20px" }}>
        {tasks.map(task => (
          <div key={task._id} style={{ marginBottom: "10px" }}>
            {task.text}
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: "10px" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskManager;
