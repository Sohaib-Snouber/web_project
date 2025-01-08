import React, { useState } from "react";
import axios from "axios";
import config from "../config";
//import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Template1 from "./Template1";
import "./Profile.css"; // Import the CSS file
import Template2 from "./Template2";

const templates = [
  { id: 1, name: "Template 1", image: "/images/templates/template1.png", component: Template1 },
  { id: 2, name: "Template 2", image: "/images/template2.png", component: Template2 },
];

function Profile({ onLogout }) {
  const [newResumeName, setNewResumeName] = useState("");
  const [resumeContent, setResumeContent] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setNewResumeName("");
    setResumeContent({
      header: "Untitled Resume",
      picture: { src: "", alt: "Profile Picture" },
      contact: [],
      skills: [],
      softwareSkills: [],
      languages: [],
      summary: "",
      education: [],
      projects: [],
      workExperience: [],
    });
  };

  const handleSaveResume = async (updatedResumeContent) => {
    if (!newResumeName.trim()) {
      alert("Please provide a name for the resume.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${config.baseURL}/resumes`,
        {
          name: newResumeName,
          format: selectedTemplate.name,
          content: updatedResumeContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct placement for Authorization header
          },
        }
      );
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
      console.error("Error saving resume:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="profile-container">
        {/* Template Side Panel */}
        <div className="template-panel">
          <h3>Templates</h3>
          <div className="template-grid">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`template-card ${
                  selectedTemplate?.id === template.id ? "selected" : ""
                }`}
                onClick={() => handleTemplateClick(template)}
              >
                <img src={template.image} alt={template.name} />
                <p>{template.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resume Editor */}
        <div className="resume-panel">
          {!selectedTemplate ? (
            <h1> Select a template to create your CV</h1>
          ) : (
            <>
              <input
                type="text"
                placeholder="Resume Name"
                value={newResumeName}
                onChange={(e) => setNewResumeName(e.target.value)}
              />
              {resumeContent && selectedTemplate?.component && (
                <selectedTemplate.component
                  onSave={handleSaveResume}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;