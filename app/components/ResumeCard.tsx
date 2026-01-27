import { Link } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      try {
        const blob = await fs.read(imagePath);
        if (!blob) return;
        let url = URL.createObjectURL(blob);
        setResumeUrl(url);
      } catch (error) {
        console.error("Error loading resume image:", error);
      }
    };
    loadResume();
  }, [imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="group bg-white rounded-[2.5rem] border border-gray-100 p-5 transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(255,107,0,0.1)] hover:-translate-y-2 flex flex-col h-full relative overflow-hidden"
    >
      {/* Background Glow on Hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/5 blur-[60px] rounded-full group-hover:bg-orange-500/10 transition-colors duration-500"></div>

      <div className="flex justify-between items-start gap-4 mb-6 relative z-10">
        <div className="min-w-0 flex-grow">
          <h3 className="text-lg font-black text-gray-900 truncate group-hover:text-orange-500 transition-colors duration-300">
            {companyName || "Untitled Resume"}
          </h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest truncate mt-1">
            {jobTitle || "General Role"}
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="relative w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center border border-orange-100 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
            <span className="text-sm font-black text-orange-600 group-hover:text-white transition-colors duration-300">
              {feedback.overallScore}
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex-grow overflow-hidden rounded-[1.5rem] bg-gray-50 aspect-[4/3] border border-gray-100 mb-6 group-hover:border-orange-100 transition-colors duration-300">
        {resumeUrl ? (
          <div className="w-full h-full p-4">
            <img
              src={resumeUrl}
              alt="resume preview"
              className="w-full h-full object-cover object-top rounded-lg shadow-sm transition-transform duration-700 group-hover:scale-[1.05]"
              style={{
                imageRendering: "-webkit-optimize-contrast",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-10">
            📄
          </div>
        )}

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/5 transition-colors duration-300 flex items-center justify-center">
          <div className="px-5 py-2.5 bg-white rounded-full shadow-xl text-xs font-black text-gray-900 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            View Full Analysis
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 relative z-10">
        <div className="flex gap-2">
          <span className="px-2.5 py-1 bg-gray-50 text-gray-500 text-[10px] font-black rounded-lg uppercase tracking-wider border border-gray-100 group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-100 transition-colors duration-300">
            AI Scanned
          </span>
          {feedback.overallScore >= 80 && (
            <span className="px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg uppercase tracking-wider border border-green-100">
              Strong
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-orange-500 group-hover:gap-3 transition-all duration-300">
          <span className="text-xs font-black uppercase tracking-widest">
            Details
          </span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
