// src/components/Template2.js
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faStar,
  faGraduationCap,
  faBriefcase,
  faPlus,
  faTrash,
  faCertificate, // Corrected icon
  faTrophy,
  faGlobe,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons"; // Removed faEnvelope, faPhone, faLink, faPen
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import jsPDF from "jspdf";
import "./Template2.css";

const Template2 = ({ content, onSave }) => {
  const [resume, setResume] = useState(content || {});

  // Load resume from props or localStorage on mount
  useEffect(() => {
    if (content) setResume(content);
    const savedResume = localStorage.getItem("resume");
    if (savedResume) setResume(JSON.parse(savedResume));
  }, [content]);

  // Save resume to localStorage with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("resume", JSON.stringify(resume));
    }, 1000);
    return () => clearTimeout(timer);
  }, [resume]);

  // Handle generic field changes (e.g., name, profile)
  const handleFieldChange = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  // Handle nested field changes (e.g., contact.address)
  const handleNestedFieldChange = (parentField, nestedKey, value) => {
    setResume((prev) => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [nestedKey]: value,
      },
    }));
  };

  // Handle changes within sections that are arrays of strings (e.g., skills)
  const handleSectionChange = (section, index, value) => {
    setResume((prev) => {
      const updatedSection = [...(prev[section] || [])];
      updatedSection[index] = value; // Each array item is a string
      return { ...prev, [section]: updatedSection };
    });
  };

  // Add a new empty item to a section
  const handleAddItem = (section) => {
    setResume((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), ""],
    }));
  };

  // Remove an item from a section
  const handleRemoveItem = (section, index) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setResume((prev) => ({ ...prev, picture: imageUrl }));
    }
  };

  // Handle drag-and-drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const section = result.source.droppableId;
    const items = Array.from(resume[section] || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setResume((prev) => ({ ...prev, [section]: items }));
  };

  // Export resume to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFont("Helvetica", "normal");
    doc.text("Resume", 10, 10);

    doc.text(`Name: ${resume.name || ""}`, 10, 20);
    doc.text(`Profile: ${resume.profile || ""}`, 10, 30);

    // Add Technical Skills
    doc.text("Technical Skills:", 10, 40);
    resume.technicalSkills?.forEach((skill, index) => {
      doc.text(`- ${skill}`, 10, 50 + index * 10);
    });

    // Add more sections as needed...

    doc.save("resume.pdf");
  };

  return (
    <div className="template2-container">
      {/* Left: Form Section */}
      <div className="form-container">
        {/* Header and Image Upload */}
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

          {/* Contact Section */}
          <div className="contact-container">
            <h2>
              <FontAwesomeIcon icon={faUser} /> Contact
            </h2>
            <input
              type="text"
              value={resume.name || ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              placeholder="Your Name"
            />
            <input
              type="text"
              value={resume.contact?.address || ""}
              onChange={(e) =>
                handleNestedFieldChange("contact", "address", e.target.value)
              }
              placeholder="Address"
            />
            <input
              type="email"
              value={resume.contact?.email || ""}
              onChange={(e) =>
                handleNestedFieldChange("contact", "email", e.target.value)
              }
              placeholder="Email"
            />
            <input
              type="text"
              value={resume.contact?.phone || ""}
              onChange={(e) =>
                handleNestedFieldChange("contact", "phone", e.target.value)
              }
              placeholder="Phone"
            />
            <input
              type="text"
              value={resume.contact?.linkedin || ""}
              onChange={(e) =>
                handleNestedFieldChange("contact", "linkedin", e.target.value)
              }
              placeholder="LinkedIn URL"
            />
          </div>
        </header>

        {/* Profile Section */}
        <section className="template2-section">
          <h2>
            <FontAwesomeIcon icon={faStar} /> Profile
          </h2>
          <textarea
            value={resume.profile || ""}
            onChange={(e) => handleFieldChange("profile", e.target.value)}
            placeholder="Write your profile summary here"
          />
        </section>

        {/* Dynamic Sections (with drag-and-drop) */}
        {[
          { section: "technicalSkills", icon: faStar, title: "Technical Skills" },
          { section: "softSkills", icon: faLightbulb, title: "Soft Skills" },
          { section: "education", icon: faGraduationCap, title: "Education" },
          { section: "workExperience", icon: faBriefcase, title: "Work Experience" },
          { section: "certifications", icon: faCertificate, title: "Certifications" }, // Updated icon
          { section: "achievements", icon: faTrophy, title: "Achievements" },
          { section: "hobbies", icon: faLightbulb, title: "Hobbies" },
          { section: "languages", icon: faGlobe, title: "Languages" },
        ].map(({ section, icon, title }) => (
          <section key={section} className="template2-section">
            <h2>
              <FontAwesomeIcon icon={icon} /> {title}
            </h2>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId={section}>
                {(provided) => (
                  <div
                    className="droppable-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {resume[section]?.map((item, index) => (
                      <Draggable key={index} draggableId={`${section}-${index}`} index={index}>
                        {(provided) => (
                          <div
                            className="skill-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <input
                              type="text"
                              value={item || ""}
                              onChange={(e) =>
                                handleSectionChange(section, index, e.target.value)
                              }
                              placeholder={`Enter ${title}`}
                            />
                            <button
                              className="remove-button"
                              onClick={() => handleRemoveItem(section, index)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <button className="add-button" onClick={() => handleAddItem(section)}>
              <FontAwesomeIcon icon={faPlus} /> Add {title}
            </button>
          </section>
        ))}

        {/* Save and Export Buttons */}
        <div className="save-container">
          <button onClick={() => onSave(resume)} className="save-button">
            Save Resume
          </button>
          <button onClick={handleExportPDF} className="export-button">
            Export to PDF
          </button>
        </div>
      </div>

      {/* Right: Live Preview Section */}
      <div className="preview-container">
        <h2>Live Preview</h2>
        <div className="resume-preview">
          <p>
            <b>Name:</b> {resume.name || "N/A"}
          </p>
          <p>
            <b>Profile:</b> {resume.profile || "N/A"}
          </p>
          {/* Example of listing out some sections */}
          {["technicalSkills", "softSkills", "education", "workExperience"].map((section) => (
            <p key={section}>
              <b>{section.replace(/([A-Z])/g, " $1")}:</b>{" "}
              {resume[section]?.length ? resume[section].join(", ") : "N/A"}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Template2;


