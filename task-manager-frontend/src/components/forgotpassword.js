import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import Verify from "./Verify";
import ResendEmail from "./resendemail";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

  // Function to handle password update form submission
  const handlePasswordUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation to ensure fields are filled
    if (!email || !newPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
        console.log("Sending request to forgotpassword API:", { email, newPassword });
        const response = await axios.post("http://localhost:5001/forgotpassword", {
        // const response = await axios.post(`${config.baseURL}/forgotpassword`, {
          email,
          newPassword,
        });
        console.log("Response from API:", response.data); // Debugging

        setMessage(response.data.message);
        navigate(`/verify-code?email=${encodeURIComponent(email)}`); // Redirect to the verification page
      } catch (error) {
        console.error("Error response from API:", error.response || error.message); // Debugging
        setMessage(error.response?.data?.message || "Something went wrong.");
      }
    };

    const handleVerified = () => {
      setIsVerified(true);
    };

    return (
        <div>
          <h1>Reset Your Password</h1>
          <form onSubmit={handlePasswordUpdate}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
            <p>{message}</p>
            {message.includes("Check your email for the verification code") && (
              <> 
            <Verify email={email} onVerified={handleVerified} />
            <ResendEmail email={email}  />
            </>
          )}
          {isVerified && <p>Email verified successfully. You can now sign in.</p>}
          </form>
          {message && <p>{message}</p>}
        </div>
      );
    };
    
    export default ForgotPassword;