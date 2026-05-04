import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";

const ROLES = ["Builder", "Researcher", "Engineer", "Student"];
const HLS_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);

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
    const i = setInterval(() => setRoleIdx((p) => (p + 1) % ROLES.length), 2000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".name-reveal", { opacity: 0, y: 50, duration: 1.2, delay: 0.1 })
        .from(".blur-in", { opacity: 0, filter: "blur(10px)", y: 20, duration: 1, stagger: 0.1 }, "-=0.8");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          PORTFOLIO '26
        </p>
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Abhinay Sucharith
        </h1>
        <p className="blur-in text-xl md:text-2xl text-text-primary/90 mb-4">
          A{" "}
          <span
            key={roleIdx}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIdx]}
          </span>{" "}
          based in Guntur, India.
        </p>
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Building end-to-end ML systems, NLP pipelines, and large language models from scratch — bridging research and production.
        </p>
        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <a
            href="#work"
            onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group relative rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg hover:scale-105 transition-transform"
          >
            See Works
          </a>
          <a
            href="mailto:abhinaynannapaneni@gmail.com"
            className="group relative rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary hover:scale-105 transition-transform"
          >
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient-animated -z-10" />
            Reach out...
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute inset-x-0 h-1/2 bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
