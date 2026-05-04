import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import cssRaw from "../../public/site/style.css?raw";
import jsRaw from "../../public/site/script.js?raw";
import htmlRaw from "../../public/site/index.html?raw";

// Vite-resolved asset URLs (hashed, served correctly in dev + prod)
import workEmerald from "../../public/site/assets/work-emerald.jpg";
import workNews from "../../public/site/assets/work-news.jpg";
import workCrop from "../../public/site/assets/work-crop.jpg";
import workFlutter from "../../public/site/assets/work-flutter.jpg";
import journal1 from "../../public/site/assets/journal-1.jpg";
import journal2 from "../../public/site/assets/journal-2.jpg";
import journal3 from "../../public/site/assets/journal-3.jpg";
import journal4 from "../../public/site/assets/journal-4.jpg";
import explore1 from "../../public/site/assets/explore-1.jpg";
import explore2 from "../../public/site/assets/explore-2.jpg";
import explore3 from "../../public/site/assets/explore-3.jpg";
import explore4 from "../../public/site/assets/explore-4.jpg";
import explore5 from "../../public/site/assets/explore-5.jpg";
import explore6 from "../../public/site/assets/explore-6.jpg";

const ASSET_MAP: Record<string, string> = {
  "assets/work-emerald.jpg": workEmerald,
  "assets/work-news.jpg": workNews,
  "assets/work-crop.jpg": workCrop,
  "assets/work-flutter.jpg": workFlutter,
  "assets/journal-1.jpg": journal1,
  "assets/journal-2.jpg": journal2,
  "assets/journal-3.jpg": journal3,
  "assets/journal-4.jpg": journal4,
  "assets/explore-1.jpg": explore1,
  "assets/explore-2.jpg": explore2,
  "assets/explore-3.jpg": explore3,
  "assets/explore-4.jpg": explore4,
  "assets/explore-5.jpg": explore5,
  "assets/explore-6.jpg": explore6,
};

// Extract just the <body> contents from the static HTML
function extractBody(html: string): string {
  const m = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let body = m ? m[1] : html;
  // Remove the <link rel="stylesheet"> and <script src=...> tags (we inject those separately)
  body = body
    .replace(/<link[^>]*href=["']style\.css["'][^>]*>/gi, "")
    .replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, "");
  // Rewrite asset paths to Vite-hashed URLs
  body = body.replace(/(["'(])(assets\/[^"')]+)/g, (_, q, path) => {
    return q + (ASSET_MAP[path] ?? "/" + path);
  });
  return body;
}

const BODY_HTML = extractBody(htmlRaw);

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Abhinay Sucharith — AI/ML Engineer & Researcher" },
      {
        name: "description",
        content:
          "B.Tech AI/ML student building end-to-end ML systems, NLP pipelines, and large language models from scratch. Author of EMERALD, a 10M-parameter GPT-style transformer.",
      },
      { property: "og:title", content: "Abhinay Sucharith — AI/ML Portfolio" },
      {
        property: "og:description",
        content: "Building LLMs, NLP systems, and ML-powered apps from scratch.",
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    // Inject and execute the vanilla script after the markup mounts.
    // Using new Function so module-scoped IIFEs run fresh on this DOM.
    try {
      // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
      new Function(jsRaw)();
    } catch (e) {
      console.error("Vanilla site script error:", e);
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssRaw }} />
      <div dangerouslySetInnerHTML={{ __html: BODY_HTML }} />
    </>
  );
}
