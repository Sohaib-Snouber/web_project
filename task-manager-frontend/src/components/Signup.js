import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";
import Verify from "./verify";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${config.baseURL}/signup`, {
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || "Error signing up");
    }
  };

  const handleVerified = () => {
    setIsVerified(true);
  };

  return (
    <div className="Register-page" onContextMenu={(e) => e.preventDefault()}>
      <div className="left-intro">
        <h2>Welcome to CV Builder</h2>
        <p>
          Simplify your job application process with our easy-to-use CV generator tool.
          Create, manage, and download your professional CVs in minutes.
        </p>
        <p>
          Don't Have account? Signup and start creating your professional CV.
        </p>
      </div>
      <div className="Register-form">
        <div className="form-title">
          <div className="logo">
            <img src="/logo.png" alt="CV-Logo" />
          </div>
        </div>
        <form>

          <h2>Signup</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignup} className="btn btn-primary Register-btn">Sign Up</button>
          <p>{message}</p>
          {message.includes("Check your email for the verification code") && (
            <Verify email={email} onVerified={handleVerified} />
          )}
          {isVerified && <p>Email verified successfully. You can now sign in.</p>}
          <p>
            Already have an account? <Link to="/signin">Sign in here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
