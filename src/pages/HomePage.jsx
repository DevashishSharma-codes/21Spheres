import { Grain } from "../components/common/Grain";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/features/hero/Hero";
import { WhatWeDo } from "../components/features/what-we-do/WhatWeDo";
import { MarqueeStrip } from "../components/features/marquees/MarqueeStrip";
import { ProductShowcase } from "../components/features/products/ProductShowcase";
import { About } from "../components/features/about/About";
import { HowWeWork } from "../components/features/how-we-work/HowWeWork";
import { BookingSection } from "../components/features/booking/BookingSection";
import { FeaturedTestimonial } from "../components/features/testimonials/FeaturedTestimonial";
import { Testimonials } from "../components/features/testimonials/Testimonials";
import { WisprFlowMarquee } from "../components/features/marquees/WisprFlowMarquee";
import { Footer } from "../components/layout/Footer";

export function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans relative selection:bg-[#C2612B] selection:text-white overflow-x-hidden">
      <Grain />
      <Navbar />
      <main>
        <Hero />
        <WhatWeDo />
        <MarqueeStrip />
        <ProductShowcase />
        <About />
        <HowWeWork />
        <BookingSection />
        <FeaturedTestimonial />
        <Testimonials />
        <WisprFlowMarquee />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
