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
      navigate(`/auth?next=/resume/${id}`);
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
    <main className="p-0 pt-32 md:pt-40 bg-soft-neutral hero-gradient min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/20 blur-[120px] rounded-full animate-float"></div>
        <div
          className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/20 blur-[100px] rounded-full animate-float"
          style={{ animationDelay: "-2s" }}
        ></div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 pt-6 px-4">
        <nav className="navbar !max-w-[1400px]">
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
              C
            </div>
            <p className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              CV<span className="text-orange-500">Scan</span>
            </p>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-semibold transition-all text-sm"
            >
              <img
                src="/icons/back.svg"
                alt="back"
                className="w-3 h-3 rotate-180"
              />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </nav>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-10">
        <div className="mt-28 flex flex-col xl:flex-row gap-10">
          {/* Left Side: Resume Preview */}
          <section className="xl:w-[40%]">
            <div className="xl:sticky xl:top-40">
              <div className="flex items-center gap-3 mb-6 animate-fade-in">
                <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
                  Resume Preview
                </h2>
              </div>

              {imageUrl && resumeUrl ? (
                <div className="animate-fade-in gradient-border bg-white/50 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden group relative">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative"
                  >
                    <img
                      src={imageUrl}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02] rounded-2xl"
                      alt="Resume Preview"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-2xl duration-700 ease-in-out">
                      <div className="px-6 py-3 bg-white/90 backdrop-blur rounded-full shadow-xl font-bold text-gray-900 flex items-center gap-2">
                        <span>View Full PDF</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>
              ) : (
                <div className="w-full aspect-[1/1.4] bg-white/50 backdrop-blur-sm border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl animate-pulse"></div>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                    Loading Preview...
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Right Side: Analysis Results */}
          <section className="xl:w-[60%] pb-20">
            <div
              className="flex items-center gap-3 mb-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
                AI Analysis Report
              </h2>
            </div>

            {feedback ? (
              <Suspense
                fallback={
                  <div className="flex flex-col items-center justify-center py-40">
                    <div className="custom-loader mb-8"></div>
                    <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
                      Processing analysis...
                    </p>
                  </div>
                }
              >
                <div
                  className="flex flex-col gap-8 animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Summary feedback={feedback} />
                  <ATS
                    score={feedback.ATS.score || 0}
                    suggestions={feedback.ATS.tips || []}
                  />
                  <Details feedback={feedback} />
                </div>
              </Suspense>
            ) : (
              <div className="bg-white rounded-[3rem] border border-gray-100 p-12 md:p-20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] text-center animate-fade-in">
                <div className="w-32 h-32 bg-orange-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 relative">
                  <div className="absolute inset-0 rounded-[2.5rem] border-4 border-orange-100 border-t-orange-500 animate-spin"></div>
                  <span className="text-5xl">🤖</span>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">
                  Preparing Your Results
                </h3>
                <p className="text-gray-500 text-lg font-medium max-w-md mx-auto mb-8">
                  We're loading your comprehensive resume analysis with detailed
                  insights and recommendations.
                </p>
                <div className="custom-loader mx-auto"></div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Resume;
