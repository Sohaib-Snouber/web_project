const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Make sure this path is correct

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/taskDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const taskSchema = new mongoose.Schema({
  text: String,
});

const Task = mongoose.model("Task", taskSchema);

// Secret key for JWT (use an environment variable in production)
const SECRET_KEY = "your_jwt_secret_key";

// Routes
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const newTask = new Task({ text: req.body.text });
  await newTask.save();
  res.json(newTask);
});

app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  await Task.findByIdAndDelete(taskId);
  res.json({ message: "Task deleted" });
});

// Signup Route
app.post("/signup", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if user exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
// Sign-In Route
app.post("/signin", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, message: "Sign in successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
// Protected Route Example (User Profile)
app.get("/profile", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(decoded.userId);
      res.json({ username: user.username });
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
});
  
app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
  