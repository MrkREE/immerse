"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ShimmerTextProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}

export function ShimmerText({
  children,
  className,
  duration = 1.8,
  delay = 0.6,
}: ShimmerTextProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={cn("inline-block", className)}
        style={{
          WebkitTextFillColor: "transparent",
          background:
            "currentColor linear-gradient(to right, currentColor 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.85) 60%, currentColor 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          backgroundRepeat: "no-repeat",
          backgroundSize: "50% 200%",
        } as React.CSSProperties}
        initial={{ backgroundPositionX: "250%" }}
        animate={{ backgroundPositionX: ["-100%", "250%"] }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
      >
        <span>{children}</span>
      </motion.div>
    </div>
  );
}

export default ShimmerText;
