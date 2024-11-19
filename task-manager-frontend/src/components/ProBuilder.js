import React, { useState } from "react";
import BlocksPanel from "./proBuilderComp/BlocksPanel";
import CVEditor from "./proBuilderComp/CVEditor";

function ProBuilder({ onLogout }) {
  const [cvSections, setCvSections] = useState([]); // CV sections added by the user

  // Function to handle adding a block from the BlocksPanel
  const addSection = (newSection) => {
    setCvSections([...cvSections, newSection]); // Add new section to CV
  };

  // Function to update a specific section
  const updateSection = (index, updatedSection) => {
    const updatedSections = [...cvSections];
    updatedSections[index] = updatedSection;
    setCvSections(updatedSections);
  };

  // Function to remove a specific section
  const removeSection = (index) => {
    const updatedSections = cvSections.filter((_, i) => i !== index);
    setCvSections(updatedSections);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Panel: Blocks */}
      <div style={{ width: "30%", borderRight: "1px solid #ccc", padding: "10px" }}>
        <BlocksPanel addSection={addSection} />
      </div>

      {/* Right Panel: CV Editor */}
      <div style={{ width: "70%", padding: "10px" }}>
        <CVEditor
          sections={cvSections}
          updateSection={updateSection}
          removeSection={removeSection}
          onLogout={onLogout}
        />
      </div>
    </div>
  );
}

export default ProBuilder;
