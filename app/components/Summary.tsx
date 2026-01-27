import ScoreBadge from "./ScoreBadge";
import ScoreGauge from "./ScoreGauge";

const Category = ({
  title,
  score,
  icon,
}: {
  title: string;
  score: number;
  icon: string;
}) => {
  const getColorClasses = (score: number) => {
    if (score > 70) return "bg-green-50 text-green-700 border-green-100";
    if (score > 49) return "bg-orange-50 text-orange-700 border-orange-100";
    return "bg-red-50 text-red-700 border-red-100";
  };

  return (
    <div
      className={`p-4 rounded-3xl border transition-all hover:shadow-md ${getColorClasses(score)}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-2xl">{icon}</span>
        <div className="text-right">
          <span className="text-xl font-black">{score}</span>
          <span className="text-xs font-bold opacity-60 ml-1">/100</span>
        </div>
      </div>
      <h4 className="font-bold text-sm uppercase tracking-widest mb-2">
        {title}
      </h4>
      <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-current transition-all duration-1000"
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50/50 blur-[100px] rounded-full -mr-32 -mt-32"></div>

      <div className="flex flex-col md:flex-row items-center gap-10 mb-12 relative z-10">
        <div className="relative">
          <ScoreGauge score={feedback.overallScore} />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <ScoreBadge score={feedback.overallScore} />
          </div>
        </div>
        <div className="flex-grow text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-[10px] font-black uppercase tracking-widest mb-4">
            Overall Performance
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            Your Resume <span className="text-orange-500">Score</span>
          </h2>
          <p className="text-gray-500 font-medium max-w-md leading-relaxed">
            This score reflects how well your resume aligns with industry
            standards for{" "}
            {feedback.toneAndStyle.score > 70 ? "professional" : "modern"}{" "}
            recruitment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 relative z-10">
        <Category
          title="Tone & Style"
          score={feedback.toneAndStyle.score}
          icon="✍️"
        />
        <Category title="Content" score={feedback.content.score} icon="📝" />
        <Category
          title="Structure"
          score={feedback.structure.score}
          icon="🏗️"
        />
        <Category title="Skills" score={feedback.skills.score} icon="🎯" />
      </div>
    </div>
  );
};

export default Summary;
