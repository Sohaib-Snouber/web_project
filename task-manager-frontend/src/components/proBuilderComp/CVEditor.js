import React from "react";
import Section from "./Section";

function CVEditor({ sections, updateSection, removeSection }) {
  return (
    <div>
      <h3>Your CV</h3>
      {sections.length > 0 ? (
        sections.map((section, index) => (
          <Section
            key={index}
            section={section}
            index={index}
            updateSection={updateSection}
            removeSection={removeSection}
          />
        ))
      ) : (
        <p>Your CV is empty. Add blocks from the left panel.</p>
      )}
    </div>
  );
}

export default CVEditor;
