import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import TaskManager from "./components/TaskManager";
import WelcomePage from "./components/WelcomePage";
import CVBuilder from "./components/CVBuilder";
import Profile from "./components/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Function to set auth status on successful signin
  const handleSignin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
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
          // Show TaskManager if authenticated
          <>
            <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
            <Route path="/cv-builder" element={<CVBuilder onLogout={handleLogout} />} />
            <Route path="/cv-builder/:name" element={<CVBuilder onLogout={handleLogout} />} />
            <Route path="/tasks" element={<TaskManager onLogout={handleLogout}/>} />
            <Route path="*" element={<Navigate to="/profile" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;


// the bellow code was the default code, after creating the frontend package

// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
