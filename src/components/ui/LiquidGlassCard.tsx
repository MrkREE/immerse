"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function LiquidGlassCard({
  children,
  className,
  hover = false,
  glow = false,
  onClick,
}: LiquidGlassCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl overflow-hidden glass-card",
        glow && "animate-glow-pulse",
        onClick && "cursor-pointer",
        className
      )}
    >
      {/* Inner radial highlight — top-left glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(ellipse at 20% 15%, rgba(255,255,255,0.07) 0%, transparent 60%)",
        }}
      />
      {/* Shimmer line across top */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
