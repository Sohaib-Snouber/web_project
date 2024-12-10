const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Make sure this path is correct
const Task = require("./models/Task"); // New Task model file we'll create
const Resume = require("./models/Resume");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

// Load environment variables from .env
require("dotenv").config()
require("dotenv").config({ path: "C:/Users/mohamed/web_project/task-manager-backend/.env" });
console.log("Environment variables loaded:", process.env);


const app = express();
app.use(cors());
app.use(express.json());

// Retrieve MongoDB URI from .env
const mongooseUri = process.env.MONGO_URI;

if (!mongooseUri) {
  console.error("MONGO_URI is not defined in the environment variables.");
  process.exit(1); // Stop the server if MONGO_URI is not defined
}

console.log("Using MongoDB URI:", mongooseUri); // Debug log for URI

// Connect to MongoDB
mongoose
  .connect(mongooseUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit if connection fails
  });

// Secret key for JWT (use an environment variable in production)
const SECRET_KEY = process.env.SECRET_KEY; // Access the secret key from the .env file

// Create SES client using credentials from .env
const client = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

// Middleware to authenticate and extract userId from token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId; // Attach userId to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
// Routes for Tasks
app.get("/tasks", authenticate, async (req, res) => {
  try {
    console.log(`Fetching tasks for userId: ${req.userId}`); // Debug log
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error); // Log errors
    res.status(500).json({ message: "Failed to fetch tasks.", error: error.message });
  }
});
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.json({ token, message: "Sign in successful." });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/tasks/:id", authenticate, async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId: req.userId }); // Ensure user owns the task
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized." });
    }
    console.log(`Task deleted: ${taskId}`); // Debug log
    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error); // Log errors
    res.status(500).json({ message: "Failed to delete task.", error: error.message });
  }
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    console.log("Signup request received:", req.body); // Debug log
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const authCode = Math.floor(100000 + Math.random() * 900000).toString();
    const authCodeExpires = new Date(Date.now() + 30 * 60 * 1000);

    const newUser = new User({
      email,
      password: hashedPassword,
      authCode,
      authCodeExpires,
    });

    await newUser.save();
    console.log("New user created:", newUser);

    // Send verification email
    const params = {
      Source: process.env.SES_SOURCE_EMAIL,
      Destination: { ToAddresses: [email] },
      Message: {
        Subject: { Data: "Email Verification Code" },
        Body: { Text: { Data: `Your code: ${authCode}. Expires in 30 minutes.` } },
      },
    };

    try {
      const command = new SendEmailCommand(params);
      await client.send(command);
      console.log(`Verification email sent to ${email}`);
    } catch (emailError) {
      console.error("Failed to send verification email:", emailError);
      return res.status(500).json({ message: "User created, but email failed." });
    }

    res.status(201).json({ message: "Signup successful. Verify your email." });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Signup failed.", error: error.message });
  }
});

// Verify Route
app.post("/verify", async (req, res) => {
  try {
    const { email, authCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email." });
    }

    if (user.authCode !== authCode || user.authCodeExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired code." });
    }

    user.isVerified = true;
    user.authCode = undefined;
    user.authCodeExpires = undefined;
    await user.save();

    console.log("User verified:", user);
    res.json({ message: "Email verified successfully." });
  } catch (error) {
    console.error("Error during verification:", error);
    res.status(500).json({ message: "Verification failed.", error: error.message });
  }
});

// Sign-In Route
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify your email first." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
    console.log("User signed in:", email);
    res.json({ token, message: "Sign in successful." });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Signin failed.", error: error.message });
  }
});

// Additional Routes for Resumes
// (Unchanged but ensure logs and error handling are consistent)
// Route to delete a resume by name
app.delete("/resumes/:name", authenticate, async (req, res) => {
  try {
    const deletedResume = await Resume.findOneAndDelete({
      name: req.params.name,
      userId: req.userId,
    });
    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});