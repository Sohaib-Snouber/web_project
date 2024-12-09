import React, { useState, useEffect } from "react";
import "./Template2.css";
import SampleData2 from "./SampleData2";

const Template2 = ({ data, onSave }) => {
  const [resume, setResume] = useState(data || SampleData2);

  useEffect(() => {
    if (data) {
      setResume(data);
    }
  }, [data]);

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

  return (
    <div className="template2-container">
      {/* Header */}
      <header className="template2-header">
        <input
          type="text"
          value={resume.name}
          onChange={(e) => handleFieldChange("name", e.target.value)}
          placeholder="Full Name"
          className="template2-header-name"
        />
        <textarea
          value={resume.profile}
          onChange={(e) => handleFieldChange("profile", e.target.value)}
          placeholder="Profile Summary"
          className="template2-header-profile"
        />
      </header>

      {/* Contact Section */}
      <section className="template2-section">
        <h2>Contact</h2>
        {Object.entries(resume.contact).map(([key, value], index) => (
          <div key={index}>
            <label>{key}:</label>
            <input
              type="text"
              value={value}
              onChange={(e) =>
                handleFieldChange("contact", {
                  ...resume.contact,
                  [key]: e.target.value,
                })
              }
            />
          </div>
        ))}
      </section>

      {/* Technical Skills */}
      <section className="template2-section">
        <h2>Technical Skills</h2>
        {resume.technicalSkills.map((skill, index) => (
          <div key={index}>
            <input
              type="text"
              value={skill}
              onChange={(e) =>
                handleSectionChange("technicalSkills", index, null, e.target.value)
              }
              placeholder="Skill"
            />
            <button onClick={() => handleRemoveItem("technicalSkills", index)}>-</button>
          </div>
        ))}
        <button onClick={() => handleAddItem("technicalSkills", "")}>+ Add Skill</button>
      </section>

      {/* Soft Skills */}
      <section className="template2-section">
        <h2>Soft Skills</h2>
        {resume.softSkills.map((skill, index) => (
          <div key={index}>
            <input
              type="text"
              value={skill}
              onChange={(e) =>
                handleSectionChange("softSkills", index, null, e.target.value)
              }
              placeholder="Soft Skill"
            />
            <button onClick={() => handleRemoveItem("softSkills", index)}>-</button>
          </div>
        ))}
        <button onClick={() => handleAddItem("softSkills", "")}>+ Add Soft Skill</button>
      </section>

      {/* Education Section */}
      <section className="template2-section">
        <h2>Education</h2>
        {resume.education.map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) =>
                handleSectionChange("education", index, "degree", e.target.value)
              }
              placeholder="Degree"
            />
            <input
              type="text"
              value={edu.institution}
              onChange={(e) =>
                handleSectionChange("education", index, "institution", e.target.value)
              }
              placeholder="Institution"
            />
            <button onClick={() => handleRemoveItem("education", index)}>-</button>
          </div>
        ))}
        <button
          onClick={() =>
            handleAddItem("education", { degree: "", institution: "", year: "" })
          }
        >
          + Add Education
        </button>
      </section>

      {/* Save Button */}
      <button className="save-button" onClick={() => onSave(resume)}>
        Save Resume
      </button>
    </div>
  );
};

export default Template2;



