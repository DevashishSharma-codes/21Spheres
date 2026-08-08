import { motion } from "framer-motion";
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

const LEGAL_LINKS = [
  "Terms of Use",
  "Privacy Policy",
  "Trust Center",
  "Acceptable Use",
  "Patents & IP",
];

const SOCIAL_LINKS = ["LinkedIn", "Twitter / X", "GitHub", "Dribbble"];

export const Footer = () => {
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
        {/* Compact START A PROJECT CTA Header Row with Lighter Weight Title */}
        <div className="pb-8 mb-8 border-b border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-ink/50 block mb-1 font-light">
              // HAVE AN IDEA?
            </span>
            <a
              href="mailto:contact@21spheres.com"
              className="group inline-flex items-center gap-2.5 sm:gap-3 text-2xl sm:text-4xl md:text-5xl font-outfit font-light uppercase text-ink tracking-tight hover:opacity-75 transition-opacity"
            >
              <span>START A PROJECT</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-xl sm:text-3xl font-light">
                ↗
              </span>
            </a>
          </div>
          <p className="text-xs sm:text-sm text-ink/65 font-light max-w-sm leading-relaxed">
            Architecting autonomous AI agents, high-frequency web platforms, and native mobile apps.
          </p>
        </div>

        {/* Top 4-Column Links Grid with Lighter Weight Headers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pb-6 md:pb-8 border-b border-black/10 text-xs sm:text-sm">
          {/* Column 1: Product & Social */}
          <div className="space-y-4">
            <div>
              <h4 className="font-outfit font-light text-ink mb-2">Product</h4>
              <ul className="space-y-1.5 text-ink/65 font-light">
                {PRODUCT_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:text-ink transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-1">
              <h4 className="font-outfit font-light text-ink mb-2">Social</h4>
              <ul className="space-y-1.5 text-ink/65 font-light">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s}>
                    <a href="#top" className="hover:text-ink transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: For Developers */}
          <div className="space-y-4">
            <div>
              <h4 className="font-outfit font-light text-ink mb-2">For Developers</h4>
              <ul className="space-y-1.5 text-ink/65 font-light">
                {DEV_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:text-ink transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Solutions & Company */}
          <div className="space-y-4">
            <div>
              <h4 className="font-outfit font-light text-ink mb-2">Solutions</h4>
              <ul className="space-y-1.5 text-ink/65 font-light">
                {COMPANY_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:text-ink transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Legal & Security Seal */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="font-outfit font-light text-ink mb-2">Legal</h4>
              <ul className="space-y-1.5 text-ink/65 font-light">
                {LEGAL_LINKS.map((link) => (
                  <li key={link}>
                    <a href="#top" className="hover:text-ink transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* AICPA SOC Certified Security Seal */}
            <div className="pt-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/20 bg-black/5 font-mono text-[9px] font-medium uppercase text-ink/70 text-center shadow-xs backdrop-blur-xs">
                AICPA SOC
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Brand Section: Centered 3D Logo Canvas + Lighter Weight 21Spheres Title Below */}
        <div className="pt-2 sm:pt-4 pb-2 flex flex-col items-center justify-center text-center -mt-2 sm:-mt-4">
          {/* Centered 3D Logo Canvas */}
          <div className="shrink-0 -mb-6 sm:-mb-8">
            <Logo3DCanvas />
          </div>

          {/* Single Font Lighter Weight Brand Title Below Logo - Responsive Sizing to Prevent Clipping */}
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
