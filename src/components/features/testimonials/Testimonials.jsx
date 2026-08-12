import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe as GlobeIcon } from "lucide-react";
import testimonialsBg from "../../../assets/card-bgs/testimonials-section-bg.png";
import blueWatercolorBg from "../../../assets/card-bgs/blue-watercolor-bg.png";
import userBgPinkPurple from "../../../assets/card-bgs/user-bg-pink-purple.png";
import userBgYellowPeach from "../../../assets/card-bgs/user-bg-yellow-peach.jpg";
import userBgGreenGradient from "../../../assets/card-bgs/user-bg-green-gradient.png";
import cardBg1 from "../../../assets/card-bgs/card-bg-1.jpg";
import cardBg2 from "../../../assets/card-bgs/card-bg-2.jpg";
import cardBg3 from "../../../assets/card-bgs/card-bg-3.jpg";
import cardBg4 from "../../../assets/card-bgs/card-bg-4.jpg";
import featuredTestimonialBg from "../../../assets/card-bgs/featured-testimonial-bg.jpg";

const CARDS = [
  // Column 1 Top (99wp)
  {
    id: 1,
    company: "99wp",
    subhead: "I found myself looking at some of the messages that it's created and thinking like, wow, where did it find this? This went really deep to find information that you could never do in just a cursory search.",
    name: "Tim O Niel",
    role: "CRO  VP Sales & BizDev",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    bgImage: userBgPinkPurple,
  },
  // Column 1 Bottom (gocanvas)
  {
    id: 2,
    company: "gocanvas",
    subhead: "A prospect replied: 'I was never considering anything until you reached out with a message that literally spoke to me.' The secret sauce in 21Spheres is the messaging itself.",
    name: "Conrad de Claro",
    role: "Director of Growth Marketing @GoCanvas",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    bgImage: userBgYellowPeach,
  },
  // Column 2 Top (GROWTH PROTOCOL)
  {
    id: 3,
    company: "GROWTH PROTOCOL",
    subhead: "I'm able to come into those pipeline review meetings and show what I booked through 21Spheres. When other channels slow down, 21Spheres is always there.",
    name: "Angelene Perez-Vento",
    role: "AE @Growth Protocol",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    bgImage: userBgGreenGradient,
  },
  // Column 2 Bottom (Kaster)
  {
    id: 4,
    company: "Kaster",
    subhead: "If you have a clearly defined ICP and persona, you need to add 21Spheres to your tech stack immediately to supplement your sales pipeline.",
    name: "Elena R.",
    role: "CTO @ Kaster",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    bgImage: userBgPinkPurple,
  },
  // Column 3 Top (Brex)
  {
    id: 5,
    company: "Brex",
    subhead: "Email and LinkedIn work, but the bar for personalization has gotten higher. The new standard is being set by 21Spheres. Go see it for yourself.",
    name: "Garrett Marker",
    role: "CRO @ Brex",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    bgImage: userBgYellowPeach,
  },
  // Column 3 Bottom (Gallea Ai)
  {
    id: 6,
    company: "Gallea Ai",
    subhead: "Booking 14 meetings with qualified prospects used to take three months. 21Spheres shrank that timeline from 90 days down to 20, which is wild.",
    name: "Maya T.",
    role: "Chief Architect @ Gallea Ai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    bgImage: userBgGreenGradient,
  },
  // Column 4 Top (10X Management)
  {
    id: 7,
    company: "10X Management",
    subhead: "21Spheres gave us complete control of outreach. Most importantly, it was a third of the cost of the agency we were previously using.",
    name: "Sam Z",
    role: "Sales Lead 10X Management",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
    bgImage: userBgPinkPurple,
  },
  // Column 4 Bottom (Superposition)
  {
    id: 8,
    company: "Superposition",
    subhead: "The messages it writes are actually really high-taste. I was genuinely surprised by the personalization — it's that good.",
    name: "Edmund Cuthbert",
    role: "Founder at Superposition",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    bgImage: userBgYellowPeach,
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

const StaticValleyTestimonialCard = ({ card }) => (
  <div className="relative p-2 sm:p-2.5 bg-white/50 backdrop-blur-md border border-white/70 rounded-none shadow-none transition-transform duration-300 hover:-translate-y-1.5 group">
    {/* Inner Card Body with Lighter Pastel Background & Clear Designation Text */}
    <div className="relative w-full min-h-[340px] sm:min-h-[370px] lg:min-h-[390px] p-6 sm:p-7 text-slate-950 rounded-none flex flex-col justify-between overflow-hidden">
      {/* Soft Lighter Background Watercolor Image */}
      <img
        src={card.bgImage}
        alt={`${card.company} watercolor background`}
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Light soft white tint overlay for enhanced designation legibility */}
      <div className="absolute inset-0 bg-white/20 z-0" />

      {/* TOP BLOCK: Company Logo + Quote Text right at the top */}
      <div className="relative z-10 flex flex-col items-start gap-4">
        {/* Company Logo / Name */}
        <span className="font-outfit text-lg sm:text-xl font-bold tracking-tight text-slate-950">
          {card.company}
        </span>

        {/* Quote Text immediately at top under logo */}
        <p className="font-outfit text-sm sm:text-base font-normal text-slate-950 leading-snug tracking-tight text-left">
          {card.subhead}
        </p>
      </div>

      {/* BOTTOM BLOCK: Author Avatar + Name & Role (Clearly Visible Designation) */}
      <div className="relative z-10 flex items-center gap-3 pt-6">
        <img
          src={card.avatar}
          alt={card.name}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 border border-slate-950/20 shadow-none"
        />
        <div className="flex flex-col leading-tight">
          <span className="font-outfit text-sm sm:text-base font-bold text-slate-950">
            {card.name}
          </span>
          <span className="font-outfit text-xs font-semibold text-slate-800 mt-0.5">
            {card.role}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export const Testimonials = () => {
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [markerPositions, setMarkerPositions] = useState([]);
  const sectionRef = useRef(null);
  const ellipse1Ref = useRef(null);
  const ellipse2Ref = useRef(null);
  const ellipse3Ref = useRef(null);
  const rotationRef = useRef(0);
  const animFrameRef = useRef(null);

  useEffect(() => {
    let isVisible = false;
    const animate = () => {
      if (!isVisible) return;
      rotationRef.current = (rotationRef.current + 0.6) % 360;
      const angle = rotationRef.current;
      if (ellipse1Ref.current) {
        ellipse1Ref.current.setAttribute("rx", String(Math.abs(Math.cos((angle * Math.PI) / 180)) * 52));
      }
      if (ellipse2Ref.current) {
        ellipse2Ref.current.setAttribute("rx", String(Math.abs(Math.cos(((angle + 60) * Math.PI) / 180)) * 52));
      }
      if (ellipse3Ref.current) {
        ellipse3Ref.current.setAttribute("rx", String(Math.abs(Math.cos(((angle + 120) * Math.PI) / 180)) * 52));
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

  useEffect(() => {
    let interval = null;
    const updateMarkers = () => {
      const angle = rotationRef.current;
      const positions = GLOBE_MARKERS.map((marker) => {
        const radius = 48;
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

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setActivePhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3600);
    return () => clearInterval(phraseTimer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      data-testid="testimonials-section"
      className="relative z-10 bg-[#fdfbf9] text-ink py-4 sm:py-6 lg:py-8 min-h-screen flex flex-col justify-between select-none overflow-hidden border-t border-ink/10"
    >
      {/* Full Edge-to-Edge Watercolor Background Image */}
      <img
        src={testimonialsBg}
        alt="Watercolor section background"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 flex flex-col items-center pt-1 sm:pt-2 mb-auto">
        <div className="text-center mb-3 sm:mb-4 relative z-10">
          <h2 className="font-outfit text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-ink uppercase leading-none">
            Wall of loooooveee
          </h2>
          <p className="font-outfit text-xs sm:text-xs text-ink/70 font-light mt-1 max-w-md mx-auto">
            Automatically engage & book qualified pipeline without manual outreach.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mb-3 sm:mb-4 relative z-10">
          <div className="relative w-[170px] sm:w-[200px] lg:w-[220px] h-[100px] sm:h-[120px] lg:h-[130px] flex items-center justify-center overflow-hidden">
            <svg className="absolute w-[100px] h-[100px] sm:w-[115px] sm:h-[115px] lg:w-[125px] lg:h-[125px] pointer-events-none z-0" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="52" stroke="rgba(12, 10, 8, 0.25)" strokeWidth="1.2" fill="none" />
              <ellipse cx="80" cy="80" rx="52" ry="18" stroke="rgba(12, 10, 8, 0.15)" strokeWidth="1" fill="none" />
              <ellipse cx="80" cy="80" rx="52" ry="34" stroke="rgba(12, 10, 8, 0.15)" strokeWidth="1" fill="none" />
              <line x1="28" y1="80" x2="132" y2="80" stroke="rgba(12, 10, 8, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
              <ellipse
                ref={ellipse1Ref}
                cx="80"
                cy="80"
                rx="52"
                ry="52"
                stroke="rgba(12, 10, 8, 0.3)"
                strokeWidth="1.2"
                fill="none"
              />
              <ellipse
                ref={ellipse2Ref}
                cx="80"
                cy="80"
                rx="52"
                ry="52"
                stroke="rgba(12, 10, 8, 0.15)"
                strokeWidth="1"
                fill="none"
              />
              <ellipse
                ref={ellipse3Ref}
                cx="80"
                cy="80"
                rx="52"
                ry="52"
                stroke="rgba(12, 10, 8, 0.15)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
            <div className="relative w-[100px] h-[100px] sm:w-[115px] sm:h-[115px] lg:w-[125px] lg:h-[125px] flex items-center justify-center z-10 pointer-events-none">
              {GLOBE_MARKERS.map((marker, idx) => {
                const pos = markerPositions[idx];
                if (!pos || !pos.visible) return null;
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: `calc(50% + ${pos.x * 0.9}px - 12px)`,
                      top: `calc(50% - ${pos.y * 0.9}px - 12px)`,
                      opacity: pos.opacity,
                      transform: `scale(${pos.scale * 0.9})`,
                      zIndex: pos.zIndex,
                      transition: "left 0.1s linear, top 0.1s linear, opacity 0.1s linear, transform 0.1s linear",
                    }}
                    className="flex items-center gap-1 bg-white/85 backdrop-blur-md border border-ink/20 p-0.5 pr-2 rounded-full shadow-xs"
                  >
                    <img
                      src={marker.img}
                      alt={marker.name}
                      className="w-3.5 h-3.5 rounded-full object-cover border border-ink/40 shrink-0"
                    />
                    <span className="font-mono text-[8px] font-semibold text-ink whitespace-nowrap">
                      {marker.city}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative z-20 w-full text-center pt-1 px-2 max-w-md">
            <div className="flex items-center justify-center gap-1 mb-0.5 text-ink/60">
              <GlobeIcon className="w-3 h-3" />
              <span className="font-mono text-[8px] uppercase tracking-widest font-semibold">21SPHERES GLOBAL NETWORK</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.h3
                key={activePhraseIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className="font-outfit text-xs sm:text-sm font-light text-ink leading-tight tracking-tight uppercase"
              >
                {PHRASES[activePhraseIndex]}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-start relative z-10 pb-4">
          {/* Column 1 (Leftmost - Shifted Upwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:-mt-16">
            <StaticValleyTestimonialCard card={CARDS[0]} />
            <StaticValleyTestimonialCard card={CARDS[1]} />
          </div>
          {/* Column 2 (Center Left - Shifted Downwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:pt-8">
            <StaticValleyTestimonialCard card={CARDS[2]} />
            <StaticValleyTestimonialCard card={CARDS[3]} />
          </div>
          {/* Column 3 (Center Right - Shifted Downwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:pt-8">
            <StaticValleyTestimonialCard card={CARDS[4]} />
            <StaticValleyTestimonialCard card={CARDS[5]} />
          </div>
          {/* Column 4 (Rightmost - Shifted Upwards) */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:-mt-16">
            <StaticValleyTestimonialCard card={CARDS[6]} />
            <StaticValleyTestimonialCard card={CARDS[7]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
