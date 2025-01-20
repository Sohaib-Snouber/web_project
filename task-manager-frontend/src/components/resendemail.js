import React, { useState } from "react";
import axios from "axios";
import config from "../config";

function ResendEmail({ email }) {
  const [resendMessage, setResendMessage] = useState("");

  const handleResendEmail = async () => {
    
    try {
      const response = await axios.post(`${config.baseURL}/resendemail`, {
        email,
      });
      setResendMessage(response.data.message);
    } catch (error) {
      console.error(error.response); // Log the full error response
      setResendMessage(error.response.data.message || "Error resending email");
    }
  };

  return (
    <div>
      <button onClick={handleResendEmail}>Resend Email</button>
      <p>{resendMessage}</p>
    </div>
  );
}

export default ResendEmail;
