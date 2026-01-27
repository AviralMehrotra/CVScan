import { Check, CircleAlert } from "lucide-react";
import { cn } from "~/lib/utls";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const isGood = score > 69;
  const isWarning = score > 39;

  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        isGood
          ? "bg-badge-green"
          : isWarning
            ? "bg-badge-yellow"
            : "bg-badge-red",
      )}
    >
      <div
        className={cn(
          "shrink-0",
          isGood
            ? "text-green-600"
            : isWarning
              ? "text-orange-600"
              : "text-red-600",
        )}
      >
        {isGood ? (
          <Check size={12} strokeWidth={4} />
        ) : (
          <CircleAlert size={12} strokeWidth={4} />
        )}
      </div>
      <p
        className={cn(
          "text-sm font-medium",
          isGood
            ? "text-badge-green-text"
            : isWarning
              ? "text-badge-yellow-text"
              : "text-badge-red-text",
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex items-center justify-between w-full py-2 pr-4">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl">
          {title === "Tone & Style"
            ? "✍️"
            : title === "Content"
              ? "📝"
              : title === "Structure"
                ? "🏗️"
                : "🎯"}
        </div>
        <p className="text-xl font-bold mr-2 text-gray-900 tracking-tight">
          {title}
        </p>
      </div>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-6 pt-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl border transition-all hover:shadow-lg ${
              tip.type === "good"
                ? "bg-green-50/30 border-green-100 text-green-900"
                : "bg-orange-50/30 border-orange-100 text-orange-900"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 ${
                  tip.type === "good" ? "bg-green-500" : "bg-orange-500"
                }`}
              >
                {tip.type === "good" ? (
                  <Check size={12} strokeWidth={4} />
                ) : (
                  <CircleAlert size={12} strokeWidth={4} />
                )}
              </div>
              <h5 className="font-black text-sm uppercase tracking-widest">
                {tip.tip}
              </h5>
            </div>
            <p className="text-sm font-medium opacity-80 leading-relaxed">
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2 ml-1">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
          Detailed Breakdown
        </h3>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-4 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
        <Accordion>
          <AccordionItem
            id="tone-style"
            className="border-b border-gray-50 last:border-0"
          >
            <AccordionHeader
              itemId="tone-style"
              className="hover:bg-gray-50/50 rounded-2xl transition-colors"
            >
              <CategoryHeader
                title="Tone & Style"
                categoryScore={feedback.toneAndStyle.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="tone-style">
              <CategoryContent tips={feedback.toneAndStyle.tips} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            id="content"
            className="border-b border-gray-50 last:border-0"
          >
            <AccordionHeader
              itemId="content"
              className="hover:bg-gray-50/50 rounded-2xl transition-colors"
            >
              <CategoryHeader
                title="Content"
                categoryScore={feedback.content.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="content">
              <CategoryContent tips={feedback.content.tips} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            id="structure"
            className="border-b border-gray-50 last:border-0"
          >
            <AccordionHeader
              itemId="structure"
              className="hover:bg-gray-50/50 rounded-2xl transition-colors"
            >
              <CategoryHeader
                title="Structure"
                categoryScore={feedback.structure.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="structure">
              <CategoryContent tips={feedback.structure.tips} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            id="skills"
            className="border-b border-gray-50 last:border-0"
          >
            <AccordionHeader
              itemId="skills"
              className="hover:bg-gray-50/50 rounded-2xl transition-colors"
            >
              <CategoryHeader
                title="Skills"
                categoryScore={feedback.skills.score}
              />
            </AccordionHeader>
            <AccordionContent itemId="skills">
              <CategoryContent tips={feedback.skills.tips} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Details;
