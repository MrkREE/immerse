"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mic, MessageSquare, TrendingUp, Globe, Star, Languages } from "lucide-react";

const FEATURES = [
  {
    icon: Mic,
    title: "Pronunciation Coach",
    description: "Phonetic analysis on every word. Hear yourself, hear the correction, sound native.",
    size: "large",
  },
  {
    icon: MessageSquare,
    title: "Real-time Feedback",
    description: "Grammar and vocabulary corrections woven naturally into the conversation, never disruptive.",
    size: "small",
  },
  {
    icon: TrendingUp,
    title: "Adaptive Difficulty",
    description: "The AI tracks your level session by session and adjusts complexity so you're always in the growth zone.",
    size: "small",
  },
  {
    icon: Globe,
    title: "50+ Languages",
    description: "From Spanish and Mandarin to Swahili and Icelandic — a native-fluent AI tutor for every one.",
    size: "small",
  },
  {
    icon: Star,
    title: "Progress Dashboard",
    description: "Visual streaks, vocabulary growth charts, and session recaps that keep you motivated.",
    size: "small",
  },
  {
    icon: Languages,
    title: "Multilingual AI",
    description: "Switch languages mid-session. Practice code-switching. The AI never loses the thread.",
    size: "large",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = feature.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden
        hover:border-white/20 hover:bg-[#0f0f0f] transition-all duration-300
        ${feature.size === "large" ? "md:col-span-2 p-10" : "p-8"}
      `}
    >
      {/* Top gradient shimmer on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full gap-5">
        <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
          <Icon size={20} className="text-white" />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{feature.title}</h3>
          <p className="text-white/65 text-sm leading-relaxed">{feature.description}</p>
        </div>

        {feature.size === "large" && (
          <div className="mt-auto pt-4 flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase">
            <span>Learn more</span>
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </div>
        )}
      </div>

      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-radial from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function FeaturesSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section id="features" className="relative py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-4 font-medium">
            Features
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Everything you need<br className="hidden md:block" /> to become fluent
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Row 1: large + small + small */}
          <div className="md:col-span-2">
            <FeatureCard feature={FEATURES[0]} index={0} />
          </div>
          <div className="md:col-span-1">
            <FeatureCard feature={{ ...FEATURES[1], size: "small" }} index={1} />
          </div>
          <div className="md:col-span-1">
            <FeatureCard feature={{ ...FEATURES[2], size: "small" }} index={2} />
          </div>
          {/* Row 2: small + small + large */}
          <div className="md:col-span-1">
            <FeatureCard feature={{ ...FEATURES[3], size: "small" }} index={3} />
          </div>
          <div className="md:col-span-1">
            <FeatureCard feature={{ ...FEATURES[4], size: "small" }} index={4} />
          </div>
          <div className="md:col-span-2">
            <FeatureCard feature={FEATURES[5]} index={5} />
          </div>
        </div>
      </div>
    </section>
  );
}
