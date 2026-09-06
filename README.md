🧬 GeneGuard
AI-Powered Genetic Risk Assessment & Preventive Health Platform

GeneGuard is an AI-integrated healthcare web application designed to help users understand their potential genetic and lifestyle-related health risks. The platform allows users to build a personal health profile, analyze family medical history, evaluate lifestyle factors, and receive personalized preventive health recommendations.

🚀 Features
🧬 Genetic Risk Assessment — Analyze potential risks associated with family medical history.
👨‍👩‍👧 Family Health Tree — Record and visualize family medical history.
📊 Risk Analysis Dashboard — Present health-risk information in an easy-to-understand format.
🤖 AI-Powered Recommendations — Generate personalized preventive-health suggestions.
🏥 Health Passport — Maintain a centralized overview of important health information.
👨‍⚕️ Doctor View — Provide a simplified health overview for medical discussions.
⚙️ Profile Management — Store lifestyle, medical, and personal health information.
♿ Accessibility — Includes features such as Color Blind Mode.
📱 Responsive Interface — Designed for desktop and mobile-friendly usage.
🛠️ Tech Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
Wouter
React Query
Recharts
Framer Motion
Backend
Node.js
Express.js
TypeScript
REST API
Database & ORM
Drizzle ORM
PostgreSQL / Neon compatible architecture
AI
Google Gemini API
🏗️ Project Structure
GeneGuard/
│
├── api/                 # Vercel serverless API
├── client/              # React frontend
│   └── src/
│
├── server/              # Express backend
│   ├── routes.ts
│   ├── storage.ts
│   ├── index.ts
│   └── vite.ts
│
├── shared/              # Shared schemas and types
├── attached_assets/     # Project assets
├── package.json
├── vite.config.ts
├── drizzle.config.ts
└── vercel.json
🔄 Application Flow
User
  ↓
Create Health Profile
  ↓
Add Medical & Family History
  ↓
Lifestyle Assessment
  ↓
AI / Risk Analysis
  ↓
Personalized Recommendations
  ↓
Health Passport
  ↓
Preventive Health Actions
💻 Getting Started
1. Clone the repository
git clone https://github.com/Akshat-vishwakarm/GeneGuard.git
cd GeneGuard
2. Install dependencies
npm install
3. Start development server
npm run dev
4. Build for production
npm run build
🔐 Environment Variables

Create a .env file and add the required API credentials:

GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_database_url

Never commit .env files, passwords, API keys, or personal account credentials to GitHub.

🌐 Deployment

GeneGuard is designed to be deployable using Vercel, with the React frontend served as a production build and the Express backend exposed through a serverless API function.

🎯 Purpose

GeneGuard aims to make preventive healthcare more accessible by combining:

Family Medical History + Lifestyle Information + AI + Risk Analysis

into one easy-to-use platform.

⚠️ Disclaimer: GeneGuard is an educational and preventive-health project. It does not provide medical diagnosis or replace professional medical advice.

🔮 Future Improvements
Persistent PostgreSQL database
More advanced genetic-risk models
Secure user authentication
Medical-report/document analysis
Improved AI health recommendations
Doctor-patient sharing
Long-term health trend tracking
Automated health reminders
More comprehensive risk prediction models
