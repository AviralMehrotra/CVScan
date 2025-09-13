# CVScan - AI-Powered Resume Analyzer

A modern web application that provides intelligent feedback on resumes using AI analysis. Built with React Router and powered by Puter's cloud services.

## Features

- **Smart Resume Analysis** - Upload PDF resumes and get detailed AI-powered feedback
- **ATS Compatibility Check** - See how well your resume performs with Applicant Tracking Systems
- **Comprehensive Scoring** - Get scores for content, structure, tone & style, and skills
- **Job-Specific Feedback** - Tailor analysis based on specific job descriptions and companies
- **Responsive Design** - Works seamlessly across desktop, tablet, and mobile devices
- **Secure Authentication** - User authentication powered by Puter

## Tech Stack

- **Frontend**: React Router v7, TypeScript, TailwindCSS
- **Backend Services**: Puter Cloud Platform
- **PDF Processing**: PDF.js for client-side PDF to image conversion
- **File Storage**: Puter File System
- **AI Analysis**: Puter AI services
- **Authentication**: Puter Auth

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/aviralmehrotra/cvscan.git
cd cvscan
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## How It Works

1. **Upload Resume** - Users upload their PDF resume along with job details
2. **PDF Processing** - The PDF is converted to an image for preview
3. **AI Analysis** - Puter's AI analyzes the resume content and structure
4. **Feedback Generation** - Detailed feedback is provided across multiple categories:
   - Overall score and ATS compatibility
   - Content quality and relevance
   - Structure and formatting
   - Tone and professional style
   - Skills assessment

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── Accordion.tsx   # Collapsible feedback sections
│   ├── FileUploader.tsx # Drag & drop file upload
│   ├── ScoreCircle.tsx # Circular progress indicators
│   └── ...
├── routes/             # Application pages
│   ├── home.tsx       # Dashboard with resume list
│   ├── upload.tsx     # Resume upload and analysis
│   ├── resume.tsx     # Detailed feedback view
│   └── auth.tsx       # Authentication page
├── lib/               # Utility functions
│   ├── puter.ts      # Puter API integration
│   ├── pdf2img.ts    # PDF conversion utilities
│   └── utils.ts      # Helper functions
└── app.css           # Global styles and components
```

## Key Features Explained

### Resume Analysis Categories

- **ATS Score**: Measures how well the resume passes through automated screening systems
- **Content**: Evaluates relevance, completeness, and quality of information
- **Structure**: Assesses formatting, organization, and readability
- **Tone & Style**: Reviews professional language and presentation
- **Skills**: Analyzes technical and soft skills representation

### Responsive Design

The application adapts to different screen sizes:

- Desktop: Side-by-side layout with full-size components
- Tablet: Optimized spacing and component sizing
- Mobile: Stacked layout with scaled components for better usability

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Setup

The application uses Puter's cloud services. Make sure you have:

- A Puter account for authentication
- Proper CORS settings for your domain
- PDF.js worker files in your public directory

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with React Router for modern routing
- Powered by Puter's cloud platform
- PDF processing with PDF.js
- UI components styled with TailwindCSS
