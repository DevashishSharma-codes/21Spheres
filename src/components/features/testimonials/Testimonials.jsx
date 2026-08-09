import { useState, useEffect, useRef, useCallback } from "react";
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
  // Globe marker positions updated at ~10fps via interval (not 60fps rAF)
  const [markerPositions, setMarkerPositions] = useState([]);
  const sectionRef = useRef(null);

  // Refs for direct DOM manipulation of SVG ellipses (no React re-renders)
  const ellipse1Ref = useRef(null);
  const ellipse2Ref = useRef(null);
  const ellipse3Ref = useRef(null);
  const rotationRef = useRef(0);
  const animFrameRef = useRef(null);

  // 3D Globe SVG ellipse rotation via direct DOM mutation (zero React re-renders) - Runs ONLY when in viewport
  useEffect(() => {
    let isVisible = false;

    const animate = () => {
      if (!isVisible) return;
      rotationRef.current = (rotationRef.current + 0.6) % 360;
      const angle = rotationRef.current;

      // Directly set SVG attributes — bypasses React entirely
      if (ellipse1Ref.current) {
        ellipse1Ref.current.setAttribute("rx", String(Math.abs(Math.cos((angle * Math.PI) / 180)) * 72));
      }
      if (ellipse2Ref.current) {
        ellipse2Ref.current.setAttribute("rx", String(Math.abs(Math.cos(((angle + 60) * Math.PI) / 180)) * 72));
      }
      if (ellipse3Ref.current) {
        ellipse3Ref.current.setAttribute("rx", String(Math.abs(Math.cos(((angle + 120) * Math.PI) / 180)) * 72));
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animFrameRef.current) {
            animFrameRef.current = requestAnimationFrame(animate);
          }
        } else {
          if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
        }
      },
      { rootMargin: "100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, []);

  // Globe markers updated at 10fps via setInterval ONLY when in viewport
  useEffect(() => {
    let interval = null;

    const updateMarkers = () => {
      const angle = rotationRef.current;
      const positions = GLOBE_MARKERS.map((marker) => {
        const radius = 64;
        const phi = (90 - marker.lat) * (Math.PI / 180);
        const theta = (marker.lon + angle) * (Math.PI / 180);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        return { x, y, z, visible: z > -10, opacity: Math.max(0.2, (z + 20) / 88), scale: 0.72 + (z / 66) * 0.28, zIndex: Math.floor(z + 100) };
      });
      setMarkerPositions(positions);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          updateMarkers();
          if (!interval) interval = setInterval(updateMarkers, 100);
        } else {
          if (interval) {
            clearInterval(interval);
            interval = null;
          }
        }
      },
      { rootMargin: "100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  // Smooth circular card carousel timer
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

  const handlePrev = useCallback((e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  }, []);

  const handleNext = useCallback((e) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      data-testid="testimonials-section"
      className="relative z-10 bg-[#0c0a08] text-paper py-6 sm:py-10 lg:py-12 min-h-screen max-h-none lg:max-h-[920px] flex flex-col justify-between select-none overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col items-center pt-2 sm:pt-4 mb-auto">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-paper/50 font-light block mb-2">
            // 21SPHERES GLOBAL NETWORK
          </span>
          <h2 className="font-outfit text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-paper uppercase leading-tight">
            TRUSTED BY BUILDERS WORLDWIDE
          </h2>
        </div>

        {/* Responsive Grid: Side-by-Side on Desktop (lg), Stacked on Mobile/Tablet */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-center">
          
          {/* LEFT: Realistic Compact iPhone Screen Mockup with 3D Globe */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[260px] sm:w-[290px] lg:w-[320px] h-[350px] sm:h-[390px] lg:h-[420px] rounded-[2.4rem] bg-[#08080a] p-2.5 shadow-[0_25px_70px_rgba(0,0,0,0.8)] border-[5px] border-[#1e1e22] overflow-hidden flex flex-col justify-between">
              
              {/* Top Status Bar */}
              <div className="relative z-20 flex items-center justify-between px-3 pt-0.5 text-white/50 font-mono text-[9px]">
                <span className="font-light text-white/80">17:47</span>
                <div className="w-16 h-3.5 bg-black rounded-full flex items-center justify-center gap-1 px-2 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                </div>
                <div className="flex items-center gap-1 text-white/70">
                  <span className="text-[8px]">5G</span>
                  <div className="w-3 h-1.5 rounded-xs border border-white/60 p-0.5"><div className="w-full h-full bg-white rounded-xs"/></div>
                </div>
              </div>

              {/* iPhone Screen Content */}
              <div className="relative flex-1 bg-[#09090b] rounded-[1.8rem] overflow-hidden flex flex-col justify-between p-3 border border-white/10 shadow-inner mt-1">
                
                {/* 3D Wireframe Globe Container */}
                <div className="relative w-full h-[180px] sm:h-[210px] lg:h-[230px] flex items-center justify-center overflow-hidden">
                  <svg className="absolute w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] pointer-events-none z-0" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" fill="none" />
                    <ellipse cx="80" cy="80" rx="72" ry="24" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
                    <ellipse cx="80" cy="80" rx="72" ry="48" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none" />
                    <line x1="8" y1="80" x2="152" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />

                    {/* These 3 ellipses are updated directly via refs — no React re-renders */}
                    <ellipse
                      ref={ellipse1Ref}
                      cx="80"
                      cy="80"
                      rx="72"
                      ry="72"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="1.2"
                      fill="none"
                    />
                    <ellipse
                      ref={ellipse2Ref}
                      cx="80"
                      cy="80"
                      rx="72"
                      ry="72"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                      fill="none"
                    />
                    <ellipse
                      ref={ellipse3Ref}
                      cx="80"
                      cy="80"
                      rx="72"
                      ry="72"
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>

                  {/* Location & Avatar Markers — updated at 10fps via interval */}
                  <div className="relative w-[130px] h-[130px] sm:w-[140px] sm:h-[140px] flex items-center justify-center z-10 pointer-events-none">
                    {GLOBE_MARKERS.map((marker, idx) => {
                      const pos = markerPositions[idx];
                      if (!pos || !pos.visible) return null;

                      return (
                        <div
                          key={idx}
                          style={{
                            position: "absolute",
                            left: `calc(50% + ${pos.x}px - 14px)`,
                            top: `calc(50% - ${pos.y}px - 14px)`,
                            opacity: pos.opacity,
                            transform: `scale(${pos.scale})`,
                            zIndex: pos.zIndex,
                            transition: "left 0.1s linear, top 0.1s linear, opacity 0.1s linear, transform 0.1s linear",
                          }}
                          className="flex items-center gap-1 bg-[#18181b]/90 backdrop-blur-md border border-white/40 p-0.5 pr-2 rounded-full shadow-md"
                        >
                          <img
                            src={marker.img}
                            alt={marker.name}
                            className="w-4.5 h-4.5 rounded-full object-cover border border-white/60 shrink-0"
                          />
                          <span className="font-mono text-[7px] font-bold text-white whitespace-nowrap">
                            {marker.city}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Network Text Banner */}
                <div className="relative z-20 w-full text-center pb-3 pt-1 px-2">
                  <div className="flex items-center justify-center gap-1.5 mb-1 text-white/60">
                    <GlobeIcon className="w-3 h-3" />
                    <span className="font-mono text-[8px] uppercase tracking-widest font-semibold">21SPHERES GLOBAL NETWORK</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={activePhraseIndex}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className="font-outfit text-xs sm:text-sm font-normal text-white leading-tight tracking-tight uppercase max-w-[220px] mx-auto"
                    >
                      {PHRASES[activePhraseIndex]}
                    </motion.h3>
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT: SILKY SMOOTH SLIDING TESTIMONIALS CAROUSEL */}
          <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[350px] lg:h-[390px] flex items-center justify-center">
            
            {/* Carousel Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="absolute left-0 sm:left-2 lg:-left-4 z-50 p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="absolute right-0 sm:right-2 lg:-right-4 z-50 p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Cards Stack */}
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {CARDS.map((card, idx) => {
                let offset = idx - activeIndex;
                if (offset > Math.floor(CARDS.length / 2)) offset -= CARDS.length;
                if (offset < -Math.floor(CARDS.length / 2)) offset += CARDS.length;

                const isCenter = offset === 0;
                const isVisible = Math.abs(offset) <= 2;

                if (!isVisible) return null;

                let translateX = offset * 320;
                if (typeof window !== "undefined" && window.innerWidth < 640) translateX = offset * 220;

                const scale = isCenter ? 1.02 : 0.88;
                const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.5 : 0;
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
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ zIndex, position: "absolute" }}
                    className={`w-[270px] sm:w-[320px] md:w-[360px] rounded-[2rem] p-2 sm:p-2.5 flex flex-col justify-between transition-colors duration-300 cursor-pointer select-none ${
                      isCenter
                        ? "bg-black/90 backdrop-blur-2xl border border-white/35 shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
                        : "bg-[#0d0d0f]/80 backdrop-blur-md border border-white/15 shadow-xl"
                    }`}
                  >
                    {/* Top Container */}
                    <div className="bg-[#121215] rounded-[1.6rem] p-4 sm:p-5 border border-white/10 shadow-md text-white text-left flex flex-col justify-between min-h-[160px] sm:min-h-[180px]">
                      <div>
                        {/* Eyebrow Tag */}
                        <div className="font-mono text-[8px] sm:text-[9px] tracking-wider uppercase text-white/50 font-semibold mb-1.5">
                          {card.tag}
                        </div>

                        {/* Title */}
                        <h3 className="font-outfit text-base sm:text-xl md:text-2xl font-light tracking-tight text-white leading-tight capitalize mb-1">
                          {card.title}
                        </h3>
                      </div>

                      {/* Subhead Quote Text */}
                      <p className="font-outfit text-xs sm:text-sm text-white/80 font-normal leading-relaxed line-clamp-3 mt-2">
                        <span className="font-bold text-white">21Spheres delivered:</span> "{card.subhead}"
                      </p>
                    </div>

                    {/* Lower Author Bar */}
                    <div className="p-2.5 sm:p-3 flex items-center justify-between text-left">
                      <div className="flex items-center gap-2">
                        <img
                          src={card.avatar}
                          alt={card.name}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-white/40 shadow-md shrink-0"
                        />
                        <div className="font-outfit leading-tight">
                          <span className="font-bold text-xs sm:text-sm text-white block">
                            {card.name}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-white/60 font-medium block">
                            {card.role}
                          </span>
                        </div>
                      </div>

                      {/* Verified Badge */}
                      <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 shrink-0 hidden sm:inline-block">
                        Verified 21Spheres Build ↗
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Carousel Dots Indicator */}
        <div className="flex items-center gap-2 mt-4 sm:mt-6 z-40">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
