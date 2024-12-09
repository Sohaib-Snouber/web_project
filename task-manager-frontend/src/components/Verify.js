import React, { useState } from "react";
import axios from "axios";
import config from "../config";

function Verify({ email, onVerified }) {
  const [authCode, setAuthCode] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async (e) => {
    try {
      e.preventDefault()
      const response = await axios.post(`${config.baseURL}/verify`, {
        email,
        authCode,
      });
      setMessage(response.data.message);
      if (response.data.message === "Email verified successfully") {
        onVerified();
      }
    } catch (error) {
      setMessage(error.response.data.message || "Error verifying email");
    }
  };

  return (
    <div>
      <h2>Email Verification</h2>
      <input
        type="text"
        placeholder="Verification Code"
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
      />
      <button onClick={(e) => handleVerify(e)}>Verify Email</button>
      <p>{message}</p>
    </div>
  );
}

export default Verify;
