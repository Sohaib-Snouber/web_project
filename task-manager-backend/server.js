const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("./models/User"); // Make sure this path is correct
const Task = require("./models/Task"); // New Task model file we'll create
require('dotenv').config({ path: '../.env' });
 
console.log("SECRET_KEY:", process.env.SECRET_KEY);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const app = express();
app.use(cors());
app.use(express.json());

// Define the switch variable for database choice
const dbChoice = 2; // Set to 1 for local MongoDB, 2 for cloud MongoDB Atlas

// Use the appropriate MongoDB URI based on dbChoice
const mongooseUri = dbChoice === 1
  ? "mongodb://localhost:27017/taskDB" // Local MongoDB URI
  : process.env.MONGO_URI;             // Cloud MongoDB URI from .env

// Connect to MongoDB "mongodb://localhost:27017/taskDB"
mongoose.connect(mongooseUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

// Secret key for JWT (use an environment variable in production)
const SECRET_KEY = process.env.SECRET_KEY; // Access the secret key from the .env file

// Middleware to authenticate and extract userId from token
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;  // Attach userId to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Routes
app.get("/tasks", authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/tasks", authenticate, async (req, res) => {
  try {
    const newTask = new Task({
      text: req.body.text,
      userId: req.userId
    });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/tasks/:id", authenticate, async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.deleteOne({ _id: taskId, userId: req.userId }); // Only delete if it belongs to the user
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate authentication code
    const authCode = Math.floor(100000 + Math.random() * 900000).toString();
    const authCodeExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      authCode,
      authCodeExpires
    });
    await newUser.save();

    // Send authentication code via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification Code",
      text: `Your verification code is ${authCode}. It will expire in 30 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error); // Log the error
        return res.status(500).json({ message: "Error sending email" });
      }
      console.log("Email sent:", info.response); // Log the response
      res.status(201).json({ message: "User created successfully. Check your email for the verification code." });
    });
  } catch (error) {
    console.error("Error during signup:", error); // Log the error
    res.status(500).json({ error: error.message });
  }
});



// Verify Route
app.post("/verify", async (req, res) => {
  try {
    const { email, authCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (user.authCode !== authCode || user.authCodeExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired authentication code" });
    }

    user.isVerified = true;
    user.authCode = undefined;
    user.authCodeExpires = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Sign-In Route
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
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
app.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
