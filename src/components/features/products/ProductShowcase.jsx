import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Grid,
  X,
  Search,
  Layers,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { PRODUCTS } from "../../../data/products";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FALLBACK_HERO_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85";

// 5 Curated products for landing showcase scroll section:
// 1 from Bimakart (bimakart-connect), Wealth Wisdom, The Repertory, and 2 short-named products (Futureogy & HahnnemenAI)
const SHOWCASE_IDS = [
  "bimakart-connect",
  "wealth-wisdom",
  "the-repertory",
  "futureogy",
  "hahnnemen-ai",
];

const SHOWCASED_PRODUCTS = SHOWCASE_IDS.map((id) =>
  PRODUCTS.find((p) => p.id === id)
).filter(Boolean);

export function ProductShowcase() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [activeIdx, setActiveIdx] = useState(0);
  const [showAllModal, setShowAllModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const containerRef = useRef(null);
  const pinnedCanvasRef = useRef(null);
  const stRef = useRef(null);
  const activeIdxRef = useRef(0);
  const lenisRef = useRef(null);
  const lenisTickerFn = useRef(null);

  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const lineRefs = useRef([]);

  const categories = useMemo(() => {
    const set = new Set(PRODUCTS.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const startLenis = () => {
    if (typeof window === "undefined" || lenisRef.current || window.__isProgrammaticScroll) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    lenisTickerFn.current = tick;
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  };

  const stopLenis = () => {
    if (lenisTickerFn.current) {
      gsap.ticker.remove(lenisTickerFn.current);
      lenisTickerFn.current = null;
    }
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis = null;
    }
  };

  // Synchronize modal state with URL parameter /products/:productId
  useEffect(() => {
    if (productId) {
      const idx = SHOWCASED_PRODUCTS.findIndex((p) => p.id === productId);
      if (idx !== -1) {
        setActiveIdx(idx);
        activeIdxRef.current = idx;
      }
    }
  }, [productId]);

  const openProductModal = (prod) => {
    const target = prod || SHOWCASED_PRODUCTS[activeIdx] || SHOWCASED_PRODUCTS[0];
    setShowAllModal(false);
    navigate(`/products/${target.id}`);
  };

  // Auto-scroll the right product list so the active item is ALWAYS centered in view
  useEffect(() => {
    if (!listRef.current || !itemRefs.current[activeIdx]) return;

    const container = listRef.current;
    const activeItem = itemRefs.current[activeIdx];

    if (container && activeItem) {
      const containerHeight = container.clientHeight;
      const itemOffsetTop = activeItem.offsetTop;
      const itemHeight = activeItem.clientHeight;

      const targetScrollTop = itemOffsetTop - containerHeight / 2 + itemHeight / 2;

      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: "smooth",
      });
    }
  }, [activeIdx]);

  // GSAP ScrollTrigger Synchronized Pinning across 5 featured products
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
        end: () => `+=${window.innerHeight * (SHOWCASED_PRODUCTS.length * 1.0)}`,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onEnter: startLenis,
        onLeave: stopLenis,
        onEnterBack: startLenis,
        onLeaveBack: stopLenis,
        onUpdate: (self) => {
          const totalProducts = SHOWCASED_PRODUCTS.length;
          const raw = self.progress * totalProducts;
          const clampedIdx = Math.min(totalProducts - 1, Math.max(0, Math.floor(raw)));
          const itemProgress = Math.min(1, Math.max(0, raw - clampedIdx));

          if (clampedIdx !== activeIdxRef.current) {
            activeIdxRef.current = clampedIdx;
            setActiveIdx(clampedIdx);
          }

          // Direct DOM mutation for smooth line fill across all items
          lineRefs.current.forEach((lineEl, idx) => {
            if (!lineEl) return;
            if (idx < clampedIdx) {
              lineEl.style.width = "100%";
            } else if (idx === clampedIdx) {
              const widthPct = Math.max(15, Math.min(100, (itemProgress + 0.15) * 100));
              lineEl.style.width = `${widthPct}%`;
            } else {
              lineEl.style.width = "0%";
            }
          });
        },
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      stopLenis();
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const activeProduct = SHOWCASED_PRODUCTS[activeIdx] || SHOWCASED_PRODUCTS[0];

  const handleSelectProduct = (targetIdx) => {
    const clamped = Math.min(SHOWCASED_PRODUCTS.length - 1, Math.max(0, targetIdx));
    activeIdxRef.current = clamped;
    setActiveIdx(clamped);

    if (stRef.current && window.innerWidth >= 640) {
      const st = stRef.current;
      const progressRatio = (clamped + 0.1) / SHOWCASED_PRODUCTS.length;
      const targetScroll = st.start + progressRatio * (st.end - st.start);

      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetScroll, { duration: 0.65 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  };

  const handleNext = () => {
    const nextIdx = (activeIdx + 1) % SHOWCASED_PRODUCTS.length;
    handleSelectProduct(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIdx - 1 + SHOWCASED_PRODUCTS.length) % SHOWCASED_PRODUCTS.length;
    handleSelectProduct(prevIdx);
  };

  // Lock body & Lenis scrolling when All Products modal is open so background page never scrolls
  useEffect(() => {
    if (showAllModal) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && window.lenis) {
        window.lenis.start();
      }
    };
  }, [showAllModal]);

  return (
    <section
      ref={containerRef}
      id="products"
      data-testid="product-showcase-section"
      className="relative z-10 w-full bg-[#fdfbf9] border-t border-ink/10 select-none m-0 p-0"
    >
      {/* MOBILE RESPONSIVE VIEW (<640px): Clean Monochromatic Card */}
      <div className="block sm:hidden w-full min-h-[90dvh] bg-[#fdfbf9] text-ink p-4 pt-14 pb-6 flex flex-col justify-between">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-ink/10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink/60 font-semibold">
            0{activeIdx + 1} / 0{SHOWCASED_PRODUCTS.length} — FEATURED
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAllModal(true)}
              className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold bg-ink/5 hover:bg-ink hover:text-white px-2.5 py-1 rounded-full border border-ink/10 transition-all cursor-pointer"
            >
              <Grid size={12} />
              <span>Show All (12)</span>
            </button>
            <button
              onClick={handlePrev}
              aria-label="Previous Product"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Product"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Product Image & Details */}
        <div className="my-auto py-4 flex flex-col gap-4">
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
              <span>{activeProduct.category}</span>
            </div>
          </div>

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
              {activeProduct.subhead || activeProduct.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-ink/10">
              <span className="font-mono text-[10px] text-ink/50 uppercase">
                0{activeIdx + 1} / {activeProduct.category}
              </span>
              <button
                onClick={() => openProductModal(activeProduct)}
                className="inline-flex items-center gap-1.5 bg-ink text-paper text-xs font-mono font-medium px-3.5 py-2 rounded-full shadow-md active:scale-95 transition-all cursor-pointer"
              >
                View Layer ↗
              </button>
            </div>
          </motion.div>
        </div>

        {/* Carousel Indicator Dots & Show More Modal Trigger */}
        <div className="flex flex-col items-center gap-3 pt-1">
          <div className="flex items-center justify-center gap-1.5">
            {SHOWCASED_PRODUCTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectProduct(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeIdx
                    ? "w-6 bg-gradient-to-r from-[#e58b82] via-[#ff922b] via-[#74c0fc] to-[#d8f28c]"
                    : "w-1.5 bg-ink/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setShowAllModal(true)}
            className="w-full py-2.5 rounded-xl border border-ink/15 bg-white text-ink text-xs font-outfit font-medium flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all cursor-pointer"
          >
            <Grid size={14} />
            <span>Explore All Products</span>
          </button>
        </div>
      </div>

      {/* TABLET & DESKTOP STICKY STAGE (>=640px): PICTURE ON LEFT | PRODUCTS MENU ON RIGHT */}
      <div
        ref={pinnedCanvasRef}
        className="hidden sm:flex w-full h-screen bg-[#fdfbf9] text-ink select-none overflow-hidden flex-col justify-between m-0 p-0 rounded-none border-none shadow-none"
      >
        <div className="grid grid-cols-12 h-full w-full overflow-hidden m-0 p-0">
          
          {/* LEFT COLUMN (lg:col-span-7 / 58%): FULL-HEIGHT B&W PRODUCT IMAGE SHOWCASE */}
          <div className="lg:col-span-7 h-full w-full bg-[#0c0a08] p-6 sm:p-8 lg:p-10 xl:p-14 flex flex-col justify-between overflow-hidden relative border-r border-white/10">
            
            {/* Background B&W Image with Fast Snappy Switch */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0.7, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.7, scale: 0.99 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute inset-0 z-0 overflow-hidden"
              >
                <img
                  src={activeProduct.image || FALLBACK_HERO_IMAGE}
                  alt={activeProduct.name}
                  className="h-full w-full object-cover grayscale brightness-90 contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/50 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none z-10 opacity-60 mix-blend-overlay" />
              </motion.div>
            </AnimatePresence>

            {/* Top Eyebrow Row */}
            <div className="relative z-20 flex items-center justify-between text-white/90 pt-10 sm:pt-12">
              <span className="font-mono text-xs uppercase tracking-widest text-white/70">
                21SPHERES STUDIO / PRODUCTS
              </span>

              <span className="font-mono text-xs text-white/70 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                0{activeIdx + 1} / 0{SHOWCASED_PRODUCTS.length} FEATURED
              </span>
            </div>

            {/* Bottom Info Block */}
            <div className="relative z-20 mt-auto pt-6">
              <motion.div
                key={activeProduct.id + "-card-info"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <h2 className="font-outfit text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white leading-tight tracking-tight mb-2 drop-shadow-md">
                  {activeProduct.headline || activeProduct.name}
                </h2>

                <p className="font-outfit text-xs sm:text-sm lg:text-base font-light text-white/85 max-w-xl leading-relaxed mb-6">
                  {activeProduct.description}
                </p>

                <div className="flex items-center gap-4 border-t border-white/20 pt-4">
                  {/* Glassmorphic Style Action Button */}
                  <button
                    onClick={() => openProductModal(activeProduct)}
                    className="group relative inline-flex items-center gap-2.5 rounded-full px-6 py-2.5 sm:py-3 font-outfit text-xs sm:text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:scale-105 shadow-[0_8px_32px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden border border-white/40 bg-white/10 backdrop-blur-xl hover:bg-white/25 hover:border-white/70 active:scale-95"
                    style={{
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      backdropFilter: "blur(20px) saturate(180%)",
                    }}
                  >
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none z-0" />
                    
                    <span className="relative z-10 text-white font-semibold">View Product Layer</span>
                    <ArrowRight size={16} className="relative z-10 text-white group-hover:translate-x-1 transition-transform" />
                  </button>

                  <span className="font-mono text-[10px] sm:text-xs text-white/60">
                    Press to open interactive product page
                  </span>
                </div>
              </motion.div>
            </div>

          </div>

          {/* RIGHT COLUMN (lg:col-span-5 / 42%): FEATURED PRODUCTS MENU */}
          <div className="lg:col-span-5 h-full w-full bg-[#fdfbf9] p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between overflow-hidden">
            
            {/* Top Eyebrow Header with Show More Modal Button */}
            <div className="flex items-center justify-between pb-3 border-b border-ink/10 shrink-0">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-ink/60">
                [ 21SPHERES_SUITE ]
              </span>

              <button
                onClick={() => setShowAllModal(true)}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] sm:text-xs text-ink/70 hover:text-ink bg-ink/5 hover:bg-ink/10 px-3 py-1 rounded-full border border-ink/15 transition-all cursor-pointer font-medium"
              >
                <Grid size={13} />
                <span>Show All 12 Products</span>
              </button>
            </div>

            {/* Product List Menu with Smooth Vertical Auto-Centering */}
            <div
              ref={listRef}
              className="my-auto py-4 flex flex-col gap-1.5 h-[calc(100vh-170px)] overflow-y-auto custom-scrollbar pr-2 scroll-smooth"
            >
              {SHOWCASED_PRODUCTS.map((prod, idx) => {
                const isActive = idx === activeIdx;

                return (
                  <div
                    key={prod.id}
                    ref={(el) => (itemRefs.current[idx] = el)}
                    onClick={() => handleSelectProduct(idx)}
                    className={`group relative cursor-pointer py-3 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    {/* Meta Index & Category */}
                    <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-ink/50 mb-0.5">
                      <span>0{idx + 1} / {prod.category}</span>
                    </div>

                    {/* Product Name Title */}
                    <h3
                      className={`font-outfit transition-colors duration-300 ${
                        isActive
                          ? "text-lg sm:text-xl lg:text-2xl font-normal text-ink tracking-tight"
                          : "text-sm sm:text-base lg:text-lg font-light text-ink/60"
                      }`}
                    >
                      {prod.name}
                    </h3>

                    {/* Expanded Description Paragraph */}
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="font-outfit text-xs font-light text-ink/80 leading-relaxed pt-1.5 pb-1">
                            {prod.subhead || prod.description}
                          </p>

                          <div className="flex items-center justify-end pt-1 text-[10px] font-mono text-ink/60">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openProductModal(prod);
                              }}
                              className="text-ink font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>View Details ↗</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Progress Line */}
                    <div className="relative mt-2.5 h-[2.5px] w-full overflow-hidden rounded-full gpu-layer">
                      {isActive ? (
                        <div
                          ref={(el) => (lineRefs.current[idx] = el)}
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#e58b82] via-[#ff922b] via-[#74c0fc] to-[#d8f28c] rounded-full transition-all duration-200 ease-out will-change-[width]"
                          style={{ width: "35%" }}
                        />
                      ) : (
                        <div className="h-[1px] w-full bg-ink/10" />
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Bottom Show More Banner inside Menu List */}
              <div className="pt-4 border-t border-ink/10 mt-2">
                <button
                  onClick={() => setShowAllModal(true)}
                  className="w-full p-3 rounded-xl border border-dashed border-ink/20 hover:border-ink/50 bg-ink/[0.02] hover:bg-ink/[0.05] transition-all flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-ink text-paper flex items-center justify-center">
                      <Grid size={14} />
                    </div>
                    <span className="font-outfit text-xs font-medium text-ink">
                      Explore All Products
                    </span>
                  </div>
                  <ArrowRight size={15} className="text-ink/60 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Bottom Navigation Buttons */}
            <div className="pt-3 border-t border-ink/10 flex items-center justify-between text-xs text-ink/60 font-mono shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Product"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Product"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-paper transition-all border border-ink/10 cursor-pointer active:scale-95 shadow-xs"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <button
                onClick={() => openProductModal(activeProduct)}
                className="inline-flex items-center gap-1 text-ink font-semibold text-xs hover:underline cursor-pointer"
              >
                <span>View Full Specs</span>
                <ExternalLink size={13} />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* ---------------------------------------------------------
          ALL 12 PRODUCTS MODAL WITH VERTICAL SCROLL & BODY SCROLL LOCK
      --------------------------------------------------------- */}
      {showAllModal && typeof document !== "undefined" && createPortal(
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto custom-scrollbar overscroll-contain"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl h-[85vh] max-h-[85vh] bg-[#09090b] text-white rounded-3xl sm:rounded-[2.5rem] shadow-2xl border border-white/15 flex flex-col overflow-hidden my-auto"
          >
            {/* Modal Header (Clean Search Bar, No Horizontal Tags Scroll) */}
            <div className="p-5 sm:p-7 border-b border-white/10 flex flex-col gap-3 bg-[#09090b] shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/60 font-semibold mb-1">
                    <span>21SPHERES ECOSYSTEM</span>
                    <span className="text-white/30">•</span>
                    <span>12 Products</span>
                  </div>
                  <h2 className="font-outfit text-2xl sm:text-3xl font-light text-white tracking-tight">
                    Explore All Engineering Products
                  </h2>
                </div>

                <button
                  onClick={() => setShowAllModal(false)}
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/15"
                  aria-label="Close All Products Modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Clean Full-Width Search Bar */}
              <div className="relative w-full pt-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search products, capabilities, or tech stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-full pl-10 pr-10 py-2.5 text-xs sm:text-sm font-outfit text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-mono"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body Grid (Restored Vertical Smooth Scroll for All 12 Products) */}
            <div
              data-lenis-prevent
              className="p-5 sm:p-7 bg-[#09090b] flex-1 min-h-0 overflow-y-auto custom-scrollbar overscroll-contain"
            >
              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center">
                  <Layers size={36} className="mx-auto text-white/30 mb-3" />
                  <h3 className="font-outfit text-lg font-medium text-white mb-1">No products found</h3>
                  <p className="font-outfit text-xs text-white/60">
                    Try searching with another keyword.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {filteredProducts.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => openProductModal(prod)}
                      className="group relative rounded-2xl bg-[#121214] border border-white/15 shadow-md hover:shadow-2xl hover:border-white/40 hover:bg-[#18181b] transition-all p-4 sm:p-5 flex flex-col justify-between overflow-hidden cursor-pointer"
                    >
                      {/* Image Header Preview */}
                      <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3 bg-black border border-white/10">
                        <img
                          src={prod.image || FALLBACK_HERO_IMAGE}
                          alt={prod.name}
                          className="w-full h-full object-cover grayscale brightness-90 contrast-125 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                        <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md text-white font-mono text-[9px] px-2 py-0.5 rounded-full border border-white/20">
                          v{prod.version}
                        </div>
                        <div className="absolute bottom-2.5 left-2.5 text-white/90 font-mono text-[9px] uppercase tracking-wider">
                          {prod.category}
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-outfit text-lg sm:text-xl font-medium text-white tracking-tight mb-1 group-hover:text-white transition-colors">
                            {prod.name}
                          </h3>
                          <p className="font-outfit text-xs font-light text-white/70 leading-relaxed line-clamp-3 mb-3">
                            {prod.subhead || prod.description}
                          </p>
                        </div>

                        {/* Metric Badge */}
                        {prod.metric && (
                          <div className="mb-3 font-mono text-[10px] text-white/80 bg-white/10 px-2.5 py-1 rounded-md inline-block self-start font-medium border border-white/15">
                            ⚡ {prod.metric}
                          </div>
                        )}

                        {/* Card Footer CTA */}
                        <div className="pt-2.5 border-t border-white/10 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-white/60">
                          <span>EXPLORE LAYER</span>
                          <span className="text-white font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                            View ↗
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-white/10 bg-[#09090b] flex items-center justify-between text-xs text-white/70 font-mono shrink-0">
              <span className="text-white/60">
                Showing {filteredProducts.length} of 12 Products
              </span>

              <button
                onClick={() => setShowAllModal(false)}
                className="font-outfit font-medium text-white hover:underline cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </motion.div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default ProductShowcase;