import React, { useState } from "react";

function Section({ section, index, updateSection, removeSection }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSection, setEditedSection] = useState(section);

  const handleSave = () => {
    updateSection(index, editedSection);
    setIsEditing(false);
  };

  return (
    <div style={{ border: "1px solid #000", marginBottom: "10px", padding: "10px" }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedSection.title}
            onChange={(e) => setEditedSection({ ...editedSection, title: e.target.value })}
          />
          <textarea
            value={editedSection.content}
            onChange={(e) => setEditedSection({ ...editedSection, content: e.target.value })}
          ></textarea>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h4>{section.title}</h4>
          <p>{section.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => removeSection(index)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default Section;
