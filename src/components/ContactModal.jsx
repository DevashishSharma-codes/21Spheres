import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { LogoMark } from "./LogoMark";

export const ContactModal = ({ isOpen, onClose, bookingDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web & Mobile Product",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop Overlay with Heavy Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-2xl z-0"
        />

        {/* Modal Stage Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full flex items-center justify-center my-auto"
        >
          {/* DESKTOP & LAPTOP SCREEN: Realistic iPhone 16 Pro Frame Container matching user screenshot */}
          <div className="hidden md:block relative w-[380px] sm:w-[410px] h-[770px] sm:h-[810px] rounded-[52px] bg-[#1a1a1e] p-[12px] shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.2)] border-4 border-[#2d2d34]">
            
            {/* iPhone Side Hardware Buttons */}
            <div className="absolute -left-[16px] top-[140px] w-[4px] h-[30px] bg-[#2d2d34] rounded-l-md" />
            <div className="absolute -left-[16px] top-[185px] w-[4px] h-[55px] bg-[#2d2d34] rounded-l-md" />
            <div className="absolute -left-[16px] top-[250px] w-[4px] h-[55px] bg-[#2d2d34] rounded-l-md" />
            <div className="absolute -right-[16px] top-[200px] w-[4px] h-[80px] bg-[#2d2d34] rounded-r-md" />

            {/* Inner Phone Display Screen */}
            <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-gradient-to-b from-[#f5d0be] via-[#e1e6f5] to-[#c7e4f5] flex flex-col select-none">
              
              {/* iPhone Status Bar Header */}
              <div className="w-full pt-3 px-7 flex items-center justify-between z-30 font-sans text-xs text-black/80 font-semibold tracking-tight">
                <span>11:44</span>
                {/* Dynamic Island Notch */}
                <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-black/80">
                  <span>5G</span>
                  <div className="w-5 h-2.5 border border-black/80 rounded-xs p-0.5 flex items-center">
                    <div className="w-full h-full bg-black/80 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Close Button Top Right */}
              <button
                onClick={onClose}
                className="absolute top-10 right-5 z-40 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-md flex items-center justify-center text-black/80 transition-colors"
              >
                <X size={16} />
              </button>

              {/* Phone Content Screen Scrollable Container */}
              <div className="flex-1 overflow-y-auto px-5 pt-7 pb-8 flex flex-col justify-center">
                
                {/* Glassmorphic Form Card floating inside Phone Screen matching reference screenshot */}
                <div className="w-full rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] text-ink">
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      {/* Top Form Header */}
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-2">
                          <LogoMark size={18} className="text-black" />
                          <span className="font-outfit text-xs font-bold tracking-tight text-black">21Spheres</span>
                        </div>
                        <span className="font-mono text-[9px] font-semibold text-black/40 uppercase tracking-widest">Inquiry</span>
                      </div>

                      <div>
                        <h3 className="font-outfit text-lg font-bold text-black tracking-tight leading-tight">
                          {bookingDetails ? "Confirm Session" : "Start a Project"}
                        </h3>
                        {bookingDetails ? (
                          <div className="mt-1 bg-black/5 border border-black/10 rounded-lg p-2 font-outfit text-[11px] text-black font-medium">
                            🗓️ {bookingDetails.date} at {bookingDetails.time}
                          </div>
                        ) : (
                          <p className="font-outfit text-[11px] text-black/60 font-light mt-0.5">
                            Let's build something exceptional together.
                          </p>
                        )}
                      </div>

                      {/* Input: Name */}
                      <div>
                        <label className="block font-outfit text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Keshav Malpani"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/70 border border-black/10 rounded-xl px-3 py-1.5 font-outfit text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-colors"
                        />
                      </div>

                      {/* Input: Email */}
                      <div>
                        <label className="block font-outfit text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="keshav@wealthwisdom.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/70 border border-black/10 rounded-xl px-3 py-1.5 font-outfit text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-colors"
                        />
                      </div>

                      {/* Input: Phone Number */}
                      <div>
                        <label className="block font-outfit text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/70 border border-black/10 rounded-xl px-3 py-1.5 font-outfit text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-colors"
                        />
                      </div>

                      {/* Selector: Service */}
                      <div>
                        <label className="block font-outfit text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                          Service Needed
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-white/70 border border-black/10 rounded-xl px-3 py-1.5 font-outfit text-xs text-black focus:outline-none focus:border-black/40 transition-colors"
                        >
                          <option>Web Platform / App</option>
                          <option>Native Mobile App (iOS/Android)</option>
                          <option>Autonomous AI Agent Engine</option>
                          <option>Full Product & Infrastructure</option>
                        </select>
                      </div>

                      {/* Input: Message */}
                      <div>
                        <label className="block font-outfit text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                          Project Brief
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Tell us about your goal or stack..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-white/70 border border-black/10 rounded-xl px-3 py-1.5 font-outfit text-xs text-black placeholder:text-black/30 focus:outline-none focus:border-black/40 transition-colors resize-none"
                        />
                      </div>

                      {/* Sleek Black Submit Button */}
                      <button
                        type="submit"
                        className="w-full mt-1.5 bg-black hover:bg-black/90 text-white font-outfit text-xs font-semibold py-2.5 px-4 rounded-full shadow-lg transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Send Proposal Request</span>
                        <ArrowRight size={14} />
                      </button>
                    </form>
                  ) : (
                    /* Success Screen */
                    <div className="py-6 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-3">
                        <Check size={24} strokeWidth={2.5} />
                      </div>
                      <h4 className="font-outfit text-base font-bold text-black mb-1">
                        Request Received!
                      </h4>
                      <p className="font-outfit text-xs text-black/65 font-light leading-relaxed mb-4">
                        Thank you, <strong className="font-semibold text-black">{formData.name}</strong>. Our lead architect will review your project brief and respond within 2 hours.
                      </p>
                      <button
                        onClick={onClose}
                        className="bg-black text-white font-outfit text-xs font-semibold py-2.5 px-6 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
                      >
                        Back to Website
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* iPhone Home Bar Indicator */}
              <div className="w-full pb-2 flex justify-center">
                <div className="w-32 h-1 bg-black/40 rounded-full" />
              </div>
            </div>
          </div>

          {/* MOBILE SCREEN (< md): Clean Glassmorphism Modal Form */}
          <div className="block md:hidden w-full max-w-md bg-white/90 backdrop-blur-2xl border border-white rounded-3xl p-6 shadow-2xl relative text-ink">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/80 transition-colors"
            >
              <X size={16} />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-0.5">
                  <LogoMark size={18} className="text-black" />
                  <span className="font-outfit text-xs font-bold tracking-tight text-black">21Spheres</span>
                </div>

                <div>
                  <h3 className="font-outfit text-lg font-bold text-black tracking-tight">
                    Start a Project
                  </h3>
                  <p className="font-outfit text-xs text-black/60 font-light">
                    Let's build something exceptional together.
                  </p>
                </div>

                <div>
                  <label className="block font-outfit text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Keshav Malpani"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/70 border border-black/10 rounded-xl px-3 py-1.5 font-outfit text-xs text-black placeholder:text-black/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-outfit text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="keshav@wealthwisdom.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/70 border border-black/10 rounded-xl px-3 py-1.5 font-outfit text-xs text-black placeholder:text-black/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-outfit text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/70 border border-black/10 rounded-xl px-3 py-1.5 font-outfit text-xs text-black placeholder:text-black/30 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-outfit text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                    Service Needed
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-white/70 border border-black/10 rounded-xl px-3 py-1.5 font-outfit text-xs text-black focus:outline-none"
                  >
                    <option>Web Platform / App</option>
                    <option>Native Mobile App (iOS/Android)</option>
                    <option>Autonomous AI Agent Engine</option>
                    <option>Full Product & Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block font-outfit text-[10px] font-bold text-black/70 uppercase tracking-wider mb-1">
                    Project Brief
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell us about your goal or stack..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/70 border border-black/10 rounded-xl px-3 py-1.5 font-outfit text-xs text-black placeholder:text-black/30 focus:outline-none resize-none"
                  />
                </div>

                {/* Sleek Black Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-1.5 bg-black hover:bg-black/90 text-white font-outfit text-xs font-semibold py-2.5 px-4 rounded-full shadow-lg transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Proposal Request</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              <div className="py-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-3">
                  <Check size={24} strokeWidth={2.5} />
                </div>
                <h4 className="font-outfit text-base font-bold text-black mb-1">
                  Request Received!
                </h4>
                <p className="font-outfit text-xs text-black/65 font-light leading-relaxed mb-4">
                  Thank you, <strong className="font-semibold text-black">{formData.name}</strong>. Our lead architect will review your project brief and respond within 2 hours.
                </p>
                <button
                  onClick={onClose}
                  className="bg-black text-white font-outfit text-xs font-semibold py-2.5 px-6 rounded-full hover:bg-black/80 transition-colors cursor-pointer"
                >
                  Back to Website
                </button>
              </div>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ContactModal;
