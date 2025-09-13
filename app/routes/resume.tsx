import { useEffect, useState, Suspense, lazy } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const ATS = lazy(() => import("~/components/ATS"));
const Details = lazy(() => import("~/components/Details"));
const Summary = lazy(() => import("~/components/Summary"));

export const meta = () => {
  return [
    { title: "Resume | Review" },
    { name: "description", content: "Detailed view of the resume" },
  ];
};

const Resume = () => {
  const { id } = useParams();
  const { auth, isLoading, fs, kv } = usePuterStore();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };
    loadResume();
  }, [id]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-[95%] max-lg:flex-col-reverse">
        <section className="feedback-section  bg-[url('/images/bg-small.svg') bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          {feedback && (
            <h2 className="text-2xl lg:text-3xl !text-black font-bold">
              Resume Review
            </h2>
          )}
          {feedback ? (
            <Suspense
              fallback={
                <div className="flex items-center justify-center p-8">
                  <div className="custom-loader"></div>
                </div>
              }
            >
              <div className="flex flex-col gap-4 lg:gap-6 animate-in fade-in duration-1000">
                <Summary feedback={feedback} />
                <ATS
                  score={feedback.ATS.score || 0}
                  suggestions={feedback.ATS.tips || []}
                />
                <Details feedback={feedback} />
              </div>
            </Suspense>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 lg:gap-6">
              <div className="relative">
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center shadow-lg">
                  <img
                    src="/images/resume-scan-2.gif"
                    className="w-20 h-20 lg:w-24 lg:h-24 object-contain"
                    alt="loading"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 lg:w-8 lg:h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 lg:w-4 lg:h-4 text-white animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              </div>

              <div className="text-center space-y-2 lg:space-y-3">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800">
                  Preparing Your Results
                </h3>
                <p className="text-sm lg:text-base text-gray-600 max-w-sm lg:max-w-md">
                  We're loading your comprehensive resume analysis with detailed
                  insights and recommendations.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
