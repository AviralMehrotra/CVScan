import { prepareInstructions, AIResponseFormat } from "../../constants";
import React, { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { convertPdfToImage, extractTextFromPdf } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utls";

const Upload = () => {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/upload");
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

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

    try {
      setStatusText("Uploading Resume...");
      const uploadedFile = await fs.upload([file]);
      if (!uploadedFile) throw new Error("Failed to upload the file");

      setStatusText("Converting PDF to Image...");
      const imageFile = await convertPdfToImage(file);
      if (!imageFile.file)
        throw new Error(imageFile.error || "Failed to convert PDF to Image");

      setStatusText("Extracting text from PDF...");
      const textExtraction = await extractTextFromPdf(file);
      if (textExtraction.error || !textExtraction.text.trim())
        throw new Error("Failed to extract text from PDF");

      setStatusText("Uploading converted image...");
      const uploadedImage = await fs.upload([imageFile.file]);
      if (!uploadedImage) throw new Error("Failed to upload image");

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
      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("Analyzing Resume...");

      const prompt = `${prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })}

Resume Content:
${textExtraction.text}`;

      const feedback = await ai.chat(prompt);
      if (!feedback) throw new Error("Failed to analyze resume");

      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      data.feedback = JSON.parse(feedbackText);
      await kv.set(`resume:${uuid}`, JSON.stringify(data));

      setStatusText("Analysis complete, redirecting...");
      navigate(`/resume/${uuid}`);
    } catch (error: any) {
      console.error(error);
      setStatusText(`Error: ${error.message || "Something went wrong"}`);
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const companyName = (formData.get("company-name") as string) || "";
    const jobTitle = (formData.get("job-title") as string) || "";
    const jobDescription = (formData.get("job-description") as string) || "";

    if (!file) return;
    handleAnalyse({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="p-0 pt-40 md:pt-56 bg-soft-neutral hero-gradient min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/20 blur-[120px] rounded-full animate-float"></div>
        <div
          className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/20 blur-[100px] rounded-full animate-float"
          style={{ animationDelay: "-2s" }}
        ></div>
      </div>

      <Navbar />

      <section className="mt-28 px-6 lg:max-w-5xl mx-auto w-full !py-0 flex flex-col items-center">
        <div className="w-full animate-fade-in">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-black uppercase tracking-widest mb-4">
              AI Resume Analyzer
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
              Analyze your <span className="text-orange-500">Resume</span>
            </h1>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Get detailed feedback on ATS compatibility, content, and structure
              in seconds.
            </p>
          </div>

          <div className="bg-white rounded-[3rem] border border-gray-100 p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] relative overflow-hidden">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-24 h-24 bg-orange-50 rounded-3xl flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 rounded-3xl border-4 border-orange-100 border-t-orange-500 animate-spin"></div>
                  <span className="text-4xl">🤖</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2">
                  {statusText}
                </h2>
                <p className="text-gray-500 font-medium mb-8">
                  Our AI is scanning every detail of your resume...
                </p>
                <div className="custom-loader w-full max-w-xs"></div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full">
                  {[
                    { icon: "🎯", label: "ATS Check" },
                    { icon: "📊", label: "Scoring" },
                    { icon: "💡", label: "Smart Tips" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100"
                    >
                      <div className="text-2xl mb-1">{item.icon}</div>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="company-name"
                      className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1"
                    >
                      Target Company
                    </label>
                    <input
                      type="text"
                      name="company-name"
                      placeholder="e.g. Google, Meta"
                      id="company-name"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium"
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="job-title"
                      className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1"
                    >
                      Target Role
                    </label>
                    <input
                      type="text"
                      name="job-title"
                      placeholder="e.g. Software Engineer"
                      id="job-title"
                      className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="job-description"
                    className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1"
                  >
                    Job Description (Optional)
                  </label>
                  <textarea
                    rows={10}
                    name="job-description"
                    placeholder="Paste the job description here for a more tailored analysis..."
                    id="job-description"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                    Upload Resume (PDF)
                  </label>
                  <FileUploader onFileSelect={handleFileSelect} />
                </div>

                <button
                  type="submit"
                  disabled={!file}
                  className={`w-full py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-2xl ${
                    file
                      ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  {file ? (
                    <>
                      <span>Analyse Resume</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </>
                  ) : (
                    "Select a file to continue"
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Private & Secure",
                desc: "Your data is encrypted and never shared.",
                icon: "🔒",
              },
              {
                title: "ATS Optimized",
                desc: "Tested against major tracking systems.",
                icon: "🎯",
              },
              {
                title: "Instant Results",
                desc: "Get your full report in under 30 seconds.",
                icon: "⚡",
              },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-2">
                <div className="text-2xl">{feature.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-40">
        <Footer />
      </div>
    </main>
  );
};

export default Upload;
