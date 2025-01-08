import React, { useState, useEffect } from "react";
//import "./Template1.css"; // Assuming the provided CSS is used
import SampleData1 from "./SampleData1";
import "./Template1.css"

const Template1 = ({ onSave, content }) => {
  const [resume, setResume] = useState(content || SampleData1);

  useEffect(() => {
    if (content) {
      setResume(content);
    }
  }, [content]);
  
  // Update specific fields
  const handleFieldChange = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectionChange = (section, index, field, value) => {
    setResume((prev) => {
      const updatedSection = [...prev[section]];
      updatedSection[index][field] = value;

      // Dynamically update the icon if the type changes
      if (section === "contact" && field === "type") {
        switch (value) {
          case "Email":
            updatedSection[index].icon = "✉️";
            break;
          case "Website":
            updatedSection[index].icon = "🔗";
            break;
          case "Phone":
            updatedSection[index].icon = "📞";
            break;
          case "Address":
            updatedSection[index].icon = "📍";
            break;
          default:
            updatedSection[index].icon = ""; // Default or no icon
        }
      }
      return { ...prev, [section]: updatedSection };
    });
  };

  const handleAddItem = (section) => {
    let newItem = {};

    // Define default structures for each section
    switch (section) {
      case "contact":
        newItem = {
          icon: "",
          value: "",
          type: "Phone", // Default type
        };
        switch (newItem.type) {
          case "Email":
            newItem.icon = "✉️";
            break;
          case "Website":
            newItem.icon = "🔗";
            break;
          case "Phone":
            newItem.icon = "📞";
            break;
          case "Address":
            newItem.icon = "📍";
            break;
          default:
            break;
        }
        break;

      case "skills":
        newItem = {
          name: "New Skill",
          rating: 1,
        };
        break;

      case "softwareSkills":
        newItem = {
          name: "New Software",
          rating: 1,
        };
        break;

      case "languages":
        newItem = {
          name: "New Language",
          rating: 1,
        };
        break;

      case "education":
        newItem = {
          degree: "New Degree",
          institution: "New Institution",
          startDate: "",
          endDate: "",
          isPresent: false,
          description: "",
        };
        break;

      case "workExperience":
        newItem = {
          title: "New Job Title",
          company: "New Company",
          description: "",
          startDate: "",
          isPresent: false,
          endDate: "",
        };
        break;

      case "projects":
        newItem = {
          title: "New Project Title",
          description: "New Project Description",
          startDate: "",
          endDate: "",
          isPresent: false,
        };
        break;

      default:
        break;
    }

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
      setResume((prev) => ({ ...prev, picture: { ...prev.picture, src: imageUrl } }));
    }
  };

  return (
    <div className="template-page">
      <div className="top-bar">
        <header>
          <input
            type="text"
            value={resume.header}
            onChange={(e) => handleFieldChange("header", e.target.value)}
            placeholder="Enter header"
          />
        </header>
      </div>

    <div className="container">
      {/* Top Bar */}
      

      {/* Sidebar */}
      <div className="sidebar">
        {/* Picture */}
        <section className="picture">
          {resume.picture.src ? (
            <>
              <img src={resume.picture.src} alt={resume.picture.alt} />
              <button onClick={() => document.getElementById("imageInput").click()}>
                Change Picture
              </button>
            </>
          ) : (
            <button onClick={() => document.getElementById("imageInput").click()}>
              Upload Picture
            </button>
          )}
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </section>

        {/* Contact */}
        <section className="profile">
          <h2>Contact</h2>
          {resume.contact.map((item, index) => (
            <div key={index}>
              <span className="contact-icon">{item.icon}</span>
              <input
                type="text"
                value={item.value}
                onChange={(e) =>
                  handleSectionChange("contact", index, "value", e.target.value)
                }
                placeholder={`Enter ${item.type}...`} // Dynamically show placeholder based on type
                />
              <select
                value={item.type}
                onChange={(e) => handleSectionChange("contact", index, "type", e.target.value)}
              >
                <option value="Phone">Phone</option>
                <option value="Email">Email</option>
                <option value="Website">Website</option>
                <option value="Address">Address</option>
              </select>
              <button onClick={() => handleRemoveItem("contact", index)}>-</button>
            </div>
          ))} 
          <button onClick={() => handleAddItem("contact", { icon: "📞", type: "Phone", value: "" })}>+ Add Contact</button>
        </section>

        {/* Skills */}
        <section className="skills">
          <h2>Skills</h2>
          {resume.skills.map((skill, index) => (
            <div key={index}>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleSectionChange("skills", index, "name", e.target.value)}
                placeholder="Enter skill name"
                />
              <select
                value={skill.rating}
                onChange={(e) => handleSectionChange("skills", index, "rating", e.target.value)}
                >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
              <button onClick={() => handleRemoveItem("skills", index)}>-</button>
            </div>
          ))}
          <button onClick={() => handleAddItem("skills")}>+ Add Skill</button>
        </section>

        {/* Software Skills */}
        <section className="software">
          <h2>Software Skills</h2>
          {resume.softwareSkills.map((skill, index) => (
            <div key={index}>
              <input
                type="text"
                value={skill.name}
                onChange={(e) =>
                  handleSectionChange("softwareSkills", index, "name", e.target.value)
                }
                placeholder="Enter software skill"
                />
              <select
                value={skill.rating}
                onChange={(e) =>
                  handleSectionChange("softwareSkills", index, "rating", e.target.value)
                }
                >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
              <button onClick={() => handleRemoveItem("softwareSkills", index)}>-</button>
            </div>
          ))}
          <button onClick={() => handleAddItem("softwareSkills")}>+ Add Software Skill</button>
        </section>

        {/* Languages */}
        <section className="languages">
          <h2>Languages</h2>
          {resume.languages.map((language, index) => (
            <div key={index}>
              <input
                type="text"
                value={language.name}
                onChange={(e) =>
                  handleSectionChange("languages", index, "name", e.target.value)
                }
                placeholder="Enter language"
                />
              <select
                value={language.rating}
                onChange={(e) =>
                  handleSectionChange("languages", index, "rating", e.target.value)
                }
                >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
              <button onClick={() => handleRemoveItem("languages", index)}>-</button>
            </div>
          ))}
          <button onClick={() => handleAddItem("languages")}>+ Add Language</button>
        </section>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <section className="summary">
          <textarea
            value={resume.summary}
            onChange={(e) => handleFieldChange("summary", e.target.value)}
            placeholder="Write your summary..."
            />
        </section>

        <section className="education">
          <h2>Education</h2>
          {resume.education.map((edu, index) => (
            <div key={index}>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  handleSectionChange("education", index, "degree", e.target.value)
                }
                placeholder="Enter degree"
                />
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  handleSectionChange("education", index, "institution", e.target.value)
                }
                placeholder="Enter institution"
                />
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) =>
                  handleSectionChange("education", index, "startDate", e.target.value)
                }
                placeholder="Start date"
              />
              {!edu.isPresent && (
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) =>
                    handleSectionChange("education", index, "endDate", e.target.value)
                  }
                  placeholder="End date"
                />
              )}
              <label>
                <input
                  type="checkbox"
                  checked={edu.isPresent || false}
                  onChange={(e) =>
                    handleSectionChange("education", index, "isPresent", e.target.checked)
                  }
                />
                Present
              </label> 
              <textarea
                value={edu.description}
                onChange={(e) =>
                  handleSectionChange("education", index, "description", e.target.value)
                }
                placeholder="Enter description"
              />
              <button onClick={() => handleRemoveItem("education", index)}>-</button>
            </div>
          ))}
          <button onClick={() => handleAddItem("education")}>+ Add Education</button>
        </section>
        <section className="work-experience">
          <h2>Work Experience</h2>
          {Array.isArray(resume.workExperience) &&
            resume.workExperience.map((work, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={work.title}
                  onChange={(e) =>
                    handleSectionChange("workExperience", index, "title", e.target.value)
                  }
                  placeholder="Enter job title"
                />
                <input
                  type="text"
                  value={work.company}
                  onChange={(e) =>
                    handleSectionChange("workExperience", index, "company", e.target.value)
                  }
                  placeholder="Enter company name"
                />
                <input
                  type="month"
                  value={work.startDate}
                  onChange={(e) =>
                    handleSectionChange("workExperience", index, "startDate", e.target.value)
                  }
                  placeholder="Start date"
                />
                {!work.isPresent && (
                  <input
                    type="month"
                    value={work.endDate}
                    onChange={(e) =>
                      handleSectionChange("workExperience", index, "endDate", e.target.value)
                    }
                    placeholder="End date"
                  />
                )}
                <label>
                  <input
                    type="checkbox"
                    checked={work.isPresent || false}
                    onChange={(e) =>
                      handleSectionChange("workExperience", index, "isPresent", e.target.checked)
                    }
                  />
                  Present
                </label>
                <textarea
                  value={work.description}
                  onChange={(e) =>
                    handleSectionChange("workExperience", index, "description", e.target.value)
                  }
                  placeholder="Enter job description"
                />
                <button onClick={() => handleRemoveItem("workExperience", index)}>-</button>
              </div>
            ))}
          <button onClick={() => handleAddItem("workExperience")}>+ Add Work</button>
        </section>
        <section className="projects">
          <h2>Projects</h2>
          {resume.projects.map((project, index) => (
            <div key={index}>
              <input
                type="text"
                value={project.title}
                onChange={(e) =>
                  handleSectionChange("projects", index, "title", e.target.value)
                }
                placeholder="Enter project title"
              />
              <input
                  type="month"
                  value={project.startDate}
                  onChange={(e) =>
                    handleSectionChange("projects", index, "startDate", e.target.value)
                  }
                  placeholder="Start date"
                />
              {!project.isPresent && (
                <input
                  type="month"
                  value={project.endDate}
                  onChange={(e) =>
                    handleSectionChange("projects", index, "endDate", e.target.value)
                  }
                  placeholder="End date"
                />
              )}
              <label>
                <input
                  type="checkbox"
                  checked={project.isPresent || false}
                  onChange={(e) =>
                    handleSectionChange("projects", index, "isPresent", e.target.checked)
                  }
                />
                Present
              </label>              
              <textarea
                value={project.description}
                onChange={(e) =>
                  handleSectionChange("projects", index, "description", e.target.value)
                }
                placeholder="Enter project description"
                />
              <button onClick={() => handleRemoveItem("projects", index)}>-</button>
            </div>
          ))}
          <button onClick={() => handleAddItem("projects")}>+ Add Project</button>
        </section>
      </div>
    </div>
    <button className= "save button" onClick={() => onSave(resume)}>Save Resume</button>
  </div>
  );
};

export default Template1;
