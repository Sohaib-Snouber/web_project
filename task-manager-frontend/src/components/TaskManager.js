import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import config from "../config";

function TaskManager({onLogout}) {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
        try {
          const token = localStorage.getItem("token");  // Get the token from localStorage
          const response = await axios.get(`${config.baseURL}/tasks`, {
            headers: { Authorization: `Bearer ${token}` }  // Include token in request headers
          });
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
      const token = localStorage.getItem("token");  // Get the token from localStorage
      const response = await axios.post(`${config.baseURL}/tasks`, { text: taskText }, {
        headers: { Authorization: `Bearer ${token}` }  // Include token in request headers
      });
      setTasks([...tasks, response.data]);
      setTaskText("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");  // Get the token from localStorage
      await axios.delete(`${config.baseURL}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }  // Include token in request headers
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Logout function
  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirect to the welcome page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Task Manager</h1>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>Logout</button>
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
