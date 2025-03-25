# Trayana - README

## 🚀 Overview
This project is a **real-time disaster response and resource management system** leveraging AI and cloud technologies. It enables **victims, government agencies, and partner organizations** to coordinate during disasters via multi-channel communication and automated resource allocation.

## 🔧 Tech Stack
| Component           | Technology Used |
|-------------------|----------------|
| **Frontend**      | React Native (Mobile), Next.js (Web), TailwindCSS |
| **Backend**       | Node.js, Express.js, Supabase (PostgreSQL, Realtime DB) |
| **AI & ML**       | Google Gemini AI, Vertex AI Forecasting, Google NLP API |
| **Communication** | Firebase Push, Twilio SMS, Google Dialogflow, Google Public Alerts API |
| **Geolocation**   | Google Maps API, GPS Tracking |
| **Data Analytics**| Google Data Studio |
| **IoT & Sensors** | Google Cloud IoT Core (for seismic & flood sensors) |

## 🏗️ Features
### 🎯 **Core Features**
✅ **Real-time Disaster Alerts** (Supabase Realtime and Twilio, Social Media Monitoring)  
✅ **Disaster Prediction** (AI-powered Diaster Prediction via Vertex AI)  
✅ **SOS Emergency Requests** (AI-powered urgency detection via Gemini AI )  
✅ **Offline Mode** (Locally stores distress messages, syncs once online)  
✅ **Multi-Channel Communication** (Mobile app, SMS, IVR for illiterate users)  
✅ **AI Resource Matching & Allocation** (Google Vertex AI)  
✅ **Geolocation Tracking** (Rescue teams & victims via Google Maps API)  
✅ **Data Dashboards** (Live response monitoring via Google Data Studio)  

## 📜 Installation & Setup
1️⃣ Clone the repository:  
```bash
   git clone https://github.com/your-username/disaster-response-system.git
```
2️⃣ Install dependencies:  
```bash
   cd disaster-response-system
   npm install
```
3️⃣ Set up **Supabase environment variables** in `.env.local`  
4️⃣ Run the development server:  
```bash
   npm run dev
```

## 📡 API Endpoints
### 🚨 **SOS Alerts**
- `POST /api/sos` – Submit an SOS request
- `GET /api/sos` – Fetch active distress signals

### 📍 **Resource Management**
- `POST /api/resources` – Allocate resources
- `GET /api/resources` – View available resources

### 🔔 **Notifications & Alerts**
- `POST /api/alerts` – Broadcast disaster warnings
- `GET /api/alerts` – Retrieve active alerts

## 🔒 Security & Authentication
- **Clerk Authentication** for role-based access (User, Admin, Partner)
- **AES-256 & TLS Encryption** for secure data transmission

## 🛠️ Future Enhancements
- ✅ AI-based speech-to-text for emergency reporting
- ✅ Blockchain-based transparent resource tracking
- ✅ Machine learning for disaster prediction refinement

## 🤝 Contribution Guidelines
1️⃣ Fork the repository  
2️⃣ Create a new branch (`feature-branch`)  
3️⃣ Commit your changes  
4️⃣ Submit a pull request 🎉

## 📩 Contact
For queries, reach out at: `ad2719@cse.jgec.ac.in`

