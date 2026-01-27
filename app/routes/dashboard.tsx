import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import Footer from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard - CVScan" },
    { name: "description", content: "Manage and review your resumes with AI." },
  ];
}

export default function Dashboard() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/dashboard");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);
      try {
        const resumes = (await kv.list("resume:*", true)) as KVItem[];
        const parsedResumes = resumes?.map(
          (resume) => JSON.parse(resume.value) as Resume,
        );
        setResumes(parsedResumes || []);
      } catch (error) {
        console.error("Error loading resumes:", error);
      } finally {
        setLoadingResumes(false);
      }
    };

    if (auth.isAuthenticated) {
      loadResumes();
    }
  }, [auth.isAuthenticated]);

  const avgScore =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((acc, curr) => acc + curr.feedback.overallScore, 0) /
            resumes.length,
        )
      : 0;

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

      <section className="mt-28 px-6 lg:max-w-6xl mx-auto w-full !py-0">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 animate-fade-in">
          <div className="flex-grow">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 shrink-0 rounded-[1.5rem] bg-orange-500 flex items-center justify-center text-white text-3xl font-black shadow-2xl shadow-orange-200">
                {auth.user?.username?.[0].toUpperCase() || "U"}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <p className="text-[10px] font-black text-orange-600 uppercase tracking-[0.2em]">
                    Personal Dashboard
                  </p>
                </div>
                <h1 className="text-4xl md:text-4xl font-black text-gray-900 tracking-tight">
                  Welcome,{" "}
                  <span className="text-orange-500">
                    {auth.user?.username || "User"}
                  </span>
                </h1>
              </div>
            </div>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
              {!loadingResumes && resumes?.length === 0
                ? "Ready to land your dream job? Start by uploading your resume for a comprehensive AI analysis."
                : `You've analyzed ${resumes.length} ${resumes.length === 1 ? "resume" : "resumes"}. Here's your career progress overview.`}
            </p>
          </div>

          {resumes.length > 0 && (
            <div className="flex items-center gap-6">
              <div className="flex gap-12 px-10 py-6 bg-white rounded-4xl border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
                <div className="text-center">
                  <p className="text-xs font-black text-gray-400 uppercase mb-2">
                    Total
                  </p>
                  <p className="text-2xl font-black text-gray-900">
                    {resumes.length}
                  </p>
                </div>
                <div className="w-px h-14 bg-gray-100"></div>
                <div className="text-center">
                  <p className="text-xs font-black text-gray-400 uppercase mb-2">
                    Avg Score
                  </p>
                  <p className="text-2xl font-black text-orange-500">
                    {avgScore}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="mb-12 flex items-center justify-between border-b border-gray-100 pb-8">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-4">
            Recent Analyses
            <span className="px-3 py-2 bg-orange-50 text-orange-600 text-sm rounded-full font-black">
              {resumes.length}
            </span>
          </h2>
          {resumes.length > 0 && (
            <Link
              to="/upload"
              className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-2xl font-black text-xs uppercase tracking-widest transition-all hover:shadow-lg flex items-center gap-3"
            >
              Upload New <span>+</span>
            </Link>
          )}
        </div>

        {loadingResumes ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="custom-loader mb-8"></div>
            <p className="text-gray-400 font-black uppercase tracking-widest text-xs">
              Syncing your data...
            </p>
          </div>
        ) : resumes.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            {resumes.map((resume: Resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        ) : (
          <div
            className="bg-white/40 backdrop-blur-md border-2 border-dashed border-gray-200 rounded-[4rem] p-24 text-center animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="w-28 h-28 bg-orange-50 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-5xl shadow-inner">
              📄
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-6">
              Your dashboard is empty
            </h3>
            <p className="text-gray-500 mb-12 max-w-lg mx-auto text-xl font-medium leading-relaxed">
              Upload your first resume to see the power of AI analysis and start
              optimizing for your next big role.
            </p>
            <Link
              to="/upload"
              className="px-14 py-6 bg-orange-500 hover:bg-orange-600 text-white rounded-3xl font-black transition-all shadow-2xl shadow-orange-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-4 text-lg"
            >
              Upload Your First Resume <span>→</span>
            </Link>
          </div>
        )}
      </section>

      <div className="mt-48">
        <Footer />
      </div>
    </main>
  );
}
