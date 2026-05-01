"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Plug, MessageCircle, TrendingUp } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Plug,
    title: "Connect",
    description:
      "Choose your language, set your current level, and tell the AI what topics you want to explore. Setup takes under 60 seconds.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Converse",
    description:
      "Speak naturally with your AI tutor. It listens, responds, corrects gently, and keeps the conversation flowing at your pace.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Improve",
    description:
      "After every session, get a personalized breakdown of your grammar, vocabulary, and pronunciation with actionable tips.",
  },
];

function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.18, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
    >
      {/* Connector line */}
      {index < STEPS.length - 1 && (
        <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent z-10 -translate-y-px" style={{ width: "calc(100% - 80px)", left: "calc(50% + 40px)" }} />
      )}

      <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 h-full hover:border-white/20 transition-all duration-300 hover:bg-[#111]">
        {/* Step number watermark */}
        <span
          className="absolute top-4 right-6 text-8xl font-black text-white/[0.04] select-none leading-none"
          aria-hidden="true"
        >
          {step.number}
        </span>

        <div className="relative z-10 flex flex-col gap-6">
          {/* Icon */}
          <div className="w-12 h-12 rounded-xl bg-white/[0.07] border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
            <Icon size={20} className="text-white" />
          </div>

          <div>
            <p className="text-white/40 text-xs tracking-[0.35em] uppercase mb-2 font-medium">
              Step {step.number}
            </p>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
            <p className="text-white/75 text-sm leading-relaxed">{step.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="relative py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-4 font-medium">
            How it works
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Three steps to fluency
          </h2>
          <p className="mt-4 text-white/50 text-base max-w-lg mx-auto">
            From first word to full conversation — a path designed around how humans actually learn.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
