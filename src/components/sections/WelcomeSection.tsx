"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShimmerText } from "@/components/ui/shimmer-text";

export default function WelcomeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-black py-40 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Subtle radial glow behind the text */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col items-center gap-6"
      >
        {/* Thin overline */}
        <motion.div
          className="h-px w-12 bg-white/20"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Shimmer welcome text */}
        <ShimmerText
          className="text-5xl md:text-7xl font-black tracking-tight text-white"
          duration={2.2}
          delay={0.8}
        >
          Welcome to Immerse
        </ShimmerText>

        {/* Subtitle */}
        <motion.p
          className="text-white/45 text-base md:text-lg tracking-wide max-w-md"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          The other side of language learning.
        </motion.p>

        {/* Thin underline */}
        <motion.div
          className="h-px w-12 bg-white/20"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        />
      </motion.div>
    </section>
  );
}
