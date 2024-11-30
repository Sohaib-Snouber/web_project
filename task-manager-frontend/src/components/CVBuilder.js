import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate, useParams } from "react-router-dom";
import Form from "./Form";
import CVFormats from "./CVFormats";

function CVBuilder({ onLogout }) {
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();
  const { name } = useParams(); // Get the resume name from the URL
  const [selectedFormat, setSelectedFormat] = useState(null); // Track selected format

  useEffect(() => {
    // Fetch the existing resume details
    async function fetchResume() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${config.baseURL}/resumes/${name}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { sections, format } = response.data;
        setSections(sections || []);
        if (format) {
          // If a format is already set, select it
          const existingFormat = CVFormats.find((f) => f.name === format);
          if (existingFormat) setSelectedFormat(existingFormat);
        }
      } catch (error) {
        console.error("Error fetching resume:", error);
        alert("Failed to fetch resume details.");
      }
    }

    fetchResume();
  }, [name]);

  const handleFormatSelection = async (format) => {
    setSelectedFormat(format);
    setSections(format.sections);
    // Save the format to the backend
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${config.baseURL}/resumes/${name}`,
        { sections: format.sections, format: format.name }, // Include format name
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error saving format:", error);
      alert("Failed to save selected format.");
    }
  };

  // Save updated sections to the backend
  const saveSections = async (updatedSections) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${config.baseURL}/resumes/${name}`,
        { sections: updatedSections },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSections(response.data.sections); // Update sections in the UI
    } catch (error) {
      console.error("Error saving sections:", error);
    }
  };
  // Logout function
  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirect to the welcome page
  };

  return (
    <div>
      <h1>CV Builder: {name}</h1>
      <button onClick={() => navigate(`/profile`)} style={{ marginBottom: "20px" }}>Back to Profile</button>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>Logout</button>

      {/* If no format is selected, show format selection */}
      {!selectedFormat ? (
        <div>
          <h2>Select a Format</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {CVFormats.map((format, index) => (
              <div
                key={index}
                onClick={() => handleFormatSelection(format)}
                style={{
                  border: "1px solid #ccc",
                  padding: "20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  width: "200px",
                  textAlign: "center",
                }}
              >
                <h3>{format.name}</h3>
                <p>Preview of {format.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Show form once a format is selected
        <Form sections={sections} onUpdateSection={saveSections} />
      )}
    </div>
  );
}

export default CVBuilder;
