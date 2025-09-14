# <img src="public/favicon.ico" alt="CVScan Logo" width="28" /> CVScan – AI-Powered Resume Analyzer  

[![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](#)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
![React](https://img.shields.io/badge/Frontend-React%20Router%20v7-61DAFB?logo=react&style=flat-square)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&style=flat-square)
![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-38B2AC?logo=tailwindcss&style=flat-square)
![Puter](https://img.shields.io/badge/Cloud-Puter%20Platform-7B42BC?style=flat-square)

A **modern web app** that provides **intelligent feedback** on resumes using AI.  
Built with **React Router** and powered by **Puter’s cloud services**.  

## 🎥 Preview  

[🚀 Live Demo – Try CVScan](https://cv-scan-eta.vercel.app/)

## ✨ Features  

- 🤖 **Smart Resume Analysis** – Upload PDF resumes and get detailed AI-powered feedback  
- 🏆 **ATS Compatibility Check** – See how well your resume performs with Applicant Tracking Systems  
- 📊 **Comprehensive Scoring** – Get scores for content, structure, tone & style, and skills  
- 🎯 **Job-Specific Feedback** – Tailor analysis based on specific job descriptions and companies  
- 📱 **Responsive Design** – Works across desktop, tablet, and mobile devices  
- 🔐 **Secure Authentication** – User authentication powered by Puter  

## 🛠️ Tech Stack  

- **Frontend:** ⚛️ React Router v7 • 📘 TypeScript • 🎨 TailwindCSS  
- **Backend Services:** ☁️ Puter Cloud Platform  
- **PDF Processing:** 📄 PDF.js (client-side conversion)  
- **File Storage:** 🗂️ Puter File System  
- **AI Analysis:** 🤖 Puter AI services  
- **Authentication:** 🔑 Puter Auth  

## 🚀 Getting Started  

### ✅ Prerequisites  
- Node.js 18+  
- npm or yarn  

### 📥 Installation  

#### 1. Clone the repository
```bash
git clone https://github.com/aviralmehrotra/cvscan.git
cd cvscan
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Start the dev server
```bash
npm run dev
```

Open your browser and go to `http://localhost:5173`🚀

🏗️ Build for Production
```bash
npm run build
```

🔎 How It Works

1. 📤 Upload Resume – Add your PDF resume + job details
2. 🖼️ PDF Processing – Converted to image for preview
3. 🧠 AI Analysis – Puter’s AI reviews the content & structure
4. 📝 Feedback Generation – Get detailed, categorized insights:
   - ✅ Overall score & ATS compatibility
   - ✍️ Content quality & relevance
   - 📑 Structure & formatting
   - 🎙️ Tone & professional style
   - 🧩 Skills assessment

## 🗂️ Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Accordion.tsx    # Collapsible feedback sections
│   ├── FileUploader.tsx # Drag & drop file upload
│   ├── ScoreCircle.tsx  # Circular progress indicators
│   └── ...
├── routes/              # Application pages
│   ├── home.tsx         # Dashboard with resume list
│   ├── upload.tsx       # Resume upload & analysis
│   ├── resume.tsx       # Detailed feedback view
│   └── auth.tsx         # Authentication page
├── lib/                 # Utility functions
│   ├── puter.ts         # Puter API integration
│   ├── pdf2img.ts       # PDF conversion utilities
│   └── utils.ts         # Helper functions
└── app.css              # Global styles & components
```

## 📊 Key Features Explained
### 📈 Resume Analysis Categories

- 🏆 ATS Score: Measures automated screening compatibility
- 🖊️ Content: Relevance, completeness, quality
- 🏗️ Structure: Formatting, organization, readability
- 🎙️ Tone & Style: Professional language & flow
- 🧩 Skills: Technical + soft skills representation

### 📱 Responsive Design

- 💻 Desktop: Side-by-side layout with full-size components
- 📱 Mobile: Stacked layout, touch-optimized
- 📏 Tablet: Balanced spacing & sizing for better usability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch `git checkout -b feature/amazing-feature`
3. Commit changes `git commit -m "Add amazing feature"`
4. Push to the branch `git push origin feature/amazing-feature`
5. Open a Pull Request 🔥

## ⚙️ Environment Setup

#### Make sure you have:

- ✅ A Puter account (for authentication)
- 🌐 Proper CORS settings for your domain
- 📄 PDF.js worker files in your public directory

## 📜 License
Licensed under the MIT License – see ![LICENSe](LISENSE) for details.

## 🙌 Acknowledgments

- ⚛️ Built with React Router
- ☁️ Powered by Puter’s Cloud Platform
- 📄 PDF processing with PDF.js
- 🎨 UI styled with TailwindCSS

