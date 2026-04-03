import { motion } from "motion/react";

export function FloatingAnnotations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10" aria-hidden="true">
      {/* field notes - top left */}
      <motion.div
        className="absolute top-[12%] left-[4%] font-handwritten text-white/70 text-sm"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        field notes
      </motion.div>

      {/* archive → - top right */}
      <motion.div
        className="absolute top-[8%] right-[5%] font-handwritten text-white/60 text-sm"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
        animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        archive →
      </motion.div>

      {/* small decorative arrow - mid left */}
      <motion.svg
        className="absolute left-[6%] top-[45%] opacity-40"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        animate={{ rotate: [0, 5, 0], y: [0, -5, 0] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <path
          d="M6 24 Q18 4 28 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M24 14 L28 18 L22 20"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </motion.svg>

      {/* sparkle star - right side */}
      <motion.div
        className="absolute right-[8%] top-[55%] text-white/50 text-xl"
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        ✦
      </motion.div>

      {/* S.A. stamp - bottom right corner */}
      <motion.div
        className="absolute bottom-[6%] right-[3%] font-typewriter text-white/40 text-xs border border-white/20 px-2 py-1 rounded"
        style={{ letterSpacing: "0.2em" }}
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      >
        S.A.
      </motion.div>

      {/* small star bottom left */}
      <motion.div
        className="absolute bottom-[15%] left-[5%] text-white/40 text-sm"
        animate={{ opacity: [0.2, 0.6, 0.2], rotate: [0, 20, 0] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        ✶
      </motion.div>

      {/* observations — lower left */}
      <motion.div
        className="absolute bottom-[22%] left-[3%] font-handwritten text-white/50 text-xs"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
        animate={{ y: [0, -5, 0], x: [0, -3, 0] }}
        transition={{
          duration: 8.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2.5,
        }}
      >
        observations
      </motion.div>
    </div>
  );
}
