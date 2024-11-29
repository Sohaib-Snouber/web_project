import React, { useState } from "react";

function Form({ sections, onUpdateSection }) {
  const [editingIndex, setEditingIndex] = useState(null); // Track the section being edited

  // Handle input changes for a section
  const handleInputChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    onUpdateSection(updatedSections); // Pass updated sections to parent
  };

  return (
    <div>
      {sections.map((section, index) => (
        <div key={index} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          {editingIndex === index ? (
            <div>
              <input
                type="text"
                value={section.title}
                onChange={(e) => handleInputChange(index, "title", e.target.value)}
                placeholder="Section Title"
              />
              <textarea
                value={section.content}
                onChange={(e) => handleInputChange(index, "content", e.target.value)}
                placeholder="Section Content"
              ></textarea>
              <button onClick={() => setEditingIndex(null)}>Save</button>
            </div>
          ) : (
            <div>
              <h3>{section.title}</h3>
              <p>{section.content}</p>
              <button onClick={() => setEditingIndex(index)}>Edit</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Form;
