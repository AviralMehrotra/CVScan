import type { Route } from "./+types/home";
import LandingPage from "~/components/LandingPage";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CVScan - AI-Powered Resume Analyzer" },
    {
      name: "description",
      content:
        "Analyze your resume, fix gaps, and get shortlisted with our AI-powered analyzer.",
    },
  ];
}

export default function Home() {
  return (
    <main className="p-0 pt-24 bg-soft-neutral hero-gradient min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50 pt-6 px-4">
        <Navbar />
      </div>
      <LandingPage />
    </main>
  );
}
