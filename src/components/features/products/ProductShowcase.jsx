import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "../../../data/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85";

const CLOUD_BACKDROP_IMAGE =
  "https://static.prod-images.emergentagent.com/jobs/aaff03bd-13eb-4784-a3f9-c2ad7e7acf3a/images/7c1aafe5306058007c7c92a2a22e1fb606d2e6c48cbf50c3a393af8c07c0079a.jpeg";

export function ProductShowcase() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [activeIdx, setActiveIdx] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  const activeIdxRef = useRef(0);
  const containerRef = useRef(null);
  const pinnedCanvasRef = useRef(null);
  const stRef = useRef(null);

  // Synchronize modal state with URL parameter /products/:productId
  useEffect(() => {
    if (productId) {
      const found = PRODUCTS.find((p) => p.id === productId);
      if (found) {
        setModalProduct(found);
        setIsModalOpen(true);
        const idx = PRODUCTS.findIndex((p) => p.id === productId);
        if (idx !== -1) setActiveIdx(idx);
      } else {
        setIsModalOpen(false);
        setModalProduct(null);
      }
    } else {
      setIsModalOpen(false);
      setModalProduct(null);
    }
  }, [productId]);

  const openProductModal = (prod) => {
    const target = prod || activeProduct;
    navigate(`/products/${target.id}`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  // GSAP ScrollTrigger Synchronized Pinning (Tablet & Desktop >= 640px)
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 640) return;

    const el = containerRef.current;
    const canvas = pinnedCanvasRef.current;
    if (!el || !canvas) return;

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: el,
        pin: canvas,
        start: "top top",
        end: () => `+=${window.innerHeight * 7}`,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / PRODUCTS.length,
          duration: { min: 0.2, max: 0.4 },
          ease: "power1.inOut",
        },
        onUpdate: (self) => {
          const rawIdx = Math.round(self.progress * (PRODUCTS.length - 1));
          const clampedIdx = Math.min(PRODUCTS.length - 1, Math.max(0, rawIdx));
          if (clampedIdx !== activeIdxRef.current) {
            activeIdxRef.current = clampedIdx;
            setActiveIdx(clampedIdx);
          }
        },
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const activeProduct = PRODUCTS[activeIdx] || PRODUCTS[0];

  const handleSelectProduct = (targetIdx) => {
    const clamped = Math.min(PRODUCTS.length - 1, Math.max(0, targetIdx));
    activeIdxRef.current = clamped;
    setActiveIdx(clamped);

    if (stRef.current && window.innerWidth >= 640) {
      const st = stRef.current;
      const progressRatio = (clamped + 0.5) / PRODUCTS.length;
      const targetScroll = st.start + progressRatio * (st.end - st.start);

      if (window.lenis) {
        window.lenis.scrollTo(targetScroll, { duration: 0.65 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % PRODUCTS.length;
    handleSelectProduct(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + PRODUCTS.length) % PRODUCTS.length;
    handleSelectProduct(prevIdx);
  };

  return (
    <section
      ref={containerRef}
      id="products"
      data-testid="product-showcase-section"
      className="relative z-10 w-full bg-[#fdfbf9] border-t border-ink/10 select-none m-0 p-0"
    >
      {/* MOBILE RESPONSIVE VIEW (<640px): Clean Full-Width Product Card */}
      <div className="block sm:hidden w-full min-h-[90dvh] bg-[#fdfbf9] text-ink p-4 pt-14 pb-6 flex flex-col justify-between">
        {/* Top Header Row with Counter & Prev/Next Arrows */}
        <div className="flex items-center justify-between pb-3 border-b border-ink/10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60 font-semibold">
            {String(activeIdx + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")} — Products
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Product"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Product"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Product Mobile Card: Top Image, Bottom Details */}
        <div className="my-auto py-4 flex flex-col gap-4">
          {/* Top Half: High Quality B&W Product Image */}
          <div
            onClick={() => openProductModal(activeProduct)}
            className="relative w-full h-[220px] rounded-2xl overflow-hidden bg-black shadow-xl border border-white/10 cursor-pointer group"
          >
            <motion.img
              key={activeProduct.id}
              src={activeProduct.image || FALLBACK_HERO_IMAGE}
              alt={activeProduct.name}
              initial={{ opacity: 0.6, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-cover grayscale brightness-90 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white/90 font-mono text-[9px] uppercase tracking-wider">
              <span>21SPHERES STUDIO</span>
              <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/30 text-white">
                {activeProduct.category}
              </span>
            </div>
          </div>

          {/* Bottom Half: Title, Description & Action Button */}
          <motion.div
            key={activeProduct.id + "-mobile-text"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col justify-between"
          >
            <h2 className="font-outfit text-2xl font-light tracking-tight text-ink leading-tight mb-1.5">
              {activeProduct.name}.
            </h2>
            <p className="font-outfit text-xs font-light text-ink/75 leading-relaxed mb-3 line-clamp-3">
              {activeProduct.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-ink/10">
              <span className="font-mono text-[10px] text-ink/50 uppercase">
                METRIC: <span className="text-ink font-semibold">{activeProduct.metric}</span>
              </span>
              <button
                onClick={() => openProductModal(activeProduct)}
                className="inline-flex items-center gap-1.5 bg-ink text-paper text-xs font-mono font-medium px-3.5 py-2 rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
              >
                View Product Layer ↗
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-1">
          {PRODUCTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectProduct(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === activeIdx ? "w-5 bg-ink" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* TABLET, IPAD & DESKTOP PINNED CANVAS (>=640px): Native GSAP ScrollTrigger Stage */}
      <div
        ref={pinnedCanvasRef}
        className="hidden sm:flex w-full h-screen bg-[#fdfbf9] text-ink select-none overflow-hidden flex-col justify-between m-0 p-0 rounded-none border-none shadow-none"
      >
        <div className="flex flex-col lg:grid lg:grid-cols-12 h-full w-full overflow-hidden m-0 p-0">
          {/* LEFT 50%: B&W Photographic Showcase */}
          <div
            onClick={() => openProductModal(activeProduct)}
            className="relative lg:col-span-6 h-[44vh] lg:h-full w-full overflow-hidden bg-[#0c0a08] flex flex-col justify-between p-5 sm:p-8 lg:p-12 xl:p-16 border-b lg:border-b-0 lg:border-r border-white/10 cursor-pointer group"
          >
            {/* Active Black & White Photo with instant key fade */}
            <motion.img
              key={activeProduct.id}
              src={activeProduct.image || FALLBACK_HERO_IMAGE}
              alt={activeProduct.name}
              initial={{ opacity: 0.4, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full object-cover grayscale brightness-90 contrast-125 z-0 group-hover:scale-105 transition-transform duration-700"
            />

            {/* High-Tech Pixel Map Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none z-10 opacity-75 mix-blend-overlay" />

            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none z-10" />

            {/* Top Row: Eyebrow */}
            <div className="relative z-20 flex items-center justify-between text-white/90 pt-16 sm:pt-20 lg:pt-20 xl:pt-24">
              <span className="font-outfit text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-white/80">
                21Spheres Studio / Products
              </span>
            </div>

            {/* Bottom Headline & Product Specs */}
            <div className="relative z-20 mt-auto pt-4 pb-2">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0.4, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="font-outfit text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-light tracking-tight text-white leading-tight drop-shadow-sm">
                  {activeProduct.name}.
                </h2>
                <p className="mt-2 font-outfit text-xs sm:text-sm lg:text-base font-light text-white/85 max-w-lg leading-relaxed line-clamp-3">
                  {activeProduct.description}
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-2.5 sm:gap-4 font-mono text-[10px] sm:text-xs text-white/70 pt-2.5 border-t border-white/20">
                  <span className="inline-flex items-center gap-1">
                    <span className="text-white/40">CATEGORY:</span> {activeProduct.category}
                  </span>
                  <span className="text-white/30 hidden sm:inline">•</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="text-white/40">METRIC:</span> {activeProduct.metric}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT 50%: Off-White Interactive Orbit Stage */}
          <div className="relative lg:col-span-6 h-[56vh] lg:h-full w-full bg-[#fdfbf9] p-5 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-between overflow-hidden">
            {/* Background Image Backdrop */}
            <img
              src={CLOUD_BACKDROP_IMAGE}
              alt="Black and white cloud landscape backdrop"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover grayscale opacity-30 pointer-events-none z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf9]/80 via-transparent to-[#fdfbf9]/90 pointer-events-none z-0" />

            {/* Top Row: Counter + Navigation Arrows */}
            <div className="relative z-20 flex items-center justify-between pt-16 sm:pt-20 lg:pt-20 xl:pt-24 pb-2">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-ink/60 font-semibold">
                {String(activeIdx + 1).padStart(2, "0")} / {String(PRODUCTS.length).padStart(2, "0")} — Interactive Suite
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Product"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Product"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
                >
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Center Product Stage with Circular Orbit Alignment */}
            <div className="relative z-20 my-auto w-full h-[360px] sm:h-[420px] lg:h-[460px] overflow-hidden">
              {/* Circular Orbit Arc Line */}
              <svg
                className="absolute -left-36 sm:-left-44 lg:-left-52 top-1/2 -translate-y-1/2 w-[500px] sm:w-[620px] lg:w-[680px] h-[500px] sm:h-[620px] lg:h-[680px] pointer-events-none text-ink/20 overflow-hidden z-10"
                viewBox="0 0 680 680"
                fill="none"
              >
                <circle
                  cx="340"
                  cy="340"
                  r="300"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  fill="none"
                />
              </svg>

              {/* Absolute Center Line Container */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pl-10 sm:pl-20 lg:pl-28 xl:pl-32">
                {PRODUCTS.map((product, idx) => {
                  const isActive = idx === activeIdx;
                  const offset = idx - activeIdx;
                  const dist = Math.abs(offset);

                  // Trigonometric X displacement along circular arc
                  const angle = offset * 0.32;
                  const xOrbitOffset = (Math.cos(angle) - 1) * 70;

                  // Calculate Y position relative to stage center line
                  const yPos = offset * 64; // 64px vertical slot spacing

                  // Opacity scaling based on distance from active
                  let opacity = 0;
                  if (dist === 0) opacity = 1;
                  else if (dist === 1) opacity = 0.6;
                  else if (dist === 2) opacity = 0.35;
                  else if (dist === 3) opacity = 0.15;

                  const pointerEvents = dist <= 3 ? "auto" : "none";

                  return (
                    <motion.div
                      key={product.id}
                      onClick={() => {
                        if (isActive) {
                          openProductModal(product);
                        } else {
                          handleSelectProduct(idx);
                        }
                      }}
                      animate={{
                        y: yPos,
                        x: isActive ? xOrbitOffset + 16 : xOrbitOffset,
                        scale: isActive ? 1.05 : dist === 1 ? 0.94 : 0.86,
                        opacity,
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        position: "absolute",
                        top: "50%",
                        marginTop: "-24px",
                        left: 0,
                        pointerEvents,
                      }}
                      className="group flex items-center cursor-pointer select-none py-1"
                    >
                      {/* Active Indicator Pulse Dot */}
                      {isActive && (
                        <motion.span
                          layoutId="activeDot"
                          className="absolute -left-6 sm:-left-7 h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-[#C2612B] shadow-md border-2 border-[#fdfbf9]"
                          transition={{
                            type: "spring",
                            stiffness: 450,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Product Name Only on Orbital Curve */}
                      <h3
                        className={`font-outfit transition-colors duration-300 ${
                          isActive
                            ? "text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight text-ink"
                            : "text-sm sm:text-base lg:text-xl font-normal text-ink/65 group-hover:text-ink"
                        }`}
                      >
                        {product.name}
                      </h3>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Quick Indicator Strip */}
            <div className="relative z-20 pt-2 flex items-center justify-between text-xs text-ink/50 border-t border-ink/10">
              <span className="font-mono text-[10px] sm:text-xs">
                Active: <span className="font-semibold text-ink">{activeProduct.name}</span>
              </span>
              <button
                onClick={() => openProductModal(activeProduct)}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-ink hover:text-black transition-colors cursor-pointer font-bold tracking-wider"
              >
                <span>View Product Layer ↗</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductShowcase;