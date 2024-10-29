import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://task-manager-backend-4tll.onrender.com/profile", { //http://localhost:5001/
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.username);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Welcome, {username}</h2>
    </div>
  );
}

export default Profile;
