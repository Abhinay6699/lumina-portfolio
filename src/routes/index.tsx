import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { Works } from "@/components/portfolio/Works";
import { Journal } from "@/components/portfolio/Journal";
import { Explorations } from "@/components/portfolio/Explorations";
import { Stats } from "@/components/portfolio/Stats";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Abhinay Sucharith — AI/ML Engineer & Researcher" },
      { name: "description", content: "B.Tech AI/ML student building end-to-end ML systems, NLP pipelines, and large language models from scratch. Author of EMERALD, a 10M-parameter GPT-style transformer." },
      { property: "og:title", content: "Abhinay Sucharith — AI/ML Portfolio" },
      { property: "og:description", content: "Building LLMs, NLP systems, and ML-powered apps from scratch." },
    ],
  }),
});

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="bg-bg text-text-primary min-h-screen">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <main>
        <Hero />
        <Works />
        <Journal />
        <Explorations />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
