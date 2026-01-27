import { Link } from "react-router";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-100/30 blur-[120px] rounded-full animate-float"></div>
        <div
          className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/30 blur-[100px] rounded-full animate-float"
          style={{ animationDelay: "-2s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <header className="landing-section flex flex-col items-center text-center pt-32 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-700 text-sm font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          AI-Powered Resume Analysis
        </div>
        <h1
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900 mb-8 max-w-5xl text-balance animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          Analyze your resume.{" "}
          <span className="text-orange-500">Fix gaps.</span>{" "}
          <br className="hidden md:block" /> Get shortlisted.
        </h1>
        <p
          className="text-sm md:text-lg xl:text-xl text-gray-600 mb-12 max-w-4xl xl:max-w-4xl text-balance leading-relaxed animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Our AI-driven analyzer helps students and job seekers optimize their
          resumes for ATS compatibility and professional impact.
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            to="/upload"
            className="px-8 py-3 flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-full text-lg font-semibold transition-all shadow-xl shadow-orange-200 hover:scale-105 active:scale-95"
          >
            Upload Resume
          </Link>
          <button className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-full text-lg font-semibold transition-all hover:shadow-md hover:scale-105 active:scale-95">
            See Sample Analysis
          </button>
        </div>

        {/* Mock Resume Visual */}
        <div className="mt-20 w-full max-w-5xl aspect-video bg-white rounded-2xl md:rounded-4xl shadow-2xl border border-gray-100 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-indigo-50/50 flex items-center justify-center transition-all duration-700">
            <img
              src="/images/mock-resume.png"
              className="w-full h-full object-cover"
              alt="Interactive Resume Analysis Preview"
            />
          </div>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 duration-500 transition-opacity flex items-center justify-center hover:cursor-pointer">
            <div className="px-6 py-3 bg-white/90 backdrop-blur rounded-full shadow-xl font-bold text-gray-900">
              Interactive Analysis Preview
            </div>
          </div>
        </div>
      </header>

      {/* How It Works */}
      <section className="landing-section bg-white rounded-[4rem] my-16 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600">Four simple steps to a better resume</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Upload Resume",
              desc: "Upload your resume in PDF format to start the analysis.",
              icon: "📄",
            },
            {
              step: "02",
              title: "AI Analysis",
              desc: "Our AI scans structure, ATS compatibility, and content.",
              icon: "🤖",
            },
            {
              step: "03",
              title: "Get Feedback",
              desc: "Receive a detailed score and actionable suggestions.",
              icon: "📊",
            },
            {
              step: "04",
              title: "Improve",
              desc: "Fix the identified gaps and re-check for a perfect score.",
              icon: "✨",
            },
          ].map((item, i) => (
            <div key={i} className="step-card">
              <div className="step-number">{item.step}</div>
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features */}
      <section className="landing-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-bold text-gray-900 mb-6">
              Everything you need to land your dream job
            </h2>
            <p className="text-lg xl:text-xl lg:text-lg md:text-md text-gray-600 mb-8">
              We provide comprehensive tools to ensure your resume stands out to
              both recruiters and automated systems.
            </p>
            <div className="space-y-4">
              {[
                "ATS Compatibility Check",
                "Detailed Resume Scoring",
                "Keyword & Role Suggestions",
                "Formatting & Readability Feedback",
                "Actionable Improvement Tips",
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <span className="font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="feature-card">
              <div className="text-3xl">🎯</div>
              <h3 className="font-bold text-gray-900">ATS Optimized</h3>
              <p className="text-sm text-gray-600">
                Ensure your resume passes through Applicant Tracking Systems
                with ease.
              </p>
            </div>
            <div className="feature-card">
              <div className="text-3xl">📈</div>
              <h3 className="font-bold text-gray-900">Score Breakdown</h3>
              <p className="text-sm text-gray-600">
                Get a clear understanding of where your resume excels and where
                it lacks.
              </p>
            </div>
            <div className="feature-card">
              <div className="text-3xl">💡</div>
              <h3 className="font-bold text-gray-900">Smart Tips</h3>
              <p className="text-sm text-gray-600">
                Receive specific, actionable advice to improve your content and
                layout.
              </p>
            </div>
            <div className="feature-card hidden sm:flex">
              <div className="text-3xl">🚀</div>
              <h3 className="font-bold text-gray-900">Fast Results</h3>
              <p className="text-sm text-gray-600">
                Get your analysis in seconds, not minutes. Speed up your job
                search.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use This Tool */}
      <section className="landing-section bg-gray-50 rounded-[4rem] my-20">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4">
            Why Choose CVScan?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built for the modern job market to give you a competitive edge.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Better Shortlisting",
              desc: "Increase your chances of getting noticed by recruiters by 3x.",
              icon: "🏆",
            },
            {
              title: "Fewer Rejections",
              desc: "Identify and fix common resume mistakes before you hit apply.",
              icon: "🛡️",
            },
            {
              title: "Total Clarity",
              desc: "No more guessing. Know exactly what to fix and how to fix it.",
              icon: "💎",
            },
          ].map((benefit, i) => (
            <div key={i} className="benefit-card">
              <div className="text-3xl">{benefit.icon}</div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Insight Section */}
      <section className="landing-section">
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4">
            Real Insights, Real Results
          </h2>
          <p className="text-gray-600">
            See the kind of feedback you'll receive after using our platform
          </p>
        </div>
        <div className="sample-insight-card">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Resume Score</h3>
              <p className="text-gray-500">Software Engineer Intern</p>
            </div>
            <div className="w-20 h-20 rounded-full border-4 border-orange-500 flex items-center justify-center">
              <span className="text-2xl font-bold text-orange-500">78</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <p className="text-sm font-bold text-red-700 mb-1">
                Critical Issue
              </p>
              <p className="text-sm text-red-600">
                Missing "Cloud Computing" keywords which are essential for this
                role.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <p className="text-sm font-bold text-green-700 mb-1">
                Strong Point
              </p>
              <p className="text-sm text-green-600">
                Excellent use of action verbs in the experience section.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-sm font-bold text-blue-700 mb-1">Suggestion</p>
              <p className="text-sm text-blue-600">
                Quantify your achievements (e.g., "Increased efficiency by
                20%").
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-section">
        <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-6 text-gray-300">
          Ready to land your next role?
        </h2>
        <p className="text-gray-300 mb-10 max-w-2xl md:max-w-xl mx-auto">
          Join thousands of job seekers who have improved their resumes with
          CVScan. Fast, free, and no signup required.
        </p>
        <Link
          to="/upload"
          className="lg:px-6 lg:py-3 md:px-7 md:py-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full lg:text-lg md:text-md text-sm font-semibold transition-all inline-flex items-center justify-center shadow-xl shadow-orange-900/20"
        >
          Upload Your Resume Now
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
