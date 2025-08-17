🚀 FlowShield

A Chrome Extension + MERN Stack App that helps you stay productive by tracking time spent on websites, blocking distractions, and generating productivity reports.

✨ Features

⏱️ Track time spent on websites

🚫 Block distracting sites

📊 Daily/weekly productivity reports

🔐 Secure authentication with JWT

⚡ Built using MERN stack + Tailwind CSS

🛠️ Tech Stack

Frontend: React + Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

Extension: Chrome Extension APIs

Auth: JWT + bcryptjs

📂 Project Structure
FlowShield/
│── server/Backend            # Express + MongoDB backend
│   ├── controllers/    
│   ├── models/         
│   ├── routes/         
│   └── index.js       
│
│── extension/Frontend           # React + Tailwind frontend
│   ├── public/         
│   ├── src/            
│   │   ├── components/ 
│   │   ├── pages/      
│   │   └── App.jsx     
│   └── package.json    
│
│── Extension/          # Chrome Extension files
│   ├── manifest.json   
│   ├── popup.html      
│   ├── popup.js        
│   └── background.js   
│
└── README.md

⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/Xabhi0811/FlowShield.git
cd FlowShield

2️⃣ Backend Setup
cd server
npm install
npm start

3️⃣ Frontend Setup
cd extension
npm install
npm run dev

4️⃣ Chrome Extension Setup

Open Chrome → Extensions → Manage Extensions

Enable Developer Mode

Click Load unpacked

Select the Extension/ folder

