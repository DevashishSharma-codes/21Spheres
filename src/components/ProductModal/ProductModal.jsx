import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { MacControls } from "./MacControls";
import { ProductContent } from "./ProductContent";
import { ProductImageGrid } from "./ProductImageGrid";

export const ProductModal = ({
  isOpen = false,
  product = null,
  onClose,
  allProducts = [],
}) => {
  const [activeProductIndex, setActiveProductIndex] = useState(0);

  useEffect(() => {
    if (product && allProducts.length > 0) {
      const idx = allProducts.findIndex((p) => p.id === product.id);
      if (idx !== -1) setActiveProductIndex(idx);
    }
  }, [product, allProducts]);

  // SCROLL LOCK CONTROL: Pause Lenis and lock body scroll strictly when modal is open
  useEffect(() => {
    if (!isOpen) {
      if (typeof window !== "undefined") {
        if (window.lenis) window.lenis.start();
        document.body.style.overflow = "auto";
        document.body.style.touchAction = "";
      }
      return;
    }

    if (typeof window !== "undefined") {
      if (window.lenis) window.lenis.stop();
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (typeof window !== "undefined") {
        if (window.lenis) window.lenis.start();
        document.body.style.overflow = "auto";
        document.body.style.touchAction = "";
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product || typeof document === "undefined") return null;

  const currentProduct =
    allProducts.length > 0 && allProducts[activeProductIndex]
      ? allProducts[activeProductIndex]
      : product;

  const totalCount = allProducts.length > 0 ? allProducts.length : 12;
  const displayIndex = activeProductIndex + 1;

  const handlePrevProduct = () => {
    if (allProducts.length === 0) return;
    setActiveProductIndex((prev) => (prev > 0 ? prev - 1 : allProducts.length - 1));
  };

  const handleNextProduct = () => {
    if (allProducts.length === 0) return;
    setActiveProductIndex((prev) => (prev < allProducts.length - 1 ? prev + 1 : 0));
  };

  const modalElement = (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-5 lg:p-8 select-none overscroll-none"
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
        onClick={onClose}
      >
        {/* TRUE macOS PRISM GLASS MODAL CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl h-[92vh] sm:h-[90vh] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden flex flex-col justify-between shadow-[0_32px_80px_rgba(0,0,0,0.75),inset_0_1px_2px_rgba(255,255,255,0.35)] touch-auto"
          style={{
            background: "rgba(20, 20, 24, 0.88)",
            backdropFilter: "blur(45px) saturate(210%)",
            WebkitBackdropFilter: "blur(45px) saturate(210%)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          {/* Header Bar: macOS Traffic Lights + Spec Title + Glass Project Controls */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-3 bg-white/[0.05] backdrop-blur-md border-b border-white/15 flex-shrink-0">
            {/* Left: macOS traffic lights */}
            <div className="flex items-center gap-3 sm:gap-4">
              <MacControls onClose={onClose} />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-white/50 font-bold hidden md:inline-block border-l border-white/15 pl-4">
                21SPHERES STUDIO // PRISM GLASS LAYER
              </span>
            </div>

            {/* Right: Glass Next/Previous Project Switcher & ESC button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-0.5 sm:gap-1 bg-white/10 backdrop-blur-md border border-white/20 px-2 sm:px-3 py-1 rounded-full shadow-sm text-white">
                <button
                  onClick={handlePrevProduct}
                  className="w-6 h-6 rounded-full hover:bg-white hover:text-black flex items-center justify-center text-white transition-colors cursor-pointer"
                  title="Previous Project"
                  aria-label="Previous project"
                >
                  <ArrowLeft size={13} />
                </button>
                <span className="font-mono text-[10px] sm:text-xs font-bold text-white px-1 sm:px-2">
                  PROJECT {String(displayIndex).padStart(2, "0")}/{String(totalCount).padStart(2, "0")}
                </span>
                <button
                  onClick={handleNextProduct}
                  className="w-6 h-6 rounded-full hover:bg-white hover:text-black flex items-center justify-center text-white transition-colors cursor-pointer"
                  title="Next Project"
                  aria-label="Next project"
                >
                  <ArrowRight size={13} />
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                title="Close (ESC)"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* RESPONSIVE SMOOTH SCROLLABLE CONTAINER */}
          <div
            className="flex-1 w-full overflow-y-auto overscroll-contain p-3 sm:p-6 flex flex-col lg:grid lg:grid-cols-[45%_55%] gap-5 sm:gap-6"
            style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
          >
            {/* EDITORIAL CONTENT PANEL */}
            <div className="w-full h-auto lg:h-full lg:overflow-y-auto pr-0 lg:pr-3">
              <ProductContent
                product={currentProduct}
                currentIndex={displayIndex}
                totalCount={totalCount}
              />
            </div>

            {/* HERO IMAGE & GALLERY PANEL */}
            <div className="h-[280px] sm:h-[380px] lg:h-full min-h-[260px] w-full flex-shrink-0">
              <ProductImageGrid product={currentProduct} />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalElement, document.body);
};

export default ProductModal;