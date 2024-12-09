import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useNavigate, useParams } from "react-router-dom";
import Template1 from "./Template1";
import Template2 from "./Template2";
import CVFormats from "./CVFormats";
import SampleData1 from "./SampleData1"; // Data for Template 1
import SampleData2 from "./SampleData2"; // Data for Template 2

function CVBuilder({ onLogout }) {
  const [sections, setSections] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState(null); // Selected template format
  const navigate = useNavigate();
  const { name } = useParams(); // Resume name from the URL

  useEffect(() => {
    // Fetch existing resume details
    async function fetchResume() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${config.baseURL}/resumes/${name}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { sections, format } = response.data;
        setSections(sections || []);

        if (format) {
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

    // Save selected format and sections to the backend
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${config.baseURL}/resumes/${name}`,
        { sections: format.sections, format: format.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error saving format:", error);
      alert("Failed to save selected format.");
    }
  };

  const saveSections = async (updatedSections) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${config.baseURL}/resumes/${name}`,
        { sections: updatedSections },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSections(response.data.sections); // Update UI
    } catch (error) {
      console.error("Error saving sections:", error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirect to the welcome page
  };

  return (
    <div>
      <h1>CV Builder: {name}</h1>
      <button onClick={() => navigate(`/profile`)} style={{ marginBottom: "20px" }}>
        Back to Profile
      </button>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      {/* Display Template Selection */}
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
      ) : selectedFormat.name === "Template 2" ? (
        // Render Template 2 with its data
        <Template2 data={SampleData2} />
      ) : (
        // Render Template 1 with its data
        <Template1 content={SampleData1} />
      )}
    </div>
  );
}

export default CVBuilder;
