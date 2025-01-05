import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
//import Verify from "./components/verify";
import MyCVs from "./components/MyCVs";
import ForgotPassword from "./components/forgotpassword"; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  // const [isVerified, setIsVerified] = useState(false);

  const handleSignin = () => {
    setIsAuthenticated(true);
    // Fetch user verification status from the server or local storage
    // const userVerified = localStorage.getItem("isVerified") === "true";
    // setIsVerified(userVerified);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // setIsVerified(false);
    localStorage.removeItem("token");
    // localStorage.removeItem("isVerified");
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
            <Route path="/forgotpassword" element={<ForgotPassword />} /> 
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          // Show TaskManager if authenticated
          <>
            <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
            <Route path="/my-cvs" element={<MyCVs onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/profile" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
