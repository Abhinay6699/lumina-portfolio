import { useEffect, useRef } from "react";
import Hls from "hls.js";
import gsap from "gsap";

const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const SOCIALS = [
  { l: "GitHub", h: "https://github.com/AbhinaySucharith" },
  { l: "Email", h: "mailto:abhinaynannapaneni@gmail.com" },
  { l: "LinkedIn", h: "#" },
  { l: "Phone", h: "tel:9640198656" },
];

export function Footer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(HLS_SRC);
      hls.attachMedia(v);
      return () => hls.destroy();
    } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = HLS_SRC;
    }
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer id="resume" className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden border-t border-stroke">
      <div className="absolute inset-0 overflow-hidden">
        <video ref={videoRef} autoPlay muted loop playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 overflow-hidden mb-12">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="text-6xl md:text-9xl font-display italic text-text-primary/90 px-6">
              BUILDING THE FUTURE •
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center">
        <p className="text-xs text-muted uppercase tracking-[0.3em] mb-6">Let's build something</p>
        <a href="mailto:abhinaynannapaneni@gmail.com"
           className="group relative inline-flex items-center gap-3 rounded-full text-base md:text-lg px-8 py-4 bg-text-primary text-bg hover:scale-105 transition-transform">
          <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient-animated -z-10" />
          abhinaynannapaneni@gmail.com <span>↗</span>
        </a>
      </div>

      <div className="relative z-10 mt-20 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-stroke">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          Available for AI/ML opportunities
        </div>
        <div className="flex items-center gap-5">
          {SOCIALS.map((s) => (
            <a key={s.l} href={s.h} className="text-xs text-muted hover:text-text-primary transition-colors uppercase tracking-wider">
              {s.l}
            </a>
          ))}
        </div>
        <div className="text-xs text-muted">© 2026 Abhinay Sucharith</div>
      </div>
    </footer>
  );
}
