import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const MOUNTAIN_IMG = "/hero-bg.jpg";

const WAVE_BAR_COUNT = 32;

const LEFT_BASE =
  "Engineering digital experiences that scale · Architecting autonomous AI agents, high-frequency web platforms, and native mobile apps · Built with zero friction, sub-second latency, and enterprise security · From initial design concept to production scale, we own the craft end-to-end · Rapid deployment, resilient infrastructure, and high reliability for modern builders";

const RIGHT_BASE =
  "Full-stack Web Platforms · Native iOS & Android Apps · AI Copilots & RAG Engines · Design Systems · Cloud Infrastructure · 120+ Products Shipped · 40M+ Users Reached · Sub-second Latency · 99.99% Uptime Guarantee · Crafted by 21Spheres Studio";

const LEFT_TEXT = `${LEFT_BASE} · ${LEFT_BASE} · ${LEFT_BASE}`;
const RIGHT_TEXT = `${RIGHT_BASE} · ${RIGHT_BASE} · ${RIGHT_BASE}`;

const STATUS_STEPS = [
  {
    text: "AI Agents",
    icon: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-amber-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="6" />
      </svg>
    ),
  },
  {
    text: "Sub-Second",
    icon: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-sky-500 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 3v3m0 12v3M3 12h3m12 0h3m-3.5-6.5l-2 2m-7 7l-2 2m11 0l-2-2m-7-7l-2-2" />
      </svg>
    ),
  },
  {
    text: "High-Scale",
    icon: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    text: "Cloud Native",
    icon: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#C2612B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M19 18a3.5 3.5 0 0 0 .5-7 5 5 0 0 0-9.5-1.5A4.5 4.5 0 0 0 2 13.5 4.5 4.5 0 0 0 6.5 18" />
      </svg>
    ),
  },
  {
    text: "System Active",
    icon: (
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

/* CSS-only waveform bar styles */
const marqueeStyleId = "wispr-waveform-css-anim";
function ensureWaveformStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(marqueeStyleId)) return;
  const style = document.createElement("style");
  style.id = marqueeStyleId;
  
  let css = "";
  for (let i = 0; i < 8; i++) {
    const h1 = 20 + (i % 3) * 8;
    const h2 = 30 + (i % 8) * 7;
    const h3 = 50;
    css += `
@keyframes waveBar${i} {
  0%, 100% { height: ${h1}%; }
  50% { height: ${h2}%; }
  75% { height: ${h3}%; }
}`;
  }
  css += `
@keyframes waveSlide {
  from { transform: translate3d(-50%, 0, 0); }
  to { transform: translate3d(0%, 0, 0); }
}
.marquee-paused {
  animation-play-state: paused !important;
}
`;
  style.textContent = css;
  document.head.appendChild(style);
}

