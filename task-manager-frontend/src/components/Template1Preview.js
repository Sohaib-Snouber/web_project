import React from "react";
import "./Template1.css";

const Template1Preview = ({ content }) => {
  return (
    <div className="template-page">
      <div className="top-bar">
        <header>
          <h1>{content.header}</h1>
        </header>
      </div>

      <div className="container">
        {/* Sidebar */}
        <div className="sidebar">
          {/* Picture */}
          <section className="picture">
            {content.picture.src && (
              <img src={content.picture.src} alt={content.picture.alt} />
            )}
          </section>

          {/* Contact */}
          <section className="profile">
            <h2>Contact</h2>
            {content.contact.map((item, index) => (
              <p key={index}>{item.value}</p>
            ))}
          </section>

          {/* Skills */}
          <section className="skills">
            <h2>Skills</h2>
            {content.skills.map((skill, index) => (
              <p key={index}>{skill.name}: {skill.rating} stars</p>
            ))}
          </section>

          {/* Software Skills */}
          <section className="software">
            <h2>Software Skills</h2>
            {content.softwareSkills.map((skill, index) => (
              <p key={index}>{skill.name}: {skill.rating} stars</p>
            ))}
          </section>

          {/* Languages */}
          <section className="languages">
            <h2>Languages</h2>
            {content.languages.map((language, index) => (
              <p key={index}>{language.name}: {language.rating} stars</p>
            ))}
          </section>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <section className="summary">
            <h2>Summary</h2>
            <p>{content.summary}</p>
          </section>

          <section className="education">
            <h2>Education</h2>
            {content.education.map((edu, index) => (
              <div key={index}>
                <p>{edu.degree}</p>
                <p>{edu.institution}</p>
              </div>
            ))}
          </section>

          <section className="work-experience">
            <h2>Work Experience</h2>
            {content.workExperience.map((work, index) => (
              <div key={index}>
                <p>{work.title}</p>
                <p>{work.company}</p>
                <p>{work.description}</p>
              </div>
            ))}
          </section>

          <section className="projects">
            <h2>Projects</h2>
            {content.projects.map((project, index) => (
              <div key={index}>
                <p>{project.title}</p>
                <p>{project.description}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Template1Preview;
