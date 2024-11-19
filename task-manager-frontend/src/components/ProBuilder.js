import React, { useState } from "react";
import BlocksPanel from "./proBuilderComp/BlocksPanel";
import CVEditor from "./proBuilderComp/CVEditor";

function ProBuilder({ onLogout }) {
  const [sections, setSections] = useState([]); // CV sections added by the user

  // Function to handle adding a block from the BlocksPanel
  const addSection = (newSection) => {
    setSections([...sections, newSection]); // Add new section to CV
  };

  // Function to update a specific section
  const updateSection = (index, updatedSection) => {
    const updatedSections = [...sections];
    updatedSections[index] = updatedSection;
    setSections(updatedSections);
  };

  // Function to remove a specific section
  const removeSection = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    setSections(updatedSections);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const block = JSON.parse(e.dataTransfer.getData("block"));
    setSections([...sections, block]);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, block) => {
    e.dataTransfer.setData("block", JSON.stringify(block));
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Panel: Blocks */}
      <div style={{ width: "30%", borderRight: "1px solid #ccc", padding: "10px" }}>
        <BlocksPanel 
          addSection={addSection}
          onDragStart={handleDragStart}
        />
      </div>

      {/* Right Panel: CV Editor */}
      <div style={{ width: "70%", padding: "10px" }}>
        <CVEditor
          sections={sections}
          updateSection={updateSection}
          removeSection={removeSection}
          onLogout={onLogout}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
        />
      </div>
    </div>
  );
}

export default ProBuilder;
