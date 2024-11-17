import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

function Profile({ onLogout }) {
  const [resumes, setResumes] = useState([]);
  const [newResumeName, setNewResumeName] = useState("");
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

  // Create a new CV
  const handleCreateNewCV = async () => {
    if (!newResumeName.trim()) {
      alert("Please enter a valid name for your CV");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      // Send a request to create a new resume
      await axios.post(
        `${config.baseURL}/resumes`,
        { name: newResumeName, sections: [] },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Navigate to the newly created resume's builder page
      navigate(`/cv-builder/${newResumeName}`);
    } catch (error) {
      console.error("Error creating new resume:", error);
    }
  };

  // Delete a CV with confirmation prompt
  const handleDeleteCV = async (resumeName) => {
    const token = localStorage.getItem("token");
    // Show confirmation prompt
    const confirmation = window.prompt(
      `Enter the name of the CV (${resumeName}) to confirm deletion:`
    );
    if (confirmation !== resumeName) {
      alert("The entered name does not match the CV name.");
      return;
    }
    try {
      await axios.delete(`${config.baseURL}/resumes/${resumeName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh the list of resumes after deletion
      setResumes(resumes.filter((resume) => resume.name !== resumeName));
      alert("Resume deleted successfully.");
    } catch (error) {
      console.error("Error deleting resume:", error);
      alert("Failed to delete the resume.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Your CVs</h1>
      {/* Form to create a new CV */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter CV Name"
          value={newResumeName}
          onChange={(e) => setNewResumeName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleCreateNewCV}>Create New CV</button>
      </div>
      <div>
        {resumes.length > 0 ? (
          resumes.map((resume) => (
            <div key={resume._id} style={{ marginBottom: "10px" }}>
              <button
                onClick={() => navigate(`/cv-builder/${resume.name}`)} // Navigate to CVBuilder with resume name
                style={{ marginRight: "10px" }}
              >
                {resume.name}
              </button>
              <button
                onClick={() => handleDeleteCV(resume.name)}
                style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
              >
                Delete CV
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
