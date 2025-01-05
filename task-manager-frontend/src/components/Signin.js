import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";

function Signin({ onSignin }) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignin = async () => {
    try {
      const response = await axios.post(`${config.baseURL}/signin`, {
        email,
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
    <div className="login-page" onContextMenu={(e) => e.preventDefault()}>
      <div className="left-intro">
        <h2>Welcome to CV Builder</h2>
        <p>
          Simplify your job application process with our easy-to-use CV generator tool.
          Create, manage, and download your professional CVs in minutes.
        </p>
        <p>
          Already have an account? Log in to access your saved CVs or start a new one.
        </p>
      </div>

      <div className="login-form">
        <div className="form-title">
          <div className="logo">
            <img src="/logo.png" alt="CV-Logo" />
          </div>
        </div>
        <form>
          <h3>Welcome Back!</h3>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              placeholder="name@gmail.com"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="*************"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="link">
            <a href="/signup">Create one?</a>
          </div>
          <div className="link">
            <a href="/forgotpassword">Forgot password?</a>
          </div>
          <button
            onClick={(e) => handleSignin(e)}
            className="btn btn-primary login-btn"
          >
            Log in
          </button>
          <p>{message}</p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
