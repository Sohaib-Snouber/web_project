import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useNavigate, useParams } from "react-router-dom";
import Template1 from "./Template1";
import Template2 from "./Template2";
import CVFormats from "./CVFormats";
import SampleData1 from "./SampleData1"; // Import Template1 Sample Data
import SampleData2 from "./SampleData2"; // Import Template2 Sample Data

function CVBuilder({ onLogout }) {
  const [sections, setSections] = useState([]);
  const [resumeContent, setResumeContent] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const navigate = useNavigate();
  const { name } = useParams();

  useEffect(() => {
    const fetchResume = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${config.baseURL}/resumes/${name}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { content, format } = response.data;

        if (content) {
          // Ensure all required fields exist in resumeContent
          const defaultData = format === "Template 1" ? SampleData1 : SampleData2;
          const mergedContent = { ...defaultData, ...content };
          setResumeContent(mergedContent);
        } else {
          const defaultData = format === "Template 1" ? SampleData1 : SampleData2;
          setResumeContent(defaultData);
        }

        const selected = CVFormats.find((f) => f.name === format);
        setSelectedFormat(selected);
      } catch (error) {
        console.error("Error fetching resume:", error);
        alert("Failed to fetch resume details.");
      }
    };

    fetchResume();
  }, [name]);

  const handleFormatSelection = async (format) => {
    setSelectedFormat(format);
    const sampleData = format.name === "Template 1" ? SampleData1 : SampleData2;
    setResumeContent(sampleData);

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${config.baseURL}/resumes/${name}`,
        { format: format.name, content: sampleData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error saving format:", error);
      alert("Failed to save the selected format.");
    }
  };

  const saveSections = async (updatedContent) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `${config.baseURL}/resumes/${name}`,
        { content: updatedContent, format: selectedFormat.name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResumeContent(response.data.content);
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume content:", error);
      alert("Failed to save resume content.");
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
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
      ) : selectedFormat.name === "Template 1" ? (
        <Template1 content={resumeContent} onSave={saveSections} />
      ) : selectedFormat.name === "Template 2" ? (
        <Template2 content={resumeContent} onSave={saveSections} />
      ) : (
        <h2>Unsupported Template</h2>
      )}
    </div>
  );
}

export default CVBuilder;
