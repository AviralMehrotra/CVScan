# <img src="public/favicon.ico" alt="CVScan Logo" width="32" /> CVScan – AI-Powered Resume Intelligence

![CVScan Banner](https://raw.githubusercontent.com/aviralmehrotra/cvscan/main/public/banner.png)

> **Analyze your resume. Fix gaps. Get shortlisted.** CVScan is a state-of-the-art AI-driven platform designed to help job seekers optimize their resumes for modern Applicant Tracking Systems (ATS) and human recruiters alike.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)](https://github.com/aviralmehrotra/cvscan)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![React Router](https://img.shields.io/badge/React%20Router-v7-CA4245?style=for-the-badge&logo=reactrouter)](https://reactrouter.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Puter](https://img.shields.io/badge/Cloud-Puter-7B42BC?style=for-the-badge)](https://puter.com/)

---

## 🚀 Live Demo

Experience the power of AI resume analysis: **[Try CVScan Now](https://cv-scan-eta.vercel.app/)**

---

## ✨ Key Features

- 🧠 **Deep AI Analysis** – Leverages advanced LLMs to provide granular feedback on content, structure, and professional tone.
- 📊 **ATS Compatibility Score** – Understand how well your resume performs against automated screening systems.
- 🎯 **Job-Specific Tailoring** – Analyze your resume against specific job descriptions to find missing keywords and skills.
- 📄 **Interactive PDF Preview** – Real-time rendering of your resume with overlaid AI insights.
- 🔐 **Cloud-Native Auth** – Secure, seamless authentication powered by Puter.js.
- 📱 **Ultra-Responsive UI** – A premium, dark-themed experience that works beautifully on any device.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** [React Router v7](https://reactrouter.com/) (Full-stack React framework)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Next-gen utility-first CSS)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations:** [Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)

### Backend & Cloud (Puter.js)

- **Authentication:** Puter Auth
- **Database/KV:** Puter Key-Value Store
- **AI Engine:** Puter AI (LLM integration)
- **Hosting:** Puter Cloud Platform

### Utilities

- **PDF Processing:** [PDF.js](https://mozilla.github.io/pdf.js/)
- **File Handling:** [React Dropzone](https://react-dropzone.js.org/)

---

## 📂 Project Structure

```bash
app/
├── components/          # Premium UI components (Gauges, Cards, Uploaders)
│   ├── ATS.tsx          # ATS scoring visualization
│   ├── FileUploader.tsx # Drag & drop with PDF validation
│   ├── ScoreGauge.tsx   # Animated SVG gauges for metrics
│   └── LandingPage.tsx  # High-conversion hero sections
├── routes/              # Application routing & page logic
│   ├── dashboard.tsx    # User's resume management hub
│   ├── upload.tsx       # AI analysis pipeline
│   ├── resume.tsx       # Detailed feedback & preview
│   └── auth.tsx         # Puter-powered authentication
├── lib/                 # Core business logic & API wrappers
│   ├── puter.ts         # Puter.js SDK integration
│   └── pdf2img.ts       # Client-side PDF to Image conversion
└── app.css              # Global styles & Tailwind v4 configuration
```

---

## 🏁 Getting Started

### Prerequisites

- **Node.js:** 18.x or higher
- **Package Manager:** npm, pnpm, or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/aviralmehrotra/cvscan.git
   cd cvscan
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🔍 How It Works

1. **Upload:** Drop your PDF resume into the secure uploader.
2. **Context:** (Optional) Provide a job description for targeted analysis.
3. **Process:** PDF.js converts your resume for client-side preview while Puter AI analyzes the text content.
4. **Insights:** Receive a comprehensive breakdown across 5 key dimensions:
   - **ATS Score:** Technical compatibility.
   - **Content:** Information density and relevance.
   - **Structure:** Layout and readability.
   - **Tone:** Professionalism and impact.
   - **Skills:** Keyword matching and skill gaps.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙌 Acknowledgments

- [Puter.js](https://puter.com/) for the incredible cloud infrastructure.
- [React Router](https://reactrouter.com/) for the seamless routing experience.
- [Tailwind CSS](https://tailwindcss.com/) for making styling a breeze.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/aviralmehrotra">Aviral Mehrotra</a>
</p>
