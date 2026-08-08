import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Globe as GlobeIcon } from "lucide-react";

const CARDS = [
  {
    id: 1,
    tag: "21spheres • identity ocr • <50ms sla",
    title: "bima's core engine",
    subhead: "21Spheres shipped our deterministic identity verification engine in weeks. Ultra-fast, zero-friction performance.",
    name: "Robert M.",
    role: "VP Engineering, BIMAcard",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    badge: "Verified 21Spheres Build ↗",
  },
  {
    id: 2,
    tag: "21spheres • ai systems • edge latency",
    title: "neuraflow's interface",
    subhead: "The micro-interactions and sub-second execution built quietly became the main reason our enterprise users stay.",
    name: "Sarah K.",
    role: "Product Lead, NeuraFlow",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    badge: "Verified 21Spheres Build ↗",
  },
  {
    id: 3,
    tag: "21spheres • enterprise • cloud native",
    title: "orbit's architecture",
    subhead: "They think like founders. We experienced a 50% surge in active sessions after 21Spheres rebuilt our platform.",
    name: "Alexander V.",
    role: "Founder & CEO, Orbit",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    badge: "Verified 21Spheres Build ↗",
  },
  {
    id: 4,
    tag: "21spheres • ai infrastructure • cloud",
    title: "lumen's cloud core",
    subhead: "We needed a resilient deterministic system fast. 21Spheres delivered an architecture that scales effortless under load.",
    name: "Elena R.",
    role: "CTO, Lumen AI",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    badge: "Verified 21Spheres Build ↗",
  },
  {
    id: 5,
    tag: "21spheres • vision ocr • precision",
    title: "verifi's pipeline",
    subhead: "The 99.4% accuracy rate and sub-second OCR speed made 21Spheres our go-to engineering partners for long-term craft.",
    name: "Daniel O.",
    role: "Head of AI, Verifi",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    badge: "Verified 21Spheres Build ↗",
  },
];

const PHRASES = [
  "120+ Enterprise builds shipped across 14 countries",
  "Over 50+ global clients trust 21Spheres",
  "Sub-50ms SLA identity OCR processing worldwide",
  "High-frequency digital architecture by 21Spheres",
];

