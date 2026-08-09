import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Logo3DCanvas } from "./Logo3DCanvas";

const MOUNTAIN_IMG =
  "https://static.prod-images.emergentagent.com/jobs/aaff03bd-13eb-4784-a3f9-c2ad7e7acf3a/images/7c1aafe5306058007c7c92a2a22e1fb606d2e6c48cbf50c3a393af8c07c0079a.jpeg";

const PRODUCT_LINKS = [
  { name: "Bimakart Connect", id: "bimakart-connect" },
  { name: "Bimakart Center", id: "bimakart-center" },
  { name: "Bimakart Suite", id: "bimakart-suite" },
  { name: "Policy OCR & Fraud AI", id: "policy-ocr-fraud" },
  { name: "Quotation Bot", id: "quotation-bot" },
  { name: "Enspire ChatBot", id: "enspire-whatsapp-bot" },
  { name: "Kashiv AI RAG", id: "kashiv-rag" },
  { name: "Wealth Wisdom AI", id: "wealthwisdom-ai" },
];

const COMPANY_LINKS = [
  { name: "Capabilities", to: "/#what-we-do" },
  { name: "How We Work", to: "/how-we-work" },
  { name: "High Scale Platforms", to: "/#products" },
  { name: "About Studio", to: "/#about" },
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
  const navigate = useNavigate();
  const location = useLocation();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
    }
  };

  const handleLinkClick = (to) => {
    if (to.startsWith("/#")) {
      const hash = to.replace("/", "");
      navigate("/" + hash);
    } else {
      navigate(to);
    }
  };

  return (
    <footer
      id="contact"
      data-testid="footer"
      className="relative z-10 w-full max-w-full bg-[#0d110c] text-white pt-10 sm:pt-12 md:pt-16 pb-8 border-t border-white/15 overflow-hidden select-none"
    >
      <span id="blog" className="absolute -top-24" aria-hidden="true" />

      {/* Surreal Mountain & Clouds Background Image (Visible & Rich Texture) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={MOUNTAIN_IMG}
          alt="Surreal mountains and clouds background"
          className="w-full h-full object-cover grayscale brightness-105 contrast-125 opacity-45 mix-blend-overlay scale-105"
        />
        {/* Soft Lime-Green Gradient Overlay for Vibrant Green Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#84cc16]/25 via-[#0d110c]/70 to-[#162013]/85" />
      </div>

      {/* Vibrant Lime Aurora Radial Glow at Bottom-Left */}
      <div className="absolute -bottom-20 -left-20 w-[26rem] sm:w-[38rem] h-[26rem] sm:h-[38rem] bg-[#bef264]/40 rounded-full blur-[100px] pointer-events-none z-0 opacity-90 animate-pulse" />

      {/* Vibrant Soft Green Top-Right Ambient Glow */}
      <div className="absolute -top-20 -right-20 w-[24rem] sm:w-[32rem] h-[24rem] sm:h-[32rem] bg-[#a3e635]/20 rounded-full blur-[90px] pointer-events-none z-0 opacity-75" />

      {/* Main Full-Width Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* START A PROJECT CTA Header Row */}
        <div className="pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/50 block mb-1 font-light">
              // HAVE AN IDEA?
            </span>
            <button
              onClick={() => navigate("/contact", { state: { backgroundLocation: location } })}
              className="group inline-flex items-center gap-2 sm:gap-3 text-2xl min-[380px]:text-3xl sm:text-4xl md:text-5xl font-outfit font-light uppercase text-white tracking-tight hover:text-[#d9f99d] transition-colors cursor-pointer text-left flex-wrap"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-5 h-5 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-white group-hover:text-[#d9f99d] shrink-0" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-white/70 font-light max-w-sm leading-relaxed">
            Architecting autonomous AI agents, high-frequency web platforms, and native mobile apps.
          </p>
        </div>

        {/* Top Responsive Grid: 1 col on ultra-small, 2 cols on mobile (380px+), 4 cols on desktop */}
        <div className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-6 md:gap-8 pb-8 md:pb-10 border-b border-white/15 text-xs sm:text-sm">
          
          {/* Column 1: Social Links */}
          <div className="space-y-3">
            <h4 className="font-outfit font-semibold text-white uppercase tracking-wider text-xs">Socials</h4>
            <ul className="space-y-2 text-white/80 font-medium">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#d9f99d] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Product & Developers */}
          <div className="space-y-3">
            <h4 className="font-outfit font-semibold text-white uppercase tracking-wider text-xs">Products</h4>
            <ul className="space-y-1.5 text-white/75 font-light">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigate(`/products/${item.id}`)}
                    className="hover:text-[#d9f99d] transition-colors text-left cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-3">
            <h4 className="font-outfit font-semibold text-white uppercase tracking-wider text-xs">Solutions</h4>
            <ul className="space-y-2 text-white/75 font-light">
              {COMPANY_LINKS.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.to)}
                    className="hover:text-[#d9f99d] transition-colors text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Signup Container */}
          <div className="col-span-1 min-[380px]:col-span-2 md:col-span-1 space-y-3 pt-2 md:pt-0">
            <h4 className="font-outfit font-semibold text-white uppercase tracking-wider text-xs">
              21Spheres Dispatch
            </h4>
            <p className="text-xs text-white/70 font-light leading-relaxed">
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
                  className="w-full bg-white/10 border border-white/20 rounded-none px-3.5 py-2 text-xs font-outfit text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 shadow-2xs"
                />
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-white/90 text-black font-outfit text-xs font-semibold py-2 px-3.5 rounded-none transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Subscribe to Dispatch</span>
                  <ArrowRight size={13} />
                </button>
              </form>
            ) : (
              <div className="bg-white/10 border border-white/20 rounded-none p-3 flex items-center gap-2 text-xs font-outfit font-medium text-[#d9f99d]">
                <Check size={16} className="text-[#d9f99d] shrink-0" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* FULL-WIDTH Bottom Brand Section: Centered 3D Logo Canvas + 21Spheres Title */}
      <div className="relative z-10 w-full max-w-full overflow-hidden pt-2 sm:pt-4 pb-2 flex flex-col items-center justify-center text-center -mt-2 sm:-mt-4 px-2 sm:px-4">
        {/* Centered 3D Logo Canvas */}
        <div className="shrink-0 -mb-6 sm:-mb-8">
          <Logo3DCanvas />
        </div>

        {/* Single Font Lighter Weight Brand Title Below Logo - Full Width Scaling */}
        <div className="w-full max-w-full overflow-hidden flex items-center justify-center">
          <h2 className="w-full text-center font-outfit font-light tracking-tighter leading-[0.88] select-none text-[11vw] min-[380px]:text-[12vw] sm:text-[13vw] bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent pb-2 whitespace-nowrap">
            21spheres
          </h2>
        </div>

        {/* Sub-Footer Copyright Statement */}
        <div className="mt-4 text-center font-mono text-[10px] sm:text-xs text-white/50 font-light">
          © 2021 – {new Date().getFullYear()} 21Spheres Studio, Inc. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
