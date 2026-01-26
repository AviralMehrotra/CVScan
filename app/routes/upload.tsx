import { prepareInstructions, AIResponseFormat } from "../../constants";
import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { convertPdfToImage, extractTextFromPdf } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utls";

const upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyse = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);

    setStatusText("Uploading Resume...");
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile) return setStatusText("Error: Failed to upload the file");

    setStatusText("Converting PDF to Image...");
    const imageFile = await convertPdfToImage(file);
    if (!imageFile.file)
      return setStatusText("Error: Failed to convert PDF to Image");

    setStatusText("Extracting text from PDF...");
    const textExtraction = await extractTextFromPdf(file);
    if (textExtraction.error || !textExtraction.text.trim())
      return setStatusText("Error: Failed to extract text from PDF");

    setStatusText("Uploading converted image...");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage) return setStatusText("Error: Failed to upload image");

    setStatusText("Preparing Data...");
    const uuid = generateUUID();
    const data = {
      id: uuid,
      resumePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      companyName,
      jobTitle,
      jobDescription,
      feedback: "",
    };
    await kv.set(`resume${uuid}`, JSON.stringify(data));

    setStatusText("Analyzing Resume...");

    const prompt = `${prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })}

Resume Content:
${textExtraction.text}`;

    const feedback = await ai.chat(prompt);
    if (!feedback) return setStatusText("Error: Failed to analyze resume");

    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;

    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysis complete, redirecting...");
    console.log(data);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);

    const companyName = (formData.get("company-name") as string) || "";
    const jobTitle = (formData.get("job-title") as string) || "";
    const jobDescription = (formData.get("job-description") as string) || "";

    if (!file) return;
    handleAnalyse({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart feedback from a professional</h1>
          {isProcessing ? (
            <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto max-sm:gap-4 max-sm:px-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-sm:p-4 w-full">
                <div className="flex flex-col items-center gap-6 max-sm:gap-4">
                  <div className="w-32 h-32 max-sm:w-24 max-sm:h-24 relative">
                    <img
                      src="/images/resume-scan.gif"
                      className="w-full h-full object-contain"
                      alt="resume gif"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl max-sm:text-xl font-semibold text-gray-800">
                      {statusText}
                    </h2>
                    <p className="text-gray-600 max-sm:text-sm">
                      Please wait while we process your resume...
                    </p>
                  </div>
                  <div className="custom-loader"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-sm:gap-3 w-full text-center">
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 max-sm:p-3">
                  <div className="w-12 h-12 max-sm:w-10 max-sm:h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <img src="/icons/analysis.svg" alt="analysis" />
                  </div>
                  <h3 className="font-semibold text-gray-800 max-sm:text-sm">
                    AI Analysis
                  </h3>
                  <p className="text-sm max-sm:text-xs text-gray-600">
                    Advanced algorithms review your resume
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 max-sm:p-3">
                  <div className="w-12 h-12 max-sm:w-10 max-sm:h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <img src="/icons/score.svg" alt="score" />
                  </div>
                  <h3 className="font-semibold text-gray-800 max-sm:text-sm">
                    Detailed Scoring
                  </h3>
                  <p className="text-sm max-sm:text-xs text-gray-600">
                    Get scores for different sections
                  </p>
                </div>
                <div className="bg-white/80 backdrop-blur rounded-xl p-4 max-sm:p-3">
                  <div className="w-12 h-12 max-sm:w-10 max-sm:h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <img src="/icons/menu.svg" alt="menu" />
                  </div>
                  <h3 className="font-semibold text-gray-800 max-sm:text-sm">
                    Actionable Tips
                  </h3>
                  <p className="text-sm max-sm:text-xs text-gray-600">
                    Receive specific improvement suggestions
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>Upload your resume to get feedback</p>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  name="company-name"
                  placeholder="Company Name"
                  id="company-name"
                  autoComplete="off"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  name="job-title"
                  placeholder="Job Title"
                  id="job-title"
                  autoComplete="off"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  rows={5}
                  name="job-description"
                  placeholder="Job Description"
                  id="job-description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Resume Upload</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button" type="submit">
                Analyse Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
