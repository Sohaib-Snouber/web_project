import React, { useState, useEffect } from "react";
import axios from "axios";
import Template1 from "./Template1";
import "./MyCVs.css";
import Header from "./Header";
import config from "../config";
import Template1Preview from "./Template1Preview";

function MyCVs() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeContent, setResumeContent] = useState(null);
  const [previewMode, setPreviewMode] = useState(false); // New state for preview mode

  // Fetch resumes on component mount
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem("token"); // Get the JWT token from local storage
        const response = await axios.get(`${config.baseURL}/resumes`, {
            headers: {
              Authorization: `Bearer ${token}`, // Send the token in the Authorization header
            },
          });
        setResumes(response.data);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    fetchResumes();
  }, []);

  const handleResumeSelection = async (resume) => {
    try {
      setSelectedResume(resume);
      setResumeContent(resume.content); // Load the content from the selected resume
      setPreviewMode(false); // Reset preview mode on new selection
    } catch (error) {
      console.error("Error loading resume:", error);
    }
  };

  const handleSaveResume = async (updatedContent) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${config.baseURL}/resumes/${selectedResume.name}`, // Use name here
        {
          format: selectedResume.format,
          content: updatedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Resume updated successfully!");
      setResumeContent(updatedContent);
      // Update the local state with the saved resume
      setResumes((prevResumes) =>
        prevResumes.map((resume) =>
          resume.name === selectedResume.name
            ? { ...resume, content: updatedContent }
            : resume
        )
      );
    } catch (error) {
      console.error("Error updating resume:", error);
      alert("Failed to update resume. Please try again.");
    }
  };  

  return (
    <>
      <Header />
      <div className="profile-container">
        {/* Sidebar with Resumes */}
        <div className="template-panel">
          <h3>Your Resumes</h3>
          <div className="template-grid">
            {resumes.map((resume) => (
              <div
                key={resume._id}
                className={`template-card ${
                  selectedResume?._id === resume._id ? "selected" : ""
                }`}
                onClick={() => handleResumeSelection(resume)}
              >
                <p>{resume.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Display Panel */}
        <div className="resume-panel">
          {selectedResume ? (
            <>
              <div className="actions">
                <button onClick={() => setPreviewMode(!previewMode)}>
                  {previewMode ? "Edit Mode" : "Preview Mode"}
                </button>
              </div>
              {previewMode ? (
                <Template1Preview content={resumeContent} />
              ) : (
                <Template1
                  content={resumeContent}
                  onSave={handleSaveResume}
                />
              )}
            </>
          ) : (
            <h1>Select a resume to view or edit</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default MyCVs;