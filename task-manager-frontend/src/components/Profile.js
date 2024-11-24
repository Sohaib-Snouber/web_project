import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

function Profile() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${config.baseURL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
      } catch (err) {
        setError("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/signin";
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Welcome, {username}</h2>
    </div>
  );
}

export default Profile;
