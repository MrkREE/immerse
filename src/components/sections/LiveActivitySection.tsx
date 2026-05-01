"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { Mic, BookOpen, Star, TrendingUp, MessageSquare, Globe } from "lucide-react";

const ACTIVITIES = [
  { icon: Mic, text: "Kenji just completed a Spanish conversation session", time: "2s ago", initials: "KT" },
  { icon: Star, text: "Maria reached B2 level in French — streak of 47 days!", time: "15s ago", initials: "MC" },
  { icon: BookOpen, text: "Sophie learned 23 new Mandarin vocabulary words", time: "32s ago", initials: "SM" },
  { icon: TrendingUp, text: "Arjun's pronunciation score improved 12% this week", time: "1m ago", initials: "AM" },
  { icon: MessageSquare, text: "Amara had a 45-minute Arabic deep-dive session", time: "2m ago", initials: "AD" },
  { icon: Globe, text: "Lucas started learning Japanese — language #4 for him", time: "3m ago", initials: "LR" },
  { icon: Star, text: "Priya completed her 100th conversation milestone", time: "4m ago", initials: "PS" },
  { icon: Mic, text: "Chen corrected his tonal pronunciation in real-time", time: "5m ago", initials: "CW" },
];

export default function LiveActivitySection() {
  const [items, setItems] = useState(ACTIVITIES.slice(0, 4));
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let idx = 4;
    const interval = setInterval(() => {
      const next = ACTIVITIES[idx % ACTIVITIES.length];
      setItems((prev) => [next, ...prev.slice(0, 3)]);
      idx++;
    }, 2800);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={sectionRef} className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
            <span className="text-white/40 text-xs tracking-[0.4em] uppercase">Live Activity</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Learners immersing right now
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="flex flex-col gap-3"
        >
          <AnimatePresence>
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={`${item.text}-${i}`}
                  initial={{ opacity: 0, scale: 0.95, y: -12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{ type: "spring", stiffness: 350, damping: 40 }}
                  layout
                >
                  <LiquidGlassCard className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full glass-card flex items-center justify-center text-white/60 text-xs font-semibold shrink-0">
                        {item.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/70 text-sm leading-snug truncate">{item.text}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Icon size={13} className="text-white/25" />
                        <span className="text-white/25 text-xs whitespace-nowrap">{item.time}</span>
                      </div>
                    </div>
                  </LiquidGlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
