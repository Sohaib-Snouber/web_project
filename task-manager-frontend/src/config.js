// src/config.js
const isProduction = false; // Set to `true` for production, `false` for local development

const config = {
  baseURL: isProduction
    ? "https://task-manager-backend-4tll.onrender.com" // Render production URL
    : "http://localhost:5001", // Local development URL
};

export default config;
