"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { AnimatedCTAButton } from "@/components/ui/AnimatedCTAButton";
import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Start your journey",
    features: [
      "10 conversations / day",
      "3 languages",
      "Basic feedback",
      "Progress tracker",
    ],
    cta: "Get Started Free",
    featured: false,
  },
  {
    name: "Pro",
    monthlyPrice: 12,
    annualPrice: 10,
    description: "For serious learners",
    features: [
      "Unlimited conversations",
      "50+ languages",
      "Advanced AI feedback",
      "Pronunciation coach",
      "Priority support",
      "Offline mode",
    ],
    cta: "Start Pro Trial",
    featured: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    annualPrice: null,
    description: "For teams & schools",
    features: [
      "Everything in Pro",
      "Team dashboard",
      "API access",
      "Custom AI persona",
      "SLA support",
      "Bulk billing",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

function PriceDisplay({ plan, annual }: { plan: (typeof PLANS)[0]; annual: boolean }) {
  const price =
    plan.monthlyPrice === null
      ? "Custom"
      : plan.monthlyPrice === 0
      ? "$0"
      : `$${annual ? plan.annualPrice : plan.monthlyPrice}`;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${plan.name}-${annual}`}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="flex items-end gap-1"
      >
        <span className="text-5xl font-black text-white tracking-tight">{price}</span>
        {plan.monthlyPrice !== null && plan.monthlyPrice > 0 && (
          <span className="text-white/40 text-sm mb-2">/mo</span>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });

  return (
    <section id="pricing" className="relative py-32 px-6 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-white/40 text-xs tracking-[0.4em] uppercase mb-4 font-medium">Pricing</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-10">
            Simple, transparent<br className="hidden md:block" /> pricing
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center rounded-full bg-white/[0.06] border border-white/10 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !annual ? "bg-white text-black shadow-sm" : "text-white/50 hover:text-white/80"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                annual ? "bg-white text-black shadow-sm" : "text-white/50 hover:text-white/80"
              }`}
            >
              Annual
              <span className="text-[10px] font-bold bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                −20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plans */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`relative rounded-2xl flex flex-col ${
                plan.featured
                  ? "bg-white text-black p-8 shadow-[0_0_80px_rgba(255,255,255,0.15),0_0_40px_rgba(255,255,255,0.08)]"
                  : "bg-[#0a0a0a] border border-white/10 p-8 hover:border-white/20 hover:bg-[#0f0f0f] transition-all duration-300"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest uppercase border border-white/10">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <p className={`text-xs tracking-[0.35em] uppercase font-bold mb-1 ${plan.featured ? "text-black/50" : "text-white/40"}`}>
                  {plan.name}
                </p>
                <p className={`text-sm mb-6 ${plan.featured ? "text-black/60" : "text-white/50"}`}>
                  {plan.description}
                </p>
                <PriceDisplay plan={plan} annual={annual} />
              </div>

              {/* Divider */}
              <div className={`h-px mb-8 ${plan.featured ? "bg-black/10" : "bg-white/8"}`} />

              {/* Features */}
              <div className="flex flex-col gap-3.5 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plan.featured ? "bg-black text-white" : "bg-white/10 text-white"}`}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                    <span className={`text-sm ${plan.featured ? "text-black/80 font-medium" : "text-white/70"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              {plan.featured ? (
                <button className="w-full py-3 px-6 bg-black text-white rounded-xl text-sm font-semibold hover:bg-black/80 transition-colors duration-200">
                  {plan.cta}
                </button>
              ) : (
                <button className="w-full py-3 px-6 bg-white/[0.06] border border-white/10 text-white rounded-xl text-sm font-semibold hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                  {plan.cta}
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          className="text-center text-white/25 text-xs mt-10"
          initial={{ opacity: 0 }}
          animate={cardsInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          No credit card required · Cancel anytime · 14-day free trial on Pro
        </motion.p>
      </div>
    </section>
  );
}
