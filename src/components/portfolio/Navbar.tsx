import { useEffect, useState } from "react";

const LINKS = ["Home", "Work", "Resume"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent, label: string) => {
    e.preventDefault();
    setActive(label);
    const map: Record<string, string> = { Home: "hero", Work: "work", Resume: "resume" };
    document.getElementById(map[label])?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-2 transition-shadow ${
          scrolled ? "shadow-md shadow-black/20" : ""
        }`}
      >
        <a href="#hero" onClick={(e) => handleClick(e, "Home")} className="group relative">
          <div className="w-9 h-9 rounded-full p-[2px] accent-gradient transition-transform duration-300 group-hover:scale-110">
            <div className="w-full h-full bg-bg rounded-full flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary">AS</span>
            </div>
          </div>
        </a>

        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {LINKS.map((label) => (
          <a
            key={label}
            href="#"
            onClick={(e) => handleClick(e, label)}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
              active === label
                ? "text-text-primary bg-stroke/50"
                : "text-muted hover:text-text-primary hover:bg-stroke/50"
            }`}
          >
            {label}
          </a>
        ))}

        <div className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        <a
          href="mailto:abhinaynannapaneni@gmail.com"
          className="relative group text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
        >
          <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity accent-gradient-animated" />
          <span className="relative flex items-center gap-1 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 -mx-3 sm:-mx-4 -my-1.5 sm:-my-2 backdrop-blur-md text-text-primary">
            Say hi <span className="text-xs">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
