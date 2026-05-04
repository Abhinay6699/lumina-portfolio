import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import e1 from "@/assets/explore-1.jpg";
import e2 from "@/assets/explore-2.jpg";
import e3 from "@/assets/explore-3.jpg";
import e4 from "@/assets/explore-4.jpg";
import e5 from "@/assets/explore-5.jpg";
import e6 from "@/assets/explore-6.jpg";

gsap.registerPlugin(ScrollTrigger);

const LEFT = [e1, e3, e5];
const RIGHT = [e2, e4, e6];

export function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      gsap.to(leftRef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(rightRef.current, {
        y: -400,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg">
      <div ref={contentRef} className="h-screen flex items-center justify-center px-6 z-10">
        <div className="text-center max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-text-primary mb-4">
            Visual <span className="italic">playground</span>
          </h2>
          <p className="text-muted mb-8">Experiments at the intersection of code, math, and curiosity.</p>
          <a href="https://github.com/AbhinaySucharith" target="_blank" rel="noreferrer"
             className="inline-flex group relative items-center gap-2 rounded-full text-sm px-6 py-3 border border-stroke bg-surface text-text-primary">
            <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 accent-gradient-animated -z-10" />
            More on GitHub →
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto h-full grid grid-cols-2 gap-12 md:gap-40 px-6 pt-[40vh]">
          <div ref={leftRef} className="space-y-12 md:space-y-24">
            {LEFT.map((src, i) => (
              <div
                key={i}
                onClick={() => setLightbox(src)}
                style={{ transform: `rotate(${i % 2 ? -3 : 2}deg)` }}
                className="aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke cursor-pointer hover:scale-105 transition-transform pointer-events-auto"
              >
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div ref={rightRef} className="space-y-12 md:space-y-24 pt-32">
            {RIGHT.map((src, i) => (
              <div
                key={i}
                onClick={() => setLightbox(src)}
                style={{ transform: `rotate(${i % 2 ? 3 : -2}deg)` }}
                className="aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke cursor-pointer hover:scale-105 transition-transform pointer-events-auto ml-auto"
              >
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out">
          <img src={lightbox} alt="" className="max-w-[90vw] max-h-[90vh] rounded-2xl" />
        </div>
      )}
    </section>
  );
}
