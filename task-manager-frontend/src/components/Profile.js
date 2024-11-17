import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

function Profile({ onLogout }) {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.baseURL}/resumes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResumes(response.data);
    };

    fetchProfile();
  }, []);

  // Logout function
  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirect to the welcome page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Your CVs</h1>
      <button style={{ marginBottom: "20px" }}>
        Create New CV
      </button>

      <div>
        {resumes.length > 0 ? (
          resumes.map((resume) => (
            <div key={resume._id} style={{ marginBottom: "10px" }}>
              <button
                style={{ marginRight: "10px" }}
              >
                {`Resume ${resume._id}`}
              </button>
            </div>
          ))
        ) : (
          <p>You have no resumes yet.</p>
        )}
      </div>

      <button onClick={() => handleLogout()} style={{ marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
