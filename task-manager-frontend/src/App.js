import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import TaskManager from "./components/TaskManager";
import Verify from "./components/verify";

const AuthRoutes = ({ isAuthenticated, isVerified, handleSignin, handleLogout }) => {
  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin onSignin={handleSignin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/tasks" element={<TaskManager onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/tasks" />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [isVerified, setIsVerified] = useState(false);

  const handleSignin = () => {
    setIsAuthenticated(true);
    // Fetch user verification status from the server or local storage
    const userVerified = localStorage.getItem("isVerified") === "true";
    setIsVerified(userVerified);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsVerified(false);
    localStorage.removeItem("token");
    localStorage.removeItem("isVerified");
  };

  return (
    <Router>
      <AuthRoutes
        isAuthenticated={isAuthenticated}
        isVerified={isVerified}
        handleSignin={handleSignin}
        handleLogout={handleLogout}
      />
    </Router>
  );
}

export default App;
