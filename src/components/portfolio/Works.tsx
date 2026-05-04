import { motion } from "framer-motion";
import emerald from "@/assets/work-emerald.jpg";
import news from "@/assets/work-news.jpg";
import crop from "@/assets/work-crop.jpg";
import flutter from "@/assets/work-flutter.jpg";

const PROJECTS = [
  { title: "EMERALD LLM", subtitle: "GPT-style transformer • PyTorch", img: emerald, span: "md:col-span-7" },
  { title: "Fake News Detector", subtitle: "TensorFlow • NLP Pipeline", img: news, span: "md:col-span-5" },
  { title: "AI Crop Predictor", subtitle: "Flutter • FastAPI", img: crop, span: "md:col-span-5" },
  { title: "Mobile ML Apps", subtitle: "Flutter • Scikit-learn", img: flutter, span: "md:col-span-7" },
];

export function Works() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display text-text-primary">
              Featured <span className="italic">projects</span>
            </h2>
            <p className="text-muted mt-3 max-w-md">
              A selection of ML systems I've architected — from research to deployment.
            </p>
          </div>
          <a href="https://github.com/AbhinaySucharith" target="_blank" rel="noreferrer"
             className="hidden md:inline-flex group relative items-center gap-2 rounded-full text-sm px-5 py-3 border border-stroke bg-surface text-text-primary">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient-animated -z-10" />
            View all work <span>→</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className={`group relative bg-surface border border-stroke rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer ${p.span}`}
            >
              <img src={p.img} alt={p.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 halftone opacity-20 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-lg" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="relative rounded-full p-[2px] accent-gradient-animated">
                  <div className="bg-text-primary text-bg rounded-full px-5 py-2.5 text-sm">
                    View — <span className="font-display italic">{p.title}</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-text-primary text-lg font-display">{p.title}</h3>
                <p className="text-muted text-xs">{p.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
