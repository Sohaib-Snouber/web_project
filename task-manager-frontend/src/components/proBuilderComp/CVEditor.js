import React from "react";
import Section from "./Section";

function CVEditor({ sections, updateSection, removeSection, onDrop, onDragOver, onDragStart }) {
  return (
    <div
    onDrop={(e) => onDrop(e)} // Handle drop event
    onDragOver={(e) => onDragOver(e)} // Allow drag-over
    style={{
      minHeight: "400px",
      border: "2px dashed #ccc",
      padding: "10px",
    }}
    >
      <h3>Your CV</h3>
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <Section
            key={index}
            section={section}
            index={index}
            updateSection={updateSection}
            removeSection={removeSection}
            onDragStart={onDragStart}
          />
        ))
      ) : (
        <p>Your CV is empty. Drag and drop blocks here from the left panel.</p>
      )}
    </div>
  );
}

export default CVEditor;