// Global Locations & People Profiles on the 3D Globe
const GLOBE_MARKERS = [
  { name: "Robert M.", city: "SF, USA", lat: 37.77, lon: -122.41, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" },
  { name: "Sarah K.", city: "London, UK", lat: 51.50, lon: -0.12, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" },
  { name: "Mei T.", city: "Tokyo, JP", lat: 35.67, lon: 139.65, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" },
  { name: "Daniel O.", city: "Bengaluru, IN", lat: 12.97, lon: 77.59, img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80" },
  { name: "Elena R.", city: "Berlin, DE", lat: 52.52, lon: 13.40, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);

  // Rotate 3D Globe continuously
  useEffect(() => {
    let animFrame;
    const animate = () => {
      setRotationAngle((prev) => (prev + 0.6) % 360);
      animFrame = requestAnimationFrame(animate);
    };
    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  // Smooth, single-step autoplay circular carousel
  useEffect(() => {
    const cardTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CARDS.length);
    }, 4500);
    return () => clearInterval(cardTimer);
  }, []);

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setActivePhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3600);
    return () => clearInterval(phraseTimer);
  }, []);

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  };

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative z-10 bg-[#0c0a08] text-paper py-12 sm:py-16 md:py-20 select-none overflow-hidden border-t border-white/10"
    >
      {/* Background Dotted Wave Curve */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 600" fill="none">
          <path
            d="M -100 300 C 300 100, 500 500, 1300 200"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeDasharray="4 10"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.25em] text-paper/40 font-light block mb-1">
            // 21SPHERES GLOBAL NETWORK
          </span>
          <h2 className="font-outfit text-lg sm:text-2xl lg:text-3xl font-light tracking-tight text-paper/90 uppercase">
            TRUSTED BY BUILDERS WORLDWIDE
          </h2>
        </div>

        {/* Realistic Compact iPhone Screen Mockup with Clean 3D Globe Animation (No Glow) */}
        <div className="relative w-[280px] sm:w-[320px] md:w-[340px] h-[410px] sm:h-[460px] rounded-[2.6rem] bg-[#08080a] p-2.5 sm:p-3 shadow-[0_25px_70px_rgba(0,0,0,0.8)] border-[6px] border-[#1e1e22] overflow-hidden flex flex-col justify-between mb-[-60px] sm:mb-[-80px] z-10">
          
          {/* Top Status Bar */}
          <div className="relative z-20 flex items-center justify-between px-4 pt-0.5 text-white/50 font-mono text-[10px]">
            <span className="font-light text-white/80">17:47</span>
            <div className="w-18 h-4 bg-black rounded-full flex items-center justify-center gap-1 px-2 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            </div>
            <div className="flex items-center gap-1 text-white/70">
              <span className="text-[9px]">5G</span>
              <div className="w-3.5 h-1.5 rounded-xs border border-white/60 p-0.5"><div className="w-full h-full bg-white rounded-xs"/></div>
            </div>
          </div>

          {/* iPhone Inner Screen Canvas: Clean 3D Globe with People & Unboxed Larger Elevated Text */}
          <div className="relative flex-1 bg-[#09090b] rounded-[2rem] overflow-hidden flex flex-col justify-between p-3.5 border border-white/10 shadow-inner mt-1">
            
            {/* Top Half: Interactive 3D Wireframe World Globe (Clean, No Glow) */}
            <div className="relative w-full h-[210px] sm:h-[230px] flex items-center justify-center overflow-hidden">
              
              {/* Clean 3D Wireframe Globe SVG Grid */}
              <svg className="absolute w-[140px] h-[140px] pointer-events-none z-0" viewBox="0 0 160 160">
                {/* Globe Outline */}
                <circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none" />
                
                {/* Latitude Lines */}
                <ellipse cx="80" cy="80" rx="72" ry="24" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
                <ellipse cx="80" cy="80" rx="72" ry="48" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
                <line x1="8" y1="80" x2="152" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Longitude Rotating Ellipse Grid */}
                <ellipse
                  cx="80"
                  cy="80"
                  rx={Math.abs(Math.cos((rotationAngle * Math.PI) / 180)) * 72}
                  ry="72"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.2"
                  fill="none"
                />
                <ellipse
                  cx="80"
                  cy="80"
                  rx={Math.abs(Math.cos(((rotationAngle + 60) * Math.PI) / 180)) * 72}
                  ry="72"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                  fill="none"
                />
                <ellipse
                  cx="80"
                  cy="80"
                  rx={Math.abs(Math.cos(((rotationAngle + 120) * Math.PI) / 180)) * 72}
                  ry="72"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>

              {/* 3D Rotating People Avatar Badges & Location Markers */}
              <div className="relative w-[140px] h-[140px] flex items-center justify-center z-10 pointer-events-none">
                {GLOBE_MARKERS.map((marker, idx) => {
                  const radius = 66;
                  const phi = (90 - marker.lat) * (Math.PI / 180);
                  const theta = (marker.lon + rotationAngle) * (Math.PI / 180);

                  const x = radius * Math.sin(phi) * Math.cos(theta);
                  const y = radius * Math.cos(phi);
                  const z = radius * Math.sin(phi) * Math.sin(theta);

                  // Front-facing half of the 3D globe only
                  if (z <= -10) return null;

                  const opacity = Math.max(0.2, (z + 20) / 88);

                  return (
                    <motion.div
                      key={idx}
                      style={{
                        position: "absolute",
                        left: `calc(50% + ${x}px - 14px)`,
                        top: `calc(50% - ${y}px - 14px)`,
                        opacity,
                        scale: 0.75 + (z / 66) * 0.3,
                        zIndex: Math.floor(z + 100),
                      }}
                      className="flex items-center gap-1 bg-[#18181b]/90 backdrop-blur-md border border-white/40 p-0.5 pr-2 rounded-full shadow-md"
                    >
                      <img
                        src={marker.img}
                        alt={marker.name}
                        className="w-5 h-5 rounded-full object-cover border border-white/60 shrink-0"
                      />
                      <span className="font-mono text-[7px] font-bold text-white whitespace-nowrap">
                        {marker.city}
                      </span>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Elevated Larger Text Banner */}
            <div className="relative z-20 w-full text-center pb-12 sm:pb-14 pt-1 px-3">
              <div className="flex items-center justify-center gap-1.5 mb-1.5 text-white/60">
                <GlobeIcon className="w-3.5 h-3.5" />
                <span className="font-mono text-[9px] uppercase tracking-widest font-semibold">21SPHERES GLOBAL NETWORK</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={activePhraseIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="font-outfit text-sm sm:text-base font-normal text-white leading-snug tracking-tight uppercase max-w-[240px] mx-auto"
                >
                  {PHRASES[activePhraseIndex]}
                </motion.h3>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* SILKY SMOOTH SLIDING CIRCULAR CAROUSEL (Exact design preserved, 0 skipping, no jerky 3D flips) */}
        <div className="relative z-30 w-full max-w-5xl h-[340px] sm:h-[380px] flex items-center justify-center mt-4">
          
          {/* Carousel Navigation Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-2 sm:left-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-2 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Stack */}
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {CARDS.map((card, idx) => {
              // Calculate shortest circular offset cleanly (-2, -1, 0, 1, 2)
              let offset = idx - activeIndex;
              if (offset > Math.floor(CARDS.length / 2)) offset -= CARDS.length;
              if (offset < -Math.floor(CARDS.length / 2)) offset += CARDS.length;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              // Smooth horizontal slide offset without jerky 3D rotation
              let translateX = offset * 340;
              if (window.innerWidth < 640) translateX = offset * 240;

              const scale = isCenter ? 1.05 : 0.88;
              const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.6 : 0;
              const zIndex = isCenter ? 40 : 30 - Math.abs(offset) * 10;

              return (
                <motion.div
                  key={card.id}
                  onClick={() => setActiveIndex(idx)}
                  animate={{
                    x: translateX,
                    scale,
                    opacity,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{ zIndex, position: "absolute" }}
                  className={`w-[280px] sm:w-[330px] md:w-[360px] rounded-[2.2rem] p-2 sm:p-2.5 flex flex-col justify-between transition-colors duration-300 cursor-pointer select-none ${
                    isCenter
                      ? "bg-black/90 backdrop-blur-2xl border border-white/35 shadow-[0_30px_70px_rgba(0,0,0,0.9)]"
                      : "bg-[#0d0d0f]/80 backdrop-blur-md border border-white/15 shadow-xl"
                  }`}
                >
                  {/* TOP TIER BOX: Dark Container with Lighter Weight Title */}
                  <div className="bg-[#121215] rounded-[1.7rem] p-4 sm:p-5 border border-white/10 shadow-md text-white text-left flex flex-col justify-between min-h-[170px] sm:min-h-[190px]">
                    <div>
                      {/* Eyebrow Tag */}
                      <div className="font-mono text-[9px] sm:text-[10px] tracking-wider uppercase text-white/50 font-semibold mb-1.5">
                        {card.tag}
                      </div>

                      {/* Main Title with Lighter Font Weight */}
                      <h3 className="font-outfit text-lg sm:text-2xl font-light tracking-tight text-white leading-tight capitalize mb-1">
                        {card.title}
                      </h3>
                    </div>

                    {/* Subhead Quote Text */}
                    <p className="font-outfit text-xs sm:text-sm text-white/80 font-normal leading-relaxed line-clamp-3 mt-2">
                      <span className="font-bold text-white">21Spheres delivered:</span> "{card.subhead}"
                    </p>
                  </div>

                  {/* LOWER TIER AREA: Frosted Panel with Author & Verified Badge */}
                  <div className="p-3 sm:p-4 pt-2.5 sm:pt-3 flex items-center justify-between text-left">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={card.avatar}
                        alt={card.name}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-white/40 shadow-md shrink-0"
                      />
                      <div className="font-outfit leading-tight">
                        <span className="font-bold text-xs sm:text-sm text-white block">
                          {card.name}
                        </span>
                        <span className="text-[10px] text-white/60 font-medium block">
                          {card.role}
                        </span>
                      </div>
                    </div>

                    {/* Verified 21Spheres Badge */}
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shrink-0 hidden sm:inline-block">
                      Verified 21Spheres Build ↗
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Circular Carousel Dots Indicator */}
        <div className="flex items-center gap-2 mt-4 z-40">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? "w-6 bg-white" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