function AudioStatusText({ isVisible }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % STATUS_STEPS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isVisible]);

  const current = STATUS_STEPS[index];

  return (
    <div className="absolute -top-9 sm:-top-11 md:-top-14 inset-x-0 mx-auto flex items-center justify-center z-40 pointer-events-none w-max">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-2.5 text-xs sm:text-base md:text-lg lg:text-xl font-outfit font-semibold text-ink drop-shadow-xs"
        >
          {current.icon}
          <span>{current.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function WaveformMarquee({ isVisible }) {
  useEffect(() => {
    ensureWaveformStyles();
  }, []);

  const bars = Array.from({ length: WAVE_BAR_COUNT }, (_, i) => i);
  const pausedClass = isVisible ? "" : " marquee-paused";

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className={`flex h-full w-max items-center gap-1 sm:gap-1.5 px-2 sm:px-3${pausedClass}`}
        style={{
          animation: "waveSlide 4s linear infinite",
          willChange: "transform",
        }}
      >
        {[...bars, ...bars].map((barIndex, key) => (
          <span
            key={key}
            className={`block w-1 sm:w-1.5 shrink-0 rounded-full bg-ink${pausedClass}`}
            style={{
              animation: `waveBar${barIndex % 8} ${0.35 + (barIndex % 4) * 0.1}s linear infinite alternate`,
              animationDelay: `${barIndex * 0.05}s`,
              height: "20%",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="relative z-10 flex w-full max-w-4xl flex-col items-center pt-4 sm:pt-8 md:pt-12 pb-16 sm:pb-24 md:pb-32 text-center select-none">
      <div className="relative w-full max-w-[620px] h-[260px] sm:h-[360px] md:h-[440px] flex items-center justify-center p-2 sm:p-4 mx-auto">
        <img
          src="/halftone-hands.png"
          alt="Halftone hands graphic asset"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain grayscale brightness-90 contrast-125 pointer-events-none z-0 opacity-95 scale-100 sm:scale-105"
        />

        <svg
          viewBox="0 0 540 420"
          className="absolute inset-0 h-full w-full pointer-events-none z-10 overflow-visible max-h-full mx-auto"
          fill="none"
        >
          <path
            d="M 60 140 C 160 30, 360 30, 420 160 C 480 300, 220 400, 110 300 C 20 190, 140 40, 320 60 C 440 80, 510 190, 525 190"
            stroke="#17130f"
            strokeWidth="2.4"
            fill="none"
          />
          <circle cx="525" cy="190" r="5" fill="#17130f" />
        </svg>

        <div className="relative z-20 text-center max-w-[260px] sm:max-w-xs md:max-w-md px-2 sm:px-4">
          <h2 className="font-outfit text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.08]">
            Let's take <br />
            this <span className="font-playfair italic text-[#C2612B] font-normal">journey</span> <br />
            together.
          </h2>
        </div>
      </div>
    </div>
  );
}

function MobileSVGAnimation({ isVisible }) {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!text1Ref.current || !text2Ref.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    tl.fromTo(
      text1Ref.current,
      { attr: { x: -1200 } },
      { attr: { x: 0 }, duration: 20, ease: "none" },
      0
    );
    tl.fromTo(
      text2Ref.current,
      { attr: { x: -1200 } },
      { attr: { x: 0 }, duration: 20, ease: "none" },
      0
    );

    tlRef.current = tl;
    if (!isVisible) tl.pause();

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (tlRef.current) {
      if (isVisible) {
        tlRef.current.play();
      } else {
        tlRef.current.pause();
      }
    }
  }, [isVisible]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden block sm:hidden"
    >
      <svg
        className="h-full w-full opacity-40"
        viewBox="0 0 380 620"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="mobile-first-curve"
          className="fill-transparent stroke-transparent"
          d="M -40 160 C 90 90, 290 90, 420 160"
        />
        <text ref={text1Ref} x="-1200" className="text-[11px]">
          <textPath
            href="#mobile-first-curve"
            className="fill-ink font-normal opacity-50"
          >
            {LEFT_TEXT}
          </textPath>
        </text>

        <path
          id="mobile-second-curve"
          className="fill-transparent stroke-transparent"
          d="M -40 470 C 90 435, 290 435, 420 470"
        />
        <text ref={text2Ref} x="-1200" className="text-[11px]">
          <textPath
            href="#mobile-second-curve"
            className="fill-ink/75 font-semibold"
          >
            {RIGHT_TEXT}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

function SVGAnimation({ isVisible }) {
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!text1Ref.current || !text2Ref.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    tl.fromTo(
      text1Ref.current,
      { attr: { x: -2000 } },
      { attr: { x: 0 }, duration: 25, ease: "none" },
      0
    );
    tl.fromTo(
      text2Ref.current,
      { attr: { x: -2000 } },
      { attr: { x: 0 }, duration: 25, ease: "none" },
      0
    );

    tlRef.current = tl;
    if (!isVisible) tl.pause();

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (tlRef.current) {
      if (isVisible) {
        tlRef.current.play();
      } else {
        tlRef.current.pause();
      }
    }
  }, [isVisible]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-1/2 left-1/2 z-0 h-152 w-6xl -translate-x-1/2 translate-y-[45%]"
    >
      <div className="absolute -left-80 -top-80 overflow-hidden">
        <svg
          id="hero-svg"
          className="h-auto w-[1200px] -translate-x-72 -translate-y-20 scale-150"
          viewBox="0 0 1048 594"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="first-curve"
            className="fill-transparent stroke-transparent"
            d="M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 817.468 561.26 1046.43 565.235"
          />
          <text ref={text1Ref} x="-2000" className="text-[15px]">
            <textPath
              href="#first-curve"
              className="fill-ink font-normal opacity-40 [baseline-shift:-20%]"
            >
              {LEFT_TEXT}
            </textPath>
          </text>
        </svg>
      </div>

      <div className="absolute -right-60 -top-92 w-[780px]">
        <svg
          className="h-auto w-[1200px] scale-[1.2]"
          viewBox="0 0 1024 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="second-curve"
            className="stroke-ink stroke-[30]"
            d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216"
          />
          <text ref={text2Ref} x="-2000" className="text-[15px]">
            <textPath
              href="#second-curve"
              className="fill-paper font-semibold [baseline-shift:-30%]"
            >
              {RIGHT_TEXT}
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}

export function WisprFlowMarquee() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    ensureWaveformStyles();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "150px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      data-testid="wispr-flow-marquee-section"
      className="relative flex min-h-screen h-[100dvh] w-full max-w-full items-center justify-center overflow-x-hidden overflow-y-hidden bg-[#fdfbf9] border-t border-ink/10 select-none px-4 sm:px-6 py-8 sm:py-12"
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
        <img
          src={MOUNTAIN_IMG}
          alt="Cloud mountains background"
          loading="lazy"
          className="w-full h-full object-cover grayscale brightness-75 contrast-125 scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(253,251,249,0.85),transparent_75%)] pointer-events-none z-0" />

      <MobileSVGAnimation isVisible={isVisible} />

      <Content />

      <div className="absolute bottom-6 sm:bottom-12 md:bottom-20 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 sm:gap-3">
        <div className="relative w-[220px] sm:w-[280px] md:w-84 overflow-visible">
          <AudioStatusText isVisible={isVisible} />
          <div className="hidden sm:block">
            <SVGAnimation isVisible={isVisible} />
          </div>
          <div className="relative z-10 flex h-14 sm:h-16 md:h-20 w-full items-center overflow-hidden rounded-full border-2 border-ink bg-white/90 backdrop-blur-md shadow-xl">
            <WaveformMarquee isVisible={isVisible} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WisprFlowMarquee;


