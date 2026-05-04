import { motion } from "framer-motion";
import j1 from "@/assets/journal-1.jpg";
import j2 from "@/assets/journal-2.jpg";
import j3 from "@/assets/journal-3.jpg";
import j4 from "@/assets/journal-4.jpg";

const ENTRIES = [
  { title: "Building a 10M-parameter LLM from scratch", img: j1, read: "8 min read", date: "Mar 2026" },
  { title: "Why BPE tokenization still matters", img: j2, read: "5 min read", date: "Feb 2026" },
  { title: "Deploying PyTorch models with Flask", img: j3, read: "6 min read", date: "Jan 2026" },
  { title: "Attention is (still) all you need", img: j4, read: "10 min read", date: "Dec 2025" },
];

export function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display text-text-primary">
              Recent <span className="italic">thoughts</span>
            </h2>
            <p className="text-muted mt-3 max-w-md">Notes from the lab — research, debugging, and lessons learned.</p>
          </div>
          <a href="#" className="hidden md:inline-flex group relative items-center gap-2 rounded-full text-sm px-5 py-3 border border-stroke bg-surface text-text-primary">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient-animated -z-10" />
            View all <span>→</span>
          </a>
        </motion.div>

        <div className="space-y-4">
          {ENTRIES.map((e, i) => (
            <motion.a
              key={e.title}
              href="#"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="flex items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors group"
            >
              <img src={e.img} alt={e.title} loading="lazy" className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-text-primary text-base md:text-lg font-display truncate group-hover:italic transition-all">{e.title}</h3>
                <p className="text-muted text-xs mt-1">{e.read} • {e.date}</p>
              </div>
              <span className="text-muted group-hover:text-text-primary transition-colors pr-2">→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
