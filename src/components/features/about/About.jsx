import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "../../common/LogoMark";

const CHAPTERS = [
  {
    no: "01",
    title: "Craft over noise",
    body: "We obsess over the details others skip — the micro-interactions, zero-friction flows, and sub-second latency that make software feel alive.",
  },
  {
    no: "02",
    title: "Ship, then scale",
    body: "Momentum matters. We get production apps into real hands fast, then engineer resilient cloud architectures that hold up under millions.",
  },
  {
    no: "03",
    title: "Partners, not vendors",
    body: "We embed directly with your product team, share execution risk, and treat your long-term roadmap as our own craft.",
  },
];

const STATS = [
  { value: "120+", label: "Products Shipped" },
  { value: "14", label: "Countries Served" },
  { value: "40M+", label: "Users Reached" },
  { value: "9 YRS", label: "Building Together" },
];

const OWNER_PHOTO = "/om-bawal-photo.jpg";

const LEFT_CARD_BG =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85";

const RIGHT_CARD_BG =
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85";

export const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null); // 'left' | 'center' | 'right' | null
  const pillRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const [pillPos, setPillPos] = useState({ top: 0, left: 0, showBelow: false, isMobile: false });

  const updatePosition = () => {
    if (pillRef.current && typeof window !== "undefined") {
      const rect = pillRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isMobile = viewportWidth < 640;

      // 1. Horizontal center calculation & responsive viewport clamp
      let centerX = rect.left + rect.width / 2;
      const halfSpreadWidth = isMobile ? 180 : 265; // Responsive spread width

      if (centerX - halfSpreadWidth < 12) {
        centerX = halfSpreadWidth + 12;
      }
      if (centerX + halfSpreadWidth > viewportWidth - 12) {
        centerX = viewportWidth - halfSpreadWidth - 12;
      }

      // 2. Vertical position calculation & direction flip
      const cardHeight = isMobile ? 280 : 350;
      let showBelow = false;
      let targetTop = rect.top - 8;

      // If card top goes behind/under top navbar (< 90px from top)
      if (rect.top - cardHeight < 90) {
        if (viewportHeight - rect.bottom > cardHeight + 20) {
          showBelow = true;
          targetTop = rect.bottom + 8;
        } else {
          targetTop = Math.max(90 + cardHeight, rect.top - 8);
        }
      }

      setPillPos({
        top: targetTop,
        left: centerX,
        showBelow,
        isMobile,
      });
    }
  };

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    updatePosition();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
    }
    // Grace period timeout so mouse transition between pill & popover is rock-solid
    leaveTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setHoveredCard(null);
    }, 220);
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isHovered) return;
    const handleScrollOrResize = () => updatePosition();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isHovered]);

  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative z-30 w-full min-h-[100dvh] lg:h-[100dvh] bg-[#0c0a08] text-paper p-3 sm:p-5 lg:p-6 xl:p-8 flex flex-col justify-between select-none border-t border-white/10"
    >
      {/* High-Tech Radial Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none z-0" />

      {/* Precision SVG Geometry Laser Starburst Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 z-0"
        viewBox="0 0 1200 650"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <line x1="740" y1="200" x2="0" y2="0" stroke="white" strokeWidth="1" />
        <line x1="740" y1="200" x2="1200" y2="0" stroke="white" strokeWidth="1" />
        <line x1="740" y1="200" x2="0" y2="650" stroke="white" strokeWidth="1" />
        <line x1="740" y1="200" x2="1200" y2="650" stroke="white" strokeWidth="1" />
        <line x1="740" y1="200" x2="0" y2="200" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="740" y1="200" x2="740" y2="0" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="740" y1="200" x2="740" y2="650" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="740" y1="200" x2="1200" y2="200" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="740" cy="200" r="26" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="740" cy="200" r="3.5" fill="white" />
      </svg>

      {/* Single-Screen Responsive Layout Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full h-full flex flex-col justify-between">
        {/* Top Banner Row */}
        <div className="flex items-center justify-between pt-1 pb-1.5 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-white/35 px-2.5 py-0.5 sm:px-3 sm:py-1 font-mono text-[9px] sm:text-xs uppercase tracking-widest text-paper/90 bg-white/5 backdrop-blur-md shadow-lg"
          >
            <span>[ 21SPHERES_STUDIO ]</span>
          </motion.div>

          <span className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-paper/40 hidden sm:block font-light">
            // MANIFESTO & PHILOSOPHY
          </span>
        </div>

        {/* Main Headline & Leadership Grid with Lighter Font Weight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-center my-auto py-1 relative">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <span className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-paper/50 block mb-1 font-light">
              PROGRAM STATEMENT / 01
            </span>
            <h2 className="font-outfit text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-light uppercase tracking-tight text-paper/90 leading-[1.06]">
              ENGINEERING HIGH-FREQUENCY DIGITAL SYSTEMS FOR MODERN BUILDERS
            </h2>
          </motion.div>

          {/* Compact Leadership Team Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 flex items-center justify-start lg:justify-end relative"
          >
            <div
              ref={pillRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative group cursor-pointer py-2"
            >
              {/* Outer Moving Transparent Outline Without Drop Shadow Glow */}
              <div className="relative p-[1.5px] rounded-full bg-gradient-to-r from-white/35 via-white/10 to-white/35 animate-shimmer-border">
                <div className="flex items-center gap-2.5 bg-[#0c0a08]/90 backdrop-blur-xl p-1.5 px-3.5 rounded-full">
                  <div className="flex overflow-hidden shrink-0">
                    <img
                      className="inline-block h-10 w-10 sm:h-12 sm:w-12 rounded-full ring-2 ring-[#0c0a08] object-cover border border-white/50 shadow-md group-hover:scale-105 transition-transform"
                      src={OWNER_PHOTO}
                      alt="Om Bawal - 21Spheres Founder"
                    />
                  </div>
                  <div className="text-left font-mono text-[10px] text-paper/70 leading-tight">
                    <p className="font-medium text-paper uppercase tracking-wider text-[9px] sm:text-[10px]">
                      21SPHERES LEADERSHIP
                    </p>
                    <p className="text-paper/40 text-[8px] sm:text-[9px] font-light">Architecture & Craft</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Manifesto Chapter Cards with Lighter Font Weight Titles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 my-auto">
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.no}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              data-testid={`about-chapter-${i + 1}`}
              className="group relative rounded-xl bg-white/[0.04] p-3.5 sm:p-4.5 border border-white/15 hover:border-white/35 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-paper/40 mb-1.5 pb-1 border-b border-white/10 font-light">
                  <span>CHAPTER / {c.no}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-[#C2612B] transition-colors" />
                </div>
                <h3 className="font-outfit text-sm sm:text-base lg:text-lg font-light tracking-tight text-paper mb-1">
                  {c.title}
                </h3>
                <p className="font-outfit text-[11px] sm:text-xs text-paper/70 font-light leading-relaxed line-clamp-2 sm:line-clamp-3">
                  {c.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4 Key Metrics Bar with Lighter Font Weight Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 border-t border-white/15 pt-2.5 sm:pt-3.5 pb-3 sm:pb-4 mt-auto">
          {STATS.map(({ value, label }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              data-testid={`about-stat-${label}`}
            >
              <div className="font-outfit text-lg sm:text-xl lg:text-2xl font-light tracking-tight text-paper leading-none">
                {value}
              </div>
              <div className="mt-1 font-mono text-[8px] sm:text-[9px] lg:text-[10px] text-paper/50 uppercase tracking-wider leading-tight font-light">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* REACT PORTAL 3-CARD FAN POPUP MODAL (Lighter Weight Typography) */}
      {isHovered && typeof document !== "undefined" && createPortal(
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "fixed",
            top: pillPos.showBelow ? pillPos.top - 16 : pillPos.top + 16,
            left: pillPos.left,
            transform: pillPos.showBelow ? "translate(-50%, 0%)" : "translate(-50%, -100%)",
            zIndex: 9999999,
            pointerEvents: "auto",
          }}
          className={`select-none flex items-center justify-center transition-all duration-150 ${
            pillPos.showBelow ? "pt-5 -mt-5" : "pb-5 -mb-5"
          }`}
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: pillPos.showBelow ? -12 : 12, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: pillPos.showBelow ? -12 : 12, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: pillPos.isMobile ? "360px" : "530px", maxWidth: "94vw" }}
            >
              <div className="relative w-full h-[270px] sm:h-[360px] flex items-center justify-center">

                {/* LEFT CARD (Back Left - Tilted & Shifted, comes to top on hover) */}
                <motion.div
                  onMouseEnter={() => setHoveredCard("left")}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, x: 0, rotate: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    x: pillPos.isMobile ? -85 : -120,
                    rotate: -8,
                    scale: hoveredCard === "left" ? (pillPos.isMobile ? 1.02 : 1.04) : 0.92,
                    zIndex: hoveredCard === "left" ? 40 : 10,
                  }}
                  exit={{ opacity: 0, x: 0, rotate: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 250, damping: 22 }}
                  className="absolute w-40 sm:w-54 h-[255px] sm:h-[335px] rounded-[1.5rem] sm:rounded-[1.8rem] bg-[#18181b] text-white p-3 sm:p-4 flex flex-col justify-between shadow-2xl border border-white/20 overflow-hidden cursor-pointer"
                >
                  {/* Card Header with "21Spheres" */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <LogoMark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </div>
                    <span className="font-outfit text-[11px] sm:text-xs font-semibold tracking-tight text-white">21Spheres</span>
                  </div>

                  <h4 className="font-outfit text-[10px] sm:text-sm font-light leading-snug tracking-tight text-white/95">
                    Never stop searching for something remarkable.
                  </h4>

                  {/* Image inside left card */}
                  <div className="relative h-28 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                    <img
                      src={LEFT_CARD_BG}
                      alt="Aesthetic landscape"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                </motion.div>

                {/* RIGHT CARD (Back Right - Tilted & Shifted, comes to top on hover) */}
                <motion.div
                  onMouseEnter={() => setHoveredCard("right")}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, x: 0, rotate: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    x: pillPos.isMobile ? 85 : 120,
                    rotate: 8,
                    scale: hoveredCard === "right" ? (pillPos.isMobile ? 1.02 : 1.04) : 0.92,
                    zIndex: hoveredCard === "right" ? 40 : 10,
                  }}
                  exit={{ opacity: 0, x: 0, rotate: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 250, damping: 22 }}
                  className="absolute w-40 sm:w-54 h-[255px] sm:h-[335px] rounded-[1.5rem] sm:rounded-[1.8rem] bg-[#121214] text-white p-3 sm:p-4 flex flex-col justify-between shadow-2xl border border-white/20 overflow-hidden cursor-pointer"
                >
                  {/* Card Header with "21Spheres" */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <LogoMark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <span className="font-outfit text-[11px] sm:text-xs font-semibold tracking-tight text-white">21Spheres</span>
                    </div>
                    <span className="font-outfit text-[9px] sm:text-[10px] font-light text-white/50">EST. 2024</span>
                  </div>

                  {/* Image inside right card */}
                  <div className="relative h-28 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                    <img
                      src={RIGHT_CARD_BG}
                      alt="Aesthetic architecture"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>

                  <p className="font-outfit text-[10px] sm:text-xs font-light text-white/90 leading-tight drop-shadow">
                    The world is waiting to explore your next release.
                  </p>
                </motion.div>

                {/* CENTER MAIN CARD (Front & Center - Om Bawal Photo & Message) */}
                <motion.div
                  onMouseEnter={() => setHoveredCard("center")}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 20, scale: 0.85 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: hoveredCard === "center" ? 1.03 : 1,
                    zIndex: (hoveredCard === "left" || hoveredCard === "right") ? 20 : 30,
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.85 }}
                  transition={{ type: "spring", stiffness: 270, damping: 22 }}
                  className="absolute w-48 sm:w-62 h-[270px] sm:h-[355px] rounded-[1.6rem] sm:rounded-[2rem] bg-[#09090b] text-white p-3.5 sm:p-5 flex flex-col justify-between shadow-[0_30px_70px_rgba(0,0,0,0.95)] border border-white/30 overflow-hidden cursor-pointer"
                >
                  {/* Card Header with "21Spheres" */}
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                      <LogoMark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" />
                    </div>
                    <span className="font-outfit text-[11px] sm:text-xs font-semibold tracking-tight text-white">21Spheres</span>
                  </div>

                  {/* Main Headline */}
                  <h3 className="font-outfit text-[11px] sm:text-sm font-light tracking-tight text-white leading-snug">
                    Helping you build your next digital leap.
                  </h3>

                  {/* Center Om Bawal Photo */}
                  <div className="relative h-28 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 shadow-xl group/photo">
                    <img
                      src={OWNER_PHOTO}
                      alt="Om Bawal"
                      className="w-full h-full object-cover group-hover/photo:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-1.5 sm:bottom-2 left-2 sm:left-2.5 right-2 sm:right-2.5 text-left">
                      <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-[#84cc16] font-bold block">
                        FOUNDER & CHIEF ARCHITECT
                      </span>
                      <span className="font-outfit text-[10px] sm:text-xs font-medium text-white block">
                        Om Bawal
                      </span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>,
        document.body
      )}
    </section>
  );
};

export default About;
