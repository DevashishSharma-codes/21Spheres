import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "./Navbar";
import { Grain } from "./components/Grain";
import { MarqueeStrip } from "./components/Marquee";
import { WhatWeDo } from "./components/WhatWeDo";
import { ProductShowcase } from "./components/ProductShowcase";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonilas";
import { WisprFlowMarquee } from "./components/Marque";
import { Footer } from "./components/Footer";
import { LogoMark } from "./components/LogoMark";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/aaff03bd-13eb-4784-a3f9-c2ad7e7acf3a/images/7c1aafe5306058007c7c92a2a22e1fb606d2e6c48cbf50c3a393af8c07c0079a.jpeg";

const LINES = ["Engineering Digital", "Experiences", "That Scale"];

const lineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const lineItem = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] } },
};

// Converging SVG Line Paths & Dash Array Config
const PATHS = [
  { d: "M 0 0 L 0 404.609", transform: "translate(370 0)", dim: 20 },
  {
    d: "M 164 0 L 98.814 0 L 0 83.557 L 0 205",
    transform: "translate(400 110)",
  },
  {
    d: "M 0 0 L 56.317 0 C 93.572 34.834 114.632 53.417 155 84.826 L 155 206",
    transform: "translate(181.152 110)",
  },
  { d: "M 0 0 L 295 0 L 295 81", transform: "translate(0 221)" },
  { d: "M 296 0 L 0 0 L 0 79", transform: "translate(438 221)" },
];

/* ---------------------------------------------------------
   Hero Line Animation Component (Fully Responsive Across All Screens)
--------------------------------------------------------- */
/* ---------------------------------------------------------
   Hero Line Animation Component (Fully Responsive Across All Screens)
--------------------------------------------------------- */
function HeroLineAnimation() {
  return (
    <div className="pointer-events-none z-20 w-full px-4 sm:px-6 pb-3 sm:pb-5 md:pb-6 mt-auto">
      {/* Responsive stage with max-height & viewport scaling */}
      <div className="relative mx-auto aspect-[734/405] max-h-[22vh] sm:max-h-[26vh] md:max-h-[28vh] lg:max-h-[30vh] w-full max-w-[520px] sm:max-w-[660px] lg:max-w-[740px]">
        {/* Responsive Capability Tags */}
        <div className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[50.41%] top-0 z-30 w-fit -translate-x-1/2 -translate-y-1/2">
          Autonomous AI Agents
        </div>
        <div className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[24.68%] top-[27.16%] z-30 w-fit -translate-x-1/2 -translate-y-1/2">
          High Scale Platforms
        </div>
        <div className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[76.84%] top-[27.16%] z-30 w-fit max-w-[55%] -translate-x-1/2 -translate-y-1/2 sm:max-w-none">
          Native Mobile Apps
        </div>
        <div className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[12%] sm:left-0 top-[54.56%] z-30 w-fit -translate-x-1/2 -translate-y-1/2">
          Cloud Infrastructure
        </div>
        <div className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[88%] sm:left-full top-[54.56%] z-30 w-fit -translate-x-1/2 -translate-y-1/2">
          Enterprise Systems
        </div>

        {/* Converging SVG Line Paths at z-10 */}
        <svg
          role="presentation"
          viewBox="0 0 734 405"
          className="absolute inset-0 h-full w-full z-10"
          fill="none"
        >
          {PATHS.map((path) => (
            <g key={path.d} transform={path.transform}>
              <path
                d={path.d}
                stroke="rgba(23, 19, 15, 0.15)"
                strokeWidth={3}
              />
              <motion.path
                d={path.d}
                pathLength={1}
                stroke="#17130f"
                strokeWidth={2.5}
                strokeLinecap="butt"
                strokeDasharray="0.2 0.8"
                animate={{ strokeDashoffset: [0, -1] }}
                transition={{
                  duration: 2.2,
                  ease: "linear",
                  repeat: Infinity,
                  repeatDelay: 0,
                }}
              />
            </g>
          ))}
        </svg>

        {/* Destination Node: Glossy Black Translucent Box with White 21Spheres LogoMark */}
        <div className="pointer-events-auto absolute bottom-0 left-[50.41%] size-12 sm:size-18 md:size-22 lg:size-26 -translate-x-1/2 translate-y-1/2 rounded-xl bg-gradient-to-br from-black/90 via-black/75 to-black/50 backdrop-blur-xl border border-white/40 shadow-2xl p-1.5 sm:p-2 z-40 flex items-center justify-center">
          <LogoMark className="text-white w-5 h-5 sm:w-7 sm:h-7 lg:w-9 lg:h-9 drop-shadow-lg" />
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Hero Section Component
--------------------------------------------------------- */
export const Hero = () => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100dvh] h-[100dvh] w-full max-w-full overflow-hidden flex flex-col items-center justify-between bg-[#fdfbf9] select-none"
    >
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <img
          src={HERO_IMG}
          alt="Surreal mountains rising above a sea of pastel clouds"
          className="h-full w-full object-cover opacity-85"
        />
      </motion.div>

      {/* Atmospheric overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(253,251,249,0.65),transparent_70%)] z-0" />

      {/* Hero Headline & Subtext Content seated under Navbar */}
      <div className="relative z-20 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-14 sm:pt-18 md:pt-20 lg:pt-20 pb-0">
        {/* Main Headline */}
        <motion.h1
          variants={lineContainer}
          initial="hidden"
          animate="show"
          data-testid="hero-heading"
          className="font-outfit font-light tracking-tighter leading-[0.98] text-ink text-[9.5vw] sm:text-5xl md:text-6xl lg:text-[4.8rem]"
        >
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.12em]">
              <motion.span variants={lineItem} className="block">
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          data-testid="hero-subheading"
          className="mx-auto mt-3 sm:mt-4 max-w-lg text-xs sm:text-sm md:text-base font-light leading-relaxed text-ink/85 px-2"
        >
          We design, build, and ship high-performance web, mobile, and
          AI-powered products for modern businesses.
        </motion.p>

        {/* Single Black "View Products" CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3.5 sm:mt-5 flex flex-row items-center justify-center"
        >
          <a
            href="#products"
            data-testid="hero-cta-primary"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 sm:px-8 py-2.5 sm:py-3 font-outfit text-xs sm:text-sm font-medium text-paper transition-transform duration-300 hover:scale-[1.04] shadow-md"
          >
            View Products
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      {/* Converging SVG Line Animation Stage at Bottom */}
      <HeroLineAnimation />
    </section>
  );
};

/* ---------------------------------------------------------
   Main App Export with Lenis Liquid Smooth Scroll Integration
--------------------------------------------------------- */
export default function App() {
  useEffect(() => {
    // Initialize Lenis Inertia Smooth Scroll
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    if (typeof window !== "undefined") {
      window.lenis = lenis;
    }

    // Synchronize Lenis Scroll Events with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(500, 33);

    // Refresh ScrollTrigger calculations after Lenis mounts
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative selection:bg-[#C2612B] selection:text-white overflow-x-hidden">
      <Grain />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <WhatWeDo />
        <ProductShowcase />
        <About />
        <Testimonials />
        <WisprFlowMarquee />
      </main>
      <Footer />
    </div>
  );
}
