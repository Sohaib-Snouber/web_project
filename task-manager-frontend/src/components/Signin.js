import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signin({ onSignin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/signin", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      // Notify App component that sign-in was successful
      onSignin();
      setMessage("Sign in successful!");
      window.location.href = "/profile"; // Redirect to profile
    } catch (error) {
      setMessage(error.response.data.message || "Error signing in");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignin}>Sign In</button>
      <p>{message}</p>
      {/* Link to Signup page */}
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

export default Signin;
