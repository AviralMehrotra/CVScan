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
    <main className="p-0 pt-32 bg-soft-neutral hero-gradient min-h-screen">
      <Navbar />
      <LandingPage />
    </main>
  );
}
