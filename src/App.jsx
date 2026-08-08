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
import { FeaturedTestimonial } from "./components/FeaturedTestimonial";
import { HowWeWork } from "./components/HowWeWork";
import { BookingSection } from "./components/BookingSection";
import { WisprFlowMarquee } from "./components/Marque";
import { Footer } from "./components/Footer";
import { LogoMark } from "./components/LogoMark";
import { ContactModal } from "./components/ContactModal";

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
  { d: "M 0 0 L 0 408", transform: "translate(370 0)", dim: 20 },
  {
    d: "M 145 0 L 98.814 0 L -15 83.557 L -15 298",
    transform: "translate(400 110)",
  },
  {
    d: "M 0 0 L 56.317 0 C 93.572 34.834 114.632 53.417 173.848 84.826 L 173.848 298",
    transform: "translate(181.152 110)",
  },
  { d: "M 0 0 L 340 0 L 340 187", transform: "translate(0 221)" },
  { d: "M 0 0 L -340 0 L -340 187", transform: "translate(740 221)" },
];

/* ---------------------------------------------------------
   Hero Line Animation Component (Fully Responsive Across All Screens)
--------------------------------------------------------- */
function HeroLineAnimation() {
  return (
    <div className="pointer-events-none z-20 w-full px-4 sm:px-6 pb-6 sm:pb-8 md:pb-10 mt-auto">
      {/* Responsive stage with max-height & viewport scaling */}
      <div className="relative mx-auto aspect-[734/405] max-h-[22vh] sm:max-h-[26vh] md:max-h-[28vh] lg:max-h-[30vh] w-full max-w-[500px] sm:max-w-[650px] lg:max-w-[740px]">
        {/* Staggered Entrance Capability Tags */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[50.41%] top-0 z-30 w-fit -translate-x-1/2 -translate-y-1/2"
        >
          Autonomous AI Agents
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.28, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[24.68%] top-[27.16%] z-30 w-fit -translate-x-1/2 -translate-y-1/2"
        >
          High Scale Platforms
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.36, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[76.84%] top-[27.16%] z-30 w-fit max-w-[55%] -translate-x-1/2 -translate-y-1/2 sm:max-w-none"
        >
          Native Mobile Apps
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.44, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[12%] sm:left-0 top-[54.56%] z-30 w-fit -translate-x-1/2 -translate-y-1/2"
        >
          <span className="block sm:inline">Cloud </span>
          <span className="block sm:inline">Infrastructure</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.52, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto border border-white/40 bg-gradient-to-br from-black/45 via-black/35 to-black/25 backdrop-blur-xl px-2 py-0.5 sm:px-3 sm:py-1.5 text-center font-mono text-[8px] sm:text-[9px] md:text-xs font-semibold uppercase text-white shadow-xl sm:px-4 sm:py-2 md:w-56 md:px-4 tracking-wider absolute left-[88%] sm:left-full top-[54.56%] z-30 w-fit -translate-x-1/2 -translate-y-1/2"
        >
          Enterprise Systems
        </motion.div>

        {/* Converging SVG Line Paths Fade-In Entrance */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 1.35, ease: "easeOut" }}
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
        </motion.svg>

        {/* Destination Node: Sharp Glass Square Box with Transparent Outline & Bubble Glass Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto absolute bottom-0 left-[50.41%] size-24 sm:size-30 md:size-34 lg:size-38 aspect-square -translate-x-1/2 translate-y-1/2 rounded-none p-3 sm:p-4 z-50 flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 border-2 border-white/90 ring-4 ring-black/5 shadow-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(235, 238, 242, 0.88) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          {/* Glass Bubble Top Sheen Reflection */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none opacity-90 z-0" />
          
          {/* Bubble Curved Gloss Arc */}
          <div className="absolute inset-x-2 top-1 h-10 sm:h-14 bg-gradient-to-b from-white via-white/50 to-transparent pointer-events-none opacity-90 z-0" style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }} />

          {/* Crisp Pure Black Logo */}
          <LogoMark className="relative z-10 text-black w-13 h-13 sm:w-18 sm:h-18 md:w-21 md:h-21 shrink-0" />
        </motion.div>
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
      className="relative min-h-[100dvh] h-[100dvh] w-full max-w-full flex flex-col items-center justify-between bg-[#fdfbf9] select-none py-2 sm:py-4 z-20"
    >
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <img
          src={HERO_IMG}
          alt="Surreal mountains rising above a sea of pastel clouds"
          className="h-full w-full object-cover opacity-85"
        />
      </motion.div>

      {/* Atmospheric overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper z-0 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(253,251,249,0.65),transparent_70%)] z-0 pointer-events-none" />

      {/* Hero Headline & Subtext Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-8 text-center pt-7 sm:pt-10 md:pt-11 lg:pt-12 mb-2 sm:mb-4 flex-1 flex flex-col items-center justify-center">
        {/* Main Headline */}
        <motion.h1
          variants={lineContainer}
          initial="hidden"
          animate="show"
          data-testid="hero-heading"
          className="font-outfit font-light tracking-[-0.05em] leading-[1.02] text-ink text-[9.5vw] sm:text-5xl md:text-6xl lg:text-[5.0rem]"
        >
          {LINES.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.25em] -mb-[0.18em]">
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
          className="mx-auto mt-3.5 sm:mt-4.5 max-w-lg text-xs sm:text-sm md:text-base font-light leading-relaxed text-ink/85 px-2"
        >
          We design, build, and ship high-performance web, mobile, and
          AI-powered products for modern businesses.
        </motion.p>
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
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const handleOpenModal = (e) => {
      setIsContactModalOpen(true);
      if (e.detail?.date) {
        setBookingDetails(e.detail);
      } else {
        setBookingDetails(null);
      }
    };
    window.addEventListener("open-contact-modal", handleOpenModal);

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
      window.removeEventListener("open-contact-modal", handleOpenModal);
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
        <WhatWeDo />
        <MarqueeStrip />
        <ProductShowcase />
        <About />
        <HowWeWork />
        <BookingSection />
        <FeaturedTestimonial />
        <Testimonials />
        <WisprFlowMarquee />
      </main>
      <Footer />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        bookingDetails={bookingDetails}
      />
    </div>
  );
}