import React, { useState, useEffect } from "react";
import "./Template2.css";

const Template2 = ({ content, onSave }) => {
  const [resume, setResume] = useState(content || {});

  useEffect(() => {
    if (content) setResume(content);
  }, [content]);

  const handleFieldChange = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (section, index, field, value) => {
    setResume((prev) => {
      const updatedSection = [...prev[section]];
      updatedSection[index][field] = value;
      return { ...prev, [section]: updatedSection };
    });
  };

  const handleAddItem = (section, newItem) => {
    setResume((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const handleRemoveItem = (section, index) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setResume((prev) => ({ ...prev, picture: imageUrl }));
    }
  };

  return (
    <div className="template2-container">
      {/* Image Upload Section */}
      <header className="template2-header">
        <div className="image-upload-container">
          <label htmlFor="upload-image" className="upload-label">
            {resume.picture ? (
              <img src={resume.picture} alt="Profile" className="profile-picture" />
            ) : (
              <div className="upload-placeholder">Upload</div>
            )}
          </label>
          <input
            type="file"
            id="upload-image"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>

        {/* Profile Fields */}
        <div className="contact-container">
          <input
            type="text"
            className="contact-input"
            value={resume.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            placeholder="Enter Your Name"
          />
          <input
            type="text"
            className="contact-input"
            value={resume.contact?.address || ""}
            onChange={(e) =>
              handleFieldChange("contact", {
                ...resume.contact,
                address: e.target.value,
              })
            }
            placeholder="Address"
          />
          <input
            type="text"
            className="contact-input"
            value={resume.contact?.email || ""}
            onChange={(e) =>
              handleFieldChange("contact", {
                ...resume.contact,
                email: e.target.value,
              })
            }
            placeholder="Email"
          />
          <input
            type="text"
            className="contact-input"
            value={resume.contact?.phone || ""}
            onChange={(e) =>
              handleFieldChange("contact", {
                ...resume.contact,
                phone: e.target.value,
              })
            }
            placeholder="Phone"
          />
          <input
            type="text"
            className="contact-input"
            value={resume.contact?.linkedin || ""}
            onChange={(e) =>
              handleFieldChange("contact", {
                ...resume.contact,
                linkedin: e.target.value,
              })
            }
            placeholder="LinkedIn URL"
          />
        </div>
      </header>

      {/* Profile Section */}
      <section className="template2-section">
        <h2>Profile</h2>
        <textarea
          value={resume.profile || ""}
          onChange={(e) => handleFieldChange("profile", e.target.value)}
          placeholder="Write your profile summary here"
        />
      </section>

      {/* Technical Skills Section */}
      <section className="template2-section">
        <h2>Technical Skills</h2>
        {resume.technicalSkills?.map((skill, index) => (
          <div key={index} className="skill-item">
            <input
              type="text"
              value={skill || ""}
              onChange={(e) =>
                handleSectionChange("technicalSkills", index, null, e.target.value)
              }
              placeholder="Skill"
            />
            <button
              className="remove-button"
              onClick={() => handleRemoveItem("technicalSkills", index)}
            >
              -
            </button>
          </div>
        ))}
        <button
          className="add-button"
          onClick={() => handleAddItem("technicalSkills", "")}
        >
          + Add Skill
        </button>
      </section>

      {/* Soft Skills Section */}
      <section className="template2-section">
        <h2>Soft Skills</h2>
        {resume.softSkills?.map((skill, index) => (
          <div key={index} className="skill-item">
            <input
              type="text"
              value={skill || ""}
              onChange={(e) =>
                handleSectionChange("softSkills", index, null, e.target.value)
              }
              placeholder="Soft Skill"
            />
            <button
              className="remove-button"
              onClick={() => handleRemoveItem("softSkills", index)}
            >
              -
            </button>
          </div>
        ))}
        <button
          className="add-button"
          onClick={() => handleAddItem("softSkills", "")}
        >
          + Add Soft Skill
        </button>
      </section>

      {/* Education Section */}
      <section className="template2-section">
        <h2>Education</h2>
        {resume.education?.map((edu, index) => (
          <div key={index} className="education-item">
            <input
              type="text"
              value={edu.degree || ""}
              onChange={(e) =>
                handleSectionChange("education", index, "degree", e.target.value)
              }
              placeholder="Degree"
            />
            <input
              type="text"
              value={edu.institution || ""}
              onChange={(e) =>
                handleSectionChange("education", index, "institution", e.target.value)
              }
              placeholder="Institution"
            />
            <button
              className="remove-button"
              onClick={() => handleRemoveItem("education", index)}
            >
              -
            </button>
          </div>
        ))}
        <button
          className="add-button"
          onClick={() =>
            handleAddItem("education", { degree: "", institution: "" })
          }
        >
          + Add Education
        </button>
      </section>

      {/* Work Experience Section */}
      <section className="template2-section">
        <h2>Work Experience</h2>
        {resume.workExperience?.map((exp, index) => (
          <div key={index} className="experience-item">
            <input
              type="text"
              value={exp.role || ""}
              onChange={(e) =>
                handleSectionChange("workExperience", index, "role", e.target.value)
              }
              placeholder="Role"
            />
            <input
              type="text"
              value={exp.company || ""}
              onChange={(e) =>
                handleSectionChange("workExperience", index, "company", e.target.value)
              }
              placeholder="Company"
            />
            <button
              className="remove-button"
              onClick={() => handleRemoveItem("workExperience", index)}
            >
              -
            </button>
          </div>
        ))}
        <button
          className="add-button"
          onClick={() =>
            handleAddItem("workExperience", { role: "", company: "" })
          }
        >
          + Add Work Experience
        </button>
      </section>

      {/* Save Button */}
      <div className="save-container">
        <button onClick={() => onSave(resume)} className="save-button">
          Save Resume
        </button>
      </div>
    </div>
  );
};

export default Template2;





