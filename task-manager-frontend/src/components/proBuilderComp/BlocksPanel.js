import React from "react";

const predefinedBlocks = [
  { title: "Title", content: "Your Name" },
  { title: "Contact", content: "Your contact details" },
  { title: "Experience", content: "Your experience details" },
  { title: "Skills", content: "Your skills list" },
  { title: "Education", content: "Your education details" },
];

function BlocksPanel({ addSection }) {
  return (
    <div>
      <h3>Blocks Panel</h3>
      {predefinedBlocks.map((block, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #000",
            marginBottom: "10px",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => addSection(block)}
        >
          <h4>{block.title}</h4>
          <p>{block.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BlocksPanel;
