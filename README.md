🌐 FlowShield – Chrome Productivity Tracker

FlowShield is a Chrome Extension that helps you stay productive online. It tracks your browsing activity, blocks distracting sites, and provides insightful reports on your daily usage. Built with the MERN stack, it ensures secure data storage, cross-device sync, and a smooth user experience.

📖 Overview

⏱ Tracks time spent on websites

🚫 Blocks distracting sites in real time

📊 Generates daily/weekly productivity reports

🔐 Supports secure user authentication

🌍 Syncs data across devices with MongoDB backend

FlowShield is designed for students, professionals, and teams who want to focus on what truly matters.

✨ Features

Real-time website tracking

Distraction blocking with customizable rules

Daily & weekly productivity analytics

JWT authentication for user security

React + Tailwind powered clean UI

Cloud sync via MongoDB

🛠 Tech Stack

Frontend (Extension)

React.js

Tailwind CSS

Chrome Extension APIs

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

⚙️ Installation
🔹 1. Clone Repo
git clone https://github.com/Xabhi0811/FlowShield.git
cd FlowShield

🔹 2. Setup Backend
cd backend
npm install


Create .env file inside backend/:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000


Run backend:

npm run dev

🔹 3. Setup Frontend
cd frontend
npm install
npm run build

🔹 4. Load Extension in Chrome

Open Chrome → chrome://extensions/

Enable Developer Mode

Click Load Unpacked

Select frontend/dist

