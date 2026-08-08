import { motion } from "framer-motion";
import { Search, Layers, Send, Sparkles, Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import howWeWorkStack from "../assets/how-we-work/how-we-work-stack-nobg.png";
import { Navbar } from "../Navbar";
import { Footer } from "./Footer";

export const HowWeWorkPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans relative selection:bg-[#C2612B] selection:text-white overflow-x-hidden">
      {/* Navbar for How We Work Page */}
      <Navbar currentPage="how-we-work" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <main className="relative z-10 pt-28 sm:pt-36 pb-20 sm:pb-32 select-none">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 md:px-12">
          
          {/* Top CTA Button Header matching reference screenshot */}
          <div className="flex justify-end mb-8 sm:mb-12">
            <button
              onClick={() => onNavigate && onNavigate("home", "#contact")}
              className="inline-flex items-center gap-2 rounded-none border border-white/25 bg-white/5 hover:bg-white hover:text-black text-white px-5 py-2.5 font-outfit text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 shadow-sm"
            >
              <span>Launch for free</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Unified Architectural Table Grid Container matching reference screenshot */}
          <div className="w-full border border-white/15 bg-black shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/15">
              
              {/* Left Column (4 Cols on lg): 3 Stacked Table Cells */}
              <div className="lg:col-span-4 flex flex-col divide-y divide-white/15">
                
                {/* Cell 1: FIND LEADS */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[220px] sm:min-h-[240px] hover:bg-white/[0.015] transition-colors">
                  <div className="flex items-center gap-2 text-white/40 mb-3">
                    <Sparkles size={16} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-outfit text-base sm:text-lg font-bold tracking-wider text-white uppercase mb-2.5">
                    FIND LEADS
                  </h3>
                  <p className="font-outfit text-xs sm:text-sm font-light text-white/65 leading-relaxed">
                    Capture every warm lead. Automatically track profile views, post engagement, and competitor followers so you never miss a buyer showing intent.
                  </p>
                </div>

                {/* Cell 2: DEEP RESEARCH */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[220px] sm:min-h-[240px] hover:bg-white/[0.015] transition-colors">
                  <div className="flex items-center gap-2 text-white/40 mb-3">
                    <Search size={16} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-outfit text-base sm:text-lg font-bold tracking-wider text-white uppercase mb-2.5">
                    DEEP RESEARCH
                  </h3>
                  <p className="font-outfit text-xs sm:text-sm font-light text-white/65 leading-relaxed">
                    Not "Saw you live in New York." Actual deep research in seconds. Conduct deep-dives into blogs, newsletters, and 200+ data points to find the "why" behind every signal - at scale.
                  </p>
                </div>

                {/* Cell 3: LINKEDIN MESSAGING */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[220px] sm:min-h-[240px] hover:bg-white/[0.015] transition-colors">
                  <div className="flex items-center gap-2 text-white/40 mb-3">
                    <Send size={16} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-outfit text-base sm:text-lg font-bold tracking-wider text-white uppercase mb-2.5">
                    LINKEDIN MESSAGING
                  </h3>
                  <p className="font-outfit text-xs sm:text-sm font-light text-white/65 leading-relaxed">
                    Safe, native outreach. Send connection requests and open & closed InMails directly inside LinkedIn using safety rails that protect your account and your brand.
                  </p>
                </div>

              </div>

              {/* Middle Column (4 Cols on lg): Isometric Hardware Stack Cell */}
              <div className="lg:col-span-4 flex items-center justify-center p-4 sm:p-8 lg:p-10 relative bg-black min-h-[540px] lg:min-h-[760px]">
                <img
                  src={howWeWorkStack}
                  alt="5-layer isometric tech hardware architecture stack"
                  className="w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[580px] xl:max-w-[640px] h-auto object-contain z-10"
                />
              </div>

              {/* Right Column (4 Cols on lg): 3 Stacked Table Cells */}
              <div className="lg:col-span-4 flex flex-col divide-y divide-white/15">
                
                {/* Cell 1: QUALITY FOR ICP */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[220px] sm:min-h-[240px] hover:bg-white/[0.015] transition-colors">
                  <div className="flex items-center gap-2 text-white/40 mb-3">
                    <ShieldCheck size={16} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-outfit text-base sm:text-lg font-bold tracking-wider text-white uppercase mb-2.5">
                    QUALITY FOR ICP
                  </h3>
                  <p className="font-outfit text-xs sm:text-sm font-light text-white/65 leading-relaxed">
                    Focus only on ICP fit. Enrich lead data and score every lead against your exact ideal customer. The system deletes every unfit lead so you only message high-value targets.
                  </p>
                </div>

                {/* Cell 2: PERSONALIZATION */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[220px] sm:min-h-[240px] hover:bg-white/[0.015] transition-colors">
                  <div className="flex items-center gap-2 text-white/40 mb-3">
                    <Cpu size={16} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-outfit text-base sm:text-lg font-bold tracking-wider text-white uppercase mb-2.5">
                    PERSONALIZATION
                  </h3>
                  <p className="font-outfit text-xs sm:text-sm font-light text-white/65 leading-relaxed">
                    Sound human, not robotic. Clone your writing style to draft contextual openers that reference exactly what they viewed or engaged with.
                  </p>
                </div>

                {/* Cell 3: SYSTEM DEPLOYMENT Balance Cell */}
                <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center min-h-[220px] sm:min-h-[240px] hover:bg-white/[0.015] transition-colors">
                  <div className="flex items-center gap-2 text-white/40 mb-3">
                    <Layers size={16} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-outfit text-base sm:text-lg font-bold tracking-wider text-white uppercase mb-2.5">
                    SYSTEM DEPLOYMENT
                  </h3>
                  <p className="font-outfit text-xs sm:text-sm font-light text-white/65 leading-relaxed">
                    Continuous edge deployment with automated test suites, end-to-end telemetry, and 99.99% uptime monitoring.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer for How We Work Page */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default HowWeWorkPage;
