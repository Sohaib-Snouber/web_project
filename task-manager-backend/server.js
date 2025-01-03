const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Make sure this path is correct
const Task = require("./models/Task"); // New Task model file we'll create
const Resume = require("./models/Resume");
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

require('dotenv').config({ path: '../.env' });

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

}).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
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
    req.userId = decoded.userId;  // Attach userId to request
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

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

    // Sending email with AWS SES
    const params = {
      Source: process.env.SES_SOURCE_EMAIL, // Your verified SES email
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: { Data: "Email Verification Code" },
        Body: {
          Text: {
            Data: `Your verification code is ${authCode}. It will expire in 30 minutes.`,
          },
        },
      },
    };

    const command = new SendEmailCommand(params);
    client.send(command)
      .then((data) => console.log("Email sent successfully:", data))
      .catch((error) => console.error("Error sending email:", error));

    const command2 = new SendEmailCommand(params);
    client.send(command2)
      .then((data) => console.log("Email sent successfully:", data))
      .catch((error) => console.error("Error sending email:", error));

    res.status(201).json({
      message: "User created successfully. Check your email for the verification code.",
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
    console.log(error)
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

app.get("/resumes", authenticate, async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.userId });
    res.json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/resumes", authenticate, async (req, res) => {
  const { name, format, content } = req.body;
  try {
    // Check if a resume with the same name already exists for the user
    const existingResume = await Resume.findOne({ name, userId: req.userId });
    if (existingResume) {
      return res.status(400).json({ message: "Resume with this name already exists." });
    }

    const newResume = new Resume({
      userId: req.userId, // Use userId from middleware
      name,
      format,
      content
    });
    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    console.error("Error saving resume:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific resume by name
app.get("/resumes/:name", authenticate, async (req, res) => {
  try {
    const resume = await Resume.findOne({ name: req.params.name, userId: req.userId });
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update an existing resume with new sections
app.put("/resumes/:name", authenticate, async (req, res) => {
  const { format, content } = req.body;

  try {
    // Find the resume by name and userId, then update the sections
    const updatedResume = await Resume.findOneAndUpdate(
      { userId: req.userId, name: req.params.name }, // Match by userId and name
      { format, content },
      { new: true }
    );

    // If no resume found, return a 404 error
    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ error: error.message });
  }
});

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