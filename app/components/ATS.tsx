import { Check, CircleAlert } from "lucide-react";
import { cn } from "~/lib/utls";

const ATS = ({
  score,
  suggestions,
}: {
  score: number;
  suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
  const isGood = score > 69;
  const isWarning = score > 49 && score <= 69;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden relative">
      <div
        className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full -mr-32 -mt-32 ${
          isGood
            ? "bg-green-50/50"
            : isWarning
              ? "bg-orange-50/50"
              : "bg-red-50/50"
        }`}
      ></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${
                isGood
                  ? "bg-green-50"
                  : isWarning
                    ? "bg-orange-50"
                    : "bg-red-50"
              }`}
            >
              {isGood ? "🎯" : isWarning ? "⚠️" : "❌"}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                ATS Compatibility
              </h3>
              <p className="text-gray-500">
                How well automated systems read your resume
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Score
            </span>
            <span
              className={`text-xl font-black ${
                isGood
                  ? "text-green-500"
                  : isWarning
                    ? "text-orange-500"
                    : "text-red-500"
              }`}
            >
              {score}
            </span>
            <span className="text-sm font-bold text-gray-400">/100</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Strengths
            </h4>
            {suggestions.filter((s) => s.type === "good").length > 0 ? (
              suggestions
                .filter((s) => s.type === "good")
                .map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-green-50/50 border border-green-100 rounded-2xl"
                  >
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white mt-0.5 shrink-0">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <p className="text-sm font-semibold text-green-800">
                      {s.tip}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-sm text-gray-400 italic ml-1">
                No major strengths identified yet.
              </p>
            )}
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
              Improvements
            </h4>
            {suggestions.filter((s) => s.type === "improve").length > 0 ? (
              suggestions
                .filter((s) => s.type === "improve")
                .map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-orange-50/50 border border-orange-100 rounded-2xl"
                  >
                    <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center text-white mt-0.5 shrink-0">
                      <CircleAlert size={12} strokeWidth={4} />
                    </div>
                    <p className="text-sm font-semibold text-orange-800">
                      {s.tip}
                    </p>
                  </div>
                ))
            ) : (
              <div className="flex items-start gap-3 p-4 bg-green-50/50 border border-green-100 rounded-2xl">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white mt-0.5 shrink-0">
                  <Check size={12} strokeWidth={4} />
                </div>
                <p className="text-sm font-semibold text-green-800">
                  Your resume is highly optimized for ATS!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-sm text-gray-500 font-medium leading-relaxed">
            <span className="font-bold text-gray-900 uppercase tracking-widest mr-2">
              Pro Tip:
            </span>
            Applicant Tracking Systems (ATS) are used by 99% of Fortune 500
            companies. Improving this score directly increases your chances of
            reaching a human recruiter.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ATS;
