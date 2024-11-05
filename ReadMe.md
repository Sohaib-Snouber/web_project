Welcome to web development project

# Web Project

This project is a web application with both frontend and backend components.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB Community Edition

For more details about the initial setup and packages used, refer to the initial commit [here](https://github.com/Sohaib-Snouber/web_project/commit/52930587b9ff010196611298a0e0c05d45d7565a).
## Setup Instructions

### Clone the Repository

First, clone this repository:

```bash
git clone https://github.com/Sohaib-Snouber/web_project.git
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd task-manager-backend
   ```

2. Initialize the npm project:
   ```bash
   npm init -y
   ```

3. **macOS Only**: Start the MongoDB service with `brew`:
   ```bash
   brew services start mongodb-community@8.0
   ```

4. Run the backend server:
   ```bash
   node server.js
   ```

   If everything is set up correctly, you should see the message:
   ```
   Server is running on port 5001
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd task-manager-frontend
   ```

2. Install the necessary packages:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

   If the frontend works correctly, it should automatically open a web browser with the frontend webpage.



