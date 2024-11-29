import React from "react";
import { useNavigate } from "react-router-dom";
import CVFormats from "./CVFormats";

function FormsPanel() {
  const navigate = useNavigate();

  const handleSelectFormat = (formatName) => {
    navigate(`/cv-builder/${formatName}`); // Redirect to CVBuilder with the selected format name
  };

  return (
    <div>
      <h1>Select a CV Template</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {CVFormats.map((format, index) => (
          <div
            key={index}
            onClick={() => handleSelectFormat(format.name)}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "5px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "200px",
            }}
          >
            <h3>{format.name}</h3>
            <p>Preview of {format.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormsPanel;
