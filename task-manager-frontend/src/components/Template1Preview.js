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
              <p key={index}>
                <span>{item.icon}</span>{" "}
                {item.type === "Website" ? (
                  <a href={item.value} target="_blank" rel="noopener noreferrer">
                    {item.value}
                  </a>
                ) : item.type === "Email" ? (
                  <a href={`mailto:${item.value}`}>{item.value}</a>
                ) : (
                  item.value // Non-clickable for Phone and Address
                )}
              </p>
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
            <p>{content.summary}</p>
          </section>

          <section className="education">
            <h2>Education</h2>
            {content.education.map((edu, index) => (
              <div key={index}>
                <p>{edu.degree}</p>
                <p>{edu.institution}</p>
                {edu.startDate || edu.endDate || edu.isPresent ? (
                  <p>
                    {edu.startDate && <span>{edu.startDate}</span>}
                    {edu.startDate && (edu.endDate || edu.isPresent) && <strong> - </strong>}
                    {edu.isPresent ? <span>Present</span> : edu.endDate && <span>{edu.endDate}</span>}
                  </p>
                ) : null}
                {edu.description && (
                  <p>{edu.description}</p>
                )}
              </div>
            ))}
          </section>

          <section className="work-experience">
            <h2>Work Experience</h2>
            {content.workExperience.map((work, index) => (
              <div key={index}>
                <p>{work.title}</p>
                <p>{work.company}</p>
                {work.startDate || work.endDate || work.isPresent ? (
                  <p>
                    {work.startDate && <span>{work.startDate}</span>}
                    {work.startDate && (work.endDate || work.isPresent) && <strong> - </strong>}
                    {work.isPresent ? <span>Present</span> : work.endDate && <span>{work.endDate}</span>}
                  </p>
                ) : null}
                {work.description && (
                  <p>{work.description}</p>
                )}
              </div>
            ))}
          </section>

          <section className="projects">
            <h2>Projects</h2>
            {content.projects.map((project, index) => (
              <div key={index}>
                <p>{project.title}</p>
                  {project.startDate || project.endDate || project.isPresent? (
                    <p>
                      {project.startDate && <span>{project.startDate}</span>}
                      {project.startDate && (project.endDate || project.isPresent) && <strong> - </strong>}
                      {project.isPresent ? <span>Present</span> : project.endDate && <span>{project.endDate}</span>}
                    </p>
                  ) : null}
                  {project.description && (
                    <p>
                      {project.description}
                    </p>
                  )}
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Template1Preview;
