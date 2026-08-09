import { useEffect } from "react";
import { Navbar } from "../../layout/Navbar";
import { Footer } from "../../layout/Footer";
import { About } from "../about/About";
import { HowWeWork } from "./HowWeWork";

export const HowWeWorkPage = () => {
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans relative selection:bg-white selection:text-black overflow-x-hidden">
      {/* Navbar for How We Work Page */}
      <Navbar isDarkPage={true} />

      {/* Main Content Area: Manifesto Section + How We Work (Powered by 21Spheres' Engineering Engine) */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-16 select-none">
        
        {/* 1. MANIFESTO (ABOUT) SECTION WITH 3-CARD FAN POPOVER */}
        <section id="about" className="mb-12 sm:mb-16">
          <About />
        </section>

        {/* 2. POWERED BY 21SPHERES' ENGINEERING ENGINE SECTION & GRID */}
        <section id="how-we-work">
          <HowWeWork />
        </section>
      </main>

      {/* Footer for How We Work Page */}
      <Footer />
    </div>
  );
};

export default HowWeWorkPage;
