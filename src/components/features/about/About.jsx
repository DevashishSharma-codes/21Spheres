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
const LEFT_CARD_BG = "/card-bg-left.jpg";
const RIGHT_CARD_BG = "/card-bg-right.jpg";
const BACKGROUND_ART = "/table-bg-monet.jpg";

const TOP_TECH_ITEMS = [
  {
    name: "Vercel",
    role: "Edge Cloud",
    badge: "Sub-50ms SLA",
    icon: (
      <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
        <path d="M24 22.5L12 1.5L0 22.5h24z" />
      </svg>
    ),
  },
  {
    name: "AWS",
    role: "Cloud Infra",
    badge: "99.99% Uptime",
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current text-[#ff9900] shrink-0" viewBox="0 0 24 24" strokeWidth="2">
        <path d="M6 16.5C4 16.5 2.5 15 2.5 13C2.5 11.2 3.8 9.7 5.5 9.5C6 6.5 8.5 4.5 11.5 4.5C14.5 4.5 17 6.5 17.5 9.5C19.2 9.7 20.5 11.2 20.5 13C20.5 15 19 16.5 17 16.5H6Z" />
      </svg>
    ),
  },
  {
    name: "Redis",
    role: "In-Memory Cache",
    badge: "<1ms Query",
    icon: (
      <svg className="w-4 h-4 fill-current text-[#dc382d] shrink-0" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7 3.5-7 3.5-7-3.5 7-3.5zM4 9.3l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z" />
      </svg>
    ),
  },
  {
    name: "React",
    role: "UI Architecture",
    badge: "120 FPS Engine",
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current text-[#61dafb] shrink-0" viewBox="0 0 24 24" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="9" ry="3.5" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="#61dafb" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    role: "Fullstack App",
    badge: "SSR & Edge",
    icon: (
      <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M9 8v8l7-8v8" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    role: "Type Safety",
    badge: "Zero Runtime Bugs",
    icon: (
      <svg className="w-4 h-4 fill-current text-[#3178c6] shrink-0" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="4" fill="#3178c6" />
        <text x="5" y="16" fill="white" fontSize="11" fontWeight="bold">TS</text>
      </svg>
    ),
  },
];

const BOTTOM_TECH_ITEMS = [
  {
    name: "Python",
    role: "AI & LLM Pipeline",
    badge: "RAG & Agents",
    icon: (
      <svg className="w-4 h-4 fill-current text-[#3776ab] shrink-0" viewBox="0 0 24 24">
        <path d="M12 2c-3.3 0-4 1.5-4 3v2h8V5c0-1.5-.7-3-4-3zm-2 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 5c-1.5 0-3 .7-3 4v3c0 3.3 1.5 4 3 4h2v-2c0-1.5.7-3 4-3h4v-4c0-1.5-.7-3-4-3H4zm2 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm14-3c1.5 0 3-.7 3-4V9c0-3.3-1.5-4-3-4h-2v2c0 1.5-.7 3-4 3h-4v4c0 1.5.7 3 4 3h6zm-2-7a1 1 0 1 1 0-2 1 1 0 0 1 0-2z" />
      </svg>
    ),
  },
  {
    name: "Rust",
    role: "Microservices",
    badge: "Sub-5ms Exec",
    icon: (
      <svg className="w-4 h-4 fill-none stroke-current text-[#dea584] shrink-0" viewBox="0 0 24 24" strokeWidth="2">
        <circle cx="12" cy="12" r="8" />
        <path d="M9 9h6v6H9z" fill="#dea584" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    role: "Database Core",
    badge: "ACID Compliant",
    icon: (
      <svg className="w-4 h-4 fill-current text-[#4169e1] shrink-0" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    role: "Container Runtime",
    badge: "SOC2 Compliant",
    icon: (
      <svg className="w-4 h-4 fill-current text-[#2496ed] shrink-0" viewBox="0 0 24 24">
        <path d="M13 10h-2v-2h2v2zm-3 0H8v-2h2v2zm6 0h-2v-2h2v2zm-9 0H5v-2h2v2zm12 0h-2v-2h2v2zm-3-3h-2V5h2v2zm-3 0H8V5h2v2zm3 6h-2v-2h2v2zm-3 0H8v-2h2v2zm-3 0H5v-2h2v2zm12 3c-1 0-3.5 1-5 1-3 0-5.5-2.5-5.5-2.5S8 16 5 16s-4.5 1.5-4.5 1.5C.5 19 3 20 6 20c8 0 13-5 13-5z" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    role: "Async Runtime",
    badge: "High Scale",
    icon: (
      <svg className="w-4 h-4 fill-current text-[#5fa04e] shrink-0" viewBox="0 0 24 24">
        <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.2l7.5 4.1v7.4L12 19.8l-7.5-4.1V8.3L12 4.2z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    role: "Design System",
    badge: "Zero Bloat",
    icon: (
      <svg className="w-4 h-4 fill-current text-[#06b6d4] shrink-0" viewBox="0 0 24 24">
        <path d="M12 6c-3.3 0-5.5 1.7-6.6 5 1.1-1.7 2.5-2.2 4.1-1.7 1 .3 1.8 1.1 2.6 2 1.4 1.4 3 3.1 6.5 3.1 3.3 0 5.5-1.7 6.6-5-1.1 1.7-2.5 2.2-4.1 1.7-1-.3-1.8-1.1-2.6-2-1.4-1.4-3-3.1-6.5-3.1z" />
      </svg>
    ),
  },
];

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
      className="relative z-30 w-full bg-[#0c0a08] text-paper py-8 sm:py-12 lg:py-14 px-3 sm:px-5 lg:px-6 xl:px-8 flex flex-col justify-between select-none border-t border-white/10"
    >
      {/* High-Tech Radial Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none z-0" />

      {/* Precision SVG Geometry Laser Starburst Grid */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 z-0"
        viewBox="0 0 1200 650"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Symmetrical Container Corner Diagonals (Subtle & Light) */}
        <line x1="600" y1="240" x2="60" y2="35" stroke="white" strokeWidth="0.75" opacity="0.25" />
        <line x1="600" y1="240" x2="1140" y2="35" stroke="white" strokeWidth="0.75" opacity="0.25" />
        <line x1="600" y1="240" x2="60" y2="610" stroke="white" strokeWidth="0.75" opacity="0.25" />
        <line x1="600" y1="240" x2="1140" y2="610" stroke="white" strokeWidth="0.75" opacity="0.25" />

        {/* Outer Side Vertical Dotted Lines (Brought back crisp & visible on Left & Right Margins) */}
        <line x1="60" y1="0" x2="60" y2="650" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
        <line x1="1140" y1="0" x2="1140" y2="650" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />

        {/* Clean Horizontal Guideline Between Title and Animation Frame */}
        <line x1="60" y1="240" x2="1140" y2="240" stroke="white" strokeWidth="0.75" strokeDasharray="4 4" opacity="0.3" />

        {/* Focal Center & Outer Side Node Indicators */}
        <circle cx="600" cy="240" r="20" stroke="white" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.3" />
        <circle cx="600" cy="240" r="2.5" fill="white" opacity="0.6" />
        <circle cx="60" cy="240" r="2" fill="white" opacity="0.5" />
        <circle cx="1140" cy="240" r="2" fill="white" opacity="0.5" />
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

        {/* Main Headline & Leadership Container (Centered) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 lg:gap-6 my-auto py-2 relative">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full text-center"
          >
            <span className="font-mono text-[9px] sm:text-xs uppercase tracking-widest text-paper/50 block mb-1 font-light text-center">
              PROGRAM STATEMENT / 01
            </span>
            <h2 className="font-outfit text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-light uppercase tracking-tight text-paper/90 leading-[1.06] text-center max-w-4xl mx-auto">
              ENGINEERING HIGH-FREQUENCY DIGITAL SYSTEMS FOR MODERN BUILDERS
            </h2>
          </motion.div>

          {/* Compact Leadership Team Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center justify-center shrink-0 relative"
          >
            <div
              ref={pillRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative group cursor-pointer py-1"
            >
              <div className="relative p-[1.5px] rounded-full bg-gradient-to-r from-white/35 via-white/10 to-white/35 animate-shimmer-border">
                <div className="flex items-center gap-2.5 bg-[#0c0a08]/90 backdrop-blur-xl p-1.5 px-3.5 rounded-full">
                  <div className="flex overflow-hidden shrink-0">
                    <img
                      className="inline-block h-9 w-9 sm:h-10 sm:w-10 rounded-full ring-2 ring-[#0c0a08] object-cover border border-white/50 shadow-md group-hover:scale-105 transition-transform"
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

        {/* Manifesto Performance Architecture Table (3 Columns) - Sharp Edges & Vivid Background Frame */}
        <div className="my-3 sm:my-4 relative z-10 bg-[#0c0a08] overflow-hidden border border-white/20 shadow-2xl rounded-none flex items-center justify-center">
          {/* Framed Impressionist Painting Backdrop */}
          <img
            src={BACKGROUND_ART}
            alt="Manifesto background texture"
            className="absolute inset-0 w-full h-full object-cover z-0 scale-105 opacity-60 pointer-events-none"
          />

          {/* Center Table Container */}
          <div className="relative z-10 w-full p-3 sm:p-5 md:p-6">
            <div className="w-full bg-[#121214] border border-white/20 rounded-none overflow-hidden shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
                
                {/* Column 1: Attribution Yield (Code Graph) */}
                <div className="p-3.5 sm:p-5 flex flex-col justify-between h-[270px] sm:h-[310px] text-left bg-[#121214]">
                  <div className="relative h-[165px] sm:h-[190px] w-full rounded-none bg-[#0a0a0c] border border-white/10 p-3 flex flex-col justify-between overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(rgba(132, 204, 22, 0.4) 1px, transparent 1px)`,
                        backgroundSize: "12px 12px",
                      }}
                    />
                    <div className="relative z-10 w-fit">
                      <div className="border border-[#84cc16]/50 bg-[#09090b] px-2.5 py-1 rounded-none border-l-2 border-l-[#84cc16]">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-paper/60 block">
                          with 21Spheres
                        </span>
                        <span className="font-mono text-xs sm:text-sm font-light text-[#84cc16] tracking-tight">
                          84%~92% Speed Boost
                        </span>
                      </div>
                    </div>
                    <div className="relative z-10 w-fit mt-1">
                      <div className="bg-[#1c1c20] border border-white/15 px-2 py-0.5 rounded-none">
                        <span className="font-mono text-[7px] uppercase tracking-widest text-paper/40 block">
                          before
                        </span>
                        <span className="font-mono text-[11px] font-light text-paper/80">
                          67% ~ 71%
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-4 h-20 px-2 pointer-events-none">
                      <svg viewBox="0 0 300 90" className="w-full h-full overflow-visible">
                        <path d="M 10 70 Q 90 65, 160 55 T 290 40" fill="none" stroke="#ef4444" strokeWidth="1.5" />
                        <path d="M 10 70 Q 90 60, 170 38 T 290 26" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
                        <path d="M 10 70 Q 80 50, 160 28 T 290 18" fill="none" stroke="#eab308" strokeWidth="1.5" />
                        <path d="M 10 70 Q 75 55, 135 25 T 290 8" fill="none" stroke="#84cc16" strokeWidth="2.5" strokeLinecap="square" />
                        <circle cx="290" cy="8" r="3" fill="#84cc16" />
                      </svg>
                    </div>
                    <div className="relative z-10 flex items-center justify-between font-mono text-[8px] text-paper/40 tracking-wider font-light">
                      <span>phase 1</span>
                      <span>phase 10</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="font-outfit text-base sm:text-lg font-light text-paper tracking-tight mb-0.5">
                      Performance & Scale
                    </h3>
                    <p className="font-outfit text-[11px] sm:text-xs font-light text-paper/70 leading-relaxed">
                      Accelerates application load speed, reduces server latency, and optimizes high-scale platform throughput.
                    </p>
                  </div>
                </div>

                {/* Column 2: Tech Stack Infrastructure (Moving Tech Icons: Vercel, AWS, Redis, React, Next.js, TS, Python, Rust, Docker, Postgres, Node, Tailwind) */}
                <div className="p-3.5 sm:p-5 flex flex-col justify-between h-[270px] sm:h-[310px] text-left bg-[#121214]">
                  <div className="relative h-[165px] sm:h-[190px] w-full rounded-none bg-[#0a0a0c] border border-white/10 overflow-hidden flex flex-col justify-center gap-2.5 py-2">
                    <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#0a0a0c] to-transparent z-20 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#0a0a0c] to-transparent z-20 pointer-events-none" />

                    {/* Row 1 Moving Icons (Vercel, AWS, Redis, React, Next.js, TS) */}
                    <div className="flex overflow-hidden w-full relative z-10">
                      <motion.div
                        animate={{ x: [0, -480] }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                        className="flex items-center gap-2.5 shrink-0"
                      >
                        {[...TOP_TECH_ITEMS, ...TOP_TECH_ITEMS].map((tech, idx) => (
                          <div key={idx} className="w-40 bg-[#16161a] border border-white/12 rounded-none p-2 flex items-center gap-2.5 shrink-0 shadow-sm hover:border-white/30 transition-colors">
                            <div className="w-7 h-7 rounded-none bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                              {tech.icon}
                            </div>
                            <div className="font-outfit min-w-0 flex-1">
                              <span className="font-medium text-[11px] text-paper truncate block leading-tight">{tech.name}</span>
                              <span className="text-[8px] font-mono block font-light text-paper/50 truncate">{tech.badge}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Row 2 Moving Icons (Python, Rust, Postgres, Docker, Node, Tailwind) */}
                    <div className="flex overflow-hidden w-full relative z-10">
                      <motion.div
                        animate={{ x: [-480, 0] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="flex items-center gap-2.5 shrink-0"
                      >
                        {[...BOTTOM_TECH_ITEMS, ...BOTTOM_TECH_ITEMS].map((tech, idx) => (
                          <div key={idx} className="w-40 bg-[#16161a] border border-white/12 rounded-none p-2 flex items-center gap-2.5 shrink-0 shadow-sm hover:border-white/30 transition-colors">
                            <div className="w-7 h-7 rounded-none bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                              {tech.icon}
                            </div>
                            <div className="font-outfit min-w-0 flex-1">
                              <span className="font-medium text-[11px] text-paper truncate block leading-tight">{tech.name}</span>
                              <span className="text-[8px] font-mono block font-light text-[#84cc16] truncate">{tech.badge}</span>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="font-outfit text-base sm:text-lg font-light text-paper tracking-tight mb-0.5">
                      Deterministic Tech Stack
                    </h3>
                    <p className="font-outfit text-[11px] sm:text-xs font-light text-paper/70 leading-relaxed">
                      Engineered on modern infrastructure — Vercel Edge, AWS Cloud, Redis caching, Rust microservices &amp; Python AI pipelines.
                    </p>
                  </div>
                </div>

                {/* Column 3: Third-Party Integrations */}
                <div className="p-3.5 sm:p-5 flex flex-col justify-between h-[270px] sm:h-[310px] text-left bg-[#121214]">
                  <div className="relative h-[165px] sm:h-[190px] w-full rounded-none bg-[#0a0a0c] border border-white/10 overflow-hidden">
                    <img
                      src="/integrations-grid.jpg"
                      alt="Integrations grid"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121214]/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="pt-2">
                    <h3 className="font-outfit text-base sm:text-lg font-light text-paper tracking-tight mb-0.5">
                      Third-Party Integrations
                    </h3>
                    <p className="font-outfit text-[11px] sm:text-xs font-light text-paper/70 leading-relaxed">
                      Seamlessly connects your custom software with 120+ affiliate networks, payment gateways &amp; open banking APIs.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* 3 Manifesto Chapter Cards */}
        <div className="px-3 sm:px-5 md:px-6 my-2 sm:my-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
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
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
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
        </div>

        {/* 4 Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/15 border-t border-white/15 pt-3 pb-3 sm:pb-4 mt-auto w-full">
          {STATS.map(({ value, label }, idx) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              data-testid={`about-stat-${label}`}
              className="flex flex-col justify-center px-3 sm:px-6 py-2 md:py-0 text-left"
            >
              <div className="font-outfit text-xl sm:text-2xl lg:text-3xl font-light tracking-tight text-paper leading-none">
                {value}
              </div>
              <div className="mt-1.5 font-mono text-[8px] sm:text-[9px] lg:text-[10px] text-paper/50 uppercase tracking-wider leading-tight font-light">
                {label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* REACT PORTAL 3-CARD FAN POPUP MODAL */}
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

                {/* LEFT CARD */}
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
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <LogoMark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                    </div>
                    <span className="font-outfit text-[11px] sm:text-xs font-semibold tracking-tight text-white">21Spheres</span>
                  </div>

                  <h4 className="font-outfit text-[10px] sm:text-sm font-light leading-snug tracking-tight text-white/95">
                    Never stop searching for something remarkable.
                  </h4>

                  <div className="relative h-28 sm:h-44 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                    <img
                      src={LEFT_CARD_BG}
                      alt="Aesthetic landscape"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                  </div>
                </motion.div>

                {/* RIGHT CARD */}
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <LogoMark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <span className="font-outfit text-[11px] sm:text-xs font-semibold tracking-tight text-white">21Spheres</span>
                    </div>
                    <span className="font-outfit text-[9px] sm:text-[10px] font-light text-white/50">EST. 2024</span>
                  </div>

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

                {/* CENTER MAIN CARD */}
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
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                      <LogoMark className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-black" />
                    </div>
                    <span className="font-outfit text-[11px] sm:text-xs font-semibold tracking-tight text-white">21Spheres</span>
                  </div>

                  <h3 className="font-outfit text-[11px] sm:text-sm font-light tracking-tight text-white leading-snug">
                    Helping you build your next digital leap.
                  </h3>

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
