"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCTAButton } from "@/components/ui/AnimatedCTAButton";
import { LiquidGlassButton } from "@/components/ui/LiquidGlassButton";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-40 px-6 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Horizontal lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center gap-8"
        >
          <p className="text-white/30 text-xs tracking-[0.4em] uppercase">
            Start your journey
          </p>

          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
            Start speaking<br />today
          </h2>

          <p className="text-white/45 text-lg max-w-md leading-relaxed">
            Join 50,000+ learners already becoming fluent. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <AnimatedCTAButton
              variant="primary"
              className="animate-glow-pulse"
            >
              Start for Free — No card required
            </AnimatedCTAButton>
            <LiquidGlassButton variant="ghost">
              View all languages
            </LiquidGlassButton>
          </div>

          <p className="text-white/20 text-xs">
            Available on iOS, Android, and Web · Free forever tier
          </p>
        </motion.div>
      </div>
    </section>
  );
}
