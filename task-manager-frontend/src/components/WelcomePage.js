import React from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <div style={{
      backgroundColor: "#ADD8E6",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}>
      <h1 style={{
        fontSize: "4em",
        color: "#333",
        textAlign: "center",
      }}>
        Welcome to the Portfolio Project
      </h1>
      <p style={{ fontSize: "1.5em", color: "#555" }}>
        Please <Link to="/signin" style={{ color: "#333", textDecoration: "underline" }}>sign in</Link> or <Link to="/signup" style={{ color: "#333", textDecoration: "underline" }}>sign up</Link> to get started.
      </p>
    </div>
  );
}

export default WelcomePage;
