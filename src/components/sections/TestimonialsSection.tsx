"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useState } from "react";

const TESTIMONIALS = [
  {
    quote: "I went from A2 to B2 Spanish in three months. The conversations feel shockingly real — better than any class I've taken.",
    name: "Maria Chen",
    role: "Product Designer",
    initials: "MC",
  },
  {
    quote: "The pronunciation feedback changed everything. My coworkers finally understand my English without me repeating myself.",
    name: "Kenji Tanaka",
    role: "Software Engineer",
    initials: "KT",
  },
  {
    quote: "I practice Mandarin every morning before work. It's like a patient tutor available 24/7 who never loses their cool.",
    name: "Sophie Martin",
    role: "Marketing Manager",
    initials: "SM",
  },
  {
    quote: "50 languages and I've tried four so far. The AI never loses patience and makes difficult grammar click every time.",
    name: "Arjun Mehta",
    role: "Entrepreneur",
    initials: "AM",
  },
  {
    quote: "The adaptive difficulty is brilliant. Hard enough to grow, not so hard I give up. Found my sweet spot in the first session.",
    name: "Amara Diallo",
    role: "Medical Student",
    initials: "AD",
  },
  {
    quote: "I tried every app out there. Immerse is the only one that made me feel like I was actually having a conversation, not doing drills.",
    name: "Lucas Ferreira",
    role: "UX Researcher",
    initials: "LF",
  },
  {
    quote: "My Japanese went from textbook-stiff to natural in just six weeks. The AI picks up on exactly what I struggle with.",
    name: "Priya Nair",
    role: "Graphic Designer",
    initials: "PN",
  },
  {
    quote: "Nothing beats the real-time corrections. It catches mistakes I've been making for years and fixes them gently.",
    name: "Omar Khalil",
    role: "Architect",
    initials: "OK",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="white">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="w-80 shrink-0 bg-zinc-900 border border-white/10 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300"
      style={{
        borderColor: hovered ? "rgba(255,255,255,0.2)" : undefined,
        background: hovered ? "#1a1a1a" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Stars />
      <p className="text-white text-sm leading-relaxed flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.08]">
        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold shrink-0">
          {t.initials}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{t.name}</p>
          <p className="text-white/45 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

// Duplicate cards for seamless loop (need ≥2x for translateX(-50%) trick)
const CARDS_LOOP = [...TESTIMONIALS, ...TESTIMONIALS];

export default function TestimonialsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={headerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-4 font-medium">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Learners love Immerse
          </h2>
          <p className="mt-4 text-white/50 text-base">
            Trusted by 50,000+ language learners worldwide
          </p>
        </motion.div>
      </div>

      {/* Marquee track — full bleed */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-5 py-2"
          style={{
            width: "max-content",
            animation: "marquee 55s linear infinite",
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {CARDS_LOOP.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
