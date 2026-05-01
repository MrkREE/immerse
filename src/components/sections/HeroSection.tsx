"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown, Mic } from "lucide-react";
import { AnimatedCTAButton } from "@/components/ui/AnimatedCTAButton";
import { LiquidGlassButton } from "@/components/ui/LiquidGlassButton";
import FloatingChars from "@/components/three/FloatingChars";

const UniverseBackground = dynamic(
  () => import("@/components/three/UniverseBackground"),
  { ssr: false }
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js universe background */}
      <UniverseBackground />

      {/* Floating language characters */}
      <FloatingChars />

      {/* Center radial gradient overlay to make text pop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.65) 0%, transparent 100%)",
          zIndex: 15,
        }}
      />

      {/* Hero content */}
      <div
        className="relative flex flex-col items-center text-center px-6 max-w-6xl mx-auto"
        style={{ zIndex: 20 }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.6 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-white/50 text-xs tracking-[0.3em] uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            Voice AI Language Learning
          </span>
        </motion.div>

        {/* 3D IMMERSE logo */}
        <motion.h1
          className="text-3d font-black tracking-tight select-none"
          style={{ fontSize: "clamp(4.5rem, 15vw, 14rem)", lineHeight: 0.92 }}
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 1, type: "spring", stiffness: 120, damping: 18 }}
        >
          IMMERSE
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mt-8 text-white/55 font-light tracking-widest text-lg md:text-xl max-w-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.7, duration: 0.7 }}
        >
          Master any language. Speak with AI.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.0, duration: 0.7 }}
        >
          <AnimatedCTAButton variant="primary">
            Start for Free
          </AnimatedCTAButton>
          <LiquidGlassButton variant="ghost" size="md">
            <Mic size={15} className="mr-2 opacity-70" />
            Try a Demo
          </LiquidGlassButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-16 flex items-center gap-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.3, duration: 0.8 }}
        >
          {[
            { value: "50+", label: "Languages" },
            { value: "50K+", label: "Learners" },
            { value: "4.9★", label: "Rating" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-white/40 text-xs tracking-widest uppercase">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 20 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.8, duration: 0.6 }}
      >
        <span className="text-white/25 text-xs tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="text-white/30 animate-scroll-bounce" />
      </motion.div>
    </section>
  );
}
