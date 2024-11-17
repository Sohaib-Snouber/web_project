import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate, useParams } from "react-router-dom";

function CVBuilder({ onLogout }) {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const { name } = useParams(); // Get the resume name from the URL

  useEffect(() => {
    async function fetchResumes() {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.baseURL}/resumes/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Check if response.data is valid before accessing sections
      if (response.data && response.data.sections) {
        setSections(response.data.sections);
      } else {
        setSections([]); // Initialize with an empty array if no sections found
      }    
    }
    fetchResumes();
  }, [name]);

  const addSection = async () => {
    if (!newSection.title || !newSection.content) return;
    const token = localStorage.getItem("token");
    const response = await axios.put(`${config.baseURL}/resumes/${name}`, {
      sections: [newSection],
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSections(response.data.sections);
    setNewSection({ title: "", content: "" });
  };

  // Logout function
  const handleLogout = () => {
    onLogout();
    navigate("/"); // Redirect to the welcome page
  };

  return (
    <div>
      <h1>CV Builder: {name}</h1>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>Logout</button>
      <input
        type="text"
        placeholder="Section Title"
        value={newSection.title}
        onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={newSection.content}
        onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
      ></textarea>
      <button onClick={addSection}>Add Section</button>
      <div>
        {sections.map((section, index) => (
          <div key={index}>
            <h3>{section.title}</h3>
            <p>{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CVBuilder;
