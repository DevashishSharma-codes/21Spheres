import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Logo3DCanvas } from "./Logo3DCanvas";

const MOUNTAIN_IMG =
  "https://static.prod-images.emergentagent.com/jobs/aaff03bd-13eb-4784-a3f9-c2ad7e7acf3a/images/7c1aafe5306058007c7c92a2a22e1fb606d2e6c48cbf50c3a393af8c07c0079a.jpeg";

const PRODUCT_LINKS = [
  "Products Overview",
  "Models Overview",
  "Search & Query",
  "AI Copilots",
  "Pricing & Plans",
];

const DEV_LINKS = [
  "Sample Apps",
  "Developer Hub",
  "API Docs & SDKs",
  "System Status",
  "Enterprise Security",
];

const COMPANY_LINKS = [
  "Capabilities",
  "High Scale Platforms",
  "Native Apps",
  "About Studio",
  "Careers & Hiring",
];

const SOCIAL_LINKS = [
  { name: "Twitter / X", href: "https://x.com/21spheres" },
  { name: "LinkedIn", href: "https://linkedin.com/company/21spheres" },
  { name: "GitHub", href: "https://github.com/21spheres" },
  { name: "Discord", href: "https://discord.gg/21spheres" },
];

export const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
    }
  };

  return (
    <footer
      id="contact"
      data-testid="footer"
      className="relative z-10 w-full max-w-full bg-[#f5f7f2] pt-12 md:pt-16 pb-8 border-t border-black/10 text-ink overflow-hidden select-none"
    >
      <span id="blog" className="absolute -top-24" aria-hidden="true" />

      {/* Darker High-Contrast Black & White Mountain & Clouds Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={MOUNTAIN_IMG}
          alt="Surreal mountains and clouds background"
          className="w-full h-full object-cover grayscale brightness-65 contrast-125 opacity-60 mix-blend-multiply scale-105"
        />
        {/* Soft Lime-Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#d9f99d]/40 via-[#f5f7f2]/65 to-[#ffffff]/75" />
      </div>

      {/* Soft Aurora Radial Glow at Bottom-Left */}
      <div className="absolute -bottom-24 -left-24 w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem] bg-[#d9f99d]/60 rounded-full blur-3xl pointer-events-none z-0 opacity-80" />

      {/* Main Full-Width Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* START A PROJECT CTA Header Row */}
        <div className="pb-8 mb-8 border-b border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-ink/50 block mb-1 font-light">
              // HAVE AN IDEA?
            </span>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-contact-modal"))}
              className="group inline-flex items-center gap-2.5 sm:gap-3 text-2xl sm:text-4xl md:text-5xl font-outfit font-light uppercase text-ink tracking-tight hover:opacity-75 transition-opacity cursor-pointer text-left"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-ink" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-ink/65 font-light max-w-sm leading-relaxed">
            Architecting autonomous AI agents, high-frequency web platforms, and native mobile apps.
          </p>
        </div>

        {/* Top 4-Column Links & Newsletter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-6 md:gap-8 pb-8 md:pb-10 border-b border-black/10 text-xs sm:text-sm">
          
          {/* Column 1: Social Links */}
          <div className="space-y-4">
            <div>
              <h4 className="font-outfit font-semibold text-ink mb-3 uppercase tracking-wider text-xs">Socials</h4>
              <ul className="space-y-2 text-ink/75 font-medium">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black transition-colors flex items-center gap-1.5 group"
                    >
                      <span>{s.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-60" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Product & Developers */}
          <div className="space-y-4">
            <div>
              <h4 className="font-outfit font-semibold text-ink mb-3 uppercase tracking-wider text-xs">Product</h4>
              <ul className="space-y-2 text-ink/75 font-light">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:text-black transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-4">
            <div>
              <h4 className="font-outfit font-semibold text-ink mb-3 uppercase tracking-wider text-xs">Solutions</h4>
              <ul className="space-y-2 text-ink/75 font-light">
                {COMPANY_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:text-black transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Newsletter Signup Container */}
          <div className="space-y-3">
            <h4 className="font-outfit font-semibold text-ink uppercase tracking-wider text-xs">
              21Spheres Dispatch
            </h4>
            <p className="text-xs text-ink/70 font-light leading-relaxed">
              Subscribe to get engineering insights, AI agent specs, and product updates.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="enter email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-white/80 border border-black/15 rounded-none px-3.5 py-2 text-xs font-outfit text-black placeholder:text-black/40 focus:outline-none focus:border-black/50 shadow-2xs"
                />
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-black/85 text-white font-outfit text-xs font-semibold py-2 px-3.5 rounded-none transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe to Dispatch</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            ) : (
              <div className="bg-white/80 border border-black/15 rounded-none p-3 flex items-center gap-2 text-xs font-outfit font-medium text-emerald-700">
                <Check size={16} className="text-emerald-600 shrink-0" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Brand Section: Centered 3D Logo Canvas + 21Spheres Title Below */}
        <div className="pt-2 sm:pt-4 pb-2 flex flex-col items-center justify-center text-center -mt-2 sm:-mt-4">
          {/* Centered 3D Logo Canvas */}
          <div className="shrink-0 -mb-6 sm:-mb-8">
            <Logo3DCanvas />
          </div>

          {/* Single Font Lighter Weight Brand Title Below Logo */}
          <h2 className="w-full text-center font-outfit font-light tracking-tight leading-[0.88] select-none text-[11.5vw] sm:text-[13vw] md:text-[14.5vw] lg:text-[15.5vw] xl:text-[16vw] bg-gradient-to-b from-[#17130f] via-[#17130f]/80 to-[#17130f]/20 bg-clip-text text-transparent px-2 pb-2">
            21spheres
          </h2>
        </div>

        {/* Sub-Footer Copyright Statement */}
        <div className="mt-4 text-center font-mono text-[10px] sm:text-xs text-ink/45 font-light">
          © 2021 – {new Date().getFullYear()} 21Spheres Studio, Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
