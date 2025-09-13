import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resume | Auth" },
  { name: "description", content: "Log into your account" },
];

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-center pt-8 pb-4">
        <div className="text-4xl font-bold text-gradient">CVScan</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="gradient-border shadow-xl">
            <section className="flex flex-col gap-6 bg-white rounded-2xl p-8">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-2">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h1 className="font-semibold">Welcome Back!</h1>
                <h2 className="text-gray-600">
                  Sign in to analyze your resume with our AI
                </h2>
              </div>

              <div className="space-y-4">
                {isLoading ? (
                  <button className="w-full py-3 px-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-semibold animate-pulse">
                    Logging you in...
                  </button>
                ) : (
                  <>
                    {auth.isAuthenticated ? (
                      <button
                        className="w-full py-3 px-6 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full font-semibold hover:from-red-500 hover:to-red-700 transition-all duration-200"
                        onClick={auth.signOut}
                      >
                        Log Out
                      </button>
                    ) : (
                      <button
                        className="w-full py-3 px-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-full font-semibold hover:from-orange-500 hover:to-orange-700 transition-all duration-200 shadow-lg"
                        onClick={auth.signIn}
                      >
                        Sign In with Puter
                      </button>
                    )}
                  </>
                )}
              </div>

              <div className="text-center text-sm text-gray-500">
                <p>Secure authentication powered by Puter</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-gray-600">
        <p className="text-sm">
          Get instant AI-powered feedback on your resume
        </p>
      </div>
    </main>
  );
};

export default auth;
