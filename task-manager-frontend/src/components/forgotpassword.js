import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

  // Function to handle password update form submission
  const handlePasswordUpdate = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
        const response = await axios.post("http://localhost:5001/forgotpassword", {
          email,
          dob,
          newPassword,
        });
        setMessage(response.data.message);
        navigate(`/verify-code?email=${encodeURIComponent(email)}`); // Redirect to the verification page
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong.");
      }
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
              type="date"
              placeholder="Enter your date of birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
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
          </form>
          {message && <p>{message}</p>}
        </div>
      );
    };
    
    export default ForgotPassword;