import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function CVBuilder({ onLogout }) {
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ title: "", content: "" });

  useEffect(() => {
    async function fetchResumes() {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${config.baseURL}/resumes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSections(response.data);
    }
    fetchResumes();
  }, []);

  const addSection = async () => {
    if (!newSection.title || !newSection.content) return;
    const token = localStorage.getItem("token");
    const response = await axios.post(`${config.baseURL}/resumes`, {
      sections: [...sections, newSection],
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSections(response.data.sections);
    setNewSection({ title: "", content: "" });
  };

  return (
    <div>
      <h1>CV Builder</h1>
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
