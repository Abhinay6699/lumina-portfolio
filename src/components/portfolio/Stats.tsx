import { motion } from "framer-motion";

const STATS = [
  { v: "8.35", l: "CGPA at VVIT" },
  { v: "10M+", l: "Parameter LLM Built" },
  { v: "3+", l: "Production ML Systems" },
];

export function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24 border-y border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {STATS.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="text-center md:text-left"
          >
            <div className="text-6xl md:text-8xl font-display text-text-primary mb-3">{s.v}</div>
            <div className="text-sm text-muted uppercase tracking-[0.2em]">{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
