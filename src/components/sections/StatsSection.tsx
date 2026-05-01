"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const STATS = [
  { value: 50000, suffix: "+", label: "Active Learners" },
  { value: 50, suffix: "+", label: "Languages" },
  { value: 4800000, suffix: "+", label: "Conversations" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (value >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${Math.round(v / 1000)}K`;
    return Math.round(v).toString();
  });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, value, count]);

  return (
    <span className="font-black text-white tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-24 px-6 bg-black border-y border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="text-4xl md:text-5xl tracking-tight">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
