import { motion } from "framer-motion";

const SERVICES = [
  {
    num: "01",
    title: "Web Platforms",
    desc: "Scalable, blazing-fast web applications and marketing sites built on modern stacks.",
    tags: ["React", "Next.js", "Node"],
  },
  {
    num: "02",
    title: "Mobile Apps",
    desc: "Native-grade iOS and Android experiences that feel effortless and ship on time.",
    tags: ["React Native", "Swift", "Kotlin"],
  },
  {
    num: "03",
    title: "AI Products",
    desc: "LLM-powered features, agents, and pipelines woven into products people trust.",
    tags: ["LLMs", "RAG", "Agents"],
  },
  {
    num: "04",
    title: "Design & Systems",
    desc: "Design systems and cloud infrastructure that keep teams fast as they grow.",
    tags: ["Design Systems", "Cloud", "DevOps"],
  },
];

export const WhatWeDo = () => {
  return (
    <section
      id="what-we-do"
      data-testid="what-we-do-section"
      className="relative z-10 bg-paper py-24 md:py-36 border-t border-ink/10 select-none"
    >
      <span id="services" className="absolute -top-24" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header — Smooth Fluid Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-12 border-b border-ink/10 transform-gpu"
        >
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-ink/40 mb-6">
              / WHAT WE DO
            </p>
            <h2 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-ink leading-[1.02]">
              A full-stack studio for ambitious products
            </h2>
          </div>
          <p className="text-ink/50 text-sm md:text-base font-light max-w-xs md:text-right leading-relaxed pb-1">
            From first sketch to production scale, we own the craft end-to-end.
          </p>
        </motion.div>

        {/* Rows — Buttery Smooth Staggered Motion */}
        <div className="divide-y divide-ink/10">
          {SERVICES.map((s, idx) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              data-testid={`what-we-do-row-${s.num}`}
              className="group py-8 md:py-12 grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-6 transition-colors duration-500 hover:bg-black/[0.015] px-3 sm:px-4 -mx-3 sm:-mx-4 rounded-2xl transform-gpu"
            >
              {/* Number */}
              <div className="md:col-span-1 text-sm font-outfit text-ink/30 font-medium">
                {s.num}
              </div>

              {/* Title */}
              <div className="md:col-span-3 lg:col-span-3">
                <h3 className="font-outfit text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-2">
                  {s.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-4 lg:col-span-4">
                <p className="text-xs sm:text-sm md:text-base font-light text-ink/60 leading-relaxed max-w-md">
                  {s.desc}
                </p>
              </div>

              {/* Tags — Guaranteed 1 Line on all laptops, desktop monitors, and screens */}
              <div className="md:col-span-4 lg:col-span-4 flex flex-nowrap items-center md:justify-end gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-outfit text-[11px] sm:text-xs font-normal text-ink/65 border border-ink/15 rounded-full px-3 sm:px-3.5 py-1 sm:py-1.5 backdrop-blur-sm transition-colors duration-300 group-hover:border-ink/30 group-hover:bg-white shrink-0 whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
