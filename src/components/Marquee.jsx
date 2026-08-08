import { motion } from "framer-motion";

const MOUNTAIN_IMG =
  "https://static.prod-images.emergentagent.com/jobs/aaff03bd-13eb-4784-a3f9-c2ad7e7acf3a/images/7c1aafe5306058007c7c92a2a22e1fb606d2e6c48cbf50c3a393af8c07c0079a.jpeg";

const ITEMS = [
  "Web Platforms",
  "Mobile Apps",
  "AI Products",
  "Design Systems",
  "Cloud Infrastructure",
];

export const MarqueeStrip = () => {
  const repeated = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <section
      data-testid="marquee-strip"
      className="relative z-10 border-y border-ink/10 bg-paper py-6 md:py-8 overflow-hidden select-none"
    >
      {/* Black & White Cloud Mountains Background Image with Less Opacity */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-25">
        <img
          src={MOUNTAIN_IMG}
          alt="Cloud mountains background"
          className="w-full h-full object-cover grayscale brightness-75 contrast-125 mix-blend-multiply scale-105"
        />
      </div>

      <motion.div
        className="relative z-10 flex whitespace-nowrap shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 20,
        }}
      >
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="font-outfit text-4xl md:text-6xl font-medium tracking-tight text-ink/90 whitespace-nowrap px-8 md:px-14">
              {item}
            </span>
            <span className="text-2xl md:text-4xl text-[#C2612B]">✦</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
