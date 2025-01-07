// src/config.js
const isProduction = true; // Set to `true` for production, `false` for local development

const config = {
  baseURL: isProduction
    ? "https://web-project-xamy.onrender.com" // Render production URL
    : "http://localhost:5001", // Local development URL
};

export default config;
