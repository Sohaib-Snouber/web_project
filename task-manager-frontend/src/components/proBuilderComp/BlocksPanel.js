import React from "react";

const predefinedBlocks = [
  { title: "Title", content: "Your Name" },
  { title: "Contact", content: "Your contact details" },
  { title: "Experience", content: "Your experience details" },
  { title: "Skills", content: "Your skills list" },
  { title: "Education", content: "Your education details" },
];

function BlocksPanel({ addSection, onDragStart }) {
  return (
    <div>
      <h3>Blocks Panel</h3>
      {predefinedBlocks.map((block, index) => (
        <div
          key={index}
          draggable // Enable drag-and-drop
          onDragStart={(e) => onDragStart(e, block)} // Handle drag start
          style={{
            border: "1px solid #000",
            marginBottom: "10px",
            padding: "10px",
            cursor: "grab",
          }}
        >
          <h4>{block.title}</h4>
          <p>{block.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BlocksPanel;
