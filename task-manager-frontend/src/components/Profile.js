import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/profile", {
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
