// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import TaskManager from "./components/TaskManager";
import CVBuilder from "./components/CVBuilder";
import Profile from "./components/Profile";
import FormsPanel from "./components/FormsPanel";
import MyCVs from "./components/MyCVs";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  const handleSignin = () => {
    setIsAuthenticated(true);
    // If you plan to use isVerified in the future, keep these lines
    // const userVerified = localStorage.getItem("isVerified") === "true";
    // setIsVerified(userVerified);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // If you had isVerified, reset it here
    // setIsVerified(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isVerified");
  };

  return (
    <Router>
      <Routes>
        {/* Show Signup/Signin if not authenticated */}
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin onSignin={handleSignin} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          // Show protected routes if authenticated
          <>
            <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
            <Route path="/my-cvs" element={<MyCVs onLogout={handleLogout} />} />
            <Route path="/cv-builder" element={<CVBuilder onLogout={handleLogout} />} />
            <Route path="/cv-builder/:name" element={<CVBuilder onLogout={handleLogout} />} />
            <Route path="/tasks" element={<TaskManager onLogout={handleLogout} />} />
            <Route path="/forms" element={<FormsPanel />} />

            {/* Fallback for any unknown route while authenticated */}
            <Route path="*" element={<Navigate to="/profile" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

